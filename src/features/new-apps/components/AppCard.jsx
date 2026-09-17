import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppCard({
  app,
  index,
  totalApps,
  isAdmin,
  onEdit,
  onDelete,
  onMoveLeft,
  onMoveRight
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/apps/${app.id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(app);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`మీరు నిజంగా "${app.title}" యాప్‌ను తొలగించాలనుకుంటున్నారా?`)) {
      onDelete(app);
    }
  };

  const handleMoveLeftClick = (e) => {
    e.stopPropagation();
    onMoveLeft(index);
  };

  const handleMoveRightClick = (e) => {
    e.stopPropagation();
    onMoveRight(index);
  };

  return (
    <div className="app-tile-card" onClick={handleCardClick} title={`ఓపెన్ చేయండి: ${app.title}`}>
      {/* Admin Action Buttons & Reorder Controls */}
      {isAdmin && (
        <div className="app-admin-toolbar" onClick={(e) => e.stopPropagation()}>
          {/* Reorder Buttons */}
          <div className="app-admin-reorder-group">
            <button
              className="app-admin-icon-btn reorder-btn"
              title="ముందుకు జరపండి (Move Left)"
              disabled={index === 0}
              onClick={handleMoveLeftClick}
            >
              ◀
            </button>
            <button
              className="app-admin-icon-btn reorder-btn"
              title="వెనుకకు జరపండి (Move Right)"
              disabled={index === totalApps - 1}
              onClick={handleMoveRightClick}
            >
              ▶
            </button>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="app-admin-action-group">
            <button
              className="app-admin-icon-btn"
              title="పేరు మరియు ఐకాన్ మార్చండి (Edit Name & Icon)"
              onClick={handleEdit}
            >
              ✏️
            </button>
            <button
              className="app-admin-icon-btn delete"
              title="తొలగించండి (Delete App)"
              onClick={handleDelete}
            >
              🗑️
            </button>
          </div>
        </div>
      )}

      {/* App Icon Container (Top-Left) */}
      <div className="app-icon-wrapper">
        <img
          src={app.iconUrl || '/spiritual_pattern.jpg'}
          alt={app.title}
          className="app-icon-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/spiritual_pattern.jpg';
          }}
        />
      </div>

      {/* App Title */}
      <h4 className="app-title">{app.title}</h4>

      {/* App Description (Optional) */}
      {app.description ? (
        <p className="app-desc">{app.description}</p>
      ) : (
        <p className="app-desc" style={{ fontStyle: 'italic', opacity: 0.6 }}>
          ఆధ్యాత్మిక అప్లికేషన్ మరియు సేవలు
        </p>
      )}

      {/* Circular Arrow Button (Bottom-Right) */}
      <div className="app-arrow-btn" title="ఓపెన్ చేయండి">
        ➔
      </div>
    </div>
  );
}
