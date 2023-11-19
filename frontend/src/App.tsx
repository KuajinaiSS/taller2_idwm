import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Outlet/> {/* Outlet es para rederigir las pestañas y hacer el enrutamiento en el index hay otro parecido */}
    </>
  );
} 

export default App;
