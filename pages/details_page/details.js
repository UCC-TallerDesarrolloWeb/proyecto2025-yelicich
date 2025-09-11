const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const auto = autos.find(a => a.id === id);

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
