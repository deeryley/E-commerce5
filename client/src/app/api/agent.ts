import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials= true;


const Body = (response: AxiosResponse) => response.data;

const requests = {
    get:(url: string) => axios.get(url).then(Body),
    post:(url: string, body:{}) => axios.post(url, body).then(Body),
    put:(url: string, body:{}) => axios.put(url, body).then(Body),
    delete:(url: string) => axios.delete(url).then(Body)
}
//shows catalog on page
const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
    }

    //adding and removing items from shopping cart
    const Cart = {
    get: () => requests.get('cart'),
    addItem: (productId: number, quantity = 1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`)
}
    

    const TestErrors = {
        get400Error: () => requests.get('Bugs/bad-request'),
        get401Error: () => requests.get('Bugs/unauthorised'),
        get404Error: () => requests.get('Bugs/server-error'),
        get500Error: () => requests.get('Bugs/not-found'),
        getValidationError: () => requests.get('Bugs/validation-error')
    }

    const agent = {
        Catalog, TestErrors, Cart 
    }
    export default agent;