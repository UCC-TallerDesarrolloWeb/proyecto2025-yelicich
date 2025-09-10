const autos = [
    {
        marca: "Tesla",
        modelo: "Model S",
        tipo: "Deportivo • Automático",
        precio: 120000000,
        imagen: "../../imagenes/car_image.webp"
    },
    {
        marca: "Ford",
        modelo: "Ranger",
        tipo: "Pick-up • Manual",
        precio: 80000000,
        imagen: "../../imagenes/car_image.webp"
    },
    {
        marca: "Toyota",
        modelo: "Corolla",
        tipo: "Sedán • Automático",
        precio: 65000000,
        imagen: "../../imagenes/car_image.webp"
    }
];

const list = document.getElementById("list-products");

autos.forEach(auto => {
    const card = document.createElement("div");
    card.classList.add("card-car");

    card.innerHTML = `
        <div class="imagen">
        <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
        </div>
        <div class="informacion">
        <div class="datos">
            <div class="marca">${auto.marca}</div>
            <div class="modelo">${auto.modelo}</div>
            <div class="tipo-caja">${auto.tipo}</div>
        </div>
        <div class="precio">
            <span>Desde</span>
            <strong>$${auto.precio.toLocaleString("es-AR")}</strong>
        </div>
        </div>
    `;

    list.appendChild(card);
});