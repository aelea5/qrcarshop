// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    checkUserSession();
    initializeDashboard();
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
            
            // Update dashboard greeting with user's name
            const dashboardHeader = document.querySelector('.dashboard-header h1');
            if (dashboardHeader) {
                dashboardHeader.textContent = `Welcome back, ${data.user.name.split(' ')[0]}!`;
            }
        } else {
            // User is not logged in, redirect to auth page
            window.location.href = 'auth.html';
        }
    } catch (error) {
        console.error('Error checking session:', error);
        // Redirect to auth page on error
        window.location.href = 'auth.html';
    }
}

// Initialize dashboard functionality
function initializeDashboard() {
    // Add any dashboard-specific initialization here
    console.log('Dashboard initialized');
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
            // Redirect to homepage after logout
            window.location.href = 'index.html';
        } else {
            console.error('Logout failed:', data.message);
        }
    } catch (error) {
        console.error('Error during logout:', error);
        // Redirect anyway in case of error
        window.location.href = 'index.html';
    }
}

// Add event listeners for dashboard actions
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for internal links
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
    
    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.getAttribute('onclick')) return; // Skip if has onclick handler
            
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            // Reset after 2 seconds (replace with actual action completion)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) {
        return `${minutes}m ago`;
    } else if (hours < 24) {
        return `${hours}h ago`;
    } else {
        return `${days}d ago`;
    }
}

// Utility function to format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}
