const reserveTable = document.querySelector("#reserve-table");
const placeOrder = document.querySelector("#place-order");
const pastOrders = document.querySelector("#past-orders");
const showMenu = document.querySelector("#show-menu");

const addDish = document.querySelector("#add-dish");
const addCustomer = document.querySelector("#add-customer");
const showOrders = document.querySelector("#show-orders");
const showReservation = document.querySelector("#show-reservation");

const totalOrders = document.querySelector("#total-orders");
const totalRevenue = document.querySelector("#total-revenue");
const employeeList = document.querySelector("#employees-list");

//customer buttons
reserveTable.addEventListener("click", (event)=>{
  window.location.href = "forms/reservation.html";
});
placeOrder.addEventListener("click", (event)=>{
  window.location.href = "forms/placeOrder.html"
});
pastOrders.addEventListener("click", (event)=>{
  window.location.href = "forms/pastOrders.html"
});
showMenu.addEventListener("click", (event)=>{
  window.location.href = "forms/menu.html"
});

//employee buttons
addDish.addEventListener("click", (event)=>{
  window.location.href = "forms/addDish.html"
});
addCustomer.addEventListener("click", (event)=>{
  window.location.href = "forms/addCustomer.html"
});
showOrders.addEventListener("click", (event)=>{
  window.location.href = "forms/showOrders.html"
});
showReservation.addEventListener("click", (event)=>{
  window.location.href = "forms/showReservations.html"
});

//manager buttons
totalOrders.addEventListener("click", (event)=>{
  window.location.href = "forms/seeTotalOrders.html"
});
totalRevenue.addEventListener("click", (event)=>{
  window.location.href = "forms/totalRevenue.html"
});
employeeList.addEventListener("click", (event)=>{
  window.location.href = "forms/employeeList.html"
});
