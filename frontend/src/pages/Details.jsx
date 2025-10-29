import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { formatPrice } from '@utils/format';
import Header from "@components/Header";
import Breadcrumb from "@components/Breadcrumb";
import CardCar from "@components/CardCar";
import Footer from "@components/Footer";
import "@styles/Details.scss";

const Details = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [similarCars, setSimilarCars] = useState([]);
    const [opened, setOpened] = useState(false);

    const BASE_URL_CARS = "http://localhost:4000/cars"

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
        fetchData(`${BASE_URL_CARS}/${id}`, setCar);
        fetchData(BASE_URL_CARS, setSimilarCars);
    }, []);

    if (!car) return <p>Cargando vehículo...</p>;

    return (
        <div className="page-container">
            <main className="details page-content">
                <Header />
                <Breadcrumb items={[
                    { href: "../home", label: "Inicio" },
                    { href: "../catalog", label: "Catálogo" },
                    { label: `Detalles - ${car.brand} ${car.model}` }
                ]} />

                <div className="catalog__container">
                    <h1>Detalles del Auto {car.brand} </h1>
                    <button onClick={() => setOpened(true)}>Abrir</button>

                    <div className="details__content">

                    </div>
                    <div className="similar-cars">
                        <h3>Vehículos similares</h3>
                        <div className="similar-cars__list">
                            {similarCars.map((car) => (
                                <CardCar key={car.id} car={car} />
                                ))}
                        </div>
                    </div>
                </div>
            </main>

            {opened && (
                <div>
                    //Agregar el modal
                    <button onClick={() => setOpened(false)}>Cerrar</button>
                </div>
            )}
            
            <Footer />
        </div>
    )
}

export default Details;