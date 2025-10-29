import { useState } from "react";
import { textBase, formatPrice } from "@utils/format";
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

    return (
        <div className="card-car" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <a href={`/details?id=${car.id}`} className="link-detalle">
            <div className="car-image-container">
            <img src={imageSrc} alt={`${car.brand} ${car.model}`} loading="lazy" onError={handleError}/>
            </div>

            <div className="informacion">
                <div className="datos">
                    <div className="car-marca">{car.brand}</div>
                    <div className="car-modelo">{car.model}</div>
                    <div className="car-tipo-caja">{car.type} • {car.transmission}</div>
                </div>

                <div className="car-precio">
                    <span className="car-desde">Desde</span>
                    <strong>{formatPrice(car.price)}</strong>
                </div>
            </div>
        </a>
        </div>
    );
};

export default CardCar;
