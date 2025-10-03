// Funciones generales
function textBase(str) {
    return str.toLowerCase().replace(/\s+/g, "");
}

//Enum marcas, tipos y cajas
const MARCAS = Object.freeze({
    TESLA: "Tesla",
    JEEP: "Jeep",
    FORD: "Ford",
    TOYOTA: "Toyota",
    CHEVROLET: "Chevrolet",
    VW: "Volkswagen",
    AUDI: "Audi",
    BMW: "BMW",
    FIAT: "Fiat",
    HONDA: "Honda",
    JETOUR: "Jetour",
    NISSAN: "Nissan",
    PEUGEOT: "Peugeot",
    RAM: "RAM",
    RENAULT: "Renault",
    FERRARI: "Ferrari"
});

const TIPOS = Object.freeze({
    SUV: "SUV",
    SEDAN: "Sedán",
    PICKUP: "Pick-up",
    UTILITARIO: "Utilitario",
    DEPORTIVO: "Deportivo",
    HATCHBACK: "Hatchback"
});

const CAJAS = Object.freeze({
    MANUAL: "Manual",
    AUTOMATICO: "Automático",
    ELECTRICO: "Eléctrico"
});

//Base de datos autos
const autos = [
    {
        id: 1,
        marca: MARCAS.TESLA,
        modelo: "Model S",
        tipo: TIPOS.DEPORTIVO,
        caja: CAJAS.ELECTRICO,
        precio: 110000000
    },
    {
        id: 2,
        marca: MARCAS.JEEP,
        modelo: "Compass",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 60500000
    },
    {
        id: 3,
        marca: MARCAS.FORD,
        modelo: "Ranger",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 64000000
    },
    {
        id: 4,
        marca: MARCAS.TOYOTA,
        modelo: "Corolla",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.AUTOMATICO,
        precio: 44645000
    },
    {
        id: 5,
        marca: MARCAS.TESLA,
        modelo: "Model 3",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.ELECTRICO,
        precio: 85000000
    },
    {
        id: 6,
        marca: MARCAS.TESLA,
        modelo: "Model X",
        tipo: TIPOS.SUV,
        caja: CAJAS.ELECTRICO,
        precio: 90000000
    },
    {
        id: 7,
        marca: MARCAS.TESLA,
        modelo: "Model Y",
        tipo: TIPOS.SUV,
        caja: CAJAS.ELECTRICO,
        precio: 80000000
    },
    {
        id: 8,
        marca: MARCAS.VW,
        modelo: "Amarok",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 69900000
    },
    {
        id: 9,
        marca: MARCAS.TOYOTA,
        modelo: "SW4",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 85674000
    },
    {
        id: 10,
        marca: MARCAS.FERRARI,
        modelo: "488",
        tipo: TIPOS.DEPORTIVO,
        caja: CAJAS.MANUAL,
        precio: 988079487
    },
    {
        id: 11,
        marca: MARCAS.RAM,
        modelo: "RAMPAGE",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 61500000
    },
    {
        id: 12,
        marca: MARCAS.CHEVROLET,
        modelo: "Montana",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.AUTOMATICO,
        precio: 36800000
    },
    {
        id: 13,
        marca: MARCAS.RENAULT,
        modelo: "Alaskan",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.AUTOMATICO,
        precio: 54840000
    },
    {
        id: 14,
        marca: MARCAS.FIAT,
        modelo: "Titano",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.AUTOMATICO,
        precio: 50900000
    },
    {
        id: 15,
        marca: MARCAS.TOYOTA,
        modelo: "Hilux",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.AUTOMATICO,
        precio: 63350000
    },
    {
        id: 16,
        marca: MARCAS.TOYOTA,
        modelo: "Corolla Cross",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 57754000
    },
    {
        id: 17,
        marca: MARCAS.VW,
        modelo: "T-Cross",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 31500000
    },
    {
        id: 18,
        marca: MARCAS.VW,
        modelo: "Nivus",
        tipo: TIPOS.SUV,
        caja: CAJAS.MANUAL,
        precio: 34700000
    },
    {
        id: 19,
        marca: MARCAS.VW,
        modelo: "Taos",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 47900000
    },
    {
        id: 20,
        marca: MARCAS.VW,
        modelo: "Tera",
        tipo: TIPOS.SUV,
        caja: CAJAS.MANUAL,
        precio: 29000000
    },
    {
        id: 21,
        marca: MARCAS.VW,
        modelo: "Tiguan",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 72300000
    },
    {
        id: 22,
        marca: MARCAS.VW,
        modelo: "Virtus",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.MANUAL,
        precio: 28900000
    },
    {
        id: 23,
        marca: MARCAS.VW,
        modelo: "Vento",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.MANUAL,
        precio: 64700000
    },
    {
        id: 24,
        marca: MARCAS.VW,
        modelo: "Polo",
        tipo: TIPOS.HATCHBACK,
        caja: CAJAS.MANUAL,
        precio: 24200000
    }
];