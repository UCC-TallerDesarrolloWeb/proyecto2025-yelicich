import { useState, useEffect } from 'react';
import { textBase } from '@utils/format';
import { useNavigate } from "react-router-dom"
import { getFeaturedCars, getBrands, getCategories, getTestimonials, getRecentCars } from "@api/carsApi";
import arrowImg from "@assets/head_arrow.png"
import CardCar from "@components/CardCar";
import "@styles/Home.scss";

const Home = () => {
    const [bestSellerCars, setBestSellerCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [recentCars, setRecentCars] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        (async () => {
            setBestSellerCars(await getFeaturedCars());
            setBrands(await getBrands());
            setCategories(await getCategories());
            setTestimonials(await getTestimonials());

            const viewedIds = JSON.parse(localStorage.getItem("recentCars") || "[]");
            if (viewedIds.length > 0) setRecentCars(await getRecentCars(viewedIds));
        })();
    }, []);

    useEffect(() => {
        if (testimonials.length === 0) {
        setCurrent(0);
        return;
        }
        if (current >= testimonials.length) setCurrent(0);
    }, [testimonials, current]);

    useEffect(() => {
        if (testimonials.length < 2) return;
        const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials]);

    const nextTestimonial = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const hasTestimonials = testimonials.length > 0;
    const t = hasTestimonials ? testimonials[current] : null;

    const submitNewsletter = (e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector('#newsletter-email');
        const email = input?.value?.trim() ?? '';
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!ok) {
            alert('Ingresá un email válido.');
            input?.focus();
            return;
        }
        alert('¡Gracias por suscribirte!');
        e.currentTarget.reset();
    };

    const navigate = useNavigate()

    const navToDetails = (id) =>
        navigate(`/details/${id}`);

    const navToBrand = (name) =>
        navigate(`/catalog?marca=${encodeURIComponent(name)}`);

    const navToCategory = (name) =>
        navigate(`/catalog?categoria=${encodeURIComponent(name)}`);

    return (
        <main className="home">
            {/* Hero Section */}
            <div className="hero" aria-label="Presentación">
                <div className="hero__content">
                    <h2>Encontrá tu próximo<br />0km en Argentina</h2>
                    <a className="btn-catalogo-hero" onClick={() => navigate("/catalog")}>Catálogo</a>
                </div>
                <div className="hero__arrows">
                    <img src={arrowImg} alt="" aria-hidden="true" draggable="false"/>
                    <img src={arrowImg} alt="" aria-hidden="true" draggable="false"/>
                </div>
            </div>

            {/* Best Seller Section */}
            <section className="best-seller" aria-label="vehículos destacados">
                <div className="best-seller__content">
                    <h3>Vehículos <span className="bold">destacados</span></h3>
                    <ul className="best-seller__list" role="list">
                        {bestSellerCars.map((car) => (
                            <li key={car.id}>
                                <div className="card-best-seller">
                                    <img src={`/images/cars/${textBase(car.model)}/featured_${textBase(car.model)}.webp`} alt={`Imagen destacada de ${car.brand} ${car.model}`} loading="lazy" />
                                    <div className="card-best-seller__body">
                                        <div className="card-best-seller__body-top">
                                            <h4>{car.brand} <strong>{car.model}</strong></h4>
                                            <p>{car.type} • {car.transmission}</p>
                                        </div>
                                        <a onClick={() => navToDetails(car.id)}>Ir a la página &gt;</a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Brands Section */}
            <section className="grid-section grid-section--brands">
                <h3>Buscá por <span className="bold">marca</span></h3>
                <div className="grid-section__grid">
                    {brands.map((brand) => (
                    <a key={brand.name} onClick={() => navToBrand(brand.name)} className="grid-section__item">
                        <div className="grid-section__logo">
                            <img src={`/images/brands/${textBase(brand.name)}.webp`} alt={`logo de la marca ${brand.name}`} loading="lazy" />
                        </div>
                        <div className="grid-section__name">{brand.name}</div>
                    </a>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section className="grid-section grid-section--categories">
                <h3>Buscá por <span className="bold">categoría</span></h3>
                <div className="grid-section__grid">
                    {categories.map((category) => (
                    <a key={category.name} onClick={() => navToCategory(category.name)} className="grid-section__item">
                        <div className="grid-section__logo">
                            <img src={`/images/categories/${textBase(category.name)}.webp`} alt={`logo de la categoría ${category.name}`} loading="lazy" />
                        </div>
                        <div className="grid-section__name">{category.name}</div>
                    </a>
                    ))}
                </div>
            </section>

            {/* Últimos vehículos vistos */}
            {recentCars.length != 0 && (
                <section className="recently-viewed" aria-label="Últimos autos vistos">
                    <h3>Últimos <span className="bold">vehículos vistos</span></h3>
                    <ul className="recently-viewed__list">
                        {recentCars.map((car) => (
                            <li key={car.id}>
                                <CardCar car={car} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Testimonials Section */}
            {hasTestimonials ? (
                <section className="testimonials" aria-label="Testimonios de clientes">
                    <h3>Nuestros <span className="bold">testimonios</span></h3>

                    <div className="testimonials__content">
                        <div className="testimonial active">
                            <img src={t.image} alt={`Retrato de ${t.name}`} loading="lazy" />
                            <div className="testimonial__text">
                                <div className="testimonial__comment">
                                    <p>"{t.comment}"</p>
                                </div>
                                <div className="testimonial__about">
                                    <h4>- {t.name}</h4>
                                    <p>{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="testimonials__controls">
                        <button type="button" onClick={prevTestimonial}>&#10094;</button>
                        <button type="button" onClick={nextTestimonial}>&#10095;</button>
                    </div>
                </section>
            ) : (
                <p>Cargando testimonios...</p>
            )}

            {/* Newsletter Section */}
            <section className="newsletter" aria-label="Suscripción a boletín de noticias">
                <div className="newsletter__overlay">
                    <div className="newsletter__content">
                        <div className="newsletter__text">
                            <h4>Suscribite a nuestro <span className="bold">boletín de noticias</span></h4>
                            <p>Enterate de novedades, promociones y lanzamientos exclusivos.</p>
                        </div>

                        <form className="newsletter__form" onSubmit={(e) => submitNewsletter(e)}> {/* TODO: Arreglar funcion */}
                            <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
                            <input type="email" id="newsletter-email" placeholder="Ingresá tu email" required size="50" inputMode="email"/>
                            <button type="submit" aria-label="Enviar suscripción">Suscribite</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;