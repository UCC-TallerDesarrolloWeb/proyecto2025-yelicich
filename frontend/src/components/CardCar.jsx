import { useState } from "react";
import { textBase, formatPrice } from "@utils/format";
import { useNavigate } from "react-router-dom"
import "@styles/CardCar.scss";

const CardCar = ({ car }) => {
    const [imageSrc, setImageSrc] = useState(
        `/images/cars/${textBase(car.model)}/main_${textBase(car.model)}.webp`
    );
    const [hoverEnabled, setHoverEnabled] = useState(true);

    const handleError = () => {
        setImageSrc("/images/cars/without_image.webp");
        setHoverEnabled(false);
    };

    const handleMouseEnter = () => {
        if (hoverEnabled) {
            setImageSrc(`/images/cars/${textBase(car.model)}/hover_${textBase(car.model)}.webp`);
        }
    };

    const handleMouseLeave = () => {
        if (hoverEnabled) {
            setImageSrc(`/images/cars/${textBase(car.model)}/main_${textBase(car.model)}.webp`);
        }
    };

    const navigate = useNavigate()

    const navToDetails = (id) => {
        const viewed = JSON.parse(localStorage.getItem("recentCars") || "[]");
        const updated = [id, ...viewed.filter((v) => v !== id)].slice(0, 5);
        localStorage.setItem("recentCars", JSON.stringify(updated));
        navigate(`/details/${id}`);
    };

    return (
        <div className="card-car" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a onClick={() => navToDetails(car.id)} className="card-car__link-detalle">
                <div className="card-car__image-container">
                    <img src={imageSrc} alt={`${car.brand} ${car.model}`} loading="lazy" onError={handleError}/>
                </div>

                <div className="card-car__informacion">
                    <div className="card-car__informacion__datos">
                        <div className="card-car__informacion__datos__marca">{car.brand}</div>
                        <div className="card-car__informacion__datos__modelo">{car.model}</div>
                        <div className="card-car__informacion__datos__tipo-caja">{car.type} • {car.transmission}</div>
                    </div>

                    <div className="card-car__informacion__precio">
                        <span className="card-car__informacion__precio__desde">Desde</span>
                        <strong>{formatPrice(car.price)}</strong>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default CardCar;
