const reserveTable = document.querySelector("#reserve-table");
const placeOrder = document.querySelector("#place-order");
const pastOrders = document.querySelector("#past-orders");
const body = document.querySelector("body");

reserveTable.addEventListener("click", (event)=>{
  window.location.href = "forms/reservation.html";
})
