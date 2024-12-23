import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAdminAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('userid');
    const storedRole = sessionStorage.getItem('userrole');

    if (!storedUsername || !storedRole || storedRole !== 'admin') {
      navigate('/LoginPage');
    }
  }, [navigate]);
  
}

export default useAdminAuth;
