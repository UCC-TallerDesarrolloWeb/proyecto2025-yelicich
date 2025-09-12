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
} else {
    document.querySelector("main.detalle").innerHTML = "<p>Auto no encontrado</p>";
}

// Hacer dinámico la lista de imágenes
if (auto) {
    const mainImg = document.getElementById("auto-imagen");
    const thumbnailsContainer = document.querySelector(".images-thumbnails");

    // mostrar la primera imagen como principal
    mainImg.src = auto.imagenes[0];
    mainImg.alt = `${auto.marca} ${auto.modelo}`;

    // generar miniaturas
    thumbnailsContainer.innerHTML = "";
    auto.imagenes.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        thumb.src = imgSrc;
        thumb.alt = `${auto.marca} ${auto.modelo} vista ${index + 1}`;
        thumb.classList.add("image-thumbnail");

        // primera activa por defecto
        if (index === 0) {
        thumb.classList.add("active");
        }

        // click → cambiar principal y borde celeste
        thumb.addEventListener("click", () => {
        mainImg.src = imgSrc;

        // limpiar active de todas
        document.querySelectorAll(".image-thumbnail")
            .forEach(t => t.classList.remove("active"));

        // marcar la actual
        thumb.classList.add("active");
        });

        thumbnailsContainer.appendChild(thumb);
    });
}
