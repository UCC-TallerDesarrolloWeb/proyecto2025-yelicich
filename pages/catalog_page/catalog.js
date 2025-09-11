const list = document.getElementById("list-products");
const select = document.getElementById("order-by");
const carsCount = document.getElementById("cars-count");

// Render de autos
function renderAutos(arr) {
    list.innerHTML = "";

    arr.forEach(auto => {
        const card = document.createElement("div");
        card.classList.add("card-car");

        card.innerHTML = `
        <a href="../details_page/details.html?id=${auto.id}" class="link-detalle">
            <div class="car-image-container">
            <img src="${auto.imagen}" alt="${auto.marca} ${auto.modelo}">
            </div>
            <div class="informacion">
            <div class="datos">
                <div class="marca">${auto.marca}</div>
                <div class="modelo">${auto.modelo}</div>
                <div class="tipo-caja">${auto.tipo} • ${auto.caja}</div>
            </div>
            <div class="precio">
                <span class="desde">Desde</span>
                <strong>$${auto.precio.toLocaleString("es-AR")}</strong>
            </div>
            </div>
        </a>
        `;

        list.appendChild(card);
    });
}

// Primera renderización
renderAutos(autos);

// Ordenar según select
if (select) {
    select.addEventListener("change", () => {
        let autosOrdenados = [...autos];

        if (select.value === "cheaper") {
        autosOrdenados.sort((a, b) => a.precio - b.precio);
        } else if (select.value === "expensive") {
        autosOrdenados.sort((a, b) => b.precio - a.precio);
        } else if (select.value === "most_recent") {
        autosOrdenados.sort((a, b) => b.id - a.id);
        }

        renderAutos(autosOrdenados);
    });
}

// Actualizar contador de autos
if (carsCount) {
    carsCount.textContent = `${autos.length} autos`;
}
