import { useState, useEffect } from 'react';
import { formatPrice, textBase } from '@utils/format';
import Header from "@components/Header";
import Breadcrumb from "@components/Breadcrumb";
import CardCar from "@components/CardCar";
import Footer from "@components/Footer";
import "@styles/Catalog.scss";

const Catalog = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transmissions, setTransmissions] = useState([]);

    const [order, setOrder] = useState("most_recent");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const BASE_URL_CARS = "http://localhost:4000/cars"
    const BASE_URL_BRANDS = "http://localhost:4000/brands"
    const BASE_URL_CATEGORIES = "http://localhost:4000/categories"
    const BASE_URL_TRANSMISSIONS = "http://localhost:4000/transmissions"

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
        fetchData(BASE_URL_TRANSMISSIONS, setTransmissions);
    }, []);

    const clearAllFilters = () => {
        // TODO: Lógica para limpiar todos los filtros
    };

    const totalCars = cars.length;

    return (
        <div className="page-container">
            <main className="catalog page-content">
                <Header />
                <Breadcrumb items={[
                    { href: "../home", label: "Inicio" },
                    { label: "Catálogo" }
                ]} />

                <div className="catalog__container">
                    <div className="catalog__header">
                        <h2>Catálogo de vehículos</h2>
                        <hr/>

                        <div className="catalog__subtitles">
                            <div className="catalog__subtitles__cars">{totalCars} autos</div>

                            <div className="catalog__subtitles__order">
                                <label htmlFor="order-by" className="catalog__subtitles__order__text">
                                    Ordenar por:
                                </label>

                                <select className="catalog__subtitles__order__order-by" name="order-by" id="order-by" value={order} onChange={(e) => setOrder(e.target.value)}>
                                    <option value="most_recent">Relevancia</option>
                                    <option value="expensive">Mayor precio</option>
                                    <option value="cheaper">Menor precio</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="catalog__content">
                        <div className="catalog__content__filters">
                            {/* Header de filtros */}
                            <div className="filters__header">
                                <h3>Filtros</h3>
                                <button id="clear-filters" className="filters__clear-btn hidden" type="button" onClick={clearAllFilters}>Limpiar filtros</button>
                            </div>

                            {/* Filtro de precio */}
                            <div className="filters__group filters__group--price" id="price-filter">
                                <h4 className="filters__title">Precio</h4>
                                <p className="filters__error-text">El precio mínimo no puede ser mayor al máximo.</p>
                                <ul className="filters__list">
                                    <li className="filters__item">
                                        <label htmlFor="from-price">Desde:</label>
                                        <input type="text" id="from-price" placeholder="$40.000.000" className="filters__input price-filter" maxLength="13" inputMode="numeric"/>
                                    </li>
                                    <li className="filters__item">
                                        <label htmlFor="to-price">Hasta:</label>
                                        <input type="text" id="to-price" placeholder="$60.000.000" className="filters__input price-filter" maxLength="13" inputMode="numeric"/>
                                    </li>
                                </ul>
                            </div>

                            {/* Filtro de transmisión */}
                            <div className="filters__group filters__group--transmission">
                                <h4 className="filters__title">Transmisión</h4>
                                <ul className="filters__list">
                                    {transmissions.map((transmission) => (
                                        <li key={transmission.name} className="filters__list__item">
                                            <input type="checkbox" id={textBase(transmission.name)} value={transmission.name} />    
                                            <label htmlFor={textBase(transmission.name)}>{transmission.name}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Filtro de segmento */}
                            <div className="filters__group filters__group--segment">
                                <h4 className="filters__title">Segmento</h4>
                                <ul className="filters__list" id="segment-filter">
                                    {categories.map((category) => (
                                        <li key={category.name} className="filters__list__item">
                                            <input type="checkbox" id={textBase(category.name)} value={category.name} />    
                                            <label htmlFor={textBase(category.name)}>{category.name}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Filtro de marca */}
                            <div className="filters__group filters__group--brand">
                                <h4 className="filters__title">Marca</h4>
                                <ul className="filters__list" id="brand-filter">
                                    {brands.map((brand) => (
                                        <li key={brand.name} className="filters__list__item">
                                            <input type="checkbox" id={textBase(brand.name)} value={brand.name} />
                                            <label htmlFor={textBase(brand.name)}>{brand.name}</label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {cars.length === 0 ? (
                            <p>Cargando vehículos...</p>
                        ) : (
                            <div className="catalog__content__cars-grid">
                                {cars.map((car) => (
                                    <CardCar key={car.id} car={car} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    )
}

export default Catalog;