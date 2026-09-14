import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDasaraDay, updateDasaraDay, checkIsAdmin } from '../firebase/dasaraFirestore';
import { dasaraInitialData } from '../data/dasaraInitialData';
import AdminEditModal from '../components/AdminEditModal';
import { auth } from '../../../firebase';
import './DasaraDayDetail.css';

const DasaraDayDetail = () => {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dayData, setDayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchDayData = async () => {
    setLoading(true);
    try {
      const parsedDayNum = parseInt(dayNumber, 10);
      const initial = dasaraInitialData.find(d => d.dayNumber === parsedDayNum);
      let data = await getDasaraDay(parsedDayNum);
      setDayData(data ? { ...initial, ...data } : initial);
    } catch (error) {
      console.error("Error fetching day data:", error);
      setDayData(dasaraInitialData.find(d => d.dayNumber === parseInt(dayNumber, 10)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDayData();
    window.scrollTo(0, 0);
    
    const checkAdmin = async () => {
      if (auth.currentUser) {
        const adminStatus = await checkIsAdmin(auth.currentUser.uid);
        setIsAdmin(adminStatus);
      }
    };
    
    checkAdmin();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const adminStatus = await checkIsAdmin(user.uid);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNumber]);

  useEffect(() => {
    if (location.state?.openEdit && isAdmin) {
      setIsEditModalOpen(true);
    }
  }, [location.state, isAdmin]);

  const handleSaveEdit = async (editedData) => {
    try {
      await updateDasaraDay(editedData.dayNumber, editedData);
      setIsEditModalOpen(false);
      fetchDayData();
    } catch (error) {
      console.error("Error updating day data:", error);
      alert("Failed to update data.");
    }
  };

  if (loading) {
    return (
      <div className="dasara-detail-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="spinner-border text-warning" role="status"></div>
        <p style={{ marginTop: '20px', color: '#ffd700', fontFamily: "'Noto Serif Telugu', serif" }}>వివరాలు లోడ్ అవుతున్నాయి...</p>
      </div>
    );
  }

  if (!dayData) {
    return (
      <div className="dasara-detail-page" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Day not found</h2>
        <button className="dasara-day-nav-btn" onClick={() => navigate('/')}>Home</button>
      </div>
    );
  }

  const prevDay = dayData.dayNumber > 1 ? dayData.dayNumber - 1 : 10;
  const nextDay = dayData.dayNumber < 10 ? dayData.dayNumber + 1 : 1;

  return (
    <div className="dasara-detail-page">
      {/* Sticky Header */}
      <header className="dasara-detail-header">
        <button className="dasara-detail-back-btn" onClick={() => navigate('/')} title="Go Back">
          &larr; <span style={{ fontSize: '1rem', marginLeft: '5px' }}>హోమ్</span>
        </button>
        <h2 className="dasara-detail-title">{dayData.dayNumber}వ రోజు - {dayData.tithiTelugu || `Day ${dayData.dayNumber}`}</h2>
        {isAdmin ? (
          <button 
            style={{
              background: 'rgba(255, 215, 0, 0.2)',
              border: '1px solid #ffd700',
              color: '#ffd700',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => setIsEditModalOpen(true)}
          >
            ✏️ Edit
          </button>
        ) : (
          <div style={{ width: '60px' }}></div>
        )}
      </header>

      {/* Content Layout (Single-column on mobile, Dual-column on desktop) */}
      <div className="dasara-detail-container">
        {/* Left Column: Hero Image, Titles, Date & Color Swatch */}
        <div className="dasara-detail-sidebar">
          <div className="dasara-detail-hero">
            <img 
              src={dayData.avatarImageUrl} 
              alt={dayData.titleEnglish || `Day ${dayData.dayNumber}`}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="dasara-detail-hero-overlay"></div>
          </div>

          <div className="dasara-detail-sidebar-info">
            <h1 className="dasara-detail-goddess-name">{dayData.titleTelugu}</h1>
            <h3 className="dasara-detail-english-name">{dayData.titleEnglish}</h3>

            {(dayData.date || dayData.date2025) && (
              <div style={{ textAlign: 'center', marginBottom: '18px' }}>
                <div className="dasara-detail-date">
                  📅 {dayData.tithiTelugu && `${dayData.tithiTelugu} • `}
                  {dayData.date || `${dayData.date2025} (${dayData.dayOfWeek2025 || ''})`}
                </div>
              </div>
            )}

            {/* Color Info Card */}
            <div className="dasara-info-card dasara-color-card">
              <h4 className="dasara-info-card-title">🌸 అలంకారం రంగు (Color)</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div 
                  className="dasara-color-swatch"
                  style={{ 
                    backgroundColor: dayData.colorCode || '#ffd700',
                    boxShadow: `0 0 15px ${dayData.colorCode || '#ffd700'}`
                  }}
                ></div>
                <div>
                  <p className="dasara-color-name" style={{ margin: 0, color: '#ffd700' }}>
                    {dayData.colorNameTelugu || dayData.colorName} ({dayData.colorName})
                  </p>
                  <p style={{ margin: '6px 0 0 0', color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>
                    {dayData.devoteeColorAdvice || `భక్తులు ఈ రోజున ${dayData.colorNameTelugu || dayData.colorName} రంగు వస్త్రాలు ధరించడం శుభప్రదం.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prasadams, Rituals, Mantras, Kalasa, Significance */}
        <div className="dasara-detail-main">
          {/* Prasadam Info Card */}
          {dayData.prasadams && dayData.prasadams.length > 0 && (
            <div className="dasara-info-card">
              <h4 className="dasara-info-card-title">🍚 నైవేద్యం (Prasadam)</h4>
              <ul className="dasara-prasadam-list">
                {dayData.prasadams.map((prasadam, index) => (
                  <li key={index} className="dasara-prasadam-item">
                    <span style={{ color: '#ffd700', fontSize: '1.2rem', marginRight: '8px' }}>✦</span>
                    <div>
                      <span className="dasara-prasadam-telugu">{prasadam.telugu}</span>
                      {prasadam.english && <span className="dasara-prasadam-english"> — {prasadam.english}</span>}
                      {prasadam.description && <p style={{ margin: '3px 0 0', color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem' }}>{prasadam.description}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rituals Info Card */}
          {dayData.rituals && dayData.rituals.length > 0 && (
            <div className="dasara-info-card">
              <h4 className="dasara-info-card-title">🔱 పూజా విధానం & విశేషాలు (Rituals)</h4>
              <div>
                {dayData.rituals.map((ritual, index) => (
                  <div key={index} className="dasara-ritual-item">
                    <h5 className="dasara-ritual-title">
                      {ritual.titleTelugu || ritual.title} {ritual.titleTelugu && ritual.title && `(${ritual.title})`}
                    </h5>
                    <p className="dasara-ritual-desc">{ritual.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mantras Info Card */}
          {dayData.mantras && dayData.mantras.length > 0 && (
            <div className="dasara-info-card">
              <h4 className="dasara-info-card-title">🙏 పవిత్ర మంత్రం (Mantras)</h4>
              {dayData.mantras.map((mantra, index) => (
                <div key={index} className="dasara-mantra-container">
                  <p className="dasara-mantra-telugu">{mantra.telugu}</p>
                  {mantra.transliteration && <p className="dasara-mantra-transliteration">{mantra.transliteration}</p>}
                  {mantra.meaning && (
                    <p style={{ color: 'rgba(255,215,0,0.85)', fontSize: '0.85rem', marginTop: '10px', textAlign: 'center' }}>
                      <strong>తాత్పర్యం:</strong> {mantra.meaning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Day 1 Kalasa Sthapana Card */}
          {dayData.dayNumber === 1 && (
            <div className="dasara-info-card" style={{ border: '2px solid rgba(255, 215, 0, 0.4)', background: 'rgba(255, 215, 0, 0.08)' }}>
              <h4 className="dasara-info-card-title">🏺 కలశ స్థాపన విధానం (Kalasa Sthapana)</h4>
              <p className="dasara-significance-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                {dayData.kalasaDetails || 'కలశస్య ముఖే విష్ణుః కంఠే రుద్రః సమాశ్రితః | మూలే తత్ర స్థితో బ్రహ్మా మధ్యే మాతృగణాః స్మృతాః ||\n\nఆశ్వయుజ శుద్ధ పాడ్యమి నాడు ఉదయం శుభ ముహూర్తంలో కలశ స్థాపన చేయాలి. కలశంలో పవిత్ర జలం, నవధాన్యాలు, మామిడి ఆకులు, కొబ్బరికాయ ఉంచి అమ్మవారిని ఆహ్వానించాలి.'}
              </p>
            </div>
          )}

          {/* Significance Info Card */}
          {(dayData.significanceTelugu || dayData.significance) && (
            <div className="dasara-info-card">
              <h4 className="dasara-info-card-title">📖 అవతార విశిష్టత (Significance)</h4>
              {dayData.significanceTelugu && <p className="dasara-significance-text" style={{ marginBottom: '10px' }}>{dayData.significanceTelugu}</p>}
              {dayData.significance && <p className="dasara-significance-text" style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>{dayData.significance}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="dasara-day-nav">
        <button className="dasara-day-nav-btn" onClick={() => navigate(`/dasara/${prevDay}`)}>
          &larr; {prevDay}వ రోజు
        </button>
        <div className="dasara-day-dots">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <div 
              key={num} 
              className={`dasara-day-dot ${num === dayData.dayNumber ? 'active' : ''}`}
              onClick={() => navigate(`/dasara/${num}`)}
              style={{ cursor: 'pointer' }}
              title={`${num}వ రోజు`}
            ></div>
          ))}
        </div>
        <button className="dasara-day-nav-btn" onClick={() => navigate(`/dasara/${nextDay}`)}>
          {nextDay}వ రోజు &rarr;
        </button>
      </div>

      {/* Admin Edit Modal */}
      <AdminEditModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        dayData={dayData} 
        onSave={handleSaveEdit} 
      />
    </div>
  );
};

export default DasaraDayDetail;
