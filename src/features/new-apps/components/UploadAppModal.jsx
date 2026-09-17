import React, { useState, useEffect, useRef } from 'react';
import { createNewApp, updateNewApp, deleteNewApp, compressImageToBase64 } from '../firebase/newAppsFirestore';

// Curated devotional & utility avatars
const RANDOM_AVATARS = [
  { name: 'శివ లింగం (Shiva)', url: '/shiva_entry_poster.jpg' },
  { name: 'మండలం (Mandala)', url: '/spiritual_pattern.jpg' },
  { name: 'వాస్తు (Vastu)', url: '/vastu_card.jpg' },
  { name: 'ప్రశ్నోత్తరాలు (Q&A)', url: '/qna_card.jpg' },
  { name: 'భగవద్గీత (Gita)', url: '/og-preview.jpg' },
  {
    name: 'ఓం (Om)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff9800"/><stop offset="100%" stop-color="%23e91e63"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23g)"/><text x="50%" y="58%" font-size="52" text-anchor="middle" dominant-baseline="middle" fill="%23ffffff">🕉️</text></svg>'
  },
  {
    name: 'దీపం (Diya)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffd700"/><stop offset="100%" stop-color="%23ff5722"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23g2)"/><text x="50%" y="58%" font-size="52" text-anchor="middle" dominant-baseline="middle" fill="%23ffffff">🪔</text></svg>'
  },
  {
    name: 'దేవాలయం (Temple)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23673ab7"/><stop offset="100%" stop-color="%233f51b5"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23g3)"/><text x="50%" y="58%" font-size="52" text-anchor="middle" dominant-baseline="middle" fill="%23ffffff">🛕</text></svg>'
  },
  {
    name: 'కమలం (Lotus)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23e91e63"/><stop offset="100%" stop-color="%239c27b0"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23g4)"/><text x="50%" y="58%" font-size="52" text-anchor="middle" dominant-baseline="middle" fill="%23ffffff">🪷</text></svg>'
  },
  {
    name: 'త్రిశూలం (Trishul)',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23009688"/><stop offset="100%" stop-color="%2300bcd4"/></linearGradient></defs><rect width="100" height="100" rx="22" fill="url(%23g5)"/><text x="50%" y="58%" font-size="52" text-anchor="middle" dominant-baseline="middle" fill="%23ffffff">🔱</text></svg>'
  }
];

export const getRandomAvatarUrl = () => {
  const idx = Math.floor(Math.random() * RANDOM_AVATARS.length);
  return RANDOM_AVATARS[idx].url;
};

/**
 * Extract favicon and title metadata from HTML string
 */
const extractMetadataFromHtml = (htmlContent) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // 1. Title
    let extractedTitle = '';
    const titleEl = doc.querySelector('title');
    if (titleEl && titleEl.innerText.trim()) {
      extractedTitle = titleEl.innerText.trim();
    }

    // 2. Favicon from link tags
    let extractedFavicon = '';
    const selectors = [
      'link[rel="icon"]',
      'link[rel="shortcut icon"]',
      'link[rel="apple-touch-icon"]',
      'link[rel="apple-touch-icon-precomposed"]',
      'link[rel~="icon"]'
    ];

    for (const sel of selectors) {
      const el = doc.querySelector(sel);
      if (el) {
        const href = el.getAttribute('href');
        if (href) {
          // Check for data URL or absolute URL
          if (href.startsWith('data:image/') || href.startsWith('http://') || href.startsWith('https://')) {
            extractedFavicon = href;
            break;
          }
        }
      }
    }

    // 3. Check for logo or app icon inside HTML
    if (!extractedFavicon) {
      const logoImg = doc.querySelector('img.logo, img.icon, img#logo, img#icon, .app-icon img');
      if (logoImg) {
        const src = logoImg.getAttribute('src');
        if (src && (src.startsWith('data:image/') || src.startsWith('http://') || src.startsWith('https://'))) {
          extractedFavicon = src;
        }
      }
    }

    return { title: extractedTitle, favicon: extractedFavicon };
  } catch (err) {
    console.warn('Metadata extraction failed:', err);
    return { title: '', favicon: '' };
  }
};

export default function UploadAppModal({ isOpen, onClose, onSaved, editingApp = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('భక్తి / ఆధ్యాత్మికం');
  const [iconUrl, setIconUrl] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');
  const [faviconExtracted, setFaviconExtracted] = useState(false);
  const [htmlFile, setHtmlFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const htmlInputRef = useRef(null);
  const iconInputRef = useRef(null);

  useEffect(() => {
    if (editingApp) {
      setTitle(editingApp.title || '');
      setDescription(editingApp.description || '');
      setCategory(editingApp.category || 'భక్తి / ఆధ్యాత్మికం');
      setIconUrl(editingApp.iconUrl || '');
      setIconPreview(editingApp.iconUrl || '');
      setHtmlFile(null);
      setIconFile(null);
      setFaviconExtracted(false);
    } else {
      const initialRandom = getRandomAvatarUrl();
      setTitle('');
      setDescription('');
      setCategory('భక్తి / ఆధ్యాత్మికం');
      setIconUrl(initialRandom);
      setIconPreview(initialRandom);
      setHtmlFile(null);
      setIconFile(null);
      setFaviconExtracted(false);
    }
    setError('');
  }, [editingApp, isOpen]);

  if (!isOpen) return null;

  const handlePickRandomAvatar = () => {
    const randomUrl = getRandomAvatarUrl();
    setIconUrl(randomUrl);
    setIconPreview(randomUrl);
    setIconFile(null);
    setFaviconExtracted(false);
  };

  const handleIconChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      try {
        const compressedBase64 = await compressImageToBase64(file);
        if (compressedBase64) {
          setIconPreview(compressedBase64);
          setIconUrl(compressedBase64);
        } else {
          const previewUrl = URL.createObjectURL(file);
          setIconPreview(previewUrl);
        }
      } catch (err) {
        const previewUrl = URL.createObjectURL(file);
        setIconPreview(previewUrl);
      }
      setFaviconExtracted(false);
    }
  };

  const handleHtmlChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
        setError('దయచేసి .html లేదా .htm ఫైల్‌ను మాత్రమే ఎంచుకోండి.');
        setHtmlFile(null);
        return;
      }

      setError('');
      setHtmlFile(file);

      // Read file content to inspect favicon and title
      try {
        const text = await file.text();
        const { title: extractedTitle, favicon: extractedFavicon } = extractMetadataFromHtml(text);

        // If title not provided yet, auto-fill
        if (!title && extractedTitle) {
          setTitle(extractedTitle);
        } else if (!title) {
          const suggested = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
          setTitle(suggested.charAt(0).toUpperCase() + suggested.slice(1));
        }

        // If favicon found, set as icon
        if (extractedFavicon) {
          setIconUrl(extractedFavicon);
          setIconPreview(extractedFavicon);
          setIconFile(null);
          setFaviconExtracted(true);
        }
      } catch (readErr) {
        console.warn('Could not read HTML for metadata:', readErr);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('దయచేసి యాప్ పేరును (App Title) నమోదు చేయండి.');
      return;
    }

    if (!editingApp && !htmlFile) {
      setError('దయచేసి అప్లోడ్ చేయడానికి .html ఫైల్‌ను ఎంచుకోండి.');
      return;
    }

    setLoading(true);

    try {
      // Ensure iconUrl has at least a random avatar if nothing provided
      const finalIconUrl = iconPreview || iconUrl || getRandomAvatarUrl();

      if (editingApp) {
        await updateNewApp(editingApp.id, {
          title,
          description,
          category,
          iconFile,
          iconUrl: iconFile ? undefined : finalIconUrl,
          htmlFile
        });
      } else {
        await createNewApp({
          title,
          description,
          category,
          htmlFile,
          iconFile,
          iconUrl: iconFile ? undefined : finalIconUrl
        });
      }

      onSaved?.();
      onClose();
    } catch (err) {
      console.error('Error saving app:', err);
      setError(err.message || 'యాప్ అప్‌లోడ్ చేయడంలో లోపం ఏర్పడింది.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCurrent = async () => {
    if (!editingApp) return;
    if (window.confirm(`మీరు నిజంగా "${editingApp.title}" యాప్‌ను తొలగించాలనుకుంటున్నారా?`)) {
      setLoading(true);
      try {
        await deleteNewApp(editingApp.id, editingApp.htmlUrl, editingApp.iconUrl);
        onSaved?.();
        onClose();
      } catch (err) {
        setError('తొలగించడంలో లోపం: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="app-modal-overlay" onClick={onClose}>
      <div className="app-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="app-modal-header">
          <h3 className="app-modal-title">
            <span>✨</span>
            {editingApp ? 'యాప్ సవరించండి (Edit App & Icon)' : 'కొత్త యాప్ అప్‌లోడ్ చేయండి (Upload New App)'}
          </h3>
          <button className="app-modal-close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244, 67, 54, 0.15)',
            border: '1px solid #f44336',
            color: '#ff8a80',
            padding: '10px 14px',
            borderRadius: '10px',
            marginBottom: '16px',
            fontSize: '0.9rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* App Title */}
          <div className="app-form-group">
            <label className="app-form-label">యాప్ పేరు (App Name / Title) *</label>
            <input
              type="text"
              className="app-form-input"
              placeholder="ఉదా: నిత్య పూజా విధానం / భగవద్గీత శ్లోకాలు"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* HTML File Upload */}
          <div className="app-form-group">
            <label className="app-form-label">
              HTML ఫైల్ (.html with HTML, CSS & JS) {editingApp ? '(మార్చాలనుకుంటే ఎంచుకోండి)' : '*'}
            </label>
            <div
              className="app-file-drop"
              onClick={() => htmlInputRef.current?.click()}
            >
              <input
                ref={htmlInputRef}
                type="file"
                accept=".html,.htm"
                style={{ display: 'none' }}
                onChange={handleHtmlChange}
              />
              <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>📄</div>
              <div style={{ fontWeight: 'bold', color: '#ffd700' }}>
                {htmlFile
                  ? `ఎంచుకున్న ఫైల్: ${htmlFile.name}`
                  : editingApp
                  ? `ప్రస్తుత ఫైల్: ${editingApp.htmlFileName || 'app.html'} (క్లిక్ చేసి మార్చండి)`
                  : '.html ఫైల్‌ను ఇక్కడ అప్‌లోడ్ చేయండి'}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                (ఈ ఫైల్ నుండి Favicon & Title ఆటోమేటిక్‌గా గుర్తించబడతాయి)
              </div>
            </div>

            {htmlFile && (
              <div className="app-file-preview-info">
                <span>✓ సైజు: {formatFileSize(htmlFile.size)}</span>
                <span>• పేరు: {htmlFile.name}</span>
                {faviconExtracted && (
                  <span style={{ color: '#ffd700', fontWeight: 'bold' }}>• 🎨 Favicon కనుగొనబడింది!</span>
                )}
              </div>
            )}
          </div>

          {/* App Icon / Image */}
          <div className="app-form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="app-form-label" style={{ margin: 0 }}>
                యాప్ ఐకాన్ / ఫోటో (App Icon / Avatar)
              </label>
              <button
                type="button"
                onClick={handlePickRandomAvatar}
                style={{
                  background: 'rgba(255,215,0,0.12)',
                  border: '1px solid rgba(255,215,0,0.4)',
                  color: '#ffd700',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                🎲 యాదృచ్ఛిక అవతార్ (Random Avatar)
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid #ffd700',
                boxShadow: '0 4px 12px rgba(255,215,0,0.3)',
                flexShrink: 0,
                background: '#1a0f2e'
              }}>
                <img
                  src={iconPreview || '/spiritual_pattern.jpg'}
                  alt="App Icon Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <button
                  type="button"
                  onClick={() => iconInputRef.current?.click()}
                  style={{
                    background: 'rgba(255,215,0,0.12)',
                    border: '1px solid rgba(255,215,0,0.4)',
                    color: '#ffd700',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  📁 ఫోటో అప్‌లోడ్ చేయండి (Upload Image)
                </button>
                <input
                  ref={iconInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleIconChange}
                />
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  {faviconExtracted
                    ? 'HTML నుండి Favicon ఆటోమేటిక్‌గా తీసుకోబడింది'
                    : 'మీ స్వంత ఫోటో అప్‌లోడ్ చేయండి లేదా క్రింద ఎంచుకోండి'}
                </div>
              </div>
            </div>

            {/* Quick avatar selection */}
            <div style={{ fontSize: '0.82rem', color: '#ffd700', marginBottom: '6px' }}>
              అవతార్ల నుండి ఎంచుకోండి (Choose Avatar):
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {RANDOM_AVATARS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setIconUrl(preset.url);
                    setIconPreview(preset.url);
                    setIconFile(null);
                    setFaviconExtracted(false);
                  }}
                  style={{
                    background: iconPreview === preset.url ? 'rgba(255,215,0,0.3)' : 'rgba(255,255,255,0.06)',
                    border: iconPreview === preset.url ? '1px solid #ffd700' : '1px solid rgba(255,255,255,0.15)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    borderRadius: '14px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <img src={preset.url} alt="" style={{ width: '18px', height: '18px', borderRadius: '4px', objectFit: 'cover' }} />
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="app-form-group">
            <label className="app-form-label">చిన్న వివరణ (Description - ఐచ్ఛికం)</label>
            <textarea
              className="app-form-textarea"
              rows={2}
              placeholder="యాప్ గురించిన చిన్న వివరణ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Modal Footer */}
          <div className="app-modal-footer" style={{ justifyContent: editingApp ? 'space-between' : 'flex-end' }}>
            {editingApp && (
              <button
                type="button"
                onClick={handleDeleteCurrent}
                disabled={loading}
                style={{
                  background: 'rgba(244, 67, 54, 0.15)',
                  border: '1px solid #f44336',
                  color: '#ff8a80',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🗑️</span>
                <span>యాప్ తొలగించండి</span>
              </button>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                రద్దు (Cancel)
              </button>
              <button
                type="submit"
                disabled={loading}
                className="new-apps-admin-btn"
                style={{ padding: '10px 24px' }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: '1rem', height: '1rem' }}></span>
                    <span>భద్రపరచబడుతోంది...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>{editingApp ? 'మార్పులు సేవ్ చేయండి' : 'ప్రచురించండి (Publish)'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
