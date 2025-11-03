import { useNavigate } from "react-router-dom"
import "@styles/Header.scss";

const Header = () => {
    const navigate = useNavigate()

    const isHome = window.location.pathname === "/home" || window.location.pathname === "/";

    return (
        <header className={`header ${isHome ? "header--home" : "header--default"}`}>
            <div className="header__container">
                <div className="header__logo">
                    <a href="/home">
                        <img className="header__logo-img" src="/images/logo_ym.png" alt="YeliMotors Logo" draggable="false"/>
                        <h1 className="header__logo-title">Yeli<span className="bold">Motors</span></h1>
                    </a>
                </div>

                <nav className="header__nav" aria-label="Navegación principal">
                    <a className="header__link" onClick={() => navigate("/home")} aria-disabled="true">Home</a>
                    <a className="header__btn--catalogo" onClick={() => navigate("/catalog")}>Catálogo</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
