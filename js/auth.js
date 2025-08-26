// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthPage();
});

function initializeAuthPage() {
    // Tab switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form-container');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Password toggles
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            togglePassword(targetId);
        });
    });
    
    // Password strength checker
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
    
    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const resetForm = document.getElementById('reset-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Password reset form
    if (resetForm) {
        resetForm.addEventListener('submit', handlePasswordReset);
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('signup-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhoneNumber);
    }
    
    // Password confirmation
    const confirmPassword = document.getElementById('confirm-password');
    const signupPasswordInput = document.getElementById('signup-password');
    
    if (confirmPassword && signupPasswordInput) {
        confirmPassword.addEventListener('input', function() {
            validatePasswordMatch();
        });
        signupPasswordInput.addEventListener('input', function() {
            validatePasswordMatch();
        });
    }
}

function switchTab(tabName) {
    // Update tab buttons
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update form containers
    const authForms = document.querySelectorAll('.auth-form-container');
    authForms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${tabName}-form`) {
            form.classList.add('active');
        }
    });
}

function togglePassword(targetId) {
    const input = document.getElementById(targetId);
    const toggle = document.querySelector(`[data-target="${targetId}"]`);
    const icon = toggle.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let feedback = 'Too weak';
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Remove existing classes
    strengthBar.classList.remove('weak', 'medium', 'strong');
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        feedback = 'Weak';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        feedback = 'Medium';
    } else {
        strengthBar.classList.add('strong');
        feedback = 'Strong';
    }
    
    strengthText.textContent = feedback;
}

function formatPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        if (value.length <= 3) {
            formattedValue = `(${value}`;
        } else if (value.length <= 6) {
            formattedValue = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            formattedValue = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    }
    
    event.target.value = formattedValue;
}

function validatePasswordMatch() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmInput = document.getElementById('confirm-password');
    
    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            confirmInput.style.borderColor = '#10B981';
        } else {
            confirmInput.style.borderColor = '#EF4444';
        }
    } else {
        confirmInput.style.borderColor = '#E5E7EB';
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.auth-submit-btn');
    const formData = new FormData(form);
    
    // Show loading state
    setLoadingState(submitBtn, true);
    clearMessages();
    
    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                email: formData.get('email'),
                password: formData.get('password'),
                remember: formData.get('remember') ? '1' : '0'
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = result.redirect || 'dashboard.html';
            }, 1500);
        } else {
            showMessage(result.message || 'Login failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('Connection error. Please try again.', 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

async function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.auth-submit-btn');
    const formData = new FormData(form);
    
    // Validate password match
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm_password');
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match.', 'error');
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    clearMessages();
    
    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'signup',
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                password: formData.get('password')
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = result.redirect || 'dashboard.html';
            }, 1500);
        } else {
            showMessage(result.message || 'Signup failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showMessage('Connection error. Please try again.', 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

async function handlePasswordReset(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.auth-submit-btn');
    const formData = new FormData(form);
    
    // Show loading state
    setLoadingState(submitBtn, true);
    clearMessages();
    
    try {
        const response = await fetch('php/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'reset_password',
                email: formData.get('email')
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('If an account with that email exists, password reset instructions have been sent.', 'success');
        } else {
            showMessage(result.message || 'Password reset failed. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Password reset error:', error);
        showMessage('Network error. Please try again.', 'error');
    } finally {
        setLoadingState(submitBtn, false);
    }
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-sign-in-alt', 'fa-user-plus');
            icon.classList.add('fa-spinner');
        }
    } else {
        button.classList.remove('loading');
        button.disabled = false;
        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-spinner');
            if (button.closest('#login-form')) {
                icon.classList.add('fa-sign-in-alt');
            } else {
                icon.classList.add('fa-user-plus');
            }
        }
    }
}

function showMessage(message, type = 'error') {
    clearMessages();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'}"></i>
        ${message}
    `;
    
    const activeForm = document.querySelector('.auth-form-container.active .auth-form');
    if (activeForm) {
        activeForm.insertBefore(messageDiv, activeForm.firstChild);
    }
}

function clearMessages() {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => message.remove());
}
