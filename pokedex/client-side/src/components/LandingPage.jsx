import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Pokédex!</h1>
      <p className="landing-subtitle">Explore, add, and manage your favorite Pokémon.</p>
      <Link to="/pokedex" className="start-button">Go to Pokedex</Link>
    </div>
  );
}
