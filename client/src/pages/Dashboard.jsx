import React from 'react';
import { useAuth } from '../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const { data: userData, isLoading, error, isFetching } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await api.get('/me');
            return res.data;
        },
    });

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <div className="card">
                <p>Welcome, {user?.name || user?.email}!</p>
                <button onClick={logout}>Logout</button>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <h2>Protected Data (from /me)</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="error">Error fetching data: {error.message}</p>
                ) : (
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                )}
                <div style={{marginTop: '10px', fontSize: '0.8em'}}>
                    {isFetching ? 'Refreshing...' : ''}
                </div>
            </div>

            <div className="card" style={{ marginTop: '20px' }}>
                <p>Access Token expires every 15 seconds. Wait and see if the request above automatically refreshes.</p>
            </div>
        </div>
    );
};

export default Dashboard;
