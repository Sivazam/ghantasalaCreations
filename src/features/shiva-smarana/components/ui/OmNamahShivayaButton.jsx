// Om Namah Shivaya Button component
import React, { useState } from 'react';
import './OmNamahShivayaButton.css';

const OmNamahShivayaButton = ({ onClick, disabled = false }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleClick = () => {
        if (disabled) return;

        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 150);

        if (onClick) onClick();
    };

    return (
        <button
            className={`om-button ${isPressed ? 'pressed' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
        >
            <span className="om-telugu">ఓం నమః శివాయ</span>
            <span className="om-english">Om Namah Shivaya</span>
            <span className="om-instruction">Click to offer sacred water</span>
            <div className="button-glow"></div>
        </button>
    );
};

export default OmNamahShivayaButton;
