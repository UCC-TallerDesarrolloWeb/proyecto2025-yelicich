import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { formatPrice } from '@utils/format';
import Header from "@components/Header";
import Breadcrumb from "@components/Breadcrumb";
import CardCar from "@components/CardCar";
import Footer from "@components/Footer";
//import "@styles/Home.scss";

const Details = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [opened, setOpened] = useState(false);

    const BASE_URL = "http://localhost:4000/cars"

    const fetchCar = async () => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            const data = await response.json();
            setCar(data);
        } catch (error) {
            console.error(`Error al obtener el auto: ${error}`);
        }
    }

    useEffect(() => {
        fetchCar();
    }, []);

    if (!car) return <p>Cargando vehículo...</p>;

    return (
        <div className="page">
            <main className="catalog">
                <Header />
                <Breadcrumb items={[
                    { href: "../home", label: "Inicio" },
                    { href: "../catalog", label: "Catálogo" },
                    { label: `Detalles - ${car.brand} ${car.model}` }
                ]} />

                <div className="catalog__container">
                    <h1>Detalles del Auto {car.brand} </h1>
                    <button onClick={() => setOpened(true)}>Abrir</button>
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