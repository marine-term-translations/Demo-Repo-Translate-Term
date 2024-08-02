import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Callback from './components/Callback';
import Collection from './components/Collection';
import Display from './components/Display';
import Translate from './components/Translate';
import Update from './components/Update';
import Changed from './components/Changed';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/display" element={<Display />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/update" element={<Update />} />
        <Route path="/changed" element={<Changed />} />
      </Routes>
    </Router>
  );
};

export default App;
