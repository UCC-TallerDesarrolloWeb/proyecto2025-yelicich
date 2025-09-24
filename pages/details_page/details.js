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
    document.getElementById("auto-imagen").src = `../../imagenes/cars/${textBase(auto.modelo)}/main_${textBase(auto.modelo)}.webp`;
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
    const modeloCar = textBase(auto.modelo);

    // mostrar la primera imagen como principal
    mainImg.src = `../../imagenes/cars/${modeloCar}/main_${modeloCar}.webp`;
    mainImg.alt = `${auto.marca} ${auto.modelo}`;

    // generar miniaturas
    thumbnailsContainer.innerHTML = "";

    const img_names = ["main", "right", "back", "front", "inside"];

    img_names.forEach((imgSrc, index) => {
        const thumb = document.createElement("img");
        let scrImage = `../../imagenes/cars/${modeloCar}/${imgSrc}_${modeloCar}.webp`;
        thumb.src = scrImage;
        thumb.alt = `${auto.marca} ${auto.modelo} vista ${index + 1}`;
        thumb.classList.add("image-thumbnail");

        // primera activa por defecto
        if (index === 0) {
        thumb.classList.add("active");
        }

        // click → cambiar principal y borde celeste
        thumb.addEventListener("click", () => {
        mainImg.src = scrImage;

        // limpiar active de todas
        document.querySelectorAll(".image-thumbnail")
            .forEach(t => t.classList.remove("active"));

        // marcar la actual
        thumb.classList.add("active");
        });

        thumb.onerror = () => { thumb.remove(); }; // Eliminar si no está

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
        let modeloCar = textBase(sim.modelo);
        let scrImage = `../../imagenes/cars/${modeloCar}/main_${modeloCar}.webp`;
        let scrImageHover = `../../imagenes/cars/${modeloCar}/hover_${modeloCar}.webp`;

        card.innerHTML = `
            <a href="../details_page/details.html?id=${sim.id}" class="link-detalle">
                <div class="car-image-container">
                    <img src="${scrImage}" alt="${sim.marca} ${sim.modelo}">
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
        if (scrImageHover) {
            card.addEventListener("mouseenter", () => { img.src = `${scrImageHover}`; });
            card.addEventListener("mouseleave", () => { img.src = `${scrImage}`; });
        }

        similaresList.appendChild(card);
    });
}

// ------ MODAL -------
// Variables
const precioBase = auto.precio;
let priceColor = 0
let priceWheel = 0
let interes = 0;

// Acciones modal
const resetModal = () => {
    priceColor = 0;
    priceWheel = 0;
    interes = 0;

    document.querySelectorAll(".option.active").forEach(el => el.classList.remove("active"));
    document.getElementById("financiacion-show").style.display = "none";
    
    document.getElementById("colors-subtitle").classList.remove("subtitle-error");
    document.getElementById("wheels-subtitle").classList.remove("subtitle-error");
    document.getElementById("metod-subtitle").classList.remove("subtitle-error");
    document.getElementById("financiation-subtitle").classList.remove("subtitle-error");

    updateResumen();
};

const closeModal = () => {
    document.getElementById("modal-pago").setAttribute("aria-hidden", "true");
    resetModal();
}

document.querySelector(".btn-reserve").addEventListener("click", () => {
    document.getElementById("modal-pago").setAttribute("aria-hidden", "false");
    resetModal();
});
document.getElementById("close-modal").addEventListener("click", () => {
    closeModal();
});
document.getElementById("modal-overlay").addEventListener("click", () => {
    closeModal();
});

// Render inicial
const updateResumen = () => {
    document.getElementById("modal-title").textContent = `${auto.marca} ${auto.modelo}`;
    document.getElementById("precio-base").textContent = `$${precioBase.toLocaleString("es-AR")}`;
    document.getElementById("precio-color").textContent = `$${priceColor.toLocaleString("es-AR")}`;
    document.getElementById("precio-rines").textContent = `$${priceWheel.toLocaleString("es-AR")}`;
    document.getElementById("precio-interes").textContent = `$${interes.toLocaleString("es-AR")}`;
    document.getElementById("precio-total").textContent = `$${(precioBase + priceColor + priceWheel + interes).toLocaleString("es-AR")}`;
};
updateResumen();

// Colores
document.querySelectorAll("#color-options .option").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#color-options .option").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const color = btn.getAttribute("value");

        switch (color) {
            case "blanco": priceColor = 0; break;
            case "negro": priceColor = 3000; break;
            case "gris_oscuro": priceColor = 7000; break;
            case "plata": priceColor = 6000; break;
            case "azul": priceColor = 4000; break;
            case "rojo": priceColor = 4500; break;
            default: priceColor = 0;
        }

        document.getElementById("colors-subtitle").classList.remove("subtitle-error");

        updateResumen();
    });
});

// Rines
document.querySelectorAll("#rines-options .option").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#rines-options .option").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const wheel = btn.getAttribute("value");

        switch (wheel) {
            case "magnetite_19": priceWheel = 0; break;
            case "perihelix_20": priceWheel = 5000; break;
            case "velarium_21": priceWheel = 10000; break;
            case "machina_22": priceWheel = 15000; break;
            default: priceWheel = 0;
        }
        
        document.getElementById("wheels-subtitle").classList.remove("subtitle-error");

        updateResumen();
    });
});

// Método de pago
document.querySelectorAll("#metodo-pago .option").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#metodo-pago .option").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const metodo = btn.getAttribute("value");
        console.log(metodo);

        switch (metodo) {
            case "contado": 
                document.getElementById("financiacion-show").style.display = "none";
                document.querySelectorAll("#financiacion .option").forEach(b => b.classList.remove("active"));
                interes = 0;
            break;
            case "tarjeta":
                document.getElementById("financiacion-show").style.display = "block";
            break;
            default: 
                document.getElementById("financiacion-show").style.display = "none";
                document.querySelectorAll("#financiacion .option").forEach(b => b.classList.remove("active"));
                interes = 0;
        }
        
        document.getElementById("metod-subtitle").classList.remove("subtitle-error");
        
        updateResumen();
    });
});

// Financiación
document.querySelectorAll("#financiacion .option").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#financiacion .option").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const cuotas = btn.getAttribute("value");

        switch (cuotas) {
            case "12cuotas": interes = precioBase * 0.05; break;
            case "24cuotas": interes = precioBase * 0.075; break;
            case "36cuotas": interes = precioBase * 0.10; break;
            case "48cuotas": interes = precioBase * 0.125; break;
            default: interes = 0;
        }

        document.getElementById("financiation-subtitle").classList.remove("subtitle-error");

        updateResumen();
    });
});

//Button
document.getElementById("btn-confirm").addEventListener("click", () => {
    const colorSel = document.querySelector("#color-options .active");
    const rinSel = document.querySelector("#rines-options .active");
    const metodoSel = document.querySelector("#metodo-pago .active");
    const cuotasSel = document.querySelector("#financiacion .active");

    if (!colorSel) {
        alert("Debe seleccionar un color exterior.");
        document.getElementById("colors-subtitle").classList.add("subtitle-error");
        return;
    }
    if (!rinSel) {
        alert("Debe seleccionar un tipo de rines.");
        document.getElementById("wheels-subtitle").classList.add("subtitle-error");
        return;
    }
    if (!metodoSel) {
        alert("Debe seleccionar un método de pago.");
        document.getElementById("metod-subtitle").classList.add("subtitle-error");
        return;
    }
    if (metodoSel.getAttribute("value") === "tarjeta" && !cuotasSel) {
        alert("Debe seleccionar una opción de financiación.");
        document.getElementById("financiation-subtitle").classList.add("subtitle-error");
        return;
    }

    alert("¡Gracias por su compra! Nos pondremos en contacto con usted pronto.");
    closeModal();
});