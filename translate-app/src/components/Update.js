import React, { useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const updateTranslations = async () => {
            const params = new URLSearchParams(window.location.search);
            const translations = {};
            const path = sessionStorage.getItem("path")
            const language = sessionStorage.getItem("language")
            
            params.forEach((value, key) => {
                translations[key] = decodeURIComponent(value);
            });
            // console.log(translations);
            await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/update`, {
                token: sessionStorage.getItem("github_token"),
                path,
                repo: process.env.REACT_APP_REPO,
                translations,
                language,
            });
            // console.log(`/display?collection=${path.split('/')[0]}&languageselect=${language}`);
            // console.log("/display?collection=P06&languageselect=fr");
            navigate(`/display?collection=${path.split('/')[0]}&languageselect=${language}`);
            // console.log(response);
        };

        updateTranslations();
    }, [navigate]);

    
    return (
        <div>
            <h1>Translations</h1>
        </div>
    );
};

export default Update;