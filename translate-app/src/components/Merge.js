import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Merge = () => {
  const navigate = useNavigate();
  console.log("callback")

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const pullnumber = params.get('pullnumber');
      console.log(pullnumber)
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/pull`, {
          token: sessionStorage.getItem("github_token"),
          repo: process.env.REACT_APP_REPO,
          pullnumber,
        });
        console.log(response.data)
        navigate('/changed');
      } catch (error) {
        console.error('Erreur lors du merge :', error);
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Chargement...</div>;
};

export default Merge;
