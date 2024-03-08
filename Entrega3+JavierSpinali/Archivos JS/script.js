
const destinations = [
  { name: "Paris", price: 500, image: "imagenes/Paris.jpg" },
  { name: "Tokyo", price: 1000, image: "imagenes/Tokio.jpg" },
  { name: "New York", price: 800, image: "imagenes/Nueva York.jpg" },
  { name: "London", price: 600, image: "imagenes/Londres.jpg" }
];
let cart = [];


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


document.addEventListener("DOMContentLoaded", () => {
  showDestinations();
  loadCartFromLocalStorage(); 
});
