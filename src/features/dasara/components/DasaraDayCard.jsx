import React from 'react';
import { Link } from 'react-router-dom';
import './DasaraDayCard.css';

const DasaraDayCard = ({ dayData, isAdmin, onEditClick }) => {
  const { dayNumber, titleTelugu, titleEnglish, avatarImageUrl, colorName, colorNameTelugu, colorCode } = dayData;

  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onEditClick) {
      onEditClick(dayData);
    }
  };

  return (
    <Link to={`/dasara/${dayNumber}`} className="dasara-day-card" style={{ textDecoration: 'none' }}>
      <div className="dasara-card-day-badge">
        {dayNumber}వ రోజు
      </div>
      
      {isAdmin && (
        <button 
          className="dasara-card-edit-btn" 
          onClick={handleEditClick}
          title="Edit Day"
        >
          ✏️ Edit
        </button>
      )}

      <img 
        src={avatarImageUrl} 
        alt={titleEnglish || `Day ${dayNumber}`} 
        className="dasara-card-image"
        loading="lazy"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />

      <div className="dasara-card-overlay"></div>
      
      <div className="dasara-card-content">
        <h3 className="dasara-card-title">{titleTelugu}</h3>
        {titleEnglish && (
          <p style={{ margin: '2px 0 0 0', color: 'rgba(255, 235, 180, 0.85)', fontSize: '0.74rem', fontWeight: 500 }}>
            {titleEnglish}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
          <span 
            style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: colorCode || '#ffd700',
              boxShadow: `0 0 6px ${colorCode || '#ffd700'}`,
              display: 'inline-block',
              flexShrink: 0
            }}
          ></span>
          <span style={{ fontSize: '0.74rem', color: '#ffd700', fontWeight: 600 }}>{colorNameTelugu || colorName}</span>
        </div>
      </div>

      <div 
        className="dasara-card-color-strip" 
        style={{ backgroundColor: colorCode || '#ffd700' }}
      ></div>
    </Link>
  );
};

export default DasaraDayCard;
