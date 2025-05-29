import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import pokemonRoutes from './routes/pokemonRoutes.js';

dotenv.config()
connectDB();

const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://mellow-pastelito-138887.netlify.app']
}));
app.use(express.json())

app.use('/pokemons', pokemonRoutes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));