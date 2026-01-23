import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ShivaSmaranaTemplePage.css'; // Reuse existing styles or create new ones if needed

const UserStatsPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetch users, aiming to sort by count if possible, otherwise client side sort
                // Assuming 'chant_count' is the field name based on previous files
                const usersRef = collection(db, "users");
                // Note: Index might be needed for orderBy, using client side sort for safety first
                const q = query(usersRef);
                const querySnapshot = await getDocs(q);

                const userList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort by count descending
                userList.sort((a, b) => (b.chant_count || 0) - (a.chant_count || 0));

                setUsers(userList);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>Loading Stats...</div>;
    }

    return (
        <div style={{ padding: '20px', background: '#0d0d0d', minHeight: '100vh', color: '#f1f1f1' }}>
            <h1 style={{ textAlign: 'center', color: '#ffd700', marginBottom: '30px' }}>Devotee Statistics</h1>

            <div style={{ overflowX: 'auto', maxWidth: '1200px', margin: '0 auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333' }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', color: '#daa520' }}>
                            <th style={thStyle}>Rank</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Chant Count</th>
                            <th style={thStyle}>City</th>
                            <th style={thStyle}>Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #333', background: index % 2 === 0 ? '#111' : '#0d0d0d' }}>
                                <td style={tdStyle}>{index + 1}</td>
                                <td style={tdStyle}>{user.name || 'Anonymous'}</td>
                                <td style={{ ...tdStyle, fontWeight: 'bold', color: '#ffd700' }}>{user.chant_count || 0}</td>
                                <td style={tdStyle}>{user.city || '-'}</td>
                                <td style={tdStyle}>{user.mobile || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const thStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #daa520',
    fontSize: '1.1rem'
};

const tdStyle = {
    padding: '10px 15px',
    textAlign: 'left'
};

export default UserStatsPage;
