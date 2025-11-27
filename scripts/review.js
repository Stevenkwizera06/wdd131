// Handle localStorage counter for reviews
function updateReviewCounter() {
  let reviewCount = localStorage.getItem("reviewCount");
  
  if (reviewCount === null) {
    reviewCount = 0;
  } else {
    reviewCount = parseInt(reviewCount, 10);
  }
  
  // Increment the counter
  reviewCount++;
  
  // Save back to localStorage
  localStorage.setItem("reviewCount", reviewCount);
  
  // Display the count
  const countElement = document.getElementById("reviewCount");
  if (countElement) {
    countElement.textContent = reviewCount;
  }
}

// Display review details from URL parameters
function displayReviewDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const reviewDetails = document.getElementById("reviewDetails");
  
  if (!reviewDetails) {
    return;
  }

  const productName = urlParams.get("productName");
  const rating = urlParams.get("rating");
  const installDate = urlParams.get("installDate");
  const features = urlParams.getAll("features");
  const writtenReview = urlParams.get("writtenReview");
  const userName = urlParams.get("userName");

  let html = "<dl>";

  if (productName) {
    // Find product name from products array
    const products = [
      { id: "fc-1888", name: "flux capacitor" },
      { id: "fc-2050", name: "power laces" },
      { id: "fs-1987", name: "time circuits" },
      { id: "ac-2000", name: "low voltage reactor" },
      { id: "jj-1969", name: "warp equalizer" }
    ];
    const product = products.find(p => p.id === productName);
    html += `<dt>Product:</dt><dd>${product ? product.name : productName}</dd>`;
  }

  if (rating) {
    let stars = "";
    for (let i = 0; i < parseInt(rating); i++) {
      stars += "★";
    }
    html += `<dt>Rating:</dt><dd>${stars} (${rating}/5)</dd>`;
  }

  if (installDate) {
    const date = new Date(installDate);
    const formattedDate = date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
    html += `<dt>Installation Date:</dt><dd>${formattedDate}</dd>`;
  }

  if (features && features.length > 0) {
    html += `<dt>Useful Features:</dt><dd>${features.join(", ")}</dd>`;
  }

  if (writtenReview) {
    html += `<dt>Review:</dt><dd>${writtenReview}</dd>`;
  }

  if (userName) {
    html += `<dt>Reviewer:</dt><dd>${userName}</dd>`;
  }

  html += "</dl>";
  reviewDetails.innerHTML = html;
}

// Get current year and last modified date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = "Last Modification: " + document.lastModified;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  updateReviewCounter();
  displayReviewDetails();
});
