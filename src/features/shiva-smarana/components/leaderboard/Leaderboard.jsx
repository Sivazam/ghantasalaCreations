// Leaderboard component with real-time updates
import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import './Leaderboard.css';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserUid, setCurrentUserUid] = useState(null);

    useEffect(() => {
        // Get current user UID for highlighting
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            if (user) setCurrentUserUid(user.uid);
            else setCurrentUserUid(null);
        });

        // Query the 'leaderboard' collection
        // Order by 'chant_count' descending
        const q = query(
            collection(db, "leaderboard"),
            orderBy("chant_count", "desc"),
            limit(10)
        );

        // Subscribe to real-time updates
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc, index) => ({
                id: doc.id,
                rank: index + 1,
                ...doc.data()
            }));
            setLeaderboard(data);
            setLoading(false);
        }, (error) => {
            console.error("Leaderboard Error:", error);
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeFirestore();
        };
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
            <div className="leaderboard-subtitle">Top Devotees by Chant Count</div>

            {leaderboard.length === 0 ? (
                <div className="leaderboard-empty">
                    <p>Be the first devotee to perform Abhishekam!</p>
                    <p className="hint">🕉️ Start your divine journey below</p>
                </div>
            ) : (
                <div className="leaderboard-list">
                    {leaderboard.map((entry) => (
                        <div
                            key={entry.id}
                            className={`leaderboard-item ${entry.id === currentUserUid ? 'current-user' : ''} ${entry.rank <= 3 ? `rank-${entry.rank}` : ''}`}
                        >
                            <div className="rank-badge">
                                {getRankIcon(entry.rank)}
                            </div>
                            <div className="devotee-info">
                                <span className="devotee-name">
                                    {entry.id === currentUserUid ? `${entry.name || 'Devotee'} (You) ✨` : (entry.name || 'Devotee')}
                                </span>
                                {entry.city && <span className="devotee-city" style={{ fontSize: '0.8rem', color: 'white', opacity: 0.8, display: 'block' }}>📍 {entry.city}</span>}
                            </div>
                            <div className="count-display">
                                <span className="count-value">{formatCount(entry.chant_count)}</span>
                                <span className="count-label">Chants</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
