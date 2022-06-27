import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";


axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials= true;



const Body = (response: AxiosResponse) => response.data;

//   axios.interceptors.request.use(config => {
//      const token = store.getState().account.user?.token;
//    if (token) config.headers.Authorization = `Bearer ${token}`;
//      return config;
//   })

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error: AxiosError) => {
  const { data, status }: any = error.response!;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        // case 500:
        //     history.push({
        //         pathname: '/server-error',
        //         state: {error: data}
        //     });
        //     break;
        default:
            break;
    }
    return Promise.reject(error.response);
})
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

    const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

    //adding and removing items from shopping cart
    const Cart = {
    get: () => requests.get('cart'),
    addItem: (productId: number, quantity = 1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`)
}
    

  const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
}

    const agent = {
        Catalog, Cart, Account, TestErrors
    }
    export default agent;