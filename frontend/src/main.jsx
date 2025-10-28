import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Details from './pages/Details.jsx'
import "@styles/global.scss";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/details" element={<Details />} />
        </Routes>
    </BrowserRouter>,
)

//npm run dev
//npx json-server --watch src/data/db.json --port 4000 