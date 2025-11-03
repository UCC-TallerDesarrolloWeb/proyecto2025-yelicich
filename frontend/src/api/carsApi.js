const BASE_URL = "http://localhost:4000";

/**
 * Realiza una petición fetch genérica al mock server y devuelve los datos JSON.
 * @function fetchData
 * @param {string} database - Nombre o ruta del recurso en el mock server (por ejemplo `"cars"`, `"brands"`, `"cars/5"`).
 * @param {string} errorMessage - Mensaje personalizado que se mostrará si ocurre un error.
 */
const fetchData = async (database, errorMessage) => {
    try {
        const res = await fetch(`${BASE_URL}/${database}`);
        if (!res.ok) throw new Error(errorMessage);
        return await res.json();
    } catch (err) {
        console.error(`${errorMessage}:`, err);
        return Array.isArray(database) ? [] : null;
    }
};

export const getCars = () => fetchData("cars", "Error al obtener los autos");
export const getBrands = () => fetchData("brands", "Error al obtener las marcas");
export const getCategories = () => fetchData("categories", "Error al obtener las categorías");
export const getTransmissions = () => fetchData("transmissions", "Error al obtener las transmisiones");
export const getTestimonials = () => fetchData("testimonials", "Error al obtener testimonios");


export const getCarById = async (id) => {
    const car = await fetchData(`cars/${id}`, "Auto no encontrado");
    return car ?? null;
};

export const getFeaturedCars = async () => {
    const data = await fetchData("cars", "Error al obtener autos destacados");
    return data.filter((car) => car.isFeatured);
};

export const getSimilarCars = async (id, type) => {
    const data = await fetchData("cars", "Error al obtener autos similares");
    return data.filter((c) => c.id !== Number(id) && c.type === type).slice(0, 5);
};

export const getRecentCars = async (viewedIds = []) => {
    const data = await fetchData("cars", "Error al obtener autos recientes");
    return viewedIds.map((id) => data.find((c) => c.id === id)).filter(Boolean);
};