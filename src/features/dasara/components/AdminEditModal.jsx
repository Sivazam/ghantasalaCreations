import React, { useState, useEffect, useRef } from 'react';
import { uploadDasaraImage } from '../firebase/dasaraFirestore';

const AdminEditModal = ({ dayData, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // '', 'ready', 'uploading', 'success', 'error'
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (dayData && isOpen) {
      // Pre-populate existing date if not already explicitly stored
      const existingDate = dayData.date || (
        dayData.date2025 
          ? `${dayData.date2025}${dayData.dayOfWeek2025 ? ` (${dayData.dayOfWeek2025})` : ''}` 
          : ''
      );

      setFormData({ 
        ...dayData,
        date: existingDate,
        tithiTelugu: dayData.tithiTelugu || dayData.tithi || '',
        avatarImageUrl: dayData.avatarImageUrl || '',
        colorName: dayData.colorName || '',
        colorNameTelugu: dayData.colorNameTelugu || '',
        colorCode: dayData.colorCode || '#FFD700',
        devoteeColorAdvice: dayData.devoteeColorAdvice || '',
        significance: dayData.significance || '',
        significanceTelugu: dayData.significanceTelugu || '',
        kalasaDetails: dayData.kalasaDetails || '',
        prasadams: Array.isArray(dayData.prasadams) ? JSON.parse(JSON.stringify(dayData.prasadams)) : [],
        mantras: Array.isArray(dayData.mantras) ? JSON.parse(JSON.stringify(dayData.mantras)) : [],
        rituals: Array.isArray(dayData.rituals) ? JSON.parse(JSON.stringify(dayData.rituals)) : []
      });

      setSelectedFile(null);
      setImagePreview(dayData.avatarImageUrl || '');
      setUploadStatus('');
      setSaving(false);
    }
  }, [dayData, isOpen]);

  if (!isOpen || !formData) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      setUploadStatus('ready');
    }
  };

  const handleUploadNow = async () => {
    if (!selectedFile) return;
    setUploadingImage(true);
    setUploadStatus('uploading');
    try {
      const downloadUrl = await uploadDasaraImage(formData.dayNumber, selectedFile);
      setFormData(prev => ({ ...prev, avatarImageUrl: downloadUrl }));
      setImagePreview(downloadUrl);
      setUploadStatus('success');
    } catch (error) {
      console.error('Image upload failed:', error);
      setUploadStatus('error');
      alert('Failed to upload image to Firebase Storage: ' + (error.message || 'Unknown error'));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleAddItem = (arrayName, emptyItem) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], emptyItem]
    }));
  };

  const handleRemoveItem = (arrayName, index) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    let finalFormData = { ...formData };

    try {
      if (selectedFile && uploadStatus !== 'success') {
        setUploadingImage(true);
        setUploadStatus('uploading');
        const downloadUrl = await uploadDasaraImage(formData.dayNumber, selectedFile);
        finalFormData.avatarImageUrl = downloadUrl;
        setUploadStatus('success');
      }

      await onSave(finalFormData);
    } catch (error) {
      console.error('Failed to save data:', error);
      alert('Error saving changes: ' + (error.message || 'Check console for details'));
    } finally {
      setUploadingImage(false);
      setSaving(false);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '15px',
      boxSizing: 'border-box'
    },
    modal: {
      backgroundColor: '#1b0909',
      background: 'linear-gradient(180deg, #240a0a 0%, #150505 100%)',
      border: '2px solid #ffd700',
      borderRadius: '16px',
      width: '100%',
      maxWidth: '680px',
      maxHeight: '92vh',
      overflowY: 'auto',
      padding: '24px 20px',
      color: 'white',
      fontFamily: "'Noto Serif Telugu', serif",
      boxShadow: '0 0 30px rgba(255, 215, 0, 0.35)',
      boxSizing: 'border-box'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 215, 0, 0.35)',
      paddingBottom: '15px',
      marginBottom: '20px'
    },
    title: {
      margin: 0,
      color: '#ffd700',
      fontSize: '1.25rem',
      fontWeight: 800
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#ffd700',
      fontSize: '28px',
      cursor: 'pointer',
      padding: '0 5px',
      lineHeight: 1
    },
    sectionBox: {
      background: 'rgba(255, 255, 255, 0.04)',
      border: '1px solid rgba(255, 215, 0, 0.2)',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '20px'
    },
    sectionTitle: {
      margin: '0 0 14px 0',
      color: '#ffd700',
      fontSize: '1.05rem',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    formGroup: {
      marginBottom: '14px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      color: '#ffe8a1',
      fontSize: '0.88rem',
      fontWeight: 'bold'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#0d0303',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '0.95rem',
      boxSizing: 'border-box',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '10px 12px',
      backgroundColor: '#0d0303',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '0.95rem',
      minHeight: '80px',
      boxSizing: 'border-box',
      outline: 'none',
      fontFamily: 'inherit'
    },
    row: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    },
    colHalf: {
      flex: '1 1 240px'
    },
    colorPickerRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    colorInput: {
      width: '45px',
      height: '42px',
      padding: 0,
      border: '1px solid #ffd700',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    },
    imagePreviewBox: {
      display: 'flex',
      gap: '15px',
      alignItems: 'center',
      margin: '12px 0',
      padding: '10px',
      background: '#0d0303',
      borderRadius: '10px',
      border: '1px dashed rgba(255, 215, 0, 0.4)'
    },
    previewThumb: {
      width: '75px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '8px',
      border: '2px solid #ffd700',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
    },
    uploadBtn: {
      background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
      color: '#1a0500',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '0.85rem',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    },
    itemCard: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '12px',
      borderRadius: '10px',
      marginBottom: '12px',
      border: '1px solid rgba(255, 215, 0, 0.15)',
      position: 'relative'
    },
    removeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      backgroundColor: 'rgba(255, 68, 68, 0.2)',
      color: '#ff6666',
      border: '1px solid #ff4444',
      padding: '3px 8px',
      borderRadius: '6px',
      fontSize: '0.75rem',
      cursor: 'pointer'
    },
    addButton: {
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      color: '#ffd700',
      border: '1px dashed #ffd700',
      padding: '8px 14px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginTop: '8px',
      width: '100%',
      fontWeight: 'bold',
      fontSize: '0.9rem'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '20px',
      borderTop: '1px solid rgba(255, 215, 0, 0.3)',
      paddingTop: '18px'
    },
    saveButton: {
      background: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
      color: '#1a0500',
      border: 'none',
      padding: '11px 26px',
      borderRadius: '30px',
      fontWeight: '900',
      cursor: 'pointer',
      fontSize: '1rem',
      boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#ffd700',
      border: '1px solid rgba(255, 215, 0, 0.5)',
      padding: '11px 22px',
      borderRadius: '30px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '0.95rem'
    }
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            ✏️ {formData.dayNumber}వ రోజు ఎడిట్ చేయండి ({formData.titleTelugu})
          </h2>
          <button style={styles.closeButton} onClick={onClose} title="Close">&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* SECTION 1: BASIC INFORMATION */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>📋 ప్రాథమిక సమాచారం (General Info)</h3>
            
            <div style={styles.row}>
              <div style={{ ...styles.formGroup, ...styles.colHalf }}>
                <label style={styles.label}>అమ్మవారి పేరు (Telugu Title) *</label>
                <input
                  type="text"
                  name="titleTelugu"
                  value={formData.titleTelugu || ''}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={{ ...styles.formGroup, ...styles.colHalf }}>
                <label style={styles.label}>English Title *</label>
                <input
                  type="text"
                  name="titleEnglish"
                  value={formData.titleEnglish || ''}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.formGroup, ...styles.colHalf }}>
                <label style={styles.label}>📅 పండుగ తేదీ (Date) *</label>
                <input
                  type="text"
                  name="date"
                  placeholder="e.g. October 11, 2026 (Sunday)"
                  value={formData.date || ''}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={{ ...styles.formGroup, ...styles.colHalf }}>
                <label style={styles.label}>🌙 తిథి / విశేషం (Tithi / Festival Special)</label>
                <input
                  type="text"
                  name="tithiTelugu"
                  placeholder="e.g. పాడ్యమి / మూలా నక్షత్రం"
                  value={formData.tithiTelugu || ''}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: AVATAR IMAGE & FIREBASE STORAGE UPLOAD */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>🖼️ అమ్మవారి చిత్రం (Avatar Image)</h3>

            {/* Current / Preview Image Display */}
            {imagePreview && (
              <div style={styles.imagePreviewBox}>
                <img
                  src={imagePreview}
                  alt="Avatar Preview"
                  style={styles.previewThumb}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: '0 0 5px', fontSize: '0.85rem', color: '#ffd700', fontWeight: 'bold' }}>
                    {selectedFile ? `📷 ఎంచుకున్న ఫోటో: ${selectedFile.name}` : '✨ ప్రస్తుత చిత్రం'}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', wordBreak: 'break-all' }}>
                    {formData.avatarImageUrl || 'స్థానిక ప్రివ్యూ (సేవ్ చేయడానికి సిద్ధంగా ఉంది)'}
                  </p>

                  {/* Immediate Upload Action Button */}
                  {selectedFile && uploadStatus !== 'success' && (
                    <button
                      type="button"
                      onClick={handleUploadNow}
                      disabled={uploadingImage}
                      style={{
                        ...styles.uploadBtn,
                        marginTop: '8px',
                        opacity: uploadingImage ? 0.6 : 1
                      }}
                    >
                      {uploadingImage ? '⏳ Storage కి అప్‌లోడ్ అవుతోంది...' : '⬆️ Firebase Storage కి అప్‌లోడ్ చేయండి'}
                    </button>
                  )}

                  {uploadStatus === 'success' && (
                    <p style={{ margin: '6px 0 0', color: '#44ff44', fontSize: '0.82rem', fontWeight: 'bold' }}>
                      ✓ Firebase Storage కి విజయవంతంగా సేవ్ అయ్యింది!
                    </p>
                  )}
                  {uploadStatus === 'error' && (
                    <p style={{ margin: '6px 0 0', color: '#ff5555', fontSize: '0.82rem' }}>
                      ⚠️ అప్‌లోడ్ విఫలమైంది. మళ్ళీ ప్రయత్నించండి.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* File Upload Option */}
            <div style={styles.formGroup}>
              <label style={styles.label}>📁 ఫోన్ / కంప్యూటర్ నుండి కొత్త ఫోటో ఎంచుకోండి (Upload from Device):</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  ...styles.uploadBtn,
                  background: 'rgba(255, 215, 0, 0.15)',
                  border: '1px solid #ffd700',
                  color: '#ffd700',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.92rem'
                }}
              >
                📸 Choose Image from Gallery / File...
              </button>
            </div>

            {/* Direct Image URL Option */}
            <div style={styles.formGroup}>
              <label style={styles.label}>లేదా చిత్రం లింక్ (Direct Image URL):</label>
              <input
                type="text"
                name="avatarImageUrl"
                placeholder="https://... or /dasara/day1.jpg"
                value={formData.avatarImageUrl || ''}
                onChange={(e) => {
                  handleChange(e);
                  setImagePreview(e.target.value);
                }}
                style={styles.input}
              />
            </div>
          </div>

          {/* SECTION 3: SACRED COLOR */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>🎨 అలంకారం రంగు & వస్త్రధారణ (Sacred Saree Color)</h3>
            
            <div style={styles.row}>
              <div style={{ ...styles.formGroup, ...styles.colHalf }}>
                <label style={styles.label}>రంగు పేరు (Telugu):</label>
                <input
                  type="text"
                  name="colorNameTelugu"
                  placeholder="e.g. బంగారు పసుపు"
                  value={formData.colorNameTelugu || ''}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={{ ...styles.formGroup, ...styles.colHalf }}>
                <label style={styles.label}>Color Name (English):</label>
                <input
                  type="text"
                  name="colorName"
                  placeholder="e.g. Golden Yellow"
                  value={formData.colorName || ''}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Color Hex Code:</label>
              <div style={styles.colorPickerRow}>
                <input
                  type="color"
                  name="colorCode"
                  value={formData.colorCode || '#ffd700'}
                  onChange={handleChange}
                  style={styles.colorInput}
                />
                <input
                  type="text"
                  name="colorCode"
                  value={formData.colorCode || ''}
                  onChange={handleChange}
                  style={{ ...styles.input, width: '130px' }}
                />
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)' }}>
                  (This color glows on the day card and details page)
                </span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>భక్తుల వస్త్రధారణ సూచన (Devotee Attire Advice):</label>
              <textarea
                name="devoteeColorAdvice"
                placeholder="భక్తులు ఈ రోజు ధరించాల్సిన వస్త్ర విశేషాలు..."
                value={formData.devoteeColorAdvice || ''}
                onChange={handleChange}
                style={styles.textarea}
                rows={2}
              />
            </div>
          </div>

          {/* SECTION 4: KALASA STHAPANA (DAY 1) */}
          {formData.dayNumber === 1 && (
            <div style={{ ...styles.sectionBox, borderColor: 'rgba(255, 215, 0, 0.5)', background: 'rgba(255, 215, 0, 0.05)' }}>
              <h3 style={styles.sectionTitle}>🏺 కలశ స్థాపన విధానం (Kalasa Sthapana Details)</h3>
              <div style={styles.formGroup}>
                <textarea
                  name="kalasaDetails"
                  value={formData.kalasaDetails || ''}
                  onChange={handleChange}
                  style={styles.textarea}
                  rows={5}
                  placeholder="కలశ స్థాపన మంత్రం, శుభ ముహూర్తం మరియు కావాల్సిన సామాగ్రి..."
                />
              </div>
            </div>
          )}

          {/* SECTION 5: PRASADAMS */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>🍚 నైవేద్యం (Prasadams)</h3>
            {formData.prasadams.map((prasadam, index) => (
              <div key={index} style={styles.itemCard}>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => handleRemoveItem('prasadams', index)}
                >
                  ✕ తీసివేయి
                </button>
                <div style={styles.formGroup}>
                  <label style={styles.label}>నైవేద్యం పేరు (Telugu):</label>
                  <input
                    type="text"
                    value={prasadam.telugu || ''}
                    onChange={(e) => handleArrayChange('prasadams', index, 'telugu', e.target.value)}
                    style={styles.input}
                    placeholder="e.g. కట్టె పొంగలి"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>English Name:</label>
                  <input
                    type="text"
                    value={prasadam.english || ''}
                    onChange={(e) => handleArrayChange('prasadams', index, 'english', e.target.value)}
                    style={styles.input}
                    placeholder="e.g. Katte Pongali"
                  />
                </div>
                <div style={{ ...styles.formGroup, marginBottom: 0 }}>
                  <label style={styles.label}>వివరణ (Description):</label>
                  <input
                    type="text"
                    value={prasadam.description || ''}
                    onChange={(e) => handleArrayChange('prasadams', index, 'description', e.target.value)}
                    style={styles.input}
                    placeholder="e.g. Savory ven pongal"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              style={styles.addButton}
              onClick={() => handleAddItem('prasadams', { telugu: '', english: '', description: '' })}
            >
              + కొత్త నైవేద్యం చేర్చండి (Add Prasadam)
            </button>
          </div>

          {/* SECTION 6: MANTRAS */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>🙏 పవిత్ర మంత్రాలు (Mantras)</h3>
            {formData.mantras.map((mantra, index) => (
              <div key={index} style={styles.itemCard}>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => handleRemoveItem('mantras', index)}
                >
                  ✕ తీసివేయి
                </button>
                <div style={styles.formGroup}>
                  <label style={styles.label}>తెలుగు మంత్రం / శ్లోకం (Telugu Shloka):</label>
                  <textarea
                    value={mantra.telugu || ''}
                    onChange={(e) => handleArrayChange('mantras', index, 'telugu', e.target.value)}
                    style={styles.textarea}
                    rows={3}
                    placeholder="ఓం ఐం క్లీం సౌః..."
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ఆంగ్ల లిపి (English Transliteration):</label>
                  <textarea
                    value={mantra.transliteration || ''}
                    onChange={(e) => handleArrayChange('mantras', index, 'transliteration', e.target.value)}
                    style={styles.textarea}
                    rows={2}
                    placeholder="Om Aim Kleem Sauh..."
                  />
                </div>
                <div style={{ ...styles.formGroup, marginBottom: 0 }}>
                  <label style={styles.label}>తాత్పర్యం / భావం (Meaning):</label>
                  <textarea
                    value={mantra.meaning || ''}
                    onChange={(e) => handleArrayChange('mantras', index, 'meaning', e.target.value)}
                    style={styles.textarea}
                    rows={2}
                    placeholder="ఈ మంత్రం యొక్క పవిత్ర అర్థం..."
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              style={styles.addButton}
              onClick={() => handleAddItem('mantras', { telugu: '', transliteration: '', meaning: '' })}
            >
              + కొత్త మంత్రం చేర్చండి (Add Mantra)
            </button>
          </div>

          {/* SECTION 7: RITUALS */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>🔱 పూజా విధానం & విశేషాలు (Rituals)</h3>
            {formData.rituals.map((ritual, index) => (
              <div key={index} style={styles.itemCard}>
                <button
                  type="button"
                  style={styles.removeButton}
                  onClick={() => handleRemoveItem('rituals', index)}
                >
                  ✕ తీసివేయి
                </button>
                <div style={styles.formGroup}>
                  <label style={styles.label}>పూజా శీర్షిక (Telugu Title):</label>
                  <input
                    type="text"
                    value={ritual.titleTelugu || ''}
                    onChange={(e) => handleArrayChange('rituals', index, 'titleTelugu', e.target.value)}
                    style={styles.input}
                    placeholder="e.g. కలశ స్థాపన & అంకురార్పణం"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title (English):</label>
                  <input
                    type="text"
                    value={ritual.title || ''}
                    onChange={(e) => handleArrayChange('rituals', index, 'title', e.target.value)}
                    style={styles.input}
                    placeholder="e.g. Kalasa Sthapana & Ankurarpanam"
                  />
                </div>
                <div style={{ ...styles.formGroup, marginBottom: 0 }}>
                  <label style={styles.label}>వివరాలు (Description):</label>
                  <textarea
                    value={ritual.description || ''}
                    onChange={(e) => handleArrayChange('rituals', index, 'description', e.target.value)}
                    style={styles.textarea}
                    rows={2}
                    placeholder="పూజా విధానం మరియు విశేషాల వివరణ..."
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              style={styles.addButton}
              onClick={() => handleAddItem('rituals', { title: '', titleTelugu: '', description: '' })}
            >
              + కొత్త విశేషం చేర్చండి (Add Ritual)
            </button>
          </div>

          {/* SECTION 8: SIGNIFICANCE */}
          <div style={styles.sectionBox}>
            <h3 style={styles.sectionTitle}>📖 అవతార విశిష్టత (Avatar Significance)</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>విశిష్టత (Telugu Significance):</label>
              <textarea
                name="significanceTelugu"
                value={formData.significanceTelugu || ''}
                onChange={handleChange}
                style={styles.textarea}
                rows={3}
                placeholder="ఈ అవతార విశిష్టత మరియు పౌరాణిక ప్రాముఖ్యత..."
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Significance (English):</label>
              <textarea
                name="significance"
                value={formData.significance || ''}
                onChange={handleChange}
                style={styles.textarea}
                rows={3}
                placeholder="Spiritual significance in English..."
              />
            </div>
          </div>

          {/* Bottom Action Buttons */}
          <div style={styles.buttonContainer}>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={onClose}
              disabled={saving || uploadingImage}
            >
              రద్దు చేయండి (Cancel)
            </button>
            <button
              type="submit"
              style={{
                ...styles.saveButton,
                opacity: (saving || uploadingImage) ? 0.7 : 1,
                cursor: (saving || uploadingImage) ? 'wait' : 'pointer'
              }}
              disabled={saving || uploadingImage}
            >
              {saving || uploadingImage ? (
                <>⏳ భద్రపరుస్తోంది (Saving)...</>
              ) : (
                <>💾 సేవ్ చేయండి (Save Changes)</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditModal;
