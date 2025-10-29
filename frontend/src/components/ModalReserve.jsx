import { useState } from "react";
import "@styles/ModalReserve.scss";

const ModalReserve = ({ car, onClose }) => {

    if (!car) return <p>Cargando vehículo...</p>;

    const [color, setColor] = useState(null);
    const [wheel, setWheel] = useState(null);
    const [payment, setPayment] = useState(null);
    const [installments, setInstallments] = useState(null);

    const handleSelect = (setter, value) => setter(value);

    const basePrice = car?.price || 0;
    const extras = (color ? 0.02 : 0) + (wheel ? 0.03 : 0);
    const total = basePrice * (1 + extras);

    return (
        <div className="modal" aria-hidden="false">
        <div className="modal__overlay" onClick={onClose}></div>

        <div className="modal__content">
            <div className="modal__header">
                <h2 className="modal__title">Personalizar {car.brand} {car.model}</h2>
                <button className="modal__close" aria-label="Cerrar" onClick={onClose}>×</button>
            </div>

            <main className="modal__body">
                {/* Personalizar color */}
                <div className="modal__section">
                    <div className="modal__section__subtitle">
                        <span className="icon material-icons-round">edit</span>
                        <h3>Personalizar</h3>
                    </div>
                    <h4>Color exterior</h4>
                    <div className="options">
                        {["white", "black", "stealth_grey", "silver", "blue", "red"].map((clr) => (
                            <button key={clr} className={`option color ${color === clr ? "active" : ""}`} aria-label={clr} onClick={() => handleSelect(setColor, clr)}>
                                <img src={`/images/paints/paint_${clr}.png`} alt={clr} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rines */}
                <div className="modal__section">
                    <h4>Rines</h4>
                    <div className="options">
                        {[
                            { val: "magnetite_19", name: "Magnetita 19'" },
                            { val: "perihelix_20", name: "Perihelix 20'" },
                            { val: "velarium_21", name: "Velarium 21'" },
                            { val: "machina_22", name: "Machina 22'" },
                        ].map((w) => (
                            <button key={w.val} className={`option wheels ${wheel === w.val ? "active" : ""}`} aria-label={w.name} onClick={() => handleSelect(setWheel, w.val)}>
                                <img src={`/images/wheels/wheel_${w.val}.webp`} alt={w.name} />
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
                    <h4>Método</h4>
                    <div className="options">
                        {["contado", "tarjeta"].map((m) => (
                            <button
                            key={m}
                            className={`option ${payment === m ? "active" : ""}`}
                            onClick={() => handleSelect(setPayment, m)}
                            >
                            {m === "contado" ? "Contado" : "Tarjeta de crédito"}
                            </button>
                        ))}
                    </div>

                    {payment === "tarjeta" && (
                    <div className="modal__section__financiacion">
                        <h4>Financiación</h4>
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
                        <p>Color: <span>{color ? "+2%" : "—"}</span></p>
                        <p>Rines: <span>{wheel ? "+3%" : "—"}</span></p>
                        <p>Interés: <span>{payment === "tarjeta" ? "+10%" : "—"}</span></p>
                        <p className="total">Total: <strong>{total.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</strong></p>
                    </div>
                </div>
            </main>

            <footer className="modal__footer">
                <button className="btn-confirm" type="button" onClick={() => alert("Pago confirmado!")}>Realizar pago</button>
            </footer>
        </div>
        </div>
    );
};

export default ModalReserve;
