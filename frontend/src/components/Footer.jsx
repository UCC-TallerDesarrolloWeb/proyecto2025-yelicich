import "@styles/Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">

                {/* Columna izquierda */}
                <nav className="footer__links" aria-label="Información legal">
                    <ul>
                        <li><a href="#">Términos y Condiciones</a></li>
                        <li><a href="#">Política de Privacidad</a></li>
                        <li><a href="#">Política de Cookies</a></li>
                        <li><a href="#">Política de Calidad</a></li>
                    </ul>
                </nav>

                {/* Centro */}
                <div className="footer__center">
                    <div className="footer__center__logo">
                        <img src="/images/logo_ym.png" alt="YeliMotors Logo" loading="lazy"/>
                        <h5>Yeli<span className="bold">Motors</span></h5>
                    </div>
                    <nav className="footer__center__socials" aria-label="Redes sociales">
                        <ul>
                            <li>
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook YeliMotors">
                                    <img src="/images/social/ic_facebook.png" alt="Facebook YeliMotors" loading="lazy"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram YeliMotors">
                                    <img src="/images/social/ic_instagram.png" alt="Instagram YeliMotors" loading="lazy"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube YeliMotors">
                                    <img src="/images/social/ic_youtube.png" alt="YouTube YeliMotors" loading="lazy"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok YeliMotors">
                                    <img src="/images/social/ic_tiktok.png" alt="TikTok YeliMotors" loading="lazy"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X YeliMotors">
                                    <img src="/images/social/ic_x.png" alt="Twitter/X YeliMotors" loading="lazy"/>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Columna derecha */}
                <nav className="footer__links" aria-label="Navegación secundaria">
                    <ul>
                        <li><a href="#">YeliMotors</a></li>
                        <li><a href="#">Contacto</a></li>
                        <li><a href="#">FAQs</a></li>
                        <li><a href="#">Blog</a></li>
                    </ul>
                </nav>
            </div>

            {/* Parte de abajo */}
            <div className="footer__bottom">
                <p>&copy; 2025 YeliMotors</p>
                <p>Desarrollado por Matías Adrián Yelicich - 2025</p>
            </div>
        </footer>
    );
};

export default Footer;