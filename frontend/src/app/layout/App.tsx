import { BrowserRouter} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "../context/AuthContext";
import Routes from "../router/Routes";

const App = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
