// Product array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate product select dropdown
function populateProducts() {
  const productSelect = document.getElementById("productName");
  
  if (!productSelect) {
    return;
  }

  // Clear existing options except the first placeholder
  const placeholder = productSelect.querySelector('option[disabled][selected]');
  productSelect.innerHTML = '';
  if (placeholder) {
    productSelect.appendChild(placeholder);
  }

  // Add product options dynamically
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

// Get current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  populateProducts();
});
