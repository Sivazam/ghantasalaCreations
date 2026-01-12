import React from 'react';

const BilvaLeaf = ({ style, className }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            className={className}
            style={{
                width: '40px',
                height: '40px',
                filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
                ...style
            }}
        >
            {/* Stem */}
            <path
                d="M50 85 L50 95"
                stroke="#228b22"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* Central Leaf */}
            <path
                d="M50 85 Q30 50 50 10 Q70 50 50 85"
                fill="#228b22"
                stroke="#006400"
                strokeWidth="1"
            />
            {/* Vein Central */}
            <path d="M50 85 Q50 50 50 15" stroke="#32cd32" strokeWidth="1" fill="none" opacity="0.6" />

            {/* Left Leaf */}
            <path
                d="M50 85 Q20 85 5 60 Q20 40 50 85"
                fill="#228b22"
                stroke="#006400"
                strokeWidth="1"
            />
            {/* Vein Left */}
            <path d="M50 85 Q30 75 15 60" stroke="#32cd32" strokeWidth="1" fill="none" opacity="0.6" />

            {/* Right Leaf */}
            <path
                d="M50 85 Q80 85 95 60 Q80 40 50 85"
                fill="#228b22"
                stroke="#006400"
                strokeWidth="1"
            />
            {/* Vein Right */}
            <path d="M50 85 Q70 75 85 60" stroke="#32cd32" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
    );
};

export default BilvaLeaf;
