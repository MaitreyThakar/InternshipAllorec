// firebase-service.js
class FirebaseService {
    constructor() {
        this.db = window.firebase.db;
        this.rtdb = window.firebase.rtdb;
        this.auth = window.firebase.auth;
    }

    // Student Management
    async addStudent(student) {
        try {
            const docRef = await window.firebase.addDoc(
                window.firebase.collection(this.db, 'students'), 
                {
                    ...student,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            );
            console.log('Student added with ID: ', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error adding student: ', error);
            throw error;
        }
    }

    async getStudents() {
        try {
            const querySnapshot = await window.firebase.getDocs(
                window.firebase.collection(this.db, 'students')
            );
            const students = [];
            querySnapshot.forEach((doc) => {
                students.push({ id: doc.id, ...doc.data() });
            });
            return students;
        } catch (error) {
            console.error('Error getting students: ', error);
            throw error;
        }
    }

    // Company Management
    async addCompany(company) {
        try {
            const docRef = await window.firebase.addDoc(
                window.firebase.collection(this.db, 'companies'), 
                {
                    ...company,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            );
            console.log('Company added with ID: ', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error adding company: ', error);
            throw error;
        }
    }

    async getCompanies() {
        try {
            const querySnapshot = await window.firebase.getDocs(
                window.firebase.collection(this.db, 'companies')
            );
            const companies = [];
            querySnapshot.forEach((doc) => {
                companies.push({ id: doc.id, ...doc.data() });
            });
            return companies;
        } catch (error) {
            console.error('Error getting companies: ', error);
            throw error;
        }
    }

    // AI Logs
    async addLog(agent, message, status) {
        try {
            const docRef = await window.firebase.addDoc(
                window.firebase.collection(this.db, 'ai_logs'), 
                {
                    agent,
                    message,
                    status,
                    timestamp: new Date()
                }
            );
            console.log('Log added with ID: ', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error adding log: ', error);
            throw error;
        }
    }

    async getLogs() {
        try {
            const querySnapshot = await window.firebase.getDocs(
                window.firebase.collection(this.db, 'ai_logs')
            );
            const logs = [];
            querySnapshot.forEach((doc) => {
                logs.push({ id: doc.id, ...doc.data() });
            });
            return logs.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error('Error getting logs: ', error);
            throw error;
        }
    }

    // Real-time AI Agent Status
    updateAgentStatus(agentId, status, message) {
        try {
            window.firebase.set(
                window.firebase.ref(this.rtdb, `ai_agents/${agentId}`), 
                {
                    status,
                    message,
                    timestamp: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error updating agent status: ', error);
            throw error;
        }
    }

    // Listen to real-time updates
    listenToAgentStatus(callback) {
        const agentStatusRef = window.firebase.ref(this.rtdb, 'ai_agents');
        window.firebase.onValue(agentStatusRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                callback(data);
            }
        });
    }

    // Listen to real-time logs
    listenToLogs(callback) {
        const logsRef = window.firebase.collection(this.db, 'ai_logs');
        window.firebase.onSnapshot(logsRef, (snapshot) => {
            const logs = [];
            snapshot.forEach((doc) => {
                logs.push({ id: doc.id, ...doc.data() });
            });
            callback(logs.sort((a, b) => b.timestamp - a.timestamp));
        });
    }
}

// Create global instance
window.firebaseService = new FirebaseService();