import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Box, Container, Typography } from "@mui/material";
import ClientTable from "../clients/ClientsTable";
import { Client } from "../../app/models/Client";
import { Edit } from "@mui/icons-material";
import EditUserForm from "../clients/EditUserForm";

// type Client = {
//     id: string;
//     first_name: string;
//     last_name: string;
//     rut: string;
//     email: string;
//     puntos: number;
// }

const defaultClient: Client = {
    id: "",
    first_name: "",
    last_name: "",
    rut: "",
    email: "",
    puntos: 0,
}


const HomePage = () => {
    // todos los clientes
    const [clients, setClients] = useState<Client[]>([]);

    // cliente seleccionado
    const [currentClient, setCurrentClient] = useState<Client>(defaultClient);

    // boleano para saver si es que se esta editando el cliente
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);


    useEffect(() => {
        agent.Clients.list()
            .then(data => {
                setClients(data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                console.log();
            });
    }, [])

    const handleDeleteClient = (id: string) => {
        setClients(clients.filter(client => client.id !== id));
    }

    const handleEditClient = (client: Client) => {
        console.log(client);
        setClients(clients.map(c => c.id === client.id ? client : c));
        setCurrentClient(defaultClient);
        setIsEditFormOpen(false);
    }

    const handleIsEditClient = (client: Client) => {
        setCurrentClient(client);
        setIsEditFormOpen(true);
    }

    const handleClickCloseEditForm = () => {
        setCurrentClient(defaultClient);
        setIsEditFormOpen(false);
    }


    return (
        <Container>
            <Box sx={{ margin: "2rem 0" }}>
                <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem" }}>
                    Gestionar Clientes
                </Typography>

                <ClientTable initialClients={clients} handleDelete={handleDeleteClient} handleEdit={handleIsEditClient} />

                { // si no esta abierto el formulario de editar cliente, no se muestra nada
                    isEditFormOpen &&
                    <EditUserForm isOpen={isEditFormOpen} initialClient={currentClient} handleClickClose={handleClickCloseEditForm} handdleEditClient={handleEditClient} />
                }

            </Box>
        </Container>
    )
}

export default HomePage;