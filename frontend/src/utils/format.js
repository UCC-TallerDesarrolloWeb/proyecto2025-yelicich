export const formatPrice = (price) => {
    const numberFormat = new Intl.NumberFormat('es-AR', {
        currency: 'ARS',
        style: 'currency',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return numberFormat.format(price);
};

export const textBase = (str) => {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/\s+/g, "");
};

export const formatCurrency = (value) => {
    if (!value) return "";
    const num = String(value).replace(/\D/g, "");
    if (!num) return "";
    return `$ ${Number(num).toLocaleString("es-AR")}`;
};
