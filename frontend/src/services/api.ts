import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

class ApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('veri_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('veri_token');
          localStorage.removeItem('veri_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async register(email: string) {
    const response = await this.axiosInstance.post('/auth/register', { email });
    return response.data;
  }

  async login(email: string) {
    const response = await this.axiosInstance.post('/auth/login', { email });
    return response.data;
  }

  async verifyOTP(email: string, otp: string) {
    const response = await this.axiosInstance.post('/auth/verify-otp', { email, otp });
    return response.data;
  }

  // Product endpoints (to be added later)
  async getProducts() {
    const response = await this.axiosInstance.get('/products');
    return response.data;
  }

  async registerProduct(productData: any) {
    const response = await this.axiosInstance.post('/products', productData);
    return response.data;
  }

  async verifyProduct(productId: string) {
    const response = await this.axiosInstance.post('/products/verify', { productId });
    return response.data;
  }
}

// Singleton instance
export const apiService = new ApiService();
export default apiService;