
let destinations = [];
let cart = [];


async function loadDestinations() {
  try {
    const response = await fetch("destinations.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar la lista de destinos.");
    }
    destinations = await response.json();
    showDestinations();
  } catch (error) {
    console.error("Error al cargar destinos:", error.message);
  }
}


function showDestinations() {
  const searchSection = document.getElementById("search");
  searchSection.innerHTML = "";

  const form = document.createElement("form");

  const destinationInput = document.createElement("select");
  destinationInput.innerHTML = "<option value=''>Selecciona un destino</option>";
  destinations.forEach((destination, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${destination.name} - $${destination.price}`;
    destinationInput.appendChild(option);
  });

  const dateInput = document.createElement("input");
  dateInput.type = "date";

  const addButton = document.createElement("button");
  addButton.textContent = "Agregar al Carrito";

  form.appendChild(destinationInput);
  form.appendChild(dateInput);
  form.appendChild(addButton);
  searchSection.appendChild(form);

  
  form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const selectedIndex = destinationInput.value;
    if (selectedIndex !== "") {
      const selectedDestination = destinations[selectedIndex];
      const selectedDate = dateInput.value;
      cart.push({ destination: selectedDestination, date: selectedDate });
      updateCart();
      saveCartToLocalStorage(); 
    } else {
      alert("Por favor selecciona un destino.");
    }
  });
}


function loadCartFromLocalStorage() {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    updateCart();
  }
}


function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function updateCart() {
  const cartSection = document.getElementById("cart");
  cartSection.innerHTML = ""; 

  const cartItemsList = document.createElement("ul");

  cart.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.destination.name} - $${item.destination.price} (${item.date})`;
    cartItemsList.appendChild(listItem);
  });

  cartSection.appendChild(cartItemsList);

  
  const checkoutButton = document.createElement("button");
  checkoutButton.textContent = "Realizar Compra";
  checkoutButton.addEventListener("click", () => {
    alert("Compra realizada con éxito. ¡Buen viaje!");
    cart = []; 
    updateCart();
    saveCartToLocalStorage();
  });

  cartSection.appendChild(checkoutButton);
}

// Evento de carga inicial de la página
document.addEventListener("DOMContentLoaded", () => {
  loadDestinations(); 
  loadCartFromLocalStorage(); 
});
