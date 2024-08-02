import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { parse } from "yaml";

const Collection = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("github_token")) {
      navigate('/');
    }
    const fetchToken = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/content`, {
            token: sessionStorage.getItem("github_token"),
            path: "config.yml",
            repo: process.env.REACT_APP_REPO,
          });
        const content = parse(response.data);
        console.log(content);
        setContent(content);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de l\'obtention du contenu:', error);
        setLoading(false);
      }
    };

    fetchToken();
  }, [navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!content) {
    return <div>Erreur lors du chargement du contenu.</div>;
  }

  return (
    <div>
      <form action="/display" method="get">
        <label htmlFor="collection">Select the collection :</label>
        <select id="collection" name="collection" required>
          {content.sources.map((source) => (
            <option key={source.name} value={source.name}>{source.name}</option>
          ))}
        </select><br />
        <label htmlFor="languageselect">Select translation language :</label>
        <select id="languageselect" name="languageselect" required>
          {content.target_languages.map((language) => (
            <option key={language} value={language}>{language}</option>
          ))}
        </select><br />
        <button type="submit">Afficher</button>
      </form>
    </div>
  );
};

export default Collection;
