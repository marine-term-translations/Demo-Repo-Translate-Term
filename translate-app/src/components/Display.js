import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Display = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem("github_token")) {
            navigate('/');
        }
        const fetchToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const collection = params.get('collection');
            const languageselect = params.get('languageselect');
            if (!(collection && languageselect)) {
                navigate('/collection');
            }
            sessionStorage.setItem("language", languageselect);
            sessionStorage.setItem("collection", collection);
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/list`, {
                    token: sessionStorage.getItem("github_token"),
                    path: collection,
                    repo: process.env.REACT_APP_REPO,
                });
                const content = response.data
                setContent(content)
                // console.log(response.data);
                // console.log(content);

            } catch (error) {
                console.error('Erreur lors de l\'obtention du contenu:', error);
                console.error('BIP');
            }
        };

        fetchToken();
    }, [navigate]);

  if (!content) {
    return <div>Erreur lors du chargement du contenu.</div>;
  }
//   console.log(content);
    return (
        <div>
            <ul>
                {content.map((file, index) => (
                    <li key={file.path}>
                        <a href={`/translate?path=${file.path}`}>{`${index + 1}. ${file.name}`}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Display;
