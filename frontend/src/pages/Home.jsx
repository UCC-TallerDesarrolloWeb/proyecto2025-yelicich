import { useState, useEffect } from 'react';
import { formatPrice } from '@utils/format';
import "@styles/Home.scss";

const Home = () => {
    const [cars, setCars] = useState([]);

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

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            <h1>Catálogo de Autos</h1>

            {cars.map((car, id) => (
                <div key={id}>
                    <p>{car.marca}</p>
                    <img src={`/cars/${car.img}`} alt={car.brand} />
                    <p>{formatPrice(car.price)}</p>
                </div>
            ))}
        </div>

    )
}

export default Home;