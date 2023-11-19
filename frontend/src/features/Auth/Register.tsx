import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import agent from "../../app/api/agent";

const Register = () => {

    // esta funcion es para que no se recargue la pagina al enviar el formulario y que se vea en la consola 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const first_name = data.get("First_name")?.toString()??"";
        const last_name = data.get("Last_name")?.toString()??"";
        const rut = data.get("Rut")?.toString()??"";
        const email = data.get("Email")?.toString()??"";
        const puntos = parseInt(data.get("Puntos") as string); // Puntos como number/integer

        sendData(first_name, last_name, rut, email, puntos);
    }

    // esta funcion es para enviar los datos al backend
    const sendData = async (first_name:string, last_name:string, rut:string, email:string, puntos:number  ) => {
        agent.Auth.register( {first_name, last_name, rut, email, puntos} )
        .then( res => console.log(res))
        .catch( err => console.log(err))
        .finally( () => console.log("response finished"));
    }

    return (
        <>
            <CssBaseline />

            <Container component="main" maxWidth="xs">

                <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>

                    <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h4"> {/*el tipo que es y el como se vera */}
                        Registrar
                    </Typography>

                </Box>

                <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
                
                    <TextField name="First_name" margin="normal" required fullWidth id="First_name" label="Nombre" autoFocus />
                    <TextField name="Last_name" margin="normal" required fullWidth id="Last_name" label="Apellido" />
                    <TextField name="Rut" margin="normal" required fullWidth id="Rut" label="Rut" />
                    <TextField name="Email" margin="normal" required fullWidth id="Email" label="Correo" type="email" />
                    <TextField name="Puntos" margin="normal" required fullWidth id="Puntos" label="Puntos" type="number" />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, mb: 2 }}>Registrar</Button>
                </Box>

            </Container>

        </>
    );
}

export default Register;
