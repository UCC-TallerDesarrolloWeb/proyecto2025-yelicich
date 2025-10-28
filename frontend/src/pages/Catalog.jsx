import { useState, useEffect } from 'react';
import { formatPrice, textBase } from '@utils/format';
import Header from "@components/Header";
import Footer from "@components/Footer";
import "@styles/Catalog.scss";

const Catalog = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);

    const BASE_URL = "http://localhost:4000/cars"

    const fetchCars = async () => {
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error(`Error al realizar un get en el servicio: ${error}`);
        }
    }

    const fetchBrands = async () => {
        try {
            const response = await fetch("http://localhost:4000/brands");
            const data = await response.json();
            setBrands(data);
        } catch (error) {
            console.error(`Error al realizar un get en el servicio: ${error}`);
        }
    }

    useEffect(() => {
        fetchCars();
        fetchBrands();
    }, []);

    return (
        <>
        <Header />
        
        <main>
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