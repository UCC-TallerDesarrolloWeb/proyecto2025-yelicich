import { useState, useEffect } from 'react';
//import { formatPrice } from '@utils/format';
//import "@styles/Home.scss";

const Details = () => {
    const [cars, setCars] = useState([]);
    const [opened, setOpened] = useState(null);

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

    const cerrarModal = () => {
        setOpened(null);
    }

    const selectedCar = cars[0];

    return (
        <div>
            <h1>Detalles del Auto {selectedCar.marca} </h1>
            <button onClick={setOpened(selectedCar)}>Abrir</button> //NO hace falta abrirlo asi

            {opened && (
                <div>
                    //Agregar el modal
                    <button onClick={cerrarModal()}>Cerrar</button>
                </div>
            )}
        </div>
    )
}

export default Details;