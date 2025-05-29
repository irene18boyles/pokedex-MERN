import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Pokedex from './components/Pokedex.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </Router>
  );
}
