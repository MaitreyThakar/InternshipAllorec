// Configuration file for InternAI Multi-Agent Allocation System

const CONFIG = {
    // Application Settings
    app: {
        name: "InternAI",
        subtitle: "Multi-Agent Allocation System",
        version: "1.0.0",
        description: "Multi-Agent AI system for intelligent internship allocation and recommendation. Powered by advanced Gemini models for optimal student-company matching."
    },
    
    // Gemini AI Configuration
    gemini: {
        apiKey: 'AIzaSyAuO4SLvUfFOvXDU1ugIjYW2kr5jKi-R24', // Replace with your actual API key
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        models: {
            pro: 'gemini-2.5-pro',
            flash: 'gemini-2.5-flash'
        },
        timeout: 30000, // 30 seconds
        retryAttempts: 3
    },
    
    // AI Agents Configuration
    agents: {
        'student-analyzer': {
            name: 'Student Analyzer',
            model: 'gemini-2.5-pro',
            description: 'Analyzes student profiles, skills, and academic background',
            icon: 'fas fa-user-graduate',
            color: '#3b82f6'
        },
        'company-matcher': {
            name: 'Company Matcher',
            model: 'gemini-2.5-pro',
            description: 'Matches students with company requirements and culture',
            icon: 'fas fa-handshake',
            color: '#10b981'
        },
        'allocation-optimizer': {
            name: 'Allocation Optimizer',
            model: 'gemini-2.5-pro',
            description: 'Creates optimal internship assignments using constraint satisfaction',
            icon: 'fas fa-cogs',
            color: '#8b5cf6'
        },
        'conflict-resolver': {
            name: 'Conflict Resolver',
            model: 'gemini-2.5-pro',
            description: 'Handles conflicts and ensures fair allocation',
            icon: 'fas fa-balance-scale',
            color: '#f59e0b'
        },
        'recommendation-engine': {
            name: 'Recommendation Engine',
            model: 'gemini-2.5-flash',
            description: 'Provides personalized internship recommendations',
            icon: 'fas fa-lightbulb',
            color: '#06b6d4'
        },
        'quality-assessor': {
            name: 'Quality Assessor',
            model: 'gemini-2.5-flash',
            description: 'Evaluates the quality of proposed allocations',
            icon: 'fas fa-star',
            color: '#ef4444'
        }
    },
    
    // UI Configuration
    ui: {
        theme: {
            primary: '#8b5cf6',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444',
            info: '#06b6d4'
        },
        animations: {
            enabled: true,
            duration: 300
        },
        pagination: {
            itemsPerPage: 10
        }
    },
    
    // Feature Flags
    features: {
        realTimeUpdates: true,
        exportLogs: true,
        advancedFiltering: true,
        darkMode: false,
        notifications: true,
        analytics: true
    },
    
    // API Endpoints (for future backend integration)
    api: {
        baseUrl: '/api',
        endpoints: {
            students: '/students',
            companies: '/companies',
            allocations: '/allocations',
            logs: '/logs',
            analytics: '/analytics'
        }
    },
    
    // Validation Rules
    validation: {
        student: {
            name: { required: true, minLength: 2, maxLength: 100 },
            email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
            gpa: { required: true, min: 0, max: 4 },
            skills: { required: true, minItems: 1 },
            interests: { required: false, minItems: 0 }
        },
        company: {
            name: { required: true, minLength: 2, maxLength: 100 },
            industry: { required: true, minLength: 2, maxLength: 50 },
            location: { required: true, minLength: 2, maxLength: 100 },
            positions: { required: true, min: 1, max: 100 },
            description: { required: true, minLength: 10, maxLength: 500 }
        }
    },
    
    // Logging Configuration
    logging: {
        level: 'info', // debug, info, warn, error
        maxLogs: 1000,
        autoCleanup: true,
        exportFormats: ['csv', 'json']
    },
    
    // Performance Settings
    performance: {
        debounceDelay: 300,
        cacheTimeout: 300000, // 5 minutes
        maxConcurrentRequests: 5
    }
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// Make available globally
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}
