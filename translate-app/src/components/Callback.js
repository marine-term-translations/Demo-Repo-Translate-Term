import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/token`, {
            code: code,
          });

        const { access_token } = response.data;
        sessionStorage.setItem('github_token', access_token);
        console.log(access_token)
        navigate('/collection');
      } catch (error) {
        console.error('Erreur lors de l\'obtention du token:', error);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Chargement...</div>;
};

export default Callback;
