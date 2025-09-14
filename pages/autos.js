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

const marcas = [
    {
        nombre: MARCAS.TESLA,
        logo: "../../imagenes/marcas/tesla.webp",
    },
    {
        nombre: MARCAS.JEEP,
        logo: "../../imagenes/marcas/jeep.webp",
    },
    {
        nombre: MARCAS.FORD,
        logo: "../../imagenes/marcas/ford.webp",
    },
    {
        nombre: MARCAS.TOYOTA,
        logo: "../../imagenes/marcas/toyota.webp",
    },
    {
        nombre: MARCAS.CHEVROLET,
        logo: "../../imagenes/marcas/chevrolet.webp",
    },
    {
        nombre: MARCAS.VW,
        logo: "../../imagenes/marcas/volkswagen.webp",
    },
    {
        nombre: MARCAS.AUDI,
        logo: "../../imagenes/marcas/audi.webp",
    },
    {
        nombre: MARCAS.BMW,
        logo: "../../imagenes/marcas/bmw.webp",
    },
    {
        nombre: MARCAS.FIAT,
        logo: "../../imagenes/marcas/fiat.webp",
    },
    {
        nombre: MARCAS.HONDA,
        logo: "../../imagenes/marcas/honda.webp",
    },
    {
        nombre: MARCAS.JETOUR,
        logo: "../../imagenes/marcas/jetour.webp",
    },
    {
        nombre: MARCAS.NISSAN,
        logo: "../../imagenes/marcas/nissan.webp",
    },
    {
        nombre: MARCAS.PEUGEOT,
        logo: "../../imagenes/marcas/peugeot.webp",
    },
    {
        nombre: MARCAS.RAM,
        logo: "../../imagenes/marcas/ram.webp",
    },
    {
        nombre: MARCAS.RENAULT,
        logo: "../../imagenes/marcas/renault.webp",
    }
];

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
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
    },
    {
        id: 2,
        marca: MARCAS.JEEP,
        modelo: "Compass",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 50000000,
        imagenes: [
            "../../imagenes/cars/compass/main_compass.webp",
            "../../imagenes/cars/compass/right_compass.webp",
            "../../imagenes/cars/compass/back_compass.webp",
            "../../imagenes/cars/compass/front_compass.webp"
        ],
        img_hover: "../../imagenes/cars/compass/hover_compass.webp"
    },
    {
        id: 3,
        marca: MARCAS.FORD,
        modelo: "Ranger",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 60000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
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
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
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
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
    },
    {
        id: 6,
        marca: MARCAS.TESLA,
        modelo: "Model Y",
        tipo: TIPOS.SUV,
        caja: CAJAS.AUTOMATICO,
        precio: 90000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
    },
    {
        id: 7,
        marca: MARCAS.TESLA,
        modelo: "Model 3",
        tipo: TIPOS.SEDAN,
        caja: CAJAS.AUTOMATICO,
        precio: 85000000,
        imagenes: [
            "../../imagenes/car_image.webp"
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
    },
    {
        id: 8,
        marca: MARCAS.VW,
        modelo: "Amarok",
        tipo: TIPOS.PICKUP,
        caja: CAJAS.MANUAL,
        precio: 69900000,
        imagenes: [
            "../../imagenes/cars/amarok/main_amarok.webp",
            "../../imagenes/cars/amarok/right_amarok.webp",
            "../../imagenes/cars/amarok/back_amarok.webp",
            "../../imagenes/cars/amarok/front_amarok.webp"
        ],
        img_hover: "../../imagenes/cars/amarok/hover_amarok.webp"
    }
];