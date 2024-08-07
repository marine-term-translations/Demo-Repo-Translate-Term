import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();
  console.log("callback")

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      console.log(params);
      const code = params.get('code');
      console.log(code);
      try {
        console.log("callback 2");
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/token`, {
          code: code,
        });
        console.log("callback3")
        console.log(response)
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

  return <div>oui Chargement...</div>;
};

export default Callback;
