// This file acts as our bridge to the backend server.
// Instead of writing 'fetch' everywhere, we use these pre-made functions.
import axios from 'axios';

// API_BASE_URL is the address of our Node.js server.
// It checks if you have a custom address, otherwise it defaults to http://localhost:5000/api
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create a pre-configured 'client' for all our web requests.
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // If the server takes more than 10 seconds, stop waiting.
  headers: {
    'Content-Type': 'application/json' // Tell the server we are sending JSON data.
  }
});

// INTERCEPTOR: This code runs automatically before EVERY request we send.
apiClient.interceptors.request.use((config) => {
  // Try to find the secret login token in the browser's storage.
  const token = localStorage.getItem('token');
  // If we have a token, add it to the Request's "Authorization" header.
  // This is how the server knows WHO is making the request.
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- INDIVIDUAL API GROUPS ---
// Each group contains functions that talk to a specific section of the backend.

// PATIENTS API: Managing patient records
export const patientsAPI = {
  getAll: () => apiClient.get('/patients'), // Get all patients
  getById: (id) => apiClient.get(`/patients/${id}`), // Get one by ID
  create: (data) => apiClient.post('/patients', data), // Create new
  update: (id, data) => apiClient.put(`/patients/${id}`, data), // Update existing
  delete: (id) => apiClient.delete(`/patients/${id}`), // Delete
  search: (query) => apiClient.get('/patients/search', { params: { query } }) // Search by name
};

// DOCTORS API: Managing the staff list
export const doctorsAPI = {
  getAll: () => apiClient.get('/doctors'),
  getById: (id) => apiClient.get(`/doctors/${id}`),
  getByDepartment: (departmentId) => apiClient.get(`/doctors/department/${departmentId}`),
  create: (data) => apiClient.post('/doctors', data),
  update: (id, data) => apiClient.put(`/doctors/${id}`, data),
  delete: (id) => apiClient.delete(`/doctors/${id}`),
  search: (query) => apiClient.get('/doctors/search', { params: { query } })
};

// DEPARTMENTS API: Physical hospital wings
export const departmentsAPI = {
  getAll: () => apiClient.get('/departments'),
  getById: (id) => apiClient.get(`/departments/${id}`),
  create: (data) => apiClient.post('/departments', data),
  update: (id, data) => apiClient.put(`/departments/${id}`, data),
  delete: (id) => apiClient.delete(`/departments/${id}`)
};

// APPOINTMENTS API: Booking and scheduling visits
export const appointmentsAPI = {
  getAll: () => apiClient.get('/appointments'),
  getById: (id) => apiClient.get(`/appointments/${id}`),
  getByPatient: (patientId) => apiClient.get(`/appointments/patient/${patientId}`), // History for one patient
  getByDoctor: (doctorId) => apiClient.get(`/appointments/doctor/${doctorId}`), // Schedule for one doctor
  getStats: () => apiClient.get('/appointments/stats/overview'), // Get summary numbers
  create: (data) => apiClient.post('/appointments', data), // Create booking
  update: (id, data) => apiClient.put(`/appointments/${id}`, data),
  delete: (id) => apiClient.delete(`/appointments/${id}`)
};

// AUTH API: Logging in and signing up
export const authAPI = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (data) => apiClient.post('/auth/register', data),
  logout: () => apiClient.post('/auth/logout')
};

// DASHBOARD API: Statistics for the analytics page
export const dashboardAPI = {
  getStats: () => apiClient.get('/dashboard/stats') // Get counts of doctors, patients, etc.
};

// Export the main client so any custom requests can still use it.
export default apiClient;
