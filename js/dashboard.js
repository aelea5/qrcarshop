// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkUserSession();
    initializeDashboard();
});

// Check if user is logged in
async function checkUserSession() {
    try {
        const response = await fetch('php/session.php?action=check_session');
        const data = await response.json();
        
        if (!data.logged_in) {
            // Redirect to auth page if not logged in
            window.location.href = 'auth.html';
            return;
        }
        
        // Update UI with user info
        if (data.user) {
            document.getElementById('userName').textContent = data.user.name;
        }
        
    } catch (error) {
        console.error('Session check failed:', error);
        window.location.href = 'auth.html';
    }
}

// Initialize dashboard functionality
function initializeDashboard() {
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Quick action buttons
    initializeQuickActions();
}

// Handle logout
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
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            console.error('Logout failed:', data.message);
        }
        
    } catch (error) {
        console.error('Logout error:', error);
        // Force redirect even if logout request fails
        window.location.href = 'index.html';
    }
}

// Initialize quick action buttons
function initializeQuickActions() {
    // Create New Listing button
    const createListingBtn = document.querySelector('.btn.btn-primary');
    if (createListingBtn) {
        createListingBtn.addEventListener('click', function() {
            // TODO: Redirect to listing creation page
            alert('Listing creation feature coming soon!');
        });
    }
    
    // QR Code Generator button
    const qrCodeBtn = document.querySelector('.btn.btn-secondary');
    if (qrCodeBtn) {
        qrCodeBtn.addEventListener('click', function() {
            // TODO: Open QR code generator
            alert('QR Code generator coming soon!');
        });
    }
    
    // Analytics button
    const analyticsBtn = document.querySelector('.dashboard-card:nth-child(3) .btn');
    if (analyticsBtn) {
        analyticsBtn.addEventListener('click', function() {
            // TODO: Open analytics page
            alert('Analytics feature coming soon!');
        });
    }
}

// Utility function to format numbers
function formatNumber(num) {
    return new Intl.NumberFormat().format(num);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Load dashboard data (placeholder for future implementation)
async function loadDashboardData() {
    try {
        // TODO: Implement API calls to load:
        // - User's listings
        // - Recent activity
        // - Analytics data
        // - QR code statistics
        
        console.log('Loading dashboard data...');
        
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}

// Show success message
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

// Show error message
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

// Add notification styles
const notificationStyles = `
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    max-width: 400px;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    animation: slideInRight 0.3s ease;
}

.notification-success {
    background: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
}

.notification-error {
    background: #f8d7da;
    border: 1px solid #f5c6cb;
    color: #721c24;
}

.notification-info {
    background: #d1ecf1;
    border: 1px solid #bee5eb;
    color: #0c5460;
}

.notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);
