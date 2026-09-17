import React, { useState, useEffect } from 'react';
import { getNewApps, deleteNewApp, updateAppsOrder, checkIsAdmin } from '../firebase/newAppsFirestore';
import { sampleApps } from '../data/sampleApps';
import { auth } from '../../../firebase';
import AppCard from './AppCard';
import UploadAppModal from './UploadAppModal';
import './NewAppsSection.css';

export default function NewAppsSection() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const loadApps = async () => {
    try {
      setLoading(true);
      const fetchedApps = await getNewApps();
      if (fetchedApps && fetchedApps.length > 0) {
        setApps(fetchedApps);
      } else {
        // Fallback to sample apps
        setApps(sampleApps);
      }
    } catch (error) {
      console.error('Error loading apps:', error);
      setApps(sampleApps);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApps();

    // Check admin status on auth state change
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const adminStatus = await checkIsAdmin(user.uid);
          setIsAdmin(adminStatus);
        } catch (e) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOpenUpload = () => {
    setEditingApp(null);
    setIsModalOpen(true);
  };

  const handleEditApp = (app) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleDeleteApp = async (app) => {
    try {
      await deleteNewApp(app.id, app.htmlUrl, app.iconUrl);
      setApps((prev) => prev.filter((a) => a.id !== app.id));
    } catch (error) {
      alert('యాప్ తొలగించడంలో లోపం: ' + error.message);
    }
  };

  // Reorder apps (Move left/earlier)
  const handleMoveLeft = async (index) => {
    if (index <= 0) return;
    const newApps = [...apps];
    const temp = newApps[index - 1];
    newApps[index - 1] = newApps[index];
    newApps[index] = temp;

    // Optimistic UI update
    setApps(newApps);

    try {
      await updateAppsOrder(newApps);
    } catch (err) {
      console.error('Failed to save new app order to Firestore:', err);
    }
  };

  // Reorder apps (Move right/later)
  const handleMoveRight = async (index) => {
    if (index >= apps.length - 1) return;
    const newApps = [...apps];
    const temp = newApps[index + 1];
    newApps[index + 1] = newApps[index];
    newApps[index] = temp;

    // Optimistic UI update
    setApps(newApps);

    try {
      await updateAppsOrder(newApps);
    } catch (err) {
      console.error('Failed to save new app order to Firestore:', err);
    }
  };

  // Filter apps based on search query
  const filteredApps = apps.filter((app) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (app.title && app.title.toLowerCase().includes(q)) ||
      (app.description && app.description.toLowerCase().includes(q))
    );
  });

  return (
    <section className="new-apps-section" id="new-apps-section">
      <div className="new-apps-container">
        {/* Centered Header Area */}
        <div className="new-apps-header-center">
          <span className="new-apps-top-label">మా విభాగాలు</span>
          <h2 className="new-apps-title">ముఖ్యమైన యాప్‌లు</h2>
          <p className="new-apps-subtitle">
            మీ ఆధ్యాత్మిక సాధన మరియు జ్ఞానం కోసం సరికొత్త వెబ్ అప్లికేషన్లు
          </p>

          {/* Search Bar Pill */}
          <div className="new-apps-search-container">
            <input
              type="text"
              className="new-apps-search-input"
              placeholder="యాప్‌లలో వెతకండి..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="new-apps-search-icon">🔍</span>
          </div>

          {/* Admin Upload Button */}
          {isAdmin && (
            <div className="new-apps-admin-row">
              <button
                className="new-apps-admin-btn"
                onClick={handleOpenUpload}
                title="కొత్త HTML యాప్‌ను అప్‌లోడ్ చేయండి"
              >
                <span>➕</span>
                <span>Upload New App</span>
              </button>
            </div>
          )}
        </div>

        {/* Apps Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#012e3a' }}>
            <div className="spinner-border text-dark" role="status"></div>
            <div style={{ marginTop: '12px', fontSize: '0.95rem', fontWeight: 600 }}>యాప్‌లు లోడ్ అవుతున్నాయి...</div>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="new-apps-empty">
            <div className="new-apps-empty-icon">📱</div>
            <h3>
              {searchQuery ? 'యాప్‌లు కనుగొనబడలేదు' : 'ఇంకా ఏ యాప్‌లు అప్‌లోడ్ చేయలేదు'}
            </h3>
            <p>
              {searchQuery
                ? `"${searchQuery}" కు సరిపోలే ఫలితాలు లేవు. దయచేసి వేరే పదం ప్రయత్నించండి.`
                : 'అడ్మిన్ ద్వారా త్వరలో కొత్త ఆధ్యాత్మిక అప్లికేషన్లు జోడించబడతాయి.'}
            </p>
            {isAdmin && !searchQuery && (
              <button
                className="new-apps-admin-btn"
                style={{ marginTop: '16px' }}
                onClick={handleOpenUpload}
              >
                ➕ మొదటి యాప్‌ను అప్‌లోడ్ చేయండి
              </button>
            )}
          </div>
        ) : (
          <div className="new-apps-grid">
            {filteredApps.map((app, index) => (
              <AppCard
                key={app.id}
                app={app}
                index={index}
                totalApps={filteredApps.length}
                isAdmin={isAdmin}
                onEdit={handleEditApp}
                onDelete={handleDeleteApp}
                onMoveLeft={handleMoveLeft}
                onMoveRight={handleMoveRight}
              />
            ))}
          </div>
        )}
      </div>

      {/* Upload/Edit Modal */}
      <UploadAppModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={loadApps}
        editingApp={editingApp}
      />
    </section>
  );
}
