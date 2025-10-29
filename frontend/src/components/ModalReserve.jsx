import { useState } from "react";
import "@styles/ModalReserve.scss";

const ModalReserve = ({ car, onClose }) => {

    if (!car) return <p>Cargando vehículo...</p>;

    const [color, setColor] = useState(null);
    const [wheel, setWheel] = useState(null);
    const [payment, setPayment] = useState(null);
    const [installments, setInstallments] = useState(null);
    const [errors, setErrors] = useState({
        color: "",
        wheel: "",
        payment: "",
        installments: "",
    });

    const handleSelect = (setter, value) => setter(value);

    const getInterest = () => {
        if (payment !== "tarjeta" || !installments) return 0;

        switch (installments) {
            case 12: return 0.10;
            case 24: return 0.15;
            case 36: return 0.20;
            case 48: return 0.25;
            default: return 0;
        }
    };

    const getColorExtra = () => {
        switch (color) {
            case "white": return 0;      // base, sin recargo
            case "black": return 0.01;   // +1 %
            case "silver": return 0.015; // +1.5 %
            case "blue": return 0.02;    // +2 %
            case "red": return 0.03;     // +3 %
            default: return 0;
        }
    };

    const getWheelExtra = () => {
        switch (wheel) {
            case "magnetite_19": return 0.01;
            case "perihelix_20": return 0.02;
            case "velarium_21": return 0.03;
            case "machina_22": return 0.04;
            default: return 0;
        }
    };

    const basePrice = car?.price || 0;
    const extras = getColorExtra() + getWheelExtra();
    const interest = getInterest();
    const total = basePrice * (1 + extras + interest);

    const paint_colors = ["white", "black", "stealth_grey", "silver", "blue", "red"];
    const wheels = ["magnetite_19", "perihelix_20", "velarium_21", "machina_22"];
    const metodos = ["contado", "tarjeta"];

    const onConfirmPayment = () => {
        const newErrors = { color: "", wheel: "", payment: "", installments: "" };
        let valid = true;

        if (!color) {
            newErrors.color = "Seleccioná un color exterior.";
            valid = false;
        }
        if (!wheel) {
            newErrors.wheel = "Seleccioná un tipo de rines.";
            valid = false;
        }
        if (!payment) {
            newErrors.payment = "Elegí un método de pago.";
            valid = false;
        }
        if (payment === "tarjeta" && !installments) {
            newErrors.installments = "Seleccioná una opción de financiación.";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            alert(
                `¡Gracias por su compra!\n\nResumen:\n- Color: ${color}\n- Rines: ${wheel}\n- Pago: ${payment}${
                payment === "tarjeta" ? ` (${installments} cuotas)` : ""
                }\n\nNos pondremos en contacto con usted pronto.`
            );
            onClose();
        }
    };

    return (
        <div className="modal" aria-hidden="false">
        <div className="modal__overlay" onClick={onClose}></div>

        <div className="modal__content">
            <div className="modal__header">
                <h2 className="modal__header__title">Personalizar {car.brand} {car.model}</h2>
                <button className="modal__header__close" aria-label="Cerrar" onClick={onClose}>×</button>
            </div>

            <main className="modal__body">
                {/* Personalizar color */}
                <div className="modal__section">
                    <div className="modal__section__subtitle">
                        <span className="icon material-icons-round">edit</span>
                        <h3>Personalizar</h3>
                    </div>
                    <h4>
                        Color exterior{" "}
                        {errors.color && (
                            <span className="error-text" role="alert" aria-live="assertive">{errors.color}</span>
                        )}
                    </h4>
                    <div className="options">
                        {paint_colors.map((clr) => (
                            <button key={clr} className={`option color ${color === clr ? "active" : ""}`} aria-label={clr} onClick={() => handleSelect(setColor, clr)}>
                                <img src={`/images/paints/paint_${clr}.png`} alt={clr} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rines */}
                <div className="modal__section">
                    <h4>
                        Rines{" "}
                        {errors.wheel && (
                            <span className="error-text" role="alert" aria-live="assertive">{errors.wheel}</span>
                        )}
                    </h4>
                    <div className="options">
                        {wheels.map((w) => (
                            <button key={w} className={`option wheels ${wheel === w ? "active" : ""}`} aria-label={w} onClick={() => handleSelect(setWheel, w)}>
                                <img src={`/images/wheels/wheel_${w}.webp`} alt={w} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Forma de pago */}
                <div className="modal__section">
                    <div className="modal__section__subtitle">
                        <span className="icon material-icons-round">payment</span>
                        <h3>Forma de pago</h3>
                    </div>
                    <h4>
                        Método{" "}
                        {errors.payment && (
                            <span className="error-text" role="alert" aria-live="assertive">{errors.payment}</span>
                        )}
                    </h4>
                    <div className="options">
                        {metodos.map((m) => (
                            <button key={m} className={`option ${payment === m ? "active" : ""}`} onClick={() => handleSelect(setPayment, m)}>
                                {m === "contado" ? "Contado" : "Tarjeta de crédito"}
                            </button>
                        ))}
                    </div>

                    {payment === "tarjeta" && (
                    <div className="modal__section__financiacion">
                        <h4>
                            Financiación{" "}
                            {errors.installments && (
                                <span className="error-text" role="alert" aria-live="assertive">{errors.installments}</span>
                            )}
                        </h4>
                        <div className="options">
                            {[12, 24, 36, 48].map((n) => (
                                <button key={n} className={`option ${installments === n ? "active" : ""}`} onClick={() => handleSelect(setInstallments, n)}>
                                    {n} cuotas
                                </button>
                            ))}
                        </div>
                    </div>
                    )}
                </div>

                {/* Resumen */}
                <div className="modal__section">
                    <div className="modal__section__subtitle">
                        <span className="icon material-icons-round">receipt_long</span>
                        <h3>Resumen</h3>
                    </div>
                    <div className="resumen">
                        <p>Vehículo: <span>{basePrice.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</span></p>
                        <p>Color: <span>{color ? `+${(getColorExtra() * 100).toFixed(1)}%` : "—"}</span></p>
                        <p>Rines: <span>{wheel ? `+${(getWheelExtra() * 100).toFixed(1)}%` : "—"}</span></p>
                        <p>Interés:{" "}<span>{payment === "tarjeta" && installments? `+${(getInterest() * 100).toFixed(0)}%`: "—"}</span></p>
                        <p className="total">Total: <strong>{total.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</strong></p>
                    </div>
                </div>
            </main>

            <footer className="modal__footer">
                <button className="btn-confirm" type="button" onClick={onConfirmPayment}>Realizar pago</button>
            </footer>
        </div>
        </div>
    );
};

export default ModalReserve;
