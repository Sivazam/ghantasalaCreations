// Leaderboard component with real-time updates
import React, { useEffect, useState } from 'react';
import { subscribeToLeaderboard, getVisitorId } from '../../firebase/shivaFirestore';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentVisitorId = getVisitorId();

    useEffect(() => {
        // Subscribe to real-time leaderboard updates
        const unsubscribe = subscribeToLeaderboard((data) => {
            setLeaderboard(data);
            setLoading(false);
        }, 10);

        return () => unsubscribe();
    }, []);

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `#${rank}`;
        }
    };

    const formatCount = (count) => {
        return count?.toLocaleString('en-IN') || '0';
    };

    if (loading) {
        return (
            <div className="leaderboard">
                <h2 className="leaderboard-title">🏆 Global Leaderboard</h2>
                <div className="leaderboard-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading devotees...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="leaderboard">
            <h2 className="leaderboard-title">🏆 Global Leaderboard</h2>
            <div className="leaderboard-subtitle">Top Devotees by Abhishekam Count</div>

            {leaderboard.length === 0 ? (
                <div className="leaderboard-empty">
                    <p>Be the first devotee to perform Abhishekam!</p>
                    <p className="hint">🕉️ Start your divine journey below</p>
                </div>
            ) : (
                <div className="leaderboard-list">
                    {leaderboard.map((entry) => (
                        <div
                            key={entry.visitorId}
                            className={`leaderboard-item ${entry.visitorId === currentVisitorId ? 'current-user' : ''} ${entry.rank <= 3 ? `rank-${entry.rank}` : ''}`}
                        >
                            <div className="rank-badge">
                                {getRankIcon(entry.rank)}
                            </div>
                            <div className="devotee-info">
                                <span className="devotee-name">
                                    {entry.visitorId === currentVisitorId ? 'You ✨' : `Devotee ${entry.rank}`}
                                </span>
                            </div>
                            <div className="count-display">
                                <span className="count-value">{formatCount(entry.totalCount)}</span>
                                <span className="count-label">Abhishekams</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
