export const formatPrice = (price) => {
    const numberFormat = new Intl.NumberFormat('es-AR', {
        currency: 'ARS',
        style: 'currency',
    });
    return numberFormat.format(price);
};

export const textBase = (str) => {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/\s+/g, "");
};
