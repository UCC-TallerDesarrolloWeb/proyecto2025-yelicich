const MARCAS = Object.freeze({
    TESLA: "Tesla",
    JEEP: "Jeep",
    FORD: "Ford",
    TOYOTA: "Toyota"
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


const autos = [
    {
        id: 1,
        marca: MARCAS.TESLA,
        modelo: "Model S",
        tipo: TIPOS.DEPORTIVO,
        caja: CAJAS.AUTOMATICO,
        precio: 110000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ]
    },
    {
        id: 2,
        marca: MARCAS.JEEP,
        modelo: "Compass",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 80000000,
        imagenes: [
            "../../imagenes/cars/compass/left_compass.webp",
            "../../imagenes/cars/compass/front_compass.webp",
            "../../imagenes/cars/compass/right_compass.webp",
            "../../imagenes/cars/compass/back_compass.webp"
        ]
    },
    {
        id: 3,
        marca: MARCAS.FORD,
        modelo: "Ranger",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 80000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ]
    },
    {
        id: 4,
        marca: MARCAS.TOYOTA,
        modelo: "Corolla",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.AUTOMATICO,
        precio: 65000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ]
    },
    {
        id: 5,
        marca: MARCAS.TESLA,
        modelo: "Model X",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 80000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ]
    }
];