// Demo data for InternAI Multi-Agent Allocation System
// This file contains sample data to populate the application

const demoStudents = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@university.edu",
        major: "Computer Science",
        year: "Junior",
        gpa: 3.8,
        skills: ["React", "TypeScript", "Node.js", "Python", "Machine Learning", "AWS", "Docker"],
        interests: ["AI/ML", "Web Development", "Data Science", "Cloud Computing"]
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@university.edu",
        major: "Data Science",
        year: "Senior",
        gpa: 3.6,
        skills: ["Python", "R", "SQL", "Machine Learning", "Statistics", "Tableau", "Pandas"],
        interests: ["Data Science", "AI/ML", "Research", "Analytics"]
    },
    {
        id: 3,
        name: "Carol Davis",
        email: "carol.davis@university.edu",
        major: "Software Engineering",
        year: "Sophomore",
        gpa: 3.7,
        skills: ["Java", "Spring Boot", "React", "Docker", "AWS", "MySQL", "Git"],
        interests: ["Web Development", "Cloud Computing", "DevOps", "Mobile Development"]
    },
    {
        id: 4,
        name: "David Wilson",
        email: "david.wilson@university.edu",
        major: "Information Technology",
        year: "Senior",
        gpa: 3.5,
        skills: ["C#", ".NET", "Azure", "SQL Server", "Power BI", "JavaScript", "HTML/CSS"],
        interests: ["Enterprise Software", "Business Intelligence", "Database Management"]
    },
    {
        id: 5,
        name: "Emma Brown",
        email: "emma.brown@university.edu",
        major: "Cybersecurity",
        year: "Junior",
        gpa: 3.9,
        skills: ["Python", "Linux", "Network Security", "Ethical Hacking", "C++", "Wireshark", "Kali Linux"],
        interests: ["Cybersecurity", "Network Security", "Ethical Hacking", "Digital Forensics"]
    }
];

const demoCompanies = [
    {
        id: 1,
        name: "TechInnovate Inc.",
        industry: "Technology",
        location: "San Francisco, CA",
        size: "Startup (50-100 employees)",
        description: "Leading AI-powered software solutions company focused on innovation and growth. We develop cutting-edge machine learning algorithms and cloud-based applications.",
        positions: 2,
        requirements: ["Python", "Machine Learning", "React", "AWS", "Docker", "TensorFlow"],
        culture: ["Innovation", "Collaboration", "Growth Mindset", "Remote Work", "Learning", "Agile"]
    },
    {
        id: 2,
        name: "DataCorp Solutions",
        industry: "Data Analytics",
        location: "New York, NY",
        size: "Medium (201-1000 employees)",
        description: "Enterprise data analytics and business intelligence solutions provider. We help Fortune 500 companies make data-driven decisions.",
        positions: 1,
        requirements: ["SQL", "Python", "Tableau", "Statistics", "R", "Power BI", "Data Visualization"],
        culture: ["Data-Driven", "Professional", "Learning", "Teamwork", "Analytical", "Results-Oriented"]
    },
    {
        id: 3,
        name: "WebCraft Studios",
        industry: "Web Development",
        location: "Austin, TX",
        size: "Small (51-200 employees)",
        description: "Creative web development agency specializing in modern web applications and e-commerce solutions. We work with startups and established businesses.",
        positions: 1,
        requirements: ["React", "Node.js", "TypeScript", "UI/UX", "JavaScript", "CSS", "Figma"],
        culture: ["Creative", "Flexible", "Collaborative", "Innovation", "Design-Focused", "Client-Centric"]
    },
    {
        id: 4,
        name: "CloudTech Systems",
        industry: "Cloud Computing",
        location: "Seattle, WA",
        size: "Large (1000+ employees)",
        description: "Enterprise cloud infrastructure and DevOps solutions provider. We help organizations migrate to and optimize their cloud environments.",
        positions: 2,
        requirements: ["AWS", "Azure", "Docker", "Kubernetes", "Python", "Terraform", "Linux"],
        culture: ["Technical Excellence", "Innovation", "Collaboration", "Continuous Learning", "Agile", "Remote-Friendly"]
    },
    {
        id: 5,
        name: "SecureNet Technologies",
        industry: "Cybersecurity",
        location: "Boston, MA",
        size: "Medium (201-1000 employees)",
        description: "Cybersecurity solutions provider specializing in network security, threat detection, and compliance. We protect organizations from cyber threats.",
        positions: 1,
        requirements: ["Python", "Linux", "Network Security", "C++", "Wireshark", "SIEM", "Penetration Testing"],
        culture: ["Security-First", "Continuous Learning", "Technical Excellence", "Collaboration", "Innovation", "Ethical"]
    }
];

const demoLogs = [
    {
        id: 1,
        agent: "Student Analyzer",
        message: "Analyzed 5 student profiles and identified key skills patterns",
        timestamp: new Date(Date.now() - 300000),
        status: "success"
    },
    {
        id: 2,
        agent: "Company Matcher",
        message: "Matched students with 5 companies based on skills and interests",
        timestamp: new Date(Date.now() - 250000),
        status: "success"
    },
    {
        id: 3,
        agent: "Allocation Optimizer",
        message: "Optimize Allocations - Generated optimal assignment matrix",
        timestamp: new Date(Date.now() - 200000),
        status: "success"
    },
    {
        id: 4,
        agent: "Conflict Resolver",
        message: "Resolved 2 allocation conflicts and ensured fair distribution",
        timestamp: new Date(Date.now() - 150000),
        status: "success"
    },
    {
        id: 5,
        agent: "Recommendation Engine",
        message: "Generated personalized recommendations for 5 students",
        timestamp: new Date(Date.now() - 100000),
        status: "success"
    },
    {
        id: 6,
        agent: "Quality Assessor",
        message: "Evaluated allocation quality - Average match score: 87%",
        timestamp: new Date(Date.now() - 50000),
        status: "success"
    },
    {
        id: 7,
        agent: "Allocation Optimizer",
        message: "Optimize Allocations - Final optimization completed",
        timestamp: new Date(Date.now() - 10000),
        status: "success"
    },
    {
        id: 8,
        agent: "Student Analyzer",
        message: "Updated student profiles with latest academic information",
        timestamp: new Date(Date.now() - 5000),
        status: "success"
    }
];

// Function to load demo data
function loadDemoData() {
    // Update global variables
    if (typeof students !== 'undefined') {
        students = [...demoStudents];
    }
    if (typeof companies !== 'undefined') {
        companies = [...demoCompanies];
    }
    if (typeof logs !== 'undefined') {
        logs = [...demoLogs];
    }
    
    // Update IDs
    if (typeof nextStudentId !== 'undefined') {
        nextStudentId = demoStudents.length + 1;
    }
    if (typeof nextCompanyId !== 'undefined') {
        nextCompanyId = demoCompanies.length + 1;
    }
    if (typeof nextLogId !== 'undefined') {
        nextLogId = demoLogs.length + 1;
    }
    
    console.log('Demo data loaded successfully!');
}

// Auto-load demo data if this script is included
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDemoData);
    } else {
        loadDemoData();
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        demoStudents,
        demoCompanies,
        demoLogs,
        loadDemoData
    };
}
