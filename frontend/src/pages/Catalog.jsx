import { useState, useEffect, useMemo } from "react";
import { formatCurrency, textBase } from "@utils/format";
import { getCars, getBrands, getCategories, getTransmissions } from "@api/carsApi";
import Breadcrumb from "@components/Breadcrumb";
import CardCar from "@components/CardCar";
import "@styles/Catalog.scss";

const Catalog = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [transmissions, setTransmissions] = useState([]);

    const [order, setOrder] = useState("most_recent");
    const [minPrice, setMinPrice] = useState("");     
    const [maxPrice, setMaxPrice] = useState("");     
    const [selBrands, setSelBrands] = useState([]);   
    const [selCats, setSelCats] = useState([]);       
    const [selTrans, setSelTrans] = useState([]);     

    const [priceError, setPriceError] = useState(false);

    useEffect(() => {
        (async () => {
            setCars(await getCars());
            setBrands(await getBrands());
            setCategories(await getCategories());
            setTransmissions(await getTransmissions());
        })();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const marcaQ = params.get("marca");
        const catQ = params.get("categoria");

        if (marcaQ) setSelBrands([marcaQ]);
        if (catQ) setSelCats([catQ]);
    }, []);

    const toNumber = (s) => {
        if (s == null) return null;
        const digits = String(s).replace(/\D/g, "");
        return digits ? Number(digits) : null;
    };

    const toggleIn = (value, list, setter) => {
        if (!value) return;
        if (list.includes(value)) setter(list.filter((v) => v !== value));
        else setter([...list, value]);
    };

    const filteredAndSorted = useMemo(() => {
        let out = [...cars];

        const min = toNumber(minPrice);
        const max = toNumber(maxPrice);
        if (min !== null) out = out.filter((c) => c.price >= min);
        if (max !== null) out = out.filter((c) => c.price <= max);

        if (selTrans.length) out = out.filter((c) => selTrans.includes(c.transmission));

        if (selCats.length) out = out.filter((c) => selCats.includes(c.type));

        if (selBrands.length) out = out.filter((c) => selBrands.includes(c.brand));

        if (order === "cheaper") out.sort((a, b) => a.price - b.price);
        else if (order === "expensive") out.sort((a, b) => b.price - a.price);
        else out.sort((a, b) => a.id - b.id);

        return out;
    }, [cars, minPrice, maxPrice, selTrans, selCats, selBrands, order]);

    const clearAllFilters = () => {
        setMinPrice("");
        setMaxPrice("");
        setSelBrands([]);
        setSelCats([]);
        setSelTrans([]);
        setOrder("most_recent");
    };

    const anyFilterActive =
        minPrice || maxPrice || selBrands.length || selCats.length || selTrans.length;

    const totalCars = filteredAndSorted.length;

    useEffect(() => {
        const min = Number(minPrice);
        const max = Number(maxPrice);
        setPriceError(min !== 0 && max !== 0 && min > max);
    }, [minPrice, maxPrice]);

    return (
        <div className="page">
        <main className="catalog page-container">
            <Breadcrumb
            items={[
                { href: "../home", label: "Inicio" },
                { label: "Catálogo" },
            ]}
            />

            <div className="catalog__container page-content">
                <div className="catalog__header">
                    <h2>Catálogo de vehículos</h2>
                    <hr />

                    <div className="catalog__subtitles">
                        <div className="catalog__subtitles__cars">{totalCars} autos</div>

                        <div className="catalog__subtitles__order">
                            <label htmlFor="order-by" className="catalog__subtitles__order__text">Ordenar por:</label>
                            <select
                                className="catalog__subtitles__order__order-by"
                                name="order-by"
                                id="order-by"
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                >
                                <option value="most_recent">Relevancia</option>
                                <option value="expensive">Mayor precio</option>
                                <option value="cheaper">Menor precio</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="catalog__content">
                    <aside className="catalog__content__filters">
                        <div className="filters__header">
                            <h3>Filtros</h3>
                            <button id="clear-filters" className={`filters__clear-btn ${anyFilterActive ? "" : "hidden"}`} type="button" onClick={clearAllFilters}>
                                Limpiar filtros
                            </button>
                        </div>

                        {/* Filtro de precio */}
                        <div className="filters__group filters__group--price" id="price-filter">
                            <h4 className="filters__title">Precio</h4>
                            {priceError && (
                                <p className="filters__error-text">El precio mínimo no puede ser mayor al máximo.</p>
                            )}
                            <ul className="filters__list">
                                <li className="filters__item">
                                    <label htmlFor="from-price">Desde:</label>
                                    <input
                                    type="text"
                                    id="from-price"
                                    placeholder="$40.000.000"
                                    className={`filters__input price-filter ${priceError ? "input-error" : ""}`}
                                    maxLength={13}
                                    inputMode="numeric"
                                    value={formatCurrency(minPrice)}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    />
                                </li>
                                <li className="filters__item">
                                    <label htmlFor="to-price">Hasta:</label>
                                    <input
                                    type="text"
                                    id="to-price"
                                    placeholder="$60.000.000"
                                    className={`filters__input price-filter ${priceError ? "input-error" : ""}`}
                                    maxLength={13}
                                    inputMode="numeric"
                                    value={formatCurrency(maxPrice)}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    />
                                </li>
                            </ul>
                        </div>

                        {/* Filtro de transmisión */}
                        <div className="filters__group filters__group--transmission">
                            <h4 className="filters__title">Transmisión</h4>
                            <ul className="filters__list">
                                {transmissions.map((t) => {
                                    const id = textBase(t.name);
                                    const checked = selTrans.includes(t.name);
                                    return (
                                        <li key={t.name} className="filters__list__item">
                                            <input
                                            type="checkbox"
                                            id={id}
                                            value={t.name}
                                            checked={checked}
                                            onChange={() => toggleIn(t.name, selTrans, setSelTrans)}
                                            />
                                            <label htmlFor={id}>{t.name}</label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Filtro de segmento */}
                        <div className="filters__group filters__group--segment">
                            <h4 className="filters__title">Segmento</h4>
                            <ul className="filters__list" id="segment-filter">
                                {categories.map((c) => {
                                    const id = textBase(c.name);
                                    const checked = selCats.includes(c.name);
                                    return (
                                        <li key={c.name} className="filters__list__item">
                                            <input
                                            type="checkbox"
                                            id={id}
                                            value={c.name}
                                            checked={checked}
                                            onChange={() => toggleIn(c.name, selCats, setSelCats)}
                                            />
                                            <label htmlFor={id}>{c.name}</label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Filtro de marca */}
                        <div className="filters__group filters__group--brand">
                            <h4 className="filters__title">Marca</h4>
                            <ul className="filters__list" id="brand-filter">
                                {brands.map((b) => {
                                    const id = textBase(b.name);
                                    const checked = selBrands.includes(b.name);
                                    return (
                                        <li key={b.name} className="filters__list__item">
                                            <input
                                            type="checkbox"
                                            id={id}
                                            value={b.name}
                                            checked={checked}
                                            onChange={() => toggleIn(b.name, selBrands, setSelBrands)}
                                            />
                                            <label htmlFor={id}>{b.name}</label>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </aside>


                    {cars.length === 0 ? (
                        <p>Cargando vehículos...</p>
                    ) : (
                        <div className="catalog__content__cars-grid">
                            {filteredAndSorted.map((car) => (
                            <CardCar key={car.id} car={car} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
        </div>
    );
};

export default Catalog;