const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const auto = autos.find(a => a.id === id);

if (auto) {
  // si existe h1#auto-nombre en el HTML
    const titulo = document.getElementById("auto-nombre");
    if (titulo) titulo.textContent = `${auto.marca} ${auto.modelo}`;

    document.getElementById("auto-imagen").src = auto.imagen;
    document.getElementById("auto-imagen").alt = `${auto.marca} ${auto.modelo}`;
    document.getElementById("auto-marca").textContent = auto.marca;
    document.getElementById("auto-modelo").textContent = auto.modelo;
    document.getElementById("auto-tipo").textContent = auto.tipo;
    document.getElementById("auto-caja").textContent = auto.caja;
    document.getElementById("auto-precio").textContent =
        `$${auto.precio.toLocaleString("es-AR")}`;
} else {
    document.querySelector("main.detalle").innerHTML = "<p>Auto no encontrado</p>";
}
