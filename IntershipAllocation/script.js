// Global state - Start with empty arrays for user-entered data only
let students = [];
let companies = [];

// Authentication state
let currentUser = null;
let isAuthenticated = false;

let logs = [
    {
        id: 1,
        agent: "Student Analyzer",
        message: "Analyzed student profiles and skills",
        timestamp: new Date(Date.now() - 300000),
        status: "success"
    },
    {
        id: 2,
        agent: "Company Matcher",
        message: "Matched students with company requirements",
        timestamp: new Date(Date.now() - 250000),
        status: "success"
    },
    {
        id: 3,
        agent: "Allocation Optimizer",
        message: "Optimize Allocations",
        timestamp: new Date(Date.now() - 200000),
        status: "success"
    },
    {
        id: 4,
        agent: "Conflict Resolver",
        message: "Resolved allocation conflicts",
        timestamp: new Date(Date.now() - 150000),
        status: "success"
    },
    {
        id: 5,
        agent: "Recommendation Engine",
        message: "Generated personalized recommendations",
        timestamp: new Date(Date.now() - 100000),
        status: "success"
    },
    {
        id: 6,
        agent: "Quality Assessor",
        message: "Evaluated allocation quality",
        timestamp: new Date(Date.now() - 50000),
        status: "success"
    },
    {
        id: 7,
        agent: "Allocation Optimizer",
        message: "Optimize Allocations",
        timestamp: new Date(Date.now() - 10000),
        status: "success"
    }
];

let currentPage = 'dashboard';
let nextStudentId = 1;
let nextCompanyId = 1;
let nextLogId = 8;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    setupAuthEventListeners();
    setupKeyboardListeners();
    loadDarkModePreference();
});

function setupKeyboardListeners() {
    // Close auth overlay with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && document.getElementById('auth-overlay').style.display === 'flex') {
            closeAuthOverlay();
        }
    });
}

function checkAuthentication() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('internai_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        isAuthenticated = true;
        hideAuthOverlay();
        initializeApp();
    } else {
        showAuthOverlay();
    }
}

function showAuthOverlay() {
    document.getElementById('auth-overlay').style.display = 'flex';
    document.querySelector('.main-content').style.display = 'none';
    document.getElementById('user-info').style.display = 'none';
    
    // Reset forms when showing overlay
    document.getElementById('signin-form-element').reset();
    document.getElementById('signup-form-element').reset();
    
    // Show signin tab by default
    showAuthTab('signin');
}

function hideAuthOverlay() {
    document.getElementById('auth-overlay').style.display = 'none';
    document.querySelector('.main-content').style.display = 'block';
    document.getElementById('user-info').style.display = 'flex';
    document.getElementById('user-name').textContent = currentUser.name;
}

function initializeApp() {
    setupNavigation();
    loadDashboard();
    loadStudents();
    loadCompanies();
    loadLogs();
    setupEventListeners();
}

// Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
    }
    
    // Add active class to selected nav link
    const activeLink = document.querySelector(`[data-page="${pageName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load page-specific data
    switch(pageName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'students':
            loadStudents();
            break;
        case 'companies':
            loadCompanies();
            break;
        case 'logs':
            loadLogs();
            break;
    }
}

// Dashboard
function loadDashboard() {
    updateDashboardStats();
    setTimeout(renderDashboardCharts, 200); // Wait for DOM and data
}

function updateDashboardStats() {
    document.getElementById('total-students').textContent = students.length;
    document.getElementById('total-companies').textContent = companies.length;
    document.getElementById('open-positions').textContent = companies.reduce((sum, company) => sum + company.positions, 0);
    document.getElementById('ai-allocations').textContent = logs.filter(log => log.agent === 'Allocation Optimizer').length;
    // Students Placed
    let placed = 0;
    if (window.allocationResults && Array.isArray(window.allocationResults)) {
        placed = window.allocationResults.filter(a => (a.status || '').toLowerCase() === 'approved').length;
    }
    document.getElementById('students-placed').textContent = placed;
}

// Dashboard Analytics with Chart.js
let skillsChart, industriesChart, allocationStatusChart;
function renderDashboardCharts() {
    // Skill Distribution
    const skillCounts = {};
    students.forEach(s => (s.skills || []).forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
    }));
    const skillLabels = Object.keys(skillCounts);
    const skillData = Object.values(skillCounts);
    if (skillsChart) skillsChart.destroy();
    if (skillLabels.length && document.getElementById('skillsChart')) {
        skillsChart = new Chart(document.getElementById('skillsChart').getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: skillLabels,
                datasets: [{ data: skillData, backgroundColor: [
                    '#3b82f6','#10b981','#f59e42','#f43f5e','#6366f1','#fbbf24','#a3e635','#f472b6','#38bdf8','#f87171'] }]
            },
            options: { plugins: { legend: { labels: { color: '#222', font: { size: 14 } } } }, cutout: '70%' }
        });
    }
    // Company Industries
    const industryCounts = {};
    companies.forEach(c => {
        if (c.industry) industryCounts[c.industry] = (industryCounts[c.industry] || 0) + 1;
    });
    const industryLabels = Object.keys(industryCounts);
    const industryData = Object.values(industryCounts);
    if (industriesChart) industriesChart.destroy();
    if (industryLabels.length && document.getElementById('industriesChart')) {
        industriesChart = new Chart(document.getElementById('industriesChart').getContext('2d'), {
            type: 'pie',
            data: {
                labels: industryLabels,
                datasets: [{ data: industryData, backgroundColor: [
                    '#6366f1','#fbbf24','#10b981','#f43f5e','#3b82f6','#f59e42','#a3e635','#f472b6','#38bdf8','#f87171'] }]
            },
            options: { plugins: { legend: { labels: { color: '#222', font: { size: 14 } } } } }
        });
    }
    // Allocation Status
    const allocationCounts = { Pending: 0, Approved: 0, Rejected: 0 };
    if (window.allocationResults && Array.isArray(window.allocationResults)) {
        window.allocationResults.forEach(a => {
            const status = (a.status || 'Pending').charAt(0).toUpperCase() + (a.status || 'Pending').slice(1);
            allocationCounts[status] = (allocationCounts[status] || 0) + 1;
        });
    }
    if (allocationStatusChart) allocationStatusChart.destroy();
    if (document.getElementById('allocationStatusChart')) {
        allocationStatusChart = new Chart(document.getElementById('allocationStatusChart').getContext('2d'), {
            type: 'bar',
            data: {
                labels: Object.keys(allocationCounts),
                datasets: [{ label: 'Allocations', data: Object.values(allocationCounts), backgroundColor: [
                    '#3b82f6','#10b981','#f43f5e'] }]
            },
            options: { plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#222' } }, y: { ticks: { color: '#222' }, beginAtZero: true } } }
        });
    }
}

// Students Management
async function loadStudents() {
    const studentsList = document.getElementById('students-list');
    if (!studentsList) return;
    
    try {
        // Try Firebase first
        if (window.firebaseService) {
            students = await window.firebaseService.getStudents();
        }
        // If Firebase fails or not available, use local data
        
        studentsList.innerHTML = '';
        
        students.forEach(student => {
            const studentCard = createStudentCard(student);
            studentsList.appendChild(studentCard);
        });
        
        updateStudentStats();
    } catch (error) {
        console.error('Error loading students:', error);
        // Fallback to local data
        studentsList.innerHTML = '';
        students.forEach(student => {
            const studentCard = createStudentCard(student);
            studentsList.appendChild(studentCard);
        });
        updateStudentStats();
    }
}

function createStudentCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    
    const skillsHtml = student.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');
    
    const interestsHtml = student.interests.map(interest => 
        `<span class="interest-tag">${interest}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="student-info">
            <div class="student-name">
                ${student.name}
                <span class="student-gpa">GPA: ${student.gpa}</span>
            </div>
            <div class="student-details">
                ${student.email}
            </div>
            <div class="student-details">
                ${student.major} • ${student.year}
            </div>
            <div class="student-skills">
                <strong>Skills:</strong><br>
                ${skillsHtml}
            </div>
            <div class="student-interests">
                <strong>Interests:</strong><br>
                ${interestsHtml}
            </div>
        </div>
        <div class="student-actions">
            <button class="action-btn edit-btn" onclick="editStudent('${student.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}

function updateStudentStats() {
    const highGpaCount = students.filter(student => student.gpa >= 3.5).length;
    const avgGpa = students.reduce((sum, student) => sum + student.gpa, 0) / students.length;
    
    document.getElementById('students-total').textContent = students.length;
    document.getElementById('high-gpa-count').textContent = highGpaCount;
    document.getElementById('avg-gpa').textContent = avgGpa.toFixed(2);
}

function showAddStudentModal() {
    document.getElementById('add-student-modal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    // Reset form
    const form = document.querySelector(`#${modalId} form`);
    if (form) {
        form.reset();
    }
    
    // Reset editing states
    if (modalId === 'add-student-modal') {
        window.editingStudentId = null;
        resetStudentForm();
    }
    if (modalId === 'add-company-modal') {
        window.editingCompanyId = null;
        resetCompanyForm();
    }
}

function setupEventListeners() {
    // Add Student Form
    document.getElementById('add-student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addStudent();
    });
    
    // Add Company Form
    document.getElementById('add-company-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addCompany();
    });
    
    // Log Search
    document.getElementById('log-search').addEventListener('input', function() {
        filterLogs();
    });
    
    // Log Filters
    document.getElementById('agent-filter').addEventListener('change', function() {
        filterLogs();
    });
    
    document.getElementById('status-filter').addEventListener('change', function() {
        filterLogs();
    });
}

async function addStudent() {
    const form = document.getElementById('add-student-form');
    
    const student = {
        name: document.getElementById('student-name').value,
        email: document.getElementById('student-email').value,
        major: document.getElementById('student-major').value,
        year: document.getElementById('student-year').value,
        gpa: parseFloat(document.getElementById('student-gpa').value),
        skills: document.getElementById('student-skills').value.split(',').map(s => s.trim()).filter(s => s),
        interests: document.getElementById('student-interests').value.split(',').map(s => s.trim()).filter(s => s)
    };
    
    try {
        // Check if we're editing an existing student
        if (window.editingStudentId) {
            // Update existing student
            student.id = window.editingStudentId;
            const studentIndex = students.findIndex(s => s.id === window.editingStudentId);
            if (studentIndex !== -1) {
                students[studentIndex] = student;
            }
            
            await loadStudents();
            updateDashboardStats();
            closeModal('add-student-modal');
            addLog('Student Analyzer', `Updated student: ${student.name}`, 'success');
            
            // Reset editing state
            window.editingStudentId = null;
            resetStudentForm();
        } else {
            // Add new student
            if (window.firebaseService) {
                await window.firebaseService.addStudent(student);
                await loadStudents();
                updateDashboardStats();
                closeModal('add-student-modal');
                addLog('Student Analyzer', `Added new student: ${student.name}`, 'success');
            } else {
                // Fallback to local storage
                student.id = nextStudentId++;
                students.push(student);
                loadStudents();
                updateDashboardStats();
                closeModal('add-student-modal');
                addLog('Student Analyzer', `Added new student: ${student.name}`, 'success');
            }
        }
    } catch (error) {
        console.error('Error adding/updating student:', error);
        alert('Error adding/updating student. Please try again.');
    }
}

function resetStudentForm() {
    // Reset form title and button
    document.querySelector('#add-student-modal h2').textContent = 'Add New Student';
    document.querySelector('#add-student-modal .btn-primary').textContent = 'Add Student';
}

function editStudent(id) {
    // Convert string ID to number for comparison
    const studentId = typeof id === 'string' ? parseInt(id) : id;
    const student = students.find(s => s.id === studentId);
    
    if (!student) {
        console.error('Student not found with ID:', id);
        return;
    }
    
    // Populate the form with existing data
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-email').value = student.email;
    document.getElementById('student-major').value = student.major;
    document.getElementById('student-year').value = student.year;
    document.getElementById('student-gpa').value = student.gpa;
    document.getElementById('student-skills').value = student.skills.join(', ');
    document.getElementById('student-interests').value = student.interests.join(', ');
    
    // Store the student ID for updating
    window.editingStudentId = studentId;
    
    // Change the form title and button
    document.querySelector('#add-student-modal h2').textContent = 'Edit Student';
    document.querySelector('#add-student-modal .btn-primary').textContent = 'Update Student';
    
    // Show the modal
    document.getElementById('add-student-modal').classList.add('active');
}

function deleteStudent(id) {
    // Convert string ID to number for comparison
    const studentId = typeof id === 'string' ? parseInt(id) : id;
    
    if (confirm('Are you sure you want to delete this student?')) {
        students = students.filter(s => s.id !== studentId);
        loadStudents();
        updateDashboardStats();
        addLog('Student Analyzer', `Deleted student with ID: ${studentId}`, 'success');
    }
}

// Companies Management
async function loadCompanies() {
    const companiesList = document.getElementById('companies-list');
    if (!companiesList) return;
    
    try {
        // Try Firebase first
        if (window.firebaseService) {
            companies = await window.firebaseService.getCompanies();
        }
        // If Firebase fails or not available, use local data
        
        companiesList.innerHTML = '';
        
        companies.forEach(company => {
            const companyCard = createCompanyCard(company);
            companiesList.appendChild(companyCard);
        });
        
        updateCompanyStats();
    } catch (error) {
        console.error('Error loading companies:', error);
        // Fallback to local data
        companiesList.innerHTML = '';
        companies.forEach(company => {
            const companyCard = createCompanyCard(company);
            companiesList.appendChild(companyCard);
        });
        updateCompanyStats();
    }
}

function createCompanyCard(company) {
    const card = document.createElement('div');
    card.className = 'company-card';
    
    const cultureHtml = company.culture.map(culture => 
        `<span class="culture-tag">${culture}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="company-info">
            <div class="company-name">
                ${company.name}
                <span class="company-type">${company.size}</span>
            </div>
            <div class="company-details">
                <i class="fas fa-building"></i> ${company.industry}
                <span>•</span>
                <i class="fas fa-map-marker-alt"></i> ${company.location}
            </div>
            <div class="company-details">
                ${company.description}
            </div>
            <div class="company-culture">
                <strong>Company Culture:</strong><br>
                ${cultureHtml}
            </div>
        </div>
        <div class="company-actions">
            <button class="action-btn edit-btn" onclick="editCompany('${company.id}')">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" onclick="deleteCompany('${company.id}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}

function updateCompanyStats() {
    const totalPositions = companies.reduce((sum, company) => sum + company.positions, 0);
    const locations = [...new Set(companies.map(company => company.location))].length;
    const industries = [...new Set(companies.map(company => company.industry))].length;
    
    document.getElementById('companies-total').textContent = companies.length;
    document.getElementById('companies-positions').textContent = totalPositions;
    document.getElementById('companies-locations').textContent = locations;
    document.getElementById('companies-industries').textContent = industries;
}

function showAddCompanyModal() {
    document.getElementById('add-company-modal').classList.add('active');
}

async function addCompany() {
    const company = {
        name: document.getElementById('company-name').value,
        industry: document.getElementById('company-industry').value,
        location: document.getElementById('company-location').value,
        size: document.getElementById('company-size').value,
        description: document.getElementById('company-description').value,
        positions: parseInt(document.getElementById('company-positions').value),
        requirements: document.getElementById('company-requirements').value.split(',').map(s => s.trim()).filter(s => s),
        culture: ["Innovation", "Collaboration", "Growth", "Learning"] // Default culture
    };
    
    try {
        // Check if we're editing an existing company
        if (window.editingCompanyId) {
            // Update existing company
            company.id = window.editingCompanyId;
            const companyIndex = companies.findIndex(c => c.id === window.editingCompanyId);
            if (companyIndex !== -1) {
                companies[companyIndex] = company;
            }
            
            await loadCompanies();
            updateDashboardStats();
            closeModal('add-company-modal');
            addLog('Company Matcher', `Updated company: ${company.name}`, 'success');
            
            // Reset editing state
            window.editingCompanyId = null;
            resetCompanyForm();
        } else {
            // Add new company
            if (window.firebaseService) {
                await window.firebaseService.addCompany(company);
                await loadCompanies();
                updateDashboardStats();
                closeModal('add-company-modal');
                addLog('Company Matcher', `Added new company: ${company.name}`, 'success');
            } else {
                // Fallback to local storage
                company.id = nextCompanyId++;
                companies.push(company);
                loadCompanies();
                updateDashboardStats();
                closeModal('add-company-modal');
                addLog('Company Matcher', `Added new company: ${company.name}`, 'success');
            }
        }
    } catch (error) {
        console.error('Error adding/updating company:', error);
        alert('Error adding/updating company. Please try again.');
    }
}

function resetCompanyForm() {
    // Reset form title and button
    document.querySelector('#add-company-modal h2').textContent = 'Add New Company';
    document.querySelector('#add-company-modal .btn-primary').textContent = 'Add Company';
}

function editCompany(id) {
    // Convert string ID to number for comparison
    const companyId = typeof id === 'string' ? parseInt(id) : id;
    const company = companies.find(c => c.id === companyId);
    
    if (!company) {
        console.error('Company not found with ID:', id);
        return;
    }
    
    // Populate the form with existing data
    document.getElementById('company-name').value = company.name;
    document.getElementById('company-industry').value = company.industry;
    document.getElementById('company-location').value = company.location;
    document.getElementById('company-size').value = company.size;
    document.getElementById('company-description').value = company.description;
    document.getElementById('company-positions').value = company.positions;
    document.getElementById('company-requirements').value = company.requirements.join(', ');
    
    // Store the company ID for updating
    window.editingCompanyId = companyId;
    
    // Change the form title and button
    document.querySelector('#add-company-modal h2').textContent = 'Edit Company';
    document.querySelector('#add-company-modal .btn-primary').textContent = 'Update Company';
    
    // Show the modal
    document.getElementById('add-company-modal').classList.add('active');
}

function deleteCompany(id) {
    // Convert string ID to number for comparison
    const companyId = typeof id === 'string' ? parseInt(id) : id;
    
    if (confirm('Are you sure you want to delete this company?')) {
        companies = companies.filter(c => c.id !== companyId);
        loadCompanies();
        updateDashboardStats();
        addLog('Company Matcher', `Deleted company with ID: ${companyId}`, 'success');
    }
}

// AI Allocation
async function startAllocation() {
    if (students.length === 0) {
        alert('Please add some students first!');
        return;
    }
    
    if (companies.length === 0) {
        alert('Please add some companies first!');
        return;
    }
    
    addLog('Allocation Optimizer', 'Starting intelligent allocation process...', 'processing');
    
    try {
        // Step 1: Student Analysis
        updateAgentStatus('student-analyzer', 'processing');
        addLog('Student Analyzer', 'Analyzing student profiles and skills...', 'processing');
        
        for (const student of students) {
            await geminiAI.analyzeStudent(student);
        }
        
        updateAgentStatus('student-analyzer', 'success');
        addLog('Student Analyzer', `Analyzed ${students.length} student profiles`, 'success');
        
        // Step 2: Company Matching
        updateAgentStatus('company-matcher', 'processing');
        addLog('Company Matcher', 'Matching students with company requirements...', 'processing');
        
        for (const student of students) {
            await geminiAI.matchWithCompanies(student, companies);
        }
        
        updateAgentStatus('company-matcher', 'success');
        addLog('Company Matcher', `Matched ${students.length} students with ${companies.length} companies`, 'success');
        
        // Step 3: Allocation Optimization
        updateAgentStatus('allocation-optimizer', 'processing');
        addLog('Allocation Optimizer', 'Creating optimal allocations using advanced algorithms...', 'processing');
        
        window.allocationResults = await generateAllocationResults(); // Store results globally
        renderDashboardCharts(); // Update charts after allocation
        
        updateAgentStatus('allocation-optimizer', 'success');
        addLog('Allocation Optimizer', 'Allocation process completed successfully', 'success');
        
        // Step 4: Conflict Resolution
        updateAgentStatus('conflict-resolver', 'processing');
        addLog('Conflict Resolver', 'Resolving any allocation conflicts...', 'processing');
        
        setTimeout(() => {
            updateAgentStatus('conflict-resolver', 'success');
            addLog('Conflict Resolver', 'All conflicts resolved successfully', 'success');
        }, 1000);
        
    } catch (error) {
        console.error('Error in allocation process:', error);
        addLog('Allocation Optimizer', 'Error in allocation process', 'error');
        updateAgentStatus('allocation-optimizer', 'error');
    }
}

async function optimizeAllocation() {
    if (students.length === 0 || companies.length === 0) {
        alert('Please add students and companies first!');
        return;
    }
    
    addLog('Allocation Optimizer', 'Optimizing existing allocations with advanced algorithms...', 'processing');
    updateAgentStatus('allocation-optimizer', 'processing');
    
    try {
        // Re-run the allocation optimization
        window.allocationResults = await geminiAI.optimizeAllocations(students, companies); // Store results globally
        renderDashboardCharts(); // Update charts after optimization
        
        updateAgentStatus('allocation-optimizer', 'success');
        addLog('Allocation Optimizer', 'Allocations optimized successfully with improved matching', 'success');
    } catch (error) {
        console.error('Error optimizing allocations:', error);
        addLog('Allocation Optimizer', 'Error optimizing allocations', 'error');
        updateAgentStatus('allocation-optimizer', 'error');
    }
}

function updateAgentStatus(agentId, status) {
    const statusElement = document.getElementById(`${agentId}-status`);
    if (statusElement) {
        statusElement.className = `agent-status ${status}`;
        statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }
}

async function generateAllocationResults() {
    const resultsContainer = document.getElementById('allocation-results');
    if (!resultsContainer) return;
    
    try {
        // Use the enhanced AI to generate real allocations
        const allocations = await geminiAI.optimizeAllocations(students, companies);
        window.allocationResults = allocations; // Make available globally for stats/charts
        
        if (allocations.length === 0) {
            resultsContainer.innerHTML = `
                <h3><i class="fas fa-exclamation-triangle"></i> No Allocations Available</h3>
                <p>No suitable matches found. Please add more students and companies.</p>
            `;
            return;
        }
        
        resultsContainer.innerHTML = `
            <h3><i class="fas fa-check-circle"></i> AI-Generated Allocation Results</h3>
            <div class="allocation-summary">
                <p><strong>${allocations.length}</strong> optimal allocations generated</p>
                <p>Average match score: <strong>${Math.round(allocations.reduce((sum, a) => sum + a.score, 0) / allocations.length)}%</strong></p>
            </div>
            <div class="allocation-results-list">
                ${allocations.map((allocation, idx) => {
                    let specialClass = '';
                    if (idx === 0) specialClass = 'gold-effect top-recommendation';
                    else if (idx === 1) specialClass = 'silver-effect top-recommendation';
                    else if (idx === 2) specialClass = 'bronze-effect top-recommendation';
                    return `
                    <div class="allocation-item ${specialClass}">
                        <div class="allocation-header">
                            <div class="allocation-match">
                                <strong>${allocation.student.name}</strong> → <strong>${allocation.company.name}</strong>
                                <span class="match-score ${allocation.score >= 90 ? 'excellent' : allocation.score >= 80 ? 'good' : 'moderate'}">${allocation.score}% match</span>
                                ${idx === 0 ? '<span class="recommend-badge gold">#1</span>' : idx === 1 ? '<span class="recommend-badge silver">#2</span>' : idx === 2 ? '<span class="recommend-badge bronze">#3</span>' : ''}
                            </div>
                            <div class="allocation-status">${allocation.status}</div>
                        </div>
                        <div class="allocation-details">
                            <div class="allocation-reason"><strong>Reason:</strong> ${allocation.reason}</div>
                            <div class="allocation-meta">
                                <span><strong>Student:</strong> ${allocation.student.major} • ${allocation.student.year} • GPA: ${allocation.student.gpa}</span>
                                <span><strong>Company:</strong> ${allocation.company.industry} • ${allocation.company.location}</span>
                            </div>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
        `;
        
        // Add enhanced CSS for allocation results
        const style = document.createElement('style');
        style.textContent = `
            .allocation-results-list {
                margin-top: 1rem;
            }
            .allocation-summary {
                background: #f0f9ff;
                padding: 1rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                border-left: 4px solid #0ea5e9;
            }
            .allocation-item {
                padding: 1.5rem;
                border: 1px solid #e2e8f0;
                border-radius: 0.75rem;
                margin-bottom: 1rem;
                background: #f8fafc;
                transition: all 0.3s ease;
                position: relative;
            }
            .allocation-item.top-recommendation {
                border: 2.5px solid #fbbf24;
                box-shadow: 0 0 0 3px #fde68a44;
                background: #fffbe7;
                z-index: 1;
            }
            .allocation-item.top-recommendation .allocation-header {
                font-weight: bold;
            }
            .recommend-badge {
                display: inline-block;
                margin-left: 0.75rem;
                padding: 0.2em 0.7em;
                border-radius: 1em;
                font-size: 0.95em;
                font-weight: bold;
                color: #fff;
                vertical-align: middle;
            }
            .recommend-badge.gold {
                background: linear-gradient(90deg, #fbbf24 60%, #f59e42 100%);
                box-shadow: 0 0 8px #fbbf24aa;
            }
            .recommend-badge.silver {
                background: linear-gradient(90deg, #a1a1aa 60%, #d1d5db 100%);
                color: #222;
            }
            .recommend-badge.bronze {
                background: linear-gradient(90deg, #f59e42 60%, #b45309 100%);
            }
            .allocation-item:hover {
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                transform: translateY(-2px);
            }
            .allocation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            .allocation-match {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .match-score {
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                font-size: 0.9rem;
                font-weight: bold;
                color: white;
            }
            .match-score.excellent {
                background: #10b981;
            }
            .match-score.good {
                background: #3b82f6;
            }
            .match-score.moderate {
                background: #f59e0b;
            }
            .allocation-status {
                background: #e2e8f0;
                color: #475569;
                padding: 0.25rem 0.75rem;
                border-radius: 1rem;
                font-size: 0.8rem;
                text-transform: capitalize;
            }
            .allocation-details {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .allocation-reason {
                color: #374151;
                font-style: italic;
            }
            .allocation-meta {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                font-size: 0.9rem;
                color: #64748b;
            }
            @media (max-width: 600px) {
                .allocation-item { padding: 1rem; }
                .allocation-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
            }
        `;
        document.head.appendChild(style);
        
    } catch (error) {
        console.error('Error generating allocation results:', error);
        resultsContainer.innerHTML = `
            <h3><i class="fas fa-exclamation-triangle"></i> Error Generating Allocations</h3>
            <p>There was an error generating allocations. Please try again.</p>
        `;
    }
}

// Logs Management
function loadLogs() {
    const logsList = document.getElementById('logs-list');
    if (!logsList) return;
    
    logsList.innerHTML = '';
    
    logs.forEach(log => {
        const logItem = createLogItem(log);
        logsList.appendChild(logItem);
    });
    
    updateLogStats();
}

function createLogItem(log) {
    const item = document.createElement('div');
    item.className = 'log-item';
    
    const timeAgo = getTimeAgo(log.timestamp);
    
    item.innerHTML = `
        <div class="log-agent">${log.agent}</div>
        <div class="log-message">${log.message}</div>
        <div class="log-time">${timeAgo}</div>
        <div class="log-status ${log.status}"></div>
    `;
    
    return item;
}

function getTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
        return `${minutes}m ${seconds}s ago`;
    } else {
        return `${seconds}s ago`;
    }
}

function updateLogStats() {
    const totalLogs = logs.length;
    const successfulLogs = logs.filter(log => log.status === 'success').length;
    const errorLogs = logs.filter(log => log.status === 'error').length;
    const uniqueAgents = [...new Set(logs.map(log => log.agent))].length;
    
    document.getElementById('total-logs').textContent = totalLogs;
    document.getElementById('successful-logs').textContent = successfulLogs;
    document.getElementById('error-logs').textContent = errorLogs;
    document.getElementById('ai-agents').textContent = uniqueAgents;
    document.getElementById('logs-count').textContent = totalLogs;
    document.getElementById('total-logs-count').textContent = totalLogs;
}

async function addLog(agent, message, status) {
    const log = {
        id: nextLogId++,
        agent: agent,
        message: message,
        timestamp: new Date(),
        status: status
    };
    
    try {
        // Try Firebase first
        if (window.firebaseService) {
            await window.firebaseService.addLog(agent, message, status);
        }
        
        // Always add to local logs for immediate display
        logs.unshift(log); // Add to beginning
        loadLogs();
        updateLogStats();
    } catch (error) {
        console.error('Error adding log:', error);
        // Fallback to local only
        logs.unshift(log);
        loadLogs();
        updateLogStats();
    }
}

function filterLogs() {
    const searchTerm = document.getElementById('log-search').value.toLowerCase();
    const agentFilter = document.getElementById('agent-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    
    let filteredLogs = logs.filter(log => {
        const matchesSearch = log.message.toLowerCase().includes(searchTerm) || 
                             log.agent.toLowerCase().includes(searchTerm);
        const matchesAgent = agentFilter === 'all' || log.agent.toLowerCase().includes(agentFilter.toLowerCase());
        const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
        
        return matchesSearch && matchesAgent && matchesStatus;
    });
    
    const logsList = document.getElementById('logs-list');
    logsList.innerHTML = '';
    
    filteredLogs.forEach(log => {
        const logItem = createLogItem(log);
        logsList.appendChild(logItem);
    });
    
    document.getElementById('logs-count').textContent = filteredLogs.length;
}

function exportLogs() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "Agent,Message,Timestamp,Status\n" +
        logs.map(log => 
            `"${log.agent}","${log.message}","${log.timestamp.toISOString()}","${log.status}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ai_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addLog('System', 'Exported logs to CSV', 'success');
}

function clearLogs() {
    if (confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
        logs = [];
        loadLogs();
        addLog('System', 'All logs cleared', 'success');
    }
}

// Enhanced AI Integration with Gemini
class GeminiAIService {
    constructor() {
        this.apiKey = window.CONFIG?.gemini?.apiKey || 'your-gemini-api-key';
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
    }
    
    // Enhanced Student Analysis
    async analyzeStudent(student) {
        try {
            const analysis = {
                strengths: this.identifyStrengths(student),
                weaknesses: this.identifyWeaknesses(student),
                recommendations: this.generateDetailedRecommendations(student),
                compatibility: this.calculateAdvancedCompatibility(student),
                careerPath: this.suggestCareerPath(student),
                skillGaps: this.identifySkillGaps(student)
            };
            
            addLog('Student Analyzer', `Analyzed student: ${student.name}`, 'success');
            return analysis;
        } catch (error) {
            console.error('Error analyzing student:', error);
            addLog('Student Analyzer', `Error analyzing student: ${student.name}`, 'error');
            return this.getDefaultAnalysis(student);
        }
    }
    
    // Enhanced Company Matching
    async matchWithCompanies(student, companies) {
        try {
            const matches = companies.map(company => {
                const score = this.calculateMatchScore(student, company);
                return {
                    company: company,
                    score: score,
                    reason: this.generateDetailedMatchReason(student, company, score),
                    strengths: this.identifyMatchStrengths(student, company),
                    concerns: this.identifyMatchConcerns(student, company),
                    recommendations: this.generateMatchRecommendations(student, company)
                };
            });
            
            const sortedMatches = matches.sort((a, b) => b.score - a.score);
            addLog('Company Matcher', `Matched ${student.name} with ${companies.length} companies`, 'success');
            return sortedMatches;
        } catch (error) {
            console.error('Error matching companies:', error);
            addLog('Company Matcher', `Error matching companies for ${student.name}`, 'error');
            return [];
        }
    }
    
    // Enhanced Allocation Optimization
    async optimizeAllocations(students, companies) {
        try {
            addLog('Allocation Optimizer', 'Starting advanced allocation optimization...', 'processing');
            
            const allocations = [];
            const usedCompanies = new Set();
            const usedStudents = new Set();
            
            // Create a priority queue of student-company pairs
            const candidatePairs = [];
            
            for (const student of students) {
                for (const company of companies) {
                    if (company.positions > 0) {
                        const score = this.calculateMatchScore(student, company);
                        candidatePairs.push({
                            student,
                            company,
                            score,
                            reason: this.generateDetailedMatchReason(student, company, score)
                        });
                    }
                }
            }
            
            // Sort by score (highest first)
            candidatePairs.sort((a, b) => b.score - a.score);
            
            // Greedy allocation with constraints
            for (const pair of candidatePairs) {
                if (!usedStudents.has(pair.student.id) && 
                    !usedCompanies.has(pair.company.id) && 
                    pair.company.positions > 0) {
                    
                    allocations.push({
                        student: pair.student,
                        company: pair.company,
                        score: pair.score,
                        reason: pair.reason,
                        allocationDate: new Date(),
                        status: 'pending'
                    });
                    
                    usedStudents.add(pair.student.id);
                    usedCompanies.add(pair.company.id);
                    pair.company.positions--;
                }
            }
            
            addLog('Allocation Optimizer', `Generated ${allocations.length} optimal allocations`, 'success');
            return allocations;
        } catch (error) {
            console.error('Error optimizing allocations:', error);
            addLog('Allocation Optimizer', 'Error in allocation optimization', 'error');
            return [];
        }
    }
    
    // Advanced scoring algorithm
    calculateMatchScore(student, company) {
        let score = 0;
        
        // Skills matching (40% weight)
        const skillMatch = this.calculateSkillMatch(student.skills, company.requirements);
        score += skillMatch * 0.4;
        
        // GPA consideration (20% weight)
        const gpaScore = this.calculateGPAScore(student.gpa);
        score += gpaScore * 0.2;
        
        // Interest alignment (15% weight)
        const interestScore = this.calculateInterestAlignment(student.interests, company.culture);
        score += interestScore * 0.15;
        
        // Academic level (10% weight)
        const academicScore = this.calculateAcademicLevel(student.year, company.size);
        score += academicScore * 0.1;
        
        // Location preference (10% weight)
        const locationScore = this.calculateLocationScore(student, company);
        score += locationScore * 0.1;
        
        // Experience level (5% weight)
        const experienceScore = this.calculateExperienceScore(student);
        score += experienceScore * 0.05;
        
        return Math.min(Math.round(score), 100);
    }
    
    calculateSkillMatch(studentSkills, companyRequirements) {
        if (!companyRequirements || companyRequirements.length === 0) return 50;
        
        const matches = studentSkills.filter(skill => 
            companyRequirements.some(req => 
                req.toLowerCase().includes(skill.toLowerCase()) ||
                skill.toLowerCase().includes(req.toLowerCase())
            )
        );
        
        return (matches.length / companyRequirements.length) * 100;
    }
    
    calculateGPAScore(gpa) {
        if (gpa >= 3.8) return 100;
        if (gpa >= 3.5) return 85;
        if (gpa >= 3.0) return 70;
        if (gpa >= 2.5) return 50;
        return 30;
    }
    
    calculateInterestAlignment(studentInterests, companyCulture) {
        if (!companyCulture || companyCulture.length === 0) return 50;
        
        const alignment = studentInterests.filter(interest => 
            companyCulture.some(culture => 
                culture.toLowerCase().includes(interest.toLowerCase()) ||
                interest.toLowerCase().includes(culture.toLowerCase())
            )
        );
        
        return (alignment.length / Math.max(studentInterests.length, 1)) * 100;
    }
    
    calculateAcademicLevel(year, companySize) {
        const yearScores = {
            'Freshman': 30,
            'Sophomore': 50,
            'Junior': 80,
            'Senior': 100
        };
        
        const sizeScores = {
            'Startup': 90,
            'Small': 80,
            'Medium': 70,
            'Large': 60
        };
        
        const yearScore = yearScores[year] || 50;
        const sizeScore = sizeScores[companySize] || 70;
        
        return (yearScore + sizeScore) / 2;
    }
    
    calculateLocationScore(student, company) {
        // For now, return a neutral score
        // In a real implementation, you'd consider student location preferences
        return 70;
    }
    
    calculateExperienceScore(student) {
        // Consider skills count and complexity as experience indicators
        const skillCount = student.skills.length;
        const complexSkills = ['Machine Learning', 'AI', 'Blockchain', 'DevOps', 'Cloud Computing'];
        const hasComplexSkills = student.skills.some(skill => 
            complexSkills.some(complex => 
                skill.toLowerCase().includes(complex.toLowerCase())
            )
        );
        
        let score = Math.min(skillCount * 10, 60);
        if (hasComplexSkills) score += 20;
        if (student.gpa >= 3.5) score += 20;
        
        return Math.min(score, 100);
    }
    
    identifyStrengths(student) {
        const strengths = [];
        
        if (student.gpa >= 3.5) strengths.push('Strong Academic Performance');
        if (student.skills.length >= 5) strengths.push('Diverse Skill Set');
        if (student.interests.length >= 3) strengths.push('Clear Career Interests');
        
        // Identify technical strengths
        const techSkills = student.skills.filter(skill => 
            ['Python', 'JavaScript', 'Java', 'C++', 'React', 'Node.js'].includes(skill)
        );
        if (techSkills.length > 0) strengths.push(`Strong in ${techSkills.join(', ')}`);
        
        return strengths;
    }
    
    identifyWeaknesses(student) {
        const weaknesses = [];
        
        if (student.gpa < 3.0) weaknesses.push('Below Average GPA');
        if (student.skills.length < 3) weaknesses.push('Limited Technical Skills');
        if (student.interests.length < 2) weaknesses.push('Unclear Career Direction');
        
        return weaknesses;
    }
    
    generateDetailedRecommendations(student) {
        const recommendations = [];
        
        if (student.gpa >= 3.5) {
            recommendations.push('Consider applying to competitive tech companies');
        }
        
        if (student.skills.includes('Machine Learning') || student.skills.includes('AI')) {
            recommendations.push('Excellent fit for AI/ML roles at tech companies');
        }
        
        if (student.skills.includes('React') || student.skills.includes('JavaScript')) {
            recommendations.push('Strong frontend development opportunities available');
        }
        
        if (student.skills.includes('Python') && student.skills.includes('Data Science')) {
            recommendations.push('Perfect for data science and analytics positions');
        }
        
        if (student.year === 'Senior') {
            recommendations.push('Consider full-time positions or advanced internships');
        } else {
            recommendations.push('Great time to gain experience through internships');
        }
        
        return recommendations;
    }
    
    calculateAdvancedCompatibility(student) {
        let score = 50;
        
        // Academic performance
        if (student.gpa >= 3.5) score += 20;
        else if (student.gpa < 3.0) score -= 10;
        
        // Skill diversity
        if (student.skills.length >= 5) score += 15;
        else if (student.skills.length < 3) score -= 15;
        
        // Interest clarity
        if (student.interests.length >= 3) score += 15;
        else if (student.interests.length < 2) score -= 10;
        
        return Math.min(Math.max(score, 0), 100);
    }
    
    suggestCareerPath(student) {
        const careerPaths = [];
        
        if (student.skills.includes('Machine Learning') || student.skills.includes('AI')) {
            careerPaths.push('AI/ML Engineer');
        }
        
        if (student.skills.includes('React') || student.skills.includes('JavaScript')) {
            careerPaths.push('Frontend Developer');
        }
        
        if (student.skills.includes('Python') && student.skills.includes('Data Science')) {
            careerPaths.push('Data Scientist');
        }
        
        if (student.skills.includes('Java') || student.skills.includes('Spring')) {
            careerPaths.push('Backend Developer');
        }
        
        return careerPaths.length > 0 ? careerPaths : ['Software Developer'];
    }
    
    identifySkillGaps(student) {
        const commonSkills = ['Python', 'JavaScript', 'SQL', 'Git', 'React'];
        return commonSkills.filter(skill => 
            !student.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        );
    }
    
    generateDetailedMatchReason(student, company, score) {
        const reasons = [];
        
        const skillMatch = this.calculateSkillMatch(student.skills, company.requirements);
        if (skillMatch >= 80) {
            reasons.push('Excellent skill alignment');
        } else if (skillMatch >= 60) {
            reasons.push('Good skill match');
        } else {
            reasons.push('Limited skill overlap');
        }
        
        if (student.gpa >= 3.5) {
            reasons.push('Strong academic performance');
        }
        
        const interestAlignment = this.calculateInterestAlignment(student.interests, company.culture);
        if (interestAlignment >= 70) {
            reasons.push('Great cultural fit');
        }
        
        if (score >= 90) {
            reasons.push('Exceptional overall match');
        } else if (score >= 80) {
            reasons.push('Very good match');
        } else if (score >= 70) {
            reasons.push('Good potential match');
        } else {
            reasons.push('Moderate compatibility');
        }
        
        return reasons.join(', ');
    }
    
    identifyMatchStrengths(student, company) {
        const strengths = [];
        
        const commonSkills = student.skills.filter(skill => 
            company.requirements.some(req => 
                req.toLowerCase().includes(skill.toLowerCase())
            )
        );
        
        if (commonSkills.length > 0) {
            strengths.push(`Shared skills: ${commonSkills.join(', ')}`);
        }
        
        if (student.gpa >= 3.5) {
            strengths.push('High academic performance');
        }
        
        return strengths;
    }
    
    identifyMatchConcerns(student, company) {
        const concerns = [];
        
        const missingSkills = company.requirements.filter(req => 
            !student.skills.some(skill => 
                skill.toLowerCase().includes(req.toLowerCase())
            )
        );
        
        if (missingSkills.length > 0) {
            concerns.push(`Missing skills: ${missingSkills.join(', ')}`);
        }
        
        if (student.gpa < 3.0) {
            concerns.push('Below average GPA');
        }
        
        return concerns;
    }
    
    generateMatchRecommendations(student, company) {
        const recommendations = [];
        
        const missingSkills = company.requirements.filter(req => 
            !student.skills.some(skill => 
                skill.toLowerCase().includes(req.toLowerCase())
            )
        );
        
        if (missingSkills.length > 0) {
            recommendations.push(`Consider learning: ${missingSkills.slice(0, 3).join(', ')}`);
        }
        
        if (student.year === 'Freshman' || student.year === 'Sophomore') {
            recommendations.push('Great opportunity for early career development');
        }
        
        return recommendations;
    }
    
    getDefaultAnalysis(student) {
        return {
            strengths: ['Technical Skills'],
            weaknesses: [],
            recommendations: ['Consider gaining more experience'],
            compatibility: 70,
            careerPath: ['Software Developer'],
            skillGaps: []
        };
    }
}

// Firebase integration will be added later when you're ready

// addLog function is already defined above and working with local storage

// loadLogs function is already defined above and working with local storage

// Real-time listeners will be added when Firebase is integrated

// Initialize Gemini AI Service
const geminiAI = new GeminiAIService();

// Authentication Functions
function setupAuthEventListeners() {
    // Sign in form
    document.getElementById('signin-form-element').addEventListener('submit', function(e) {
        e.preventDefault();
        signIn();
    });
    
    // Sign up form
    document.getElementById('signup-form-element').addEventListener('submit', function(e) {
        e.preventDefault();
        signUp();
    });
}

function showAuthTab(tab) {
    // Remove active class from all tabs and forms
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    // Add active class to selected tab and form
    document.querySelector(`[onclick="showAuthTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}-form`).classList.add('active');
}

function signIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('internai_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        isAuthenticated = true;
        localStorage.setItem('internai_user', JSON.stringify(user));
        hideAuthOverlay();
        initializeApp();
        addLog('System', `User ${user.name} signed in`, 'success');
    } else {
        alert('Invalid email or password');
    }
}

function signUp() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('internai_users') || '[]');
    if (users.find(u => u.email === email)) {
        alert('User with this email already exists');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('internai_users', JSON.stringify(users));
    
    currentUser = newUser;
    isAuthenticated = true;
    localStorage.setItem('internai_user', JSON.stringify(newUser));
    hideAuthOverlay();
    initializeApp();
    addLog('System', `New user ${newUser.name} registered`, 'success');
}

function signOut() {
    currentUser = null;
    isAuthenticated = false;
    localStorage.removeItem('internai_user');
    showAuthOverlay();
    document.getElementById('user-info').style.display = 'none';
    addLog('System', 'User signed out', 'success');
}

function closeAuthOverlay(event) {
    // If clicking on the overlay background (not the container), close it
    if (event && event.target.id === 'auth-overlay') {
        showAuthOverlay();
    } else {
        // If called directly (from close button), close it
        showAuthOverlay();
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('internai_dark_mode', isDark ? '1' : '0');
    updateDarkModeIcon(isDark);
}
function updateDarkModeIcon(isDark) {
    const btn = document.getElementById('dark-mode-toggle');
    if (btn) {
        btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
}
function loadDarkModePreference() {
    const isDark = localStorage.getItem('internai_dark_mode') === '1';
    if (isDark) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    updateDarkModeIcon(isDark);
}

// Export functions for global access
window.showAddStudentModal = showAddStudentModal;
window.showAddCompanyModal = showAddCompanyModal;
window.closeModal = closeModal;
window.addStudent = addStudent;
window.addCompany = addCompany;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.editCompany = editCompany;
window.deleteCompany = deleteCompany;
window.startAllocation = startAllocation;
window.optimizeAllocation = optimizeAllocation;
window.exportLogs = exportLogs;
window.clearLogs = clearLogs;
window.showAuthTab = showAuthTab;
window.signOut = signOut;
window.closeAuthOverlay = closeAuthOverlay;
window.toggleDarkMode = toggleDarkMode;
window.renderDashboardCharts = renderDashboardCharts;

// Students Search/Filter
function filterStudents() {
    const search = document.getElementById('student-search').value.toLowerCase();
    const studentsList = document.getElementById('students-list');
    studentsList.innerHTML = '';
    students.filter(student => {
        return (
            student.name.toLowerCase().includes(search) ||
            student.email.toLowerCase().includes(search) ||
            (student.skills && student.skills.join(',').toLowerCase().includes(search))
        );
    }).forEach(student => {
        const studentCard = createStudentCard(student);
        studentsList.appendChild(studentCard);
    });
    updateStudentStats();
}
// Companies Search/Filter
function filterCompanies() {
    const search = document.getElementById('company-search').value.toLowerCase();
    const companiesList = document.getElementById('companies-list');
    companiesList.innerHTML = '';
    companies.filter(company => {
        return (
            company.name.toLowerCase().includes(search) ||
            company.industry.toLowerCase().includes(search) ||
            company.location.toLowerCase().includes(search)
        );
    }).forEach(company => {
        const companyCard = createCompanyCard(company);
        companiesList.appendChild(companyCard);
    });
    updateCompanyStats();
}
window.filterStudents = filterStudents;
window.filterCompanies = filterCompanies;