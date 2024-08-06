import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DiffViewer from 'react-diff-viewer-continued';
import { formatInTimeZone } from 'date-fns-tz';

const Changed = () => {
    const [diffs, setDiffs] = useState([]);
    const [comments, setComments] = useState([]);
    const [pullnumber, setPullnumber] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uptodate, setUptodate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const translations = {};

                params.forEach((value, key) => {
                    translations[key] = decodeURIComponent(value);
                });

                const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/api/github/changed`, {
                    token: sessionStorage.getItem("github_token"),
                    repo: process.env.REACT_APP_REPO,
                });
                console.log(response);
                if(response.data.compare){
                    setUptodate(true)
                }

                const { diffsData, commentsData, pullnumber } = response.data;

                setDiffs(diffsData);
                setComments(commentsData);
                setPullnumber(pullnumber);
                setLoading(false);
            } catch (error) {
                console.error('Erreur lors de la récupération des fichiers de la pull request:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }
    if (uptodate) {
        return <div>Pas de nouveau commit</div>;
    }

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const handleLineNumberClick = (lineId) => {
        console.log(`Numéro de ligne cliqué : ${lineId}`);
        // Ajoutez ici la logique supplémentaire que vous souhaitez exécuter lors du clic sur un numéro de ligne
    };

    return (
        <div>
            <h2><a href={`/merge?pullnumber=${pullnumber}`}>Merge pull request</a></h2>
            {diffs.map((fileDiff, index) => (
                <div key={index}>
                    <h3>{fileDiff.filename}</h3>
                    <DiffViewer
                        oldValue={fileDiff.before}
                        newValue={fileDiff.after}
                        splitView={false}
                        showDiffOnly={true}
                        onLineNumberClick={handleLineNumberClick}
                    />
                    {comments
                        .filter(comment => comment.path === fileDiff.filename)
                        .map((comment, commentIndex) => {
                            const formattedDate = formatInTimeZone(comment.created_at, userTimeZone, 'dd/MM/yyyy HH:mm:ss');

                            return (
                                <div key={commentIndex}>
                                    <strong>Commentaire sur la ligne {comment.line} à {formattedDate} : </strong>{comment.body}
                                    <p></p>
                                </div>
                            );
                        })}
                </div>
            ))}
        </div>
    );
};

export default Changed;