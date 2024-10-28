import axios from 'axios';

const AuthService = {
    login: async (email, password) => {
        // Simulación de petición a la API
        try {
            const response = await axios.post('https://api-tu-lambda.com/login', { email, password });
            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
                return response.data.user;
            }
        } catch (error) {
            console.error('Error en la autenticación', error);
            return null;
        }
    },

    logout: () => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    }
};

export default AuthService;
