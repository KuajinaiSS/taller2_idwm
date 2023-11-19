import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Register from "../../features/Auth/Register";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [ // rutas que van a salir de la pagina "/"
            {
                path: "",
                element: <Register />
            }
        ]
    },
    {
        path: "/page1",
        element: <h1>Page 1</h1>
    },
    {
        path: "/page 2",
        element: <h1>Page 2</h1>
    }

]);