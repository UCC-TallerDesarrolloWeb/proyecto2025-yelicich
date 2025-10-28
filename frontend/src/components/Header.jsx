import "@styles/Header.scss";

const Header = () => {
    return (
        <header className="header">
        <div className="header__container">
            <div className="header__logo">
            <a href="/home">
                <img className="header__logo-img" src="/images/logo_ym.png" alt="YeliMotors Logo" draggable="false"/>
                <h1 className="header__logo-title">Yeli<span className="bold">Motors</span></h1>
            </a>
            </div>

            <nav className="header__nav" aria-label="Navegación principal">
            <a href="#" aria-disabled="true" className="header__link">
                Home
            </a>
            {/* <a href="#" aria-disabled="true" className="header__link">Contacto</a> */}
            <a className="header__btn--catalogo" href="/catalog">
                Catálogo
            </a>
            </nav>
        </div>
        </header>
    );
};

export default Header;
