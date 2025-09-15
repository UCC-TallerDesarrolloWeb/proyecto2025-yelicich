const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const auto = autos.find(a => a.id === id);

//Remplazar textos e imagenes segun auto
if (auto) {
    document.getElementById("auto-nombre").innerHTML = `
        <span class="marca">${auto.marca}</span> 
        <span class="modelo">${auto.modelo}</span>
    `;
    document.getElementById("breadcrumb-current").textContent = `Detalles - ${auto.marca} ${auto.modelo}`;
    document.getElementById("auto-imagen").src = auto.imagen;
    document.getElementById("auto-imagen").alt = `${auto.marca} ${auto.modelo}`;
    document.getElementById("auto-type-box").textContent = `${auto.tipo} • ${auto.caja}`;
    document.getElementById("auto-precio").textContent = `$${auto.precio.toLocaleString("es-AR")}`;
    document.getElementById("auto-precio-tax").textContent = `Precio sin impuestos nacionales: $${(auto.precio * 0.9049774).toLocaleString("es-AR")}`;
    document.getElementById("location-brand").textContent = `Concesionario oficial de ${auto.marca}`;

    document.title = `${auto.marca} ${auto.modelo} - YeliMotors`;

    renderSimilares(auto);
} else {
    document.querySelector("main.detalle").innerHTML = "<p>Auto no encontrado</p>";
}

// Hacer dinámico la lista de imágenes
if (auto) {
    const mainImg = document.getElementById("auto-imagen");
    const thumbnailsContainer = document.querySelector(".images-thumbnails");

    // mostrar la primera imagen como principal
    mainImg.src = `../../imagenes/cars/${auto.imagenes[0]}`;
    mainImg.alt = `${auto.marca} ${auto.modelo}`;

    // generar miniaturas
    thumbnailsContainer.innerHTML = "";
    auto.imagenes.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = `../../imagenes/cars/${imgSrc}`;
        thumb.alt = `${auto.marca} ${auto.modelo} vista ${index + 1}`;
        thumb.classList.add("image-thumbnail");

        // primera activa por defecto
        if (index === 0) {
        thumb.classList.add("active");
        }

        // click → cambiar principal y borde celeste
        thumb.addEventListener("click", () => {
        mainImg.src = `../../imagenes/cars/${imgSrc}`;

        // limpiar active de todas
        document.querySelectorAll(".image-thumbnail")
            .forEach(t => t.classList.remove("active"));

        // marcar la actual
        thumb.classList.add("active");
        });

        thumbnailsContainer.appendChild(thumb);
    });
}

//Mostrar vehiculos similares
function renderSimilares(auto) {
    const similaresList = document.querySelector(".similares__list");
    similaresList.innerHTML = "";

    // Buscar autos del mismo segmento, excluyendo el actual
    let similares = autos.filter(a => a.tipo === auto.tipo && a.id !== auto.id);

    // Limitar a máximo 5
    similares = similares.slice(0, 5);

    // Si no hay similares, mostramos un mensaje
    if (similares.length === 0) {
        similaresList.innerHTML = "<p>No hay vehículos similares disponibles.</p>";
        return;
    }

    // Renderizar las cards
    similares.forEach(sim => {
        const card = document.createElement("div");
        card.classList.add("card-car");

        card.innerHTML = `
            <a href="../details_page/details.html?id=${sim.id}" class="link-detalle">
                <div class="car-image-container">
                    <img src="../../imagenes/cars/${sim.imagenes[0]}" alt="${sim.marca} ${sim.modelo}">
                </div>
                <div class="informacion">
                    <div class="datos">
                        <div class="car-marca">${sim.marca}</div>
                        <div class="car-modelo">${sim.modelo}</div>
                        <div class="car-tipo-caja">${sim.tipo} • ${sim.caja}</div>
                    </div>
                    <div class="car-precio">
                        <span class="car-desde">Desde</span>
                        <strong>$${sim.precio.toLocaleString("es-AR")}</strong>
                    </div>
                </div>
            </a>
        `;

        const img = card.querySelector("img");
        if (auto.img_hover) {
            card.addEventListener("mouseenter", () => {
                img.src = `../../imagenes/cars/${auto.img_hover}`;
            });
            card.addEventListener("mouseleave", () => {
                img.src = `../../imagenes/cars/${auto.imagenes[0]}`;
            });
        }

        similaresList.appendChild(card);
    });
}