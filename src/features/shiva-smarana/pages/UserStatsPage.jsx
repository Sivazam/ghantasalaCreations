import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import './ShivaSmaranaTemplePage.css'; // Reuse existing styles or create new ones if needed

const UserStatsPage = () => {
    const [users, setUsers] = useState([]);
    const [abhishekamList, setAbhishekamList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Users
                const usersRef = collection(db, "users");
                const userSnap = await getDocs(query(usersRef));
                const userList = userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                userList.sort((a, b) => (b.chant_count || 0) - (a.chant_count || 0));
                setUsers(userList);

                // 2. Fetch Abhishekam List
                const abhiRef = collection(db, "abhishekam_list");
                // Ideally order by timestamp desc here if index exists, else client sort
                const abhiSnap = await getDocs(query(abhiRef));
                const abhiList = abhiSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                // Client-side sort by timestamp desc (newest first)
                abhiList.sort((a, b) => {
                    const tA = a.timestamp?.seconds || 0;
                    const tB = b.timestamp?.seconds || 0;
                    return tB - tA;
                });
                setAbhishekamList(abhiList);

            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>Loading Stats...</div>;
    }

    return (
        <div style={{ padding: '20px', background: '#0d0d0d', minHeight: '100vh', color: '#f1f1f1' }}>
            <h1 style={{ textAlign: 'center', color: '#ffd700', marginBottom: '30px' }}>Devotee Statistics</h1>

            {/* USERS TABLE */}
            <div style={{ overflowX: 'auto', maxWidth: '1200px', margin: '0 auto', marginBottom: '50px' }}>
                <h2 style={{ color: '#daa520', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Chant Leaderboard</h2>
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
                                <td style={tdStyle}>{user.phone || user.mobile || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ABHISHEKAM TABLE */}
            <div style={{ overflowX: 'auto', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ color: '#daa520', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Abhishekam Payments</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #333' }}>
                    <thead>
                        <tr style={{ background: '#1a1a1a', color: '#daa520' }}>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>Gotram</th>
                            <th style={thStyle}>Mobile</th>
                            <th style={thStyle}>App Used</th>
                            <th style={thStyle}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {abhishekamList.map((item, index) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #333', background: index % 2 === 0 ? '#111' : '#0d0d0d' }}>
                                <td style={tdStyle}>
                                    {item.timestamp?.seconds
                                        ? new Date(item.timestamp.seconds * 1000).toLocaleDateString()
                                        : 'Just Now'}
                                </td>
                                <td style={tdStyle}>{item.name}</td>
                                <td style={tdStyle}>{item.gotram}</td>
                                <td style={tdStyle}>{item.mobile}</td>
                                <td style={tdStyle}>{item.appType}</td>
                                <td style={{ ...tdStyle, color: '#4caf50' }}>₹{item.amount}</td>
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
