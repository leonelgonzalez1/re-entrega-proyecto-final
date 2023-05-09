//Menu interactivo

var ingredientes_opcion1 = [
  "Doble Carne",
  "Doble Chedar",
  "Lechuga",
  "Tomate",
  "Salsa Especial",
  "Pepinillos",
  "Pan Parmesano",
];
var ingredientes_opcion2 = [
  "Doble Carne",
  "Doble Chedar",
  "Cebolla",
  "Beicon",
  "Manteca",
];
var ingredientes_opcion3 = [
  "Doble Carne",
  "Doble Chedar",
  "Beicon",
  "Jalapeños",
  "Huevo",
];
var ingredientes_opcion4 = [
  "Doble Carne",
  "Doble Chedar",
  "Beicon",
  "Cebolla Confitada",
  "Morron",
];

function cargar(opcion) {
  var nombre = document.getElementById("nombre");
  var descripcion = document.getElementById("descripcion");
  var fotoPrincipal = document.getElementById("fotoPrincipal");
  var circulo = document.getElementById("circulo");
  var ingredientes = document.getElementById("ingredientes");

  if (opcion == 1) {
    nombre.innerHTML = "La Gran Chamaca";
    descripcion.innerHTML =
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore sunt quas officia sapiente? Velit.";
    fotoPrincipal.src = "img/hamburguesa2.jpg";
    ingredientes.innerHTML = "";
    for (x = 0; x < ingredientes_opcion1.length; x++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList = "fa-solid fa-check";
      li.appendChild(i);
      const txt = document.createElement("txt");
      txt.innerHTML = ingredientes_opcion1[x];
      li.appendChild(txt);
      ingredientes.appendChild(li);
    }
  }
  if (opcion == 2) {
    nombre.innerHTML = "Doble Cuarto";
    descripcion.innerHTML =
      "At architecto id, quia, saepe non cum sapiente, est aut aspernatur perferendis dignissimos unde!";
    fotoPrincipal.src = "img/hamburguesa1.jpg";
    ingredientes.innerHTML = "";
    for (x = 0; x < ingredientes_opcion2.length; x++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList = "fa-solid fa-check";
      li.appendChild(i);
      const txt = document.createElement("txt");
      txt.innerHTML = ingredientes_opcion2[x];
      li.appendChild(txt);
      ingredientes.appendChild(li);
    }
  }
  if (opcion == 3) {
    nombre.innerHTML = "Mexicana";
    descripcion.innerHTML =
      "Inventore magni voluptatum adipisci harum maiores architecto vero! Vel suscipit tempora pariatur ad, vero facilis ex, quibusdam iusto, asperiores eum laboriosam illum?";
    fotoPrincipal.src = "img/hamburguesa2.jpg";
    ingredientes.innerHTML = "";
    for (x = 0; x < ingredientes_opcion3.length; x++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList = "fa-solid fa-check";
      li.appendChild(i);
      const txt = document.createElement("txt");
      txt.innerHTML = ingredientes_opcion3[x];
      li.appendChild(txt);
      ingredientes.appendChild(li);
    }
  }
  if (opcion == 4) {
    nombre.innerHTML = "Texana";
    descripcion.innerHTML =
      "Inventore magni voluptatum adipisci harum maiores architecto vero! Vel suscipit tempora";
    fotoPrincipal.src = "img/hamburguesa3.jpg";
    ingredientes.innerHTML = "";
    for (x = 0; x < ingredientes_opcion4.length; x++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList = "fa-solid fa-check";
      li.appendChild(i);
      const txt = document.createElement("txt");
      txt.innerHTML = ingredientes_opcion4[x];
      li.appendChild(txt);
      ingredientes.appendChild(li);
    }
  }
}
// carrito de compras
let btnCarrito = document.querySelector(".btn-carrito");
let spanCantidad = document.createElement("span");
spanCantidad.classList.add("cantidad-carrito");
btnCarrito.appendChild(spanCantidad);
let modalCarrito = document.getElementById("carrito-compra");
let listaCarrito = [];
let total = 0;

function eliminarDelCarrito(index) {
  const producto = listaCarrito[index];
  total -= parseInt(producto.precio);
  listaCarrito.splice(index, 1);
  actualizarModalCarrito();
  actualizarCantidadCarrito();

  localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
  localStorage.setItem("total", total);
  localStorage.setItem("cantidadCarrito", listaCarrito.length);
}
function actualizarCantidadCarrito() {
  let cantidad = listaCarrito.length;
  spanCantidad.innerHTML = cantidad;
}
function actualizarModalCarrito() {
  // vaciar contenido anterior del modal
  modalCarrito.innerHTML = "";

  // generar elementos HTML para cada producto en listaCarrito
  for (let i = 0; i < listaCarrito.length; i++) {
    let producto = listaCarrito[i];
    let item = document.createElement("li");
    item.innerHTML = `
    <span>${producto.nombre} x ${producto.cantidad} - $${producto.precioTotal}</span>
    <button class="eliminar btn btn-danger" onclick="eliminarDelCarrito(${i})">Eliminar</button>
  `;
    modalCarrito.appendChild(item);
  } // agregar elemento HTML adicional con el valor total de los precios de los productos
  let itemTotal = document.createElement("li");
  itemTotal.classList.add("total-precio");
  itemTotal.innerHTML = "Total: $" + total;
  modalCarrito.appendChild(itemTotal);
}

function agregarAlCarrito(nombre, precio) {
  // verificar si el producto ya está en el carrito
  let productoExistente = listaCarrito.find((p) => p.nombre === nombre);
  // crear objeto del producto
  if (productoExistente) {
    // si el producto ya está en el carrito, actualizamos la cantidad y el precio
    productoExistente.cantidad += 1;
    productoExistente.precioTotal =
      productoExistente.cantidad * parseInt(precio);
  } else {
    // si el producto no está en el carrito, creamos un nuevo objeto de producto
    let producto = {
      nombre: nombre,
      precio: parseInt(precio),
      cantidad: 1,
      precioTotal: parseInt(precio),
    };
    // añadir producto a listaCarrito
    listaCarrito.push(producto);
  }
  total = listaCarrito.reduce((acc, p) => acc + p.precioTotal, 0);
  // actualizar contenido de modalCarrito
  actualizarModalCarrito();
  actualizarCantidadCarrito();
  Toastify({
    text: "Producto agregado",
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
  let cantidadCarrito = document.getElementById("cantidad-carrito");
  cantidadCarrito.innerText = listaCarrito.reduce(
    (acc, p) => acc + p.cantidad,
    0
  );
  //guardar en LS
  localStorage.setItem("listaCarrito", JSON.stringify(listaCarrito));
  localStorage.setItem("total", total);
  localStorage.setItem("cantidadCarrito", listaCarrito.length);
}

let btnAgregarAlCarrito = document.getElementsByClassName("btn-compra");
for (let i = 0; i < btnAgregarAlCarrito.length; i++) {
  btnAgregarAlCarrito[i].addEventListener("click", function () {
    let nombre = this.parentNode.querySelector("h3").innerHTML;

    let precio = this.parentNode.querySelector("span").innerHTML;
    agregarAlCarrito(nombre, precio);
  });
}

//GUARDAR EN LS
if (localStorage.getItem("listaCarrito")) {
  listaCarrito = JSON.parse(localStorage.getItem("listaCarrito"));
  total = parseInt(localStorage.getItem("total")) || 0;
  actualizarModalCarrito();
}
if (localStorage.getItem("cantidadCarrito")) {
  let cantidad = parseInt(localStorage.getItem("cantidadCarrito"));
  spanCantidad.innerHTML = cantidad;
} else {
  spanCantidad.innerHTML = 0;
}
