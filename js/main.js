// Vehicle models data organized by make
const vehicleModels = {
    toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Sienna'],
    honda: ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Ridgeline', 'HR-V'],
    ford: ['F-150', 'Explorer', 'Escape', 'Mustang', 'Edge', 'Expedition', 'Bronco'],
    chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Tahoe', 'Suburban', 'Camaro', 'Corvette'],
    nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Maxima', 'Titan', 'Armada'],
    bmw: ['3 Series', '5 Series', 'X3', 'X5', 'X7', '7 Series', 'i4'],
    mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS', 'A-Class'],
    audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7', 'Q8']
};

// DOM elements
const makeSelect = document.getElementById('make');
const modelSelect = document.getElementById('model');
const searchForm = document.querySelector('.search-form');
const locationInput = document.getElementById('location');
const useLocationBtn = document.getElementById('use-location-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchForm();
    addEventListeners();
    checkUserSession();
});

// Initialize search form functionality
function initializeSearchForm() {
    // Populate year dropdown with current year and previous years
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    
    // Clear existing options except "Any Year"
    yearSelect.innerHTML = '<option value="">Any Year</option>';
    
    // Add years from current year back to 2000
    for (let year = currentYear; year >= 2000; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

// Add event listeners
function addEventListeners() {
    // Make selection changes model options
    makeSelect.addEventListener('change', function() {
        updateModelOptions();
    });

    // Form submission
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSearch();
    });

    // Location functionality
    useLocationBtn.addEventListener('click', function() {
        getUserLocation();
    });

    // Price input formatting - removed automatic formatting to prevent input issues
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    // Add optional formatting on blur (when user finishes typing) to avoid input interference
    [minPriceInput, maxPriceInput].forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                formatPriceInput(this);
            }
        });
        
        // Allow users to clear formatting when they focus to edit
        input.addEventListener('focus', function() {
            this.value = this.value.replace(/[^\d]/g, '');
        });
    });
}

// Update model dropdown based on selected make
function updateModelOptions() {
    const selectedMake = makeSelect.value;
    
    // Clear current model options
    modelSelect.innerHTML = '<option value="">Any Model</option>';
    
    // If a make is selected, populate models
    if (selectedMake && vehicleModels[selectedMake]) {
        vehicleModels[selectedMake].forEach(model => {
            const option = document.createElement('option');
            option.value = model.toLowerCase().replace(/\s+/g, '-');
            option.textContent = model;
            modelSelect.appendChild(option);
        });
        
        // Enable model select
        modelSelect.disabled = false;
    } else {
        // Disable model select if no make is selected
        modelSelect.disabled = true;
    }
}

// Handle search form submission
function handleSearch() {
    const searchData = {
        make: makeSelect.value,
        model: modelSelect.value,
        year: document.getElementById('year').value,
        location: document.getElementById('location').value,
        searchRadius: document.getElementById('search-radius').value,
        minPrice: document.getElementById('min-price').value,
        maxPrice: document.getElementById('max-price').value
    };

    // Show loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalContent = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;

    // Simulate search (in real implementation, this would make an API call)
    setTimeout(() => {
        // Reset button
        searchBtn.innerHTML = originalContent;
        searchBtn.disabled = false;

        // Log search parameters (in real implementation, redirect to results page)
        console.log('Search parameters:', searchData);
        
        // Show search results message
        showSearchMessage(searchData);
    }, 1500);
}

// Show search results message
function showSearchMessage(searchData) {
    // Create search criteria string
    let criteria = [];
    if (searchData.make) criteria.push(`Make: ${makeSelect.options[makeSelect.selectedIndex].text}`);
    if (searchData.model) criteria.push(`Model: ${modelSelect.options[modelSelect.selectedIndex].text}`);
    if (searchData.year) criteria.push(`Year: ${searchData.year}`);
    if (searchData.location) {
        const radiusText = searchData.searchRadius === 'nationwide' ? 'nationwide' : `within ${searchData.searchRadius} miles of ${searchData.location}`;
        criteria.push(`Location: ${radiusText}`);
    }
    if (searchData.minPrice) criteria.push(`Min Price: $${formatNumber(searchData.minPrice)}`);
    if (searchData.maxPrice) criteria.push(`Max Price: $${formatNumber(searchData.maxPrice)}`);

    const message = criteria.length > 0 
        ? `Searching for vehicles with: ${criteria.join(', ')}`
        : 'Searching all available vehicles';

    // Show notification (in a real app, this would redirect to results page)
    showNotification(message, 'success');
}

// Format price input with commas (only called when needed, not on every keystroke)
function formatPriceInput(input) {
    let value = input.value.replace(/[^\d]/g, ''); // Remove any non-digit characters
    if (value && !isNaN(value) && value.length > 0) {
        // Only format if there's a valid number
        input.value = formatNumber(value);
    }
}

// Format number with commas
function formatNumber(num) {
    // Convert to number and format with commas
    const number = typeof num === 'string' ? parseInt(num.replace(/[^\d]/g, '')) : parseInt(num);
    return isNaN(number) ? '' : number.toLocaleString();
}

// Show notification message
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 90%;
        text-align: center;
        animation: slideInDown 0.5s ease;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInDown 0.5s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// Smooth scroll for any anchor links (if added later)
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add some interactive hover effects for vehicle cards
document.addEventListener('DOMContentLoaded', function() {
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    vehicleCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real implementation, this would navigate to vehicle detail page
            const title = this.querySelector('.vehicle-title').textContent;
            showNotification(`Clicked on ${title}. In a full implementation, this would open the vehicle details page.`, 'info');
        });

        // Add cursor pointer style
        card.style.cursor = 'pointer';
    });
});

// Get user's current location
function getUserLocation() {
    const btn = useLocationBtn;
    const originalContent = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                // In a real implementation, you would use a geocoding service
                // to convert coordinates to city/zip. For demo, we'll use a placeholder
                reverseGeocode(lat, lon);
            },
            // Error callback
            function(error) {
                console.error('Geolocation error:', error);
                showNotification('Unable to get your location. Please enter manually.', 'info');
                
                // Reset button
                btn.innerHTML = originalContent;
                btn.disabled = false;
            },
            // Options
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    } else {
        showNotification('Geolocation is not supported by this browser.', 'info');
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }
}

// Simulate reverse geocoding (in real implementation, use Google Maps API or similar)
function reverseGeocode(lat, lon) {
    const btn = useLocationBtn;
    const originalContent = '<i class="fas fa-crosshairs"></i>';
    
    // Simulate API delay
    setTimeout(() => {
        // Demo location based on coordinates (in real implementation, use proper geocoding)
        const demoLocations = [
            'Los Angeles, CA',
            'New York, NY',
            'Chicago, IL',
            'Houston, TX',
            'Phoenix, AZ',
            'Philadelphia, PA',
            'San Antonio, TX',
            'San Diego, CA',
            'Dallas, TX',
            'San Jose, CA'
        ];
        
        const randomLocation = demoLocations[Math.floor(Math.random() * demoLocations.length)];
        locationInput.value = randomLocation;
        
        showNotification(`Location set to ${randomLocation}`, 'success');
        
        // Reset button
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 2000);
}

// Check user session (placeholder function, implement actual session checking logic)
async function checkUserSession() {
    try {
        const response = await fetch('php/session.php?action=check_session');
        const data = await response.json();
        
        const authBtn = document.getElementById('authButton');
        
        if (data.logged_in && data.user) {
            // User is logged in, show user menu
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
            
            authBtn.classList.add('user-menu-btn');
            
            // Update hero section for logged-in users
            updateHeroForLoggedInUser(data.user.name.split(' ')[0]);
            
        } else {
            // User is not logged in, show login/signup button
            authBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>Log in / Sign up</span>
            `;
            authBtn.onclick = () => location.href = 'auth.html';
        }
        
    } catch (error) {
        console.log('Session check failed:', error);
        // Keep default login/signup button
    }
}

// Update hero section for logged-in users
function updateHeroForLoggedInUser(firstName) {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero .hero-subtitle');
    
    if (heroTitle) {
        heroTitle.innerHTML = `Welcome back, ${firstName}!<br>Ready to list more cars?`;
    }
    
    if (heroSubtitle) {
        heroSubtitle.textContent = 'Your QR code listings are bringing in more leads. Keep the momentum going!';
    }
}

// Handle logout from main page
async function handleLogout() {
    try {
        const response = await fetch('php/session.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'action=logout'
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Refresh the page to update UI
            window.location.reload();
        } else {
            console.error('Logout failed:', data.message);
        }
        
    } catch (error) {
        console.error('Logout error:', error);
        // Force reload even if logout request fails
        window.location.reload();
    }
}
