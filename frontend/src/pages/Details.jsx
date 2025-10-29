import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { formatPrice, textBase } from '@utils/format';
import Header from "@components/Header";
import Breadcrumb from "@components/Breadcrumb";
import CardCar from "@components/CardCar";
import InfoSection from "@components/InfoSection";
import ModalReserve from "@components/ModalReserve";
import Footer from "@components/Footer";
import "@styles/Details.scss";

const Details = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [similarCars, setSimilarCars] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
        <div className="page">
            <main className="details page-container">
                <Header />
                <Breadcrumb items={[
                    { href: "../home", label: "Inicio" },
                    { href: "../catalog", label: "Catálogo" },
                    { label: `Detalles - ${car.brand} ${car.model}` }
                ]} />

                <div className="details__container page-content">
                    <div className="details__content">
                        <div className="details__content__left">
                            <div className="images-container">
                                <div className="images-thumbnails">
                                    {/* TODO: Agregar miniaturas de imágenes */}
                                </div>
                                <img className="car-image" src={`/images/cars/${textBase(car.model)}/main_${textBase(car.model)}.webp`} alt={`Imagen del auto ${car.brand} ${car.model}`} draggable="false"/>
                            </div>

                            <section className="detalles-auto">
                                <h3>Características</h3>
                                <p>
                                    Este vehículo está diseñado para quienes buscan una combinación equilibrada
                                    entre comodidad, estilo y practicidad. Su interior ofrece un espacio
                                    confortable con terminaciones modernas y un equipamiento pensado para el
                                    uso diario, manteniendo al mismo tiempo un aspecto atractivo y actual.
                                </p>

                                <h3>Motor</h3>
                                <p>
                                    El motor está optimizado para un rendimiento confiable y eficiente en
                                    distintas condiciones de manejo. Brinda buena respuesta en aceleración, un
                                    consumo de combustible moderado y la potencia necesaria para desenvolverse
                                    tanto en recorridos urbanos como en trayectos más largos en ruta.
                                </p>

                                <h3>Seguridad</h3>
                                <p>
                                    La seguridad es un aspecto clave en este modelo, por lo que incorpora
                                    sistemas esenciales para proteger a los ocupantes en todo momento. Su
                                    estructura está reforzada para mayor resistencia, acompañada de elementos de
                                    asistencia al conductor que ofrecen confianza y tranquilidad en cada viaje.
                                </p>
                            </section>
                        </div>
                        <div className="details__content__right">
                            <div className="details__titles">
                                <div className="details__titles__info">
                                    <h2 className="details__titles__info__nombre">{car.brand} <span className="bold">{car.model}</span></h2>
                                    <span className="details__titles__info__type-box">{car.type} • {car.transmission}</span>
                                </div>

                                <div className="details__titles__precio">
                                    <span className="details__titles__precio__valor">{formatPrice(car.price)}</span>
                                    <p>No incluye patentamiento. Precio al contado.</p>
                                    <p className="details__titles__precio__sin-tax">Precio sin impuestos nacionales: {formatPrice(car.price * 0.85)}</p>
                                </div>
                            </div>

                            <div className="details__custom">
                                <InfoSection icon="straighten" title="Dimensiones">
                                    <div>Alto: 1.85 mts</div>
                                    <div>Ancho: 1.95 mts</div>
                                    <div>Largo: 5.35 mts</div>
                                </InfoSection>

                                <InfoSection icon="access_time_filled" title="Disponibilidad">
                                    Entrega inmediata / 30 días
                                </InfoSection>

                                <InfoSection icon="credit_card" title="Forma de pago">
                                    Financiado (precio variable) / Contado
                                </InfoSection>

                                <InfoSection icon="location_on" title={`Concesionario oficial de ${car.brand}`}>
                                    Ubicación Córdoba Capital
                                </InfoSection>
                            </div>

                            <div className="details__buttons-end">
                                <button className="details__buttons-end__reserve" type="button" onClick={() => setShowModal(true)}>Reservar ahora</button>
                            </div>
                        </div>
                    </div>

                    {/* Similar Cars Section */}
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

            {showModal && <ModalReserve car={car} onClose={() => setShowModal(false)} />}

            
            <Footer />
        </div>
    )
}

export default Details;