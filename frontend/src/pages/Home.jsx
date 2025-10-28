import { useState, useEffect } from 'react';
import { textBase } from '@utils/format';
import Footer from "@components/Footer";
import Header from "@components/Header";
import "@styles/Home.scss";

const Home = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [current, setCurrent] = useState(0);

    const BASE_URL_CARS = "http://localhost:4000/cars"
    const BASE_URL_BRANDS = "http://localhost:4000/brands"
    const BASE_URL_CATEGORIES = "http://localhost:4000/categories"
    const BASE_URL_TESTIMONIALS = "http://localhost:4000/testimonials"

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
        fetchData(BASE_URL_CARS, setCars);
        fetchData(BASE_URL_BRANDS, setBrands);
        fetchData(BASE_URL_CATEGORIES, setCategories);
        fetchData(BASE_URL_TESTIMONIALS, setTestimonials);
    }, []);

    useEffect(() => {
        if (current >= testimonials.length) setCurrent(0);
    }, [testimonials]);

    const nextTestimonial = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };;

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

    return (
        <>
        <Header />

        <main className="home">

            {/* Hero Section */}


            {/* Best Seller Section */}


            {/* Brands Section */}
            <section className="grid-section grid-section--brands">
                <h3>Buscá por <span className="bold">marca</span></h3>
                <div className="grid-section__grid">
                    {brands.map((brand) => (
                    <a key={brand.name} href={`../catalog_page/catalog.html?marca=${encodeURIComponent(brand.name)}`} className="grid-section__item">
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
                    <a key={category.name} href={`../catalog_page/catalog.html?categoria=${encodeURIComponent(category.name)}`} className="grid-section__item">
                        <div className="grid-section__logo">
                            <img src={`/images/categories/${textBase(category.name)}.webp`} alt={`logo de la categoría ${category.name}`} loading="lazy" />
                        </div>
                        <div className="grid-section__name">{category.name}</div>
                    </a>
                    ))}
                </div>
            </section>

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
                            <button type="submit">Suscribite</button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
        
        <Footer />
        </>
    )
}

export default Home;