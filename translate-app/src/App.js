import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';
import Collection from './components/Collection';
import Display from './components/Display';
import Translate from './components/Translate';
import Update from './components/Update';
import Changed from './components/Changed';

const repoPath = process.env.REACT_APP_REPO || '';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={`/${repoPath}/`} element={<Login />} />
        <Route path={`/${repoPath}/callback`} element={<Callback />} />
        <Route path={`/${repoPath}/collection`} element={<Collection />} />
        <Route path={`/${repoPath}/display`} element={<Display />} />
        <Route path={`/${repoPath}/translate`} element={<Translate />} />
        <Route path={`/${repoPath}/update`} element={<Update />} />
        <Route path={`/${repoPath}/changed`} element={<Changed />} />
      </Routes>
    </Router>
  );
};

export default App;
