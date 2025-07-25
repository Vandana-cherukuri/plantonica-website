// 🌟 Platonica Website JavaScript
// Enhanced functionality for mental health platform

// 🎯 DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize mood tracker
    initializeMoodTracker();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize navigation
    initializeNavigation();
    
    // Load saved mood history
    loadMoodHistory();
    
    console.log('🌟 Platonica initialized successfully!');
});

// 🚀 Get Started Function
function getStarted() {
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        dashboardSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add a welcome message
        setTimeout(() => {
            showNotification('Welcome to your self-care dashboard! 🌟', 'success');
        }, 1000);
    }
}

// 💼 Apply for Internship Function
function applyForInternship(type) {
    const internshipTypes = {
        'web-development': 'Web Development',
        'android-development': 'HR Intern',
        'data-science': 'Product Management'
    };
    
    const internshipName = internshipTypes[type] || 'this position';
    
    // Show application modal or redirect
    showApplicationModal(internshipName);
}

// 🧠 Mood Tracking Functions
function submitMood(mood) {
    const moodHistory = document.getElementById('mood-history');
    const suggestion = document.getElementById('suggestion');
    
    if (!moodHistory || !suggestion) return;
    
    // Create mood entry
    const timestamp = new Date();
    const moodEntry = {
        mood: mood,
        date: timestamp.toLocaleDateString(),
        time: timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    // Add to mood history
    addMoodToHistory(moodEntry);
    
    // Show suggestion
    showMoodSuggestion(mood);
    
    // Save to localStorage (if available)
    saveMoodEntry(moodEntry);
    
    // Show success feedback
    showNotification(`Mood recorded: ${mood}`, 'success');
    
    // Add animation to the mood button
    animateMoodButton(mood);
}

function addMoodToHistory(moodEntry) {
    const moodHistory = document.getElementById('mood-history');
    
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${moodEntry.date}</strong> at ${moodEntry.time} - ${moodEntry.mood}
        <button onclick="deleteMoodEntry(this)" class="delete-mood-btn">×</button>
    `;
    li.style.opacity = '0';
    li.style.transform = 'translateY(-10px)';
    
    moodHistory.insertBefore(li, moodHistory.firstChild);
    
    // Animate in
    setTimeout(() => {
        li.style.transition = 'all 0.3s ease';
        li.style.opacity = '1';
        li.style.transform = 'translateY(0)';
    }, 100);
    
    // Limit history to 10 entries
    if (moodHistory.children.length > 10) {
        moodHistory.removeChild(moodHistory.lastChild);
    }
}

function showMoodSuggestion(mood) {
    const suggestion = document.getElementById('suggestion');
    
    const suggestions = {
        '😊': 'Wonderful! You\'re feeling happy today. Consider sharing your positive energy with someone or try a gratitude journal to maintain this mood.',
        '😐': 'It\'s perfectly normal to feel neutral sometimes. Try taking a short walk outside, listening to your favorite music, or doing a quick breathing exercise.',
        '😔': 'It\'s okay to feel sad sometimes. Remember that this feeling is temporary. Try some deep breathing exercises, reach out to a friend, or engage in a comforting activity.',
        '😰': 'Anxiety can be challenging. Try the 4-7-8 breathing technique: inhale for 4 counts, hold for 7, exhale for 8. Consider some gentle stretching or meditation.',
        '😡': 'Anger is a valid emotion. Try some physical exercise like a walk or workout, write down your thoughts, or try progressive muscle relaxation to help process these feelings.'
    };
    
    const newSuggestion = suggestions[mood] || 'Take care of yourself today. Remember that all feelings are temporary and valid.';
    
    suggestion.style.opacity = '0';
    setTimeout(() => {
        suggestion.textContent = newSuggestion;
        suggestion.style.opacity = '1';
    }, 150);
}

function deleteMoodEntry(button) {
    const listItem = button.parentElement;
    listItem.style.transition = 'all 0.3s ease';
    listItem.style.opacity = '0';
    listItem.style.transform = 'translateX(-20px)';
    
    setTimeout(() => {
        listItem.remove();
    }, 300);
}

// 💾 Data Persistence Functions
function saveMoodEntry(moodEntry) {
    try {
        let moodData = JSON.parse(localStorage.getItem('platonica_mood_history') || '[]');
        moodData.unshift(moodEntry);
        
        // Keep only last 50 entries
        if (moodData.length > 50) {
            moodData = moodData.slice(0, 50);
        }
        
        localStorage.setItem('platonica_mood_history', JSON.stringify(moodData));
    } catch (error) {
        console.log('Unable to save mood data:', error);
    }
}

function loadMoodHistory() {
    try {
        const savedMoods = JSON.parse(localStorage.getItem('platonica_mood_history') || '[]');
        savedMoods.slice(0, 10).forEach(moodEntry => {
            addMoodToHistory(moodEntry);
        });
    } catch (error) {
        console.log('Unable to load mood history:', error);
    }
}

// 📞 Contact Form Functions
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactSubmission(this);
    });
}

function handleContactSubmission(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const topic = formData.get('topic');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !topic || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon. 💖', 'success');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// 🎨 Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function animateMoodButton(mood) {
    const moodButtons = document.querySelectorAll('.mood-options button');
    moodButtons.forEach(button => {
        if (button.textContent.includes(mood)) {
            button.style.transform = 'scale(1.1)';
            button.style.background = '#C03975';
            button.style.color = 'white';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.style.background = '#FFF0F5';
                button.style.color = '#333';
            }, 300);
        }
    });
}

// 🧭 Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateNavOnScroll);
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('.section[id], .hero[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// 🎯 Modal Functions
function showApplicationModal(internshipName) {
    const modal = document.createElement('div');
    modal.className = 'application-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Apply for ${internshipName}</h2>
            <p>Thank you for your interest in joining our team!</p>
            <div class="modal-form">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <input type="tel" placeholder="Your Phone Number" required>
                <textarea placeholder="Tell us why you're interested in this position..." rows="4" required></textarea>
                <input type="file" accept=".pdf,.doc,.docx" placeholder="Upload Resume">
                <button onclick="submitApplication('${internshipName}')">Submit Application</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').onclick = () => {
        modal.remove();
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    };
}

function submitApplication(internshipName) {
    showNotification(`Application submitted for ${internshipName}! We'll review it and get back to you soon. 🎉`, 'success');
    document.querySelector('.application-modal').remove();
}

// 🔔 Notification Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// 🧠 Mood Tracking Analytics
function initializeMoodTracker() {
    // Add mood analytics button
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        const analyticsButton = document.createElement('button');
        analyticsButton.textContent = '📊 View Mood Analytics';
        analyticsButton.className = 'mood-analytics-btn';
        analyticsButton.onclick = showMoodAnalytics;
        
        dashboardSection.appendChild(analyticsButton);
    }
}

function showMoodAnalytics() {
    try {
        const moodData = JSON.parse(localStorage.getItem('platonica_mood_history') || '[]');
        
        if (moodData.length === 0) {
            showNotification('No mood data available yet. Start tracking your mood! 😊', 'info');
            return;
        }
        
        const analytics = analyzeMoodData(moodData);
        displayMoodAnalytics(analytics);
        
    } catch (error) {
        showNotification('Unable to load mood analytics', 'error');
    }
}

function analyzeMoodData(moodData) {
    const moodCounts = {};
    const recentMoods = moodData.slice(0, 7); // Last 7 entries
    
    moodData.forEach(entry => {
        const mood = entry.mood;
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
    });
    
    const mostFrequent = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b
    );
    
    return {
        totalEntries: moodData.length,
        moodCounts,
        mostFrequent,
        recentMoods,
        trend: calculateMoodTrend(recentMoods)
    };
}

function calculateMoodTrend(recentMoods) {
    const moodValues = {
        '😊': 5,
        '😐': 3,
        '😔': 2,
        '😰': 1,
        '😡': 1
    };
    
    if (recentMoods.length < 2) return 'insufficient data';
    
    const recent = recentMoods.slice(0, 3).reduce((sum, entry) => sum + moodValues[entry.mood], 0) / 3;
    const older = recentMoods.slice(3, 6).reduce((sum, entry) => sum + moodValues[entry.mood], 0) / 3;
    
    if (recent > older) return 'improving';
    if (recent < older) return 'declining';
    return 'stable';
}

function displayMoodAnalytics(analytics) {
    const modal = document.createElement('div');
    modal.className = 'analytics-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>📊 Your Mood Analytics</h2>
            <div class="analytics-content">
                <div class="stat-card">
                    <h3>Total Entries</h3>
                    <p class="stat-number">${analytics.totalEntries}</p>
                </div>
                <div class="stat-card">
                    <h3>Most Frequent Mood</h3>
                    <p class="stat-number">${analytics.mostFrequent}</p>
                </div>
                <div class="stat-card">
                    <h3>Recent Trend</h3>
                    <p class="stat-number">${analytics.trend}</p>
                </div>
            </div>
            <div class="mood-breakdown">
                <h3>Mood Breakdown</h3>
                ${Object.entries(analytics.moodCounts).map(([mood, count]) => 
                    `<div class="mood-stat">
                        <span>${mood}</span>
                        <span>${count} times</span>
                        <div class="mood-bar" style="width: ${(count / analytics.totalEntries) * 100}%"></div>
                    </div>`
                ).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}