
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const DashboardRedirect: React.FC = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (user) {
                if (user.role === 'admin') {
                    navigate('/admin', { replace: true });
                } else {
                    navigate('/student', { replace: true });
                }
            } else {
                navigate('/login', { replace: true });
            }
        }
    }, [user, loading, navigate]);

    return <div className="flex justify-center items-center h-screen">Redirecionando...</div>;
};

export default DashboardRedirect;
