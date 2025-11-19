// Temple data array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-765109-wallpaper.jpg"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-lds-1075606-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 40000,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-lds-1075606-wallpaper.jpg"
  }
];

// Function to create a temple card
function createTempleCard(temple) {
  const card = document.createElement('div');
  card.className = 'temple-card';
  
  card.innerHTML = `
    <h3>${temple.templeName}</h3>
    <p>LOCATION: ${temple.location}</p>
    <p>DEDICATED: ${temple.dedicated}</p>
    <p>SIZE: ${temple.area.toLocaleString()} sq ft</p>
    <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
  `;
  
  return card;
}

// Function to display temples
function displayTemples(filteredTemples) {
  const templeGrid = document.getElementById('templeGrid');
  templeGrid.innerHTML = ''; // Clear existing cards
  
  filteredTemples.forEach(temple => {
    const card = createTempleCard(temple);
    templeGrid.appendChild(card);
  });
}

// Filter functions
function filterTemples(filterType) {
  let filtered = [];
  const currentYear = new Date().getFullYear();
  
  switch(filterType) {
    case 'old':
      // Temples built before 1900
      filtered = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year < 1900;
      });
      document.getElementById('pageTitle').textContent = 'Old';
      break;
      
    case 'new':
      // Temples built after 2000
      filtered = temples.filter(temple => {
        const year = parseInt(temple.dedicated.split(',')[0]);
        return year > 2000;
      });
      document.getElementById('pageTitle').textContent = 'New';
      break;
      
    case 'large':
      // Temples larger than 90,000 square feet
      filtered = temples.filter(temple => temple.area > 90000);
      document.getElementById('pageTitle').textContent = 'Large';
      break;
      
    case 'small':
      // Temples smaller than 10,000 square feet
      filtered = temples.filter(temple => temple.area < 10000);
      document.getElementById('pageTitle').textContent = 'Small';
      break;
      
    case 'home':
    default:
      // Display all temples
      filtered = temples;
      document.getElementById('pageTitle').textContent = 'Home';
      break;
  }
  
  displayTemples(filtered);
}

// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');
const hamburgerIcon = document.getElementById('hamburgerIcon');

hamburgerBtn.addEventListener('click', () => {
  primaryNav.classList.toggle('open');
  
  if (primaryNav.classList.contains('open')) {
    hamburgerIcon.textContent = '✕';
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
  } else {
    hamburgerIcon.textContent = '☰';
    hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
  }
});

// Navigation link event listeners
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a[data-filter]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterType = link.getAttribute('data-filter');
      filterTemples(filterType);
      
      // Close mobile menu if open
      if (window.innerWidth < 768) {
        primaryNav.classList.remove('open');
        hamburgerIcon.textContent = '☰';
        hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
      }
    });
  });
  
  // Display all temples on page load
  filterTemples('home');
  
  // Get the current year for the copyright
  const currentYear = new Date().getFullYear();
  document.getElementById("currentyear").textContent = currentYear;
  
  // Get the last modified date
  document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;
});

