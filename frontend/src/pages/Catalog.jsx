import { useState, useEffect } from 'react';
import { formatPrice, textBase } from '@utils/format';
import Header from "@components/Header";
import Breadcrumb from "@components/Breadcrumb";
import Footer from "@components/Footer";
import "@styles/Catalog.scss";

const Catalog = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const BASE_URL_CARS = "http://localhost:4000/cars"
    const BASE_URL_BRANDS = "http://localhost:4000/brands"
    const BASE_URL_CATEGORIES = "http://localhost:4000/categories"

    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setter(data);
        } catch (error) {
            console.error(`Error al obtener datos de ${url}:`, error);
        }
    };

    useEffect(() => {
        fetchData(BASE_URL_CARS, setCars);
        fetchData(BASE_URL_BRANDS, setBrands);
        fetchData(BASE_URL_CATEGORIES, setCategories);
    }, []);

    return (
        <>
        <Header />
        
        <main>
            <Breadcrumb items={[
                { href: "../home_page/index.html", label: "Inicio" },
                { label: "Catálogo" }
            ]} />
            <h1>Catálogo de Autos</h1>

            {cars.length === 0 ? (
                <p>Cargando autos...</p>
            ) : (
                cars.map((car) => (
                    <div key={car.id}>
                        <p>{car.brand}</p>
                        <p>{formatPrice(car.price)}</p>
                    </div>
                ))
            )}

        </main>

        <Footer />
        </>
    )
}

export default Catalog;