// Seller Guide JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeGuideNavigation();
    checkUserSession();
});

// Initialize guide navigation
function initializeGuideNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const guideSections = document.querySelectorAll('.guide-section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            switchGuideSection(targetSection, navTabs, guideSections);
        });
    });
    
    // Initialize smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Add progress tracking
    initializeProgressTracking();
}

// Switch guide sections
function switchGuideSection(targetSection, navTabs, guideSections) {
    // Update active tab
    navTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-section="${targetSection}"]`).classList.add('active');
    
    // Update active section
    guideSections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`${targetSection}-section`).classList.add('active');
    
    // Scroll to guide nav for better UX
    document.querySelector('.guide-nav').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Track section view
    trackSectionView(targetSection);
}

// Check user session and update header accordingly
async function checkUserSession() {
    try {
        const response = await fetch('php/session.php?action=check_session');
        const data = await response.json();
        
        const authBtn = document.querySelector('.auth-btn');
        
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
        } else {
            // User not logged in, show login button
            authBtn.innerHTML = `
                <i class="fas fa-user"></i>
                <span>Log in / Sign up</span>
            `;
            authBtn.onclick = () => location.href = 'auth.html';
        }
        
    } catch (error) {
        console.error('Session check failed:', error);
        // Default to login button on error
        const authBtn = document.querySelector('.auth-btn');
        authBtn.innerHTML = `
            <i class="fas fa-user"></i>
            <span>Log in / Sign up</span>
        `;
        authBtn.onclick = () => location.href = 'auth.html';
    }
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

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Initialize progress tracking
function initializeProgressTracking() {
    const sections = document.querySelectorAll('.guide-section');
    const progress = {
        photos: false,
        descriptions: false,
        market: false,
        condition: false
    };
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('sellerGuideProgress');
    if (savedProgress) {
        Object.assign(progress, JSON.parse(savedProgress));
    }
    
    // Update UI based on progress
    updateProgressUI(progress);
    
    // Track scroll-based progress
    window.addEventListener('scroll', throttle(() => {
        trackScrollProgress(progress);
    }, 250));
}

// Track section view
function trackSectionView(sectionName) {
    // Update progress
    const progress = getProgress();
    progress[sectionName] = true;
    saveProgress(progress);
    updateProgressUI(progress);
    
    // Analytics tracking (if implemented)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'section_view', {
            'section_name': sectionName,
            'page_title': 'Seller Guide'
        });
    }
}

// Track scroll-based progress
function trackScrollProgress(progress) {
    const sections = document.querySelectorAll('.guide-section');
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        if (!section.classList.contains('active')) return;
        
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollTop;
        const sectionHeight = rect.height;
        
        // If user has scrolled 70% through the section, mark as viewed
        const scrolledThrough = (scrollTop + windowHeight - sectionTop) / sectionHeight;
        if (scrolledThrough > 0.7) {
            const sectionId = section.id.replace('-section', '');
            if (!progress[sectionId]) {
                progress[sectionId] = true;
                saveProgress(progress);
                updateProgressUI(progress);
                showProgressNotification(`Great! You've completed the "${getSectionName(sectionId)}" section.`);
            }
        }
    });
}

// Get section display name
function getSectionName(sectionId) {
    const names = {
        photos: 'Photo Tips',
        descriptions: 'Description Guide',
        market: 'Market Knowledge',
        condition: 'Condition Assessment'
    };
    return names[sectionId] || sectionId;
}

// Progress management functions
function getProgress() {
    const saved = localStorage.getItem('sellerGuideProgress');
    return saved ? JSON.parse(saved) : {
        photos: false,
        descriptions: false,
        market: false,
        condition: false
    };
}

function saveProgress(progress) {
    localStorage.setItem('sellerGuideProgress', JSON.stringify(progress));
}

function updateProgressUI(progress) {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        const section = tab.getAttribute('data-section');
        if (progress[section]) {
            tab.classList.add('completed');
            if (!tab.querySelector('.completion-check')) {
                const check = document.createElement('i');
                check.className = 'fas fa-check-circle completion-check';
                check.style.color = 'var(--guide-success)';
                check.style.marginLeft = '0.5rem';
                tab.appendChild(check);
            }
        }
    });
    
    // Show completion message if all sections are done
    const allCompleted = Object.values(progress).every(completed => completed);
    if (allCompleted) {
        showCompletionCelebration();
    }
}

// Show progress notification
function showProgressNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'progress-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Show completion celebration
function showCompletionCelebration() {
    if (localStorage.getItem('sellerGuideCompleted')) return;
    
    localStorage.setItem('sellerGuideCompleted', 'true');
    
    const celebration = document.createElement('div');
    celebration.className = 'completion-celebration';
    celebration.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-header">
                <i class="fas fa-trophy"></i>
                <h3>Congratulations!</h3>
            </div>
            <p>You've completed the Seller's Guide! You're now ready to create amazing car listings that sell faster and for more money.</p>
            <div class="celebration-actions">
                <button class="btn btn-primary" onclick="location.href='dashboard.html'">
                    <i class="fas fa-car"></i>
                    Create Your First Listing
                </button>
                <button class="btn btn-outline" onclick="closeCelebration()">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.classList.add('show');
    }, 500);
}

// Close celebration modal
function closeCelebration() {
    const celebration = document.querySelector('.completion-celebration');
    if (celebration) {
        celebration.classList.remove('show');
        setTimeout(() => {
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 300);
    }
}

// Utility function - throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Print guide functionality
function printGuide() {
    const printContent = document.querySelector('.guide-content').cloneNode(true);
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write('<html><head><title>QRCarShop Seller Guide</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles/seller-guide.css">');
    printWindow.document.write('<style>@media print { .nav-tabs, .guide-nav { display: none; } .guide-section { display: block !important; } }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// Export guide as PDF (requires jsPDF library - commented out for now)
/*
function exportToPDF() {
    // This would require including jsPDF library
    // Implementation for future enhancement
    alert('PDF export feature coming soon!');
}
*/

// Add styles for progress notifications and celebrations
const additionalStyles = `
.progress-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--guide-success);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transform: translateX(100%);
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    max-width: 300px;
}

.progress-notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.completion-celebration {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.completion-celebration.show {
    opacity: 1;
    visibility: visible;
}

.celebration-content {
    background: white;
    padding: 3rem;
    border-radius: 16px;
    text-align: center;
    max-width: 500px;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.completion-celebration.show .celebration-content {
    transform: scale(1);
}

.celebration-header {
    margin-bottom: 2rem;
}

.celebration-header i {
    font-size: 4rem;
    color: var(--guide-warning);
    margin-bottom: 1rem;
}

.celebration-header h3 {
    font-size: 2rem;
    color: var(--guide-gray-900);
    margin: 0;
}

.celebration-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.nav-tab.completed {
    position: relative;
    background: rgba(16, 185, 129, 0.1);
    border-color: var(--guide-success);
}

@media (max-width: 480px) {
    .celebration-content {
        margin: 1rem;
        padding: 2rem;
    }
    
    .celebration-actions {
        flex-direction: column;
    }
    
    .progress-notification {
        right: 10px;
        left: 10px;
        max-width: none;
    }
}
`;

// Add the styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
