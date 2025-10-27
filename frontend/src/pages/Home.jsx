import { useState, useEffect } from 'react';
import { formatPrice, textBase } from '@utils/format';
import Footer from "@components/Footer";
import "@styles/Home.scss";

const Home = () => {
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
        <div>
            <h1>Catálogo de Autos</h1>

            <h3>Buscá por <span className="bold">marca</span></h3>
            <div className="brands-container">
                {/* Arreglar la navegacion */}
                <div className="list-brands">
                    {brands.map((brand, id) => (
                        <a href={`../catalog_page/catalog.html?marca=${encodeURIComponent(brand.name)}`} className="link-detalle" key={id}>
                            <div className="brand-image-container">
                                <img src={`/images/marcas/${textBase(brand.name)}.webp`} alt={`logo de la marca ${brand.name}`} loading="lazy"/>
                            </div>
                            <div className="brand-name">{brand.name}</div>
                        </a>
                    ))}
                </div>
            </div>

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

            <Footer />
        </div>
    )
}

export default Home;