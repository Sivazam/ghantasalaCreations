import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewApp } from '../firebase/newAppsFirestore';
import { sampleApps } from '../data/sampleApps';
import './AppViewerPage.css';

export default function AppViewerPage() {
  const { appId } = useParams();
  const navigate = useNavigate();

  const [app, setApp] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const containerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAppContent = async () => {
      try {
        setLoading(true);
        setError('');

        // 1. Try to find in Firestore
        let appData = null;
        try {
          appData = await getNewApp(appId);
        } catch (dbErr) {
          console.warn('Firestore fetch failed, checking sample apps:', dbErr);
        }

        // 2. Fallback to sample apps if not in Firestore
        if (!appData) {
          appData = sampleApps.find((a) => a.id === appId);
        }

        if (!appData) {
          throw new Error('అనువర్తనం (App) కనుగొనబడలేదు. ఇది తొలగించబడి ఉండవచ్చు.');
        }

        if (!isMounted) return;
        setApp(appData);

        // 3. Resolve HTML content
        if (appData.htmlContent) {
          setHtmlContent(appData.htmlContent);
        } else if (appData.htmlUrl) {
          // Fetch from Firebase Storage download URL
          const res = await fetch(appData.htmlUrl);
          if (!res.ok) throw new Error(`HTML ఫైల్ లోడ్ కాలేదు (Status: ${res.status})`);
          const text = await res.text();
          if (isMounted) setHtmlContent(text);
        } else {
          throw new Error('ఈ యాప్‌లో సరైన HTML కంటెంట్ అందుబాటులో లేదు.');
        }
      } catch (err) {
        console.error('Error loading app viewer:', err);
        if (isMounted) setError(err.message || 'యాప్ తెరవడంలో లోపం ఏర్పడింది.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAppContent();

    return () => {
      isMounted = false;
    };
  }, [appId]);

  // Handle Fullscreen toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {
          setIsFullscreen(true);
        });
      } else {
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          setIsFullscreen(false);
        });
      } else {
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Open in New Window/Tab using Blob URL or storage URL
  const handleOpenNewTab = () => {
    try {
      if (htmlContent) {
        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } else if (app?.htmlUrl) {
        window.open(app.htmlUrl, '_blank');
      }
    } catch (e) {
      console.error('Open in new tab failed:', e);
      if (app?.htmlUrl) window.open(app.htmlUrl, '_blank');
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="app-viewer-container" ref={containerRef}>
      {/* Top Header Bar */}
      <header className={`app-viewer-header ${isFullscreen ? 'fullscreen-hide' : ''}`}>
        <div className="app-viewer-left">
          <button
            className="app-viewer-back-btn"
            onClick={() => navigate('/')}
            title="హోమ్ పేజీకి తిరిగి వెళ్లండి"
          >
            <span>←</span>
            <span>హోమ్</span>
          </button>

          {app?.iconUrl && (
            <img
              src={app.iconUrl}
              alt=""
              className="app-viewer-icon"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}

          <h2 className="app-viewer-title">{app?.title || 'యాప్ వ్యూవర్ (App Viewer)'}</h2>
        </div>

        <div className="app-viewer-actions">
          <button
            className="app-viewer-action-btn"
            onClick={handleReload}
            title="యాప్‌ను రీలోడ్ చేయండి"
          >
            <span>🔄</span>
            <span className="d-none d-sm-inline">రీలోడ్</span>
          </button>

          <button
            className="app-viewer-action-btn"
            onClick={handleOpenNewTab}
            title="క్రొత్త ట్యాబ్‌లో తెరవండి"
          >
            <span>🗗</span>
            <span className="d-none d-sm-inline">క్రొత్త ట్యాబ్</span>
          </button>

          <button
            className="app-viewer-action-btn"
            onClick={toggleFullscreen}
            title="పూర్తి స్క్రీన్"
          >
            <span>⛶</span>
            <span className="d-none d-sm-inline">ఫుల్ స్క్రీన్</span>
          </button>
        </div>
      </header>

      {/* Floating Exit Fullscreen Button when in Fullscreen */}
      {isFullscreen && (
        <button
          className="app-viewer-exit-fullscreen-btn"
          onClick={toggleFullscreen}
          title="పూర్తి స్క్రీన్ నుండి నిష్క్రమించు"
        >
          <span>✕</span>
          <span>ఎగ్జిట్ స్క్రీన్</span>
        </button>
      )}

      {/* Frame Body */}
      <main className="app-viewer-frame-container">
        {loading && (
          <div className="app-viewer-loading">
            <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <h3 style={{ margin: 0, fontFamily: 'Noto Serif Telugu' }}>యాప్ ప్రారంభమవుతోంది...</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              HTML, CSS & JavaScript ఫైల్స్ లోడ్ అవుతున్నాయి
            </p>
          </div>
        )}

        {error && (
          <div className="app-viewer-error">
            <div style={{ fontSize: '3rem' }}>⚠️</div>
            <h3 style={{ margin: 0 }}>యాప్ లోడ్ కాలేదు</h3>
            <p style={{ color: '#ff8a80', maxWidth: '500px' }}>{error}</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button
                className="app-viewer-back-btn"
                onClick={() => navigate('/')}
              >
                ← హోమ్‌కి వెళ్లండి
              </button>
              <button
                className="app-viewer-action-btn"
                onClick={() => window.location.reload()}
              >
                🔄 మళ్లీ ప్రయత్నించండి
              </button>
            </div>
          </div>
        )}

        {!loading && !error && htmlContent && (
          <iframe
            key={iframeKey}
            title={app?.title || 'Embedded Web App'}
            srcDoc={htmlContent}
            className="app-viewer-iframe"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads allow-presentation"
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; midi; clipboard-read; clipboard-write"
          />
        )}
      </main>
    </div>
  );
}
