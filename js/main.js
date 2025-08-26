// Main JavaScript for QRCarShop
document.addEventListener('DOMContentLoaded', function() {
    checkUserSession();
    initializeHomepage();
});

// Check user session and update header accordingly
async function checkUserSession() {
    try {
        const response = await fetch('php/session.php?action=check_session');
        const data = await response.json();
        
        const authBtn = document.querySelector('#authButton');
        
        if (data.logged_in && data.user) {
            // User is logged in, show user menu
            authBtn.classList.add('user-menu-btn');
            authBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>Welcome, ${data.user.name.split(' ')[0]}</span>
                <div class="user-dropdown">
                    <a href="dashboard.html">
                        <i class="fas fa-tachometer-alt"></i>
                        Dashboard
                    </a>
                    <a href="#" onclick="handleLogout()">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </a>
                </div>
            `;
        } else {
            // User is not logged in, show login button
            authBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>Log in / Sign up</span>
            `;
            authBtn.onclick = () => location.href = 'auth.html';
        }
    } catch (error) {
        console.error('Error checking session:', error);
        // Show login button on error
        const authBtn = document.querySelector('#authButton');
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Log in / Sign up</span>
        `;
        authBtn.onclick = () => location.href = 'auth.html';
    }
}

// Initialize homepage functionality
function initializeHomepage() {
    // Vehicle search functionality
    initializeVehicleSearch();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Location detection
    initializeLocationDetection();
}

// Vehicle search functionality
function initializeVehicleSearch() {
    const makeSelect = document.getElementById('make');
    const modelSelect = document.getElementById('model');
    
    if (makeSelect && modelSelect) {
        makeSelect.addEventListener('change', function() {
            updateModelOptions(this.value);
        });
    }
    
    // Handle search form submission
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performVehicleSearch();
        });
    }
}

// Update model options based on make selection
function updateModelOptions(make) {
    const modelSelect = document.getElementById('model');
    const models = {
        toyota: ['Camry', 'Corolla', 'Prius', 'RAV4', 'Highlander', 'Sienna'],
        honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Fit'],
        ford: ['F-150', 'Explorer', 'Escape', 'Mustang', 'Focus', 'Edge'],
        chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Camaro', 'Cruze'],
        nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano', 'Versa'],
        bmw: ['3 Series', '5 Series', 'X3', 'X5', 'X1', '7 Series'],
        mercedes: ['C-Class', 'E-Class', 'GLC', 'GLE', 'A-Class', 'S-Class'],
        audi: ['A4', 'A6', 'Q5', 'Q7', 'A3', 'Q3']
    };
    
    // Clear existing options
    modelSelect.innerHTML = '<option value="">Any Model</option>';
    
    if (make && models[make]) {
        models[make].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase().replace(' ', '-');
            option.textContent = model;
            modelSelect.appendChild(option);
        });
    }
}

// Perform vehicle search
function performVehicleSearch() {
    const formData = new FormData(document.querySelector('.search-form'));
    const searchParams = new URLSearchParams();
    
    for (let [key, value] of formData.entries()) {
        if (value) {
            searchParams.append(key, value);
        }
    }
    
    // Add min/max price handling
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;
    
    if (minPrice) searchParams.append('min_price', minPrice);
    if (maxPrice) searchParams.append('max_price', maxPrice);
    
    // Redirect to search results page (to be created)
    window.location.href = `search-results.html?${searchParams.toString()}`;
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Location detection functionality
function initializeLocationDetection() {
    const locationBtn = document.getElementById('use-location-btn');
    const locationInput = document.getElementById('location');
    
    if (locationBtn && locationInput) {
        locationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        reverseGeocode(position.coords.latitude, position.coords.longitude);
                    },
                    function(error) {
                        console.error('Geolocation error:', error);
                        locationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
                        alert('Unable to get your location. Please enter it manually.');
                    }
                );
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        });
    }
}

// Reverse geocode coordinates to location
function reverseGeocode(lat, lng) {
    // This would typically use a geocoding service like Google Maps API
    // For now, we'll just set a placeholder
    const locationInput = document.getElementById('location');
    const locationBtn = document.getElementById('use-location-btn');
    
    locationInput.value = 'Current Location'; // Placeholder
    locationBtn.innerHTML = '<i class="fas fa-check"></i>';
    
    setTimeout(() => {
        locationBtn.innerHTML = '<i class="fas fa-crosshairs"></i>';
    }, 2000);
}

// Handle logout
async function handleLogout() {
    try {
        const response = await fetch('php/session.php?action=logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Refresh page to update UI
            window.location.reload();
        } else {
            console.error('Logout failed:', data.message);
        }
    } catch (error) {
        console.error('Error during logout:', error);
        // Reload anyway
        window.location.reload();
    }
}
