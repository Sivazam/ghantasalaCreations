// Control Bar component (Mute, Fullscreen, Exit)
import React from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CloseIcon from '@mui/icons-material/Close';
import './ControlBar.css';

const ControlBar = ({
    isMuted,
    isFullscreen,
    onToggleMute,
    onToggleFullscreen,
    onExit
}) => {
    return (
        <div className="control-bar">
            {/* Mute button */}
            <button
                className="control-btn mute-btn"
                onClick={onToggleMute}
                title={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </button>

            <div className="control-bar-right">
                {/* Fullscreen button */}
                <button
                    className="control-btn fullscreen-btn"
                    onClick={onToggleFullscreen}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                    {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </button>

                {/* Exit button */}
                <button
                    className="control-btn exit-btn"
                    onClick={onExit}
                    title="Exit Temple"
                >
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
};

export default ControlBar;
