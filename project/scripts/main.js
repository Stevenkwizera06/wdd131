// Shared footer info
function updateFooterInfo() {
  const yearSpan = document.querySelector("#currentYear");
  const lastModified = document.querySelector("#lastModified");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

// Mobile navigation toggle
function setupNavigation() {
  const toggle = document.querySelector("#navToggle");
  const nav = document.querySelector("#siteNav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Home: trip mood suggestion
function setupMoodSelector() {
  const select = document.querySelector("#tripMood");
  const output = document.querySelector("#moodSuggestion");

  if (!select || !output) return;

  const moodSuggestions = {
    relax: "Choose Kigali and Lake Kivu for gentle days, café visits, and calm boat rides.",
    adventure: "Combine Volcanoes National Park with Nyungwe for hiking, canopy walks, and wildlife.",
    culture: "Spend more time in Kigali and nearby towns for markets, museums, and local food."
  };

  function updateSuggestion(value) {
    const suggestion =
      moodSuggestions[value] ??
      "Pick a mood to see ideas for your itinerary.";
    output.textContent = `${suggestion}`;
  }

  select.addEventListener("change", () => {
    updateSuggestion(select.value);
  });

  updateSuggestion(select.value);
}

// Destinations page: render from array and filter
function setupDestinations() {
  const container = document.querySelector("#destinationsList");
  const filter = document.querySelector("#typeFilter");

  if (!container || !filter) return;

  const destinations = [
    {
      id: "kigali",
      name: "Kigali City",
      type: "city",
      description:
        "Clean, modern, and welcoming. Visit the Kigali Genocide Memorial, local cafés, and craft markets.",
      image: "../images/profile.jpg",
      alt: "Skyline and streets representing Kigali City"
    },
    {
      id: "volcanoes",
      name: "Volcanoes National Park",
      type: "nature",
      description:
        "Mist-covered volcanoes and gorilla trekking. Permits must be booked in advance.",
      image: "../images/rwanda-image.jpg",
      alt: "Mountains representing Volcanoes National Park"
    },
    {
      id: "lake-kivu",
      name: "Lake Kivu",
      type: "lake",
      description:
        "Peaceful lakeside towns like Gisenyi and Kibuye are perfect for sunsets and boat rides.",
      image: "../images/rwanda-image.jpg",
      alt: "Lake and hills representing Lake Kivu"
    }
  ];

  function createCard(destination) {
    const article = document.createElement("article");
    article.className = "destination-card";

    article.innerHTML = `
      <img src="${destination.image}" alt="${destination.alt}" loading="lazy">
      <div class="destination-body">
        <h2>${destination.name}</h2>
        <p class="destination-meta">${destination.type.toUpperCase()}</p>
        <p>${destination.description}</p>
      </div>
    `;

    return article;
  }

  function renderList(type) {
    container.innerHTML = "";

    const visibleDestinations =
      type === "all"
        ? destinations
        : destinations.filter((item) => item.type === type);

    if (visibleDestinations.length === 0) {
      const message = document.createElement("p");
      message.textContent = `No destinations found for that filter.`;
      container.appendChild(message);
      return;
    }

    visibleDestinations.forEach((destination) => {
      const card = createCard(destination);
      container.appendChild(card);
    });
  }

  filter.addEventListener("change", () => {
    renderList(filter.value);
  });

  renderList(filter.value);
}

// Trip form + localStorage
const STORAGE_KEY = "rwandaTripPlan";

function savePlan(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadPlan() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setupTripForm() {
  const form = document.querySelector("#tripForm");
  const message = document.querySelector("#formMessage");
  const savedPlanContainer = document.querySelector("#savedPlan");

  if (!form || !savedPlanContainer) return;

  function renderSavedPlan(plan) {
    if (!plan) {
      savedPlanContainer.innerHTML = `
        <p>No plan saved yet. Fill out the form above to create one.</p>
      `;
      return;
    }

    const places =
      plan.places && plan.places.length
        ? `<ul>${plan.places
            .map((place) => `<li>${place}</li>`)
            .join("")}</ul>`
        : "<p>No specific places selected.</p>";

    savedPlanContainer.innerHTML = `
      <p><strong>Name:</strong> ${plan.name}</p>
      <p><strong>Email:</strong> ${plan.email}</p>
      <p><strong>Arrival:</strong> ${plan.startDate || "Not set"}</p>
      <p><strong>Nights:</strong> ${plan.nights}</p>
      <p><strong>Focus:</strong> ${plan.focus}</p>
      <div>
        <strong>Places:</strong>
        ${places}
      </div>
      <p><strong>Notes:</strong> ${plan.notes || "None"}</p>
    `;
  }

  const existingPlan = loadPlan();
  renderSavedPlan(existingPlan);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();

    if (!name || !email) {
      if (message) {
        message.textContent = `Please fill in the required fields (name and email).`;
      }
      return;
    }

    const nightsRaw = formData.get("nights");
    const nights = Number(nightsRaw) || 0;
    const focus = formData.get("focus")?.toString() || "relax";
    const startDate = formData.get("startDate")?.toString() || "";
    const notes = formData.get("notes")?.toString().trim() || "";

    const placeValues = formData.getAll("places").map((p) => p.toString());

    const placeLabels = {
      kigali: "Kigali City",
      volcanoes: "Volcanoes National Park",
      lakeKivu: "Lake Kivu"
    };

    const placeNames = placeValues.map(
      (value) => placeLabels[value] ?? value
    );

    const plan = {
      name,
      email,
      startDate,
      nights: nights > 0 ? nights : 0,
      focus,
      places: placeNames,
      notes
    };

    savePlan(plan);
    renderSavedPlan(plan);

    if (message) {
      const nightsText =
        plan.nights > 0
          ? `${plan.nights} night${plan.nights === 1 ? "" : "s"} planned.`
          : "Trip length not set.";

      message.textContent = `${plan.name}, your plan has been saved. ${nightsText}`;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateFooterInfo();
  setupNavigation();
  setupMoodSelector();
  setupDestinations();
  setupTripForm();
});


