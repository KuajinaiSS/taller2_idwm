import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { AuthContext } from "../../app/context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const {authenticated, setAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();


    // EXPRESION REGULAR GENERICA USERNAME Y PASSWORD
    const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;

    const usernameErrorMsg: string = "";
    const passwordErrorMsg: string = "Credenciales invalidas";

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);

    // crearemos el user state
    const [disabled, setDisabled] = useState<boolean>(true);
    

    // este useEffect es para que se active cuando cambie el username o el password
    useEffect(() => {
        if (usernameError || passwordError) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [usernameError, passwordError]);

    // esta funcion es para enviar los datos al backend
    // el User y el Password tienen que ser los mismos que estan en el backend (DTO)
    const sendData = (User: string, Password: string) => {
        agent.Auth.login({ User, Password })
            .then((res) => {
                console.log(res)
                setAuthenticated(true);
                navigate("/home");
            })
            .catch((err) => {
                setPasswordError(true)
                setUsernameError(true)
                console.log(err)}
            )
            .finally(() => console.log("response finished"));
    };

    // esta funcion es para que no se recargue la pagina al enviar el formulario y que se vea en la consola
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const username = data.get("username")?.toString() ?? "";
        const password = data.get("password")?.toString() ?? "";

        sendData(username, password);
        console.log(username, password);
    };

    // esta funcion es para validar los datos ingresados
    const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log({name, value});

        if (name === "username"){
            setUsername(value);
            const isValid = usernameRegex.test(value);
            setUsernameError(!isValid);
        }
        else if(name === "password"){
            setPassword(value);
            const isValid = passwordRegex.test(value);
            setPasswordError(!isValid);
        }
    };

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        mt: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h3">
                        Iniciar Sesión
                    </Typography>
                </Box>

                <Box component="form" sx={{ mt: 2 }} noValidate onSubmit={handleSubmit}>
                    <TextField
                        name="username"
                        id="username"
                        margin="normal"
                        required
                        fullWidth
                        label="Nombre de usuario"
                        value={username}
                        onChange={handleFieldChange}
                        error={usernameError}
                        helperText={usernameError ? usernameErrorMsg : ""}
                        autoFocus
                        
                    />

                    <TextField
                        name="password"
                        id="password"
                        margin="normal"
                        required
                        fullWidth
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={handleFieldChange}
                        helperText={usernameError ? usernameErrorMsg : ""}
                        error={passwordError}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                        disabled={disabled}
                    >
                        Iniciar Sesión
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default LoginPage;
