import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("github_token")) {
      navigate('/collection');
    }
  }, [navigate]);
  // const REDIRECT_URI = `${process.env.REACT_APP_FRONT_URL}/callback`;
  // console.log(REDIRECT_URI)
  // const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
  const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`;

  return (
    <div>
      <h1>Se connecter avec GitHuuuub</h1>
      <a href={AUTH_URL}>Se connecter</a>
    </div>
  );
};

export default Login;
