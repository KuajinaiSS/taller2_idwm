import axios, { AxiosResponse } from "axios";

// url base de la api
axios.defaults.baseURL = "http://localhost:5019/api/";

// configuracion de las peticiones a la api, respuesta que nos peude generar nuestro backend al hacer peticiones
const responseBody = (response: AxiosResponse) => response.data;  


// autenticacion de las peticiones a la api
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("JWT");
    if(token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

// peticiones a la api
const Auth = {
    register:(form: any) => requests.post("user/register", form),
    login:(form: any) => requests.post("auth/login", form),
}

const Clients = {
    list: () => requests.get("User/AllClients"),
    delete: (id: string) => requests.delete(`User/DeleteClient/${id}`),
}


// exportamos las peticiones
const agent = { Auth, Clients };


// exportamos el agente
export default agent;