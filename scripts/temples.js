// Hamburger Menu Toggle
const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');
const hamburgerIcon = document.getElementById('hamburgerIcon');

// Toggle navigation menu
hamburgerBtn.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    
    // Change icon between hamburger (☰) and close (✕)
    if (primaryNav.classList.contains('open')) {
        hamburgerIcon.textContent = '✕';
        hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
    } else {
        hamburgerIcon.textContent = '☰';
        hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
    }
});

// Close menu when clicking on a link (mobile view)
const navLinks = primaryNav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            primaryNav.classList.remove('open');
            hamburgerIcon.textContent = '☰';
            hamburgerBtn.setAttribute('aria-label', 'Toggle navigation menu');
        }
    });
});

// Handle broken images - replace with placeholder if image fails to load
// This runs immediately and also on DOMContentLoaded to catch images that load early
function setupImageErrorHandling() {
    const images = document.querySelectorAll('.temple-grid img');
    images.forEach(img => {
        // Check if image already failed to load
        if (!img.complete || img.naturalHeight === 0) {
            // Set up error handler
            img.addEventListener('error', function() {
                if (this.src && !this.src.includes('placeholder.com')) {
                    this.src = `https://via.placeholder.com/800x500/4a148c/ffffff?text=${encodeURIComponent(this.alt || 'Temple Image')}`;
                }
            }, { once: true });
        }
    });
}

// Run immediately and on DOMContentLoaded
setupImageErrorHandling();
document.addEventListener('DOMContentLoaded', setupImageErrorHandling);

// Get the current year for the copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

