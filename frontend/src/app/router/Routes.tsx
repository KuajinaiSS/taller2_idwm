import { Navigate, Route, Routes as Router, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import LoginPage from "../../features/Auth/LoginPage";
import HomePage from "../../features/home/HomePage";
import ErrorPage from "../layout/ErrorPage";
import Navbar from "../layout/Navbar";

type Props = {};

const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext);
    if (!authenticated) return <Navigate to="/login" replace />;
    
    else return(
    <>
        <Navbar />
        <Outlet />;
    </>
    )
};

const Routes = (props: Props) => {

    return (
        <Router>

            <Route path="/login" element={<LoginPage />} />
            <Route path="/error" element={<ErrorPage/>}/>
            <Route path="/" element={ <LoginPage/> }/>

            <Route element={<PrivateRoutes />}>
                <Route path="/home" element={ <HomePage />} />
            </Route>

            <Route path="*" element={ <ErrorPage/> } />
            

        </Router>
    );
};

export default Routes;





// export const routes = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [ // rutas que van a salir de la pagina "/"
//             {
//                 path: "",
//                 element: <Register />
//             }
//         ]
//     },
//     {
//         path: "/page1",
//         element: <h1>Page 1</h1>
//     },
//     {
//         path: "/page 2",
//         element: <h1>Page 2</h1>
//     }

// ]);