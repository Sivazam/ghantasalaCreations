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
      // Remove from local state immediately
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

  return (
    <section className="new-apps-section" id="new-apps-section">
      <div className="new-apps-container">
        {/* Section Header */}
        <div className="new-apps-header-row">
          <div className="new-apps-title-group">
            <div className="new-apps-badge">
              <span>🪔</span>
              <span>ప్రత్యేక అప్లికేషన్లు</span>
            </div>
            <h2 className="new-apps-title">
              <span>✨ New Apps | కొత్త యాప్‌లు</span>
            </h2>
            <p className="new-apps-subtitle">
              మీ ఆధ్యాత్మిక సాధన మరియు జ్ఞానం కోసం సరికొత్త వెబ్ అప్లికేషన్లు
            </p>
          </div>

          {/* Admin Upload Button */}
          {isAdmin && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#ffd700' }}>
            <div className="spinner-border text-warning" role="status"></div>
            <div style={{ marginTop: '12px', fontSize: '0.9rem' }}>యాప్‌లు లోడ్ అవుతున్నాయి...</div>
          </div>
        ) : apps.length === 0 ? (
          <div className="new-apps-empty">
            <div className="new-apps-empty-icon">📱</div>
            <h3>ఇంకా ఏ యాప్‌లు అప్‌లోడ్ చేయలేదు</h3>
            <p>అడ్మిన్ ద్వారా త్వరలో కొత్త ఆధ్యాత్మిక అప్లికేషన్లు జోడించబడతాయి.</p>
            {isAdmin && (
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
            {apps.map((app, index) => (
              <AppCard
                key={app.id}
                app={app}
                index={index}
                totalApps={apps.length}
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
