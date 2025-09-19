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
});

const TIPOS = Object.freeze({
    SUV: "SUV",
    SEDAN: "Sedán",
    PICKUP: "Pick-up",
    UTILITARIO: "Utilitario",
    DEPORTIVO: "Deportivo"
});

const CAJAS = Object.freeze({
    MANUAL: "Manual",
    AUTOMATICO: "Automático"
});

//Base de datos autos
const autos = [
    {
        id: 1,
        marca: MARCAS.TESLA,
        modelo: "Model S",
        tipo: TIPOS.DEPORTIVO,
        caja: CAJAS.AUTOMATICO,
        precio: 110000000
    },
    {
        id: 2,
        marca: MARCAS.JEEP,
        modelo: "Compass",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 50000000
    },
    {
        id: 3,
        marca: MARCAS.FORD,
        modelo: "Ranger",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 60000000
    },
    {
        id: 4,
        marca: MARCAS.TOYOTA,
        modelo: "Corolla",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.AUTOMATICO,
        precio: 65000000
    },
    {
        id: 5,
        marca: MARCAS.TESLA,
        modelo: "Model 3",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.AUTOMATICO,
        precio: 85000000
    },
    {
        id: 6,
        marca: MARCAS.TESLA,
        modelo: "Model X",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 90000000
    },
    {
        id: 7,
        marca: MARCAS.TESLA,
        modelo: "Model Y",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 80000000
    },
    {
        id: 8,
        marca: MARCAS.VW,
        modelo: "Amarok",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 69900000
    }
];