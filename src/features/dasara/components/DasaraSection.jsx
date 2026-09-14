import React, { useState, useEffect } from 'react';
import DasaraDayCard from './DasaraDayCard';
import { getDasaraDays, checkIsAdmin } from '../firebase/dasaraFirestore';
import { dasaraInitialData } from '../data/dasaraInitialData';
import { auth } from '../../../firebase';
import './DasaraSection.css';
import { useNavigate } from 'react-router-dom';

const DasaraSection = () => {
  const [days, setDays] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedDays = await getDasaraDays();
        if (fetchedDays && fetchedDays.length > 0) {
          setDays(fetchedDays.sort((a, b) => a.dayNumber - b.dayNumber));
        } else {
          setDays(dasaraInitialData.sort((a, b) => a.dayNumber - b.dayNumber));
        }

        const adminStatus = await checkIsAdmin(auth.currentUser?.uid);
        setIsAdmin(adminStatus);
      } catch (error) {
        console.error("Error fetching Dasara data:", error);
        setDays(dasaraInitialData.sort((a, b) => a.dayNumber - b.dayNumber));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if(user) {
            const adminStatus = await checkIsAdmin(user.uid);
            setIsAdmin(adminStatus);
        } else {
            setIsAdmin(false);
        }
    });

    return () => unsubscribe();
  }, []);

  const handleEditClick = (dayData) => {
    navigate(`/dasara/${dayData.dayNumber}`, { state: { openEdit: true } });
  };

  if (loading) {
    return (
      <div className="dasara-loading-spinner">
        <div className="spinner"></div>
        <p>లోడ్ అవుతోంది...</p>
      </div>
    );
  }

  return (
    <section className="dasara-section" id="dasara-section">
      <div className="dasara-section-header">
        🪷 దసరా నవరాత్రులు 🪷
      </div>
      <p className="dasara-section-subtitle">
        విజయవాడ కనకదుర్గ అమ్మవారి నవరాత్రి దినోత్సవ అలంకారాలు & పూజా విశేషాలు
      </p>
      
      <div className="dasara-section-divider"></div>
      
      <div className="dasara-grid">
        {days.map((day) => (
          <DasaraDayCard 
            key={day.dayNumber} 
            dayData={day} 
            isAdmin={isAdmin} 
            onEditClick={handleEditClick} 
          />
        ))}
      </div>
    </section>
  );
};

export default DasaraSection;
