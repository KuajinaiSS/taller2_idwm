import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import ClientTable from "../clients/ClientsTable";
import { Client } from "../../app/models/Client";
import EditUserForm from "../clients/EditUserForm";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateUserForm from "../clients/CreateUserForm";
import DobleVerificacion from "../clients/DobleVerificacion";


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


    useEffect(() => {
        agent.Clients.list()
            .then(data => {
                setClients(data);
                setOriginalClients(data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                console.log();
            });
    }, [])

    // DELETE CLIENT
    const [isDeleteFormOpen, setIsDeleteFormOpen] = useState<boolean>(false);

    const handleDeleteClient = (rut: string) => {
        agent.Clients.delete(rut)
        .then(() => {
            // Eliminación exitosa, podrías actualizar el estado o mostrar un mensaje
            console.log(`Cliente con rut ${rut} eliminado exitosamente`);
            setClients(clients.filter(client => client.rut !== rut));
        })
        .catch(error => {
            // Manejo de errores, muestra un mensaje, etc.
            console.error(`Error al eliminar el cliente con rut ${rut}:`, error);
        })
        .finally(() => {
            setIsDeleteFormOpen(false);
            setCurrentClient(defaultClient);
            
        });
    }

    const handleClickCloseDeleteForm = () => {
        setIsDeleteFormOpen(false);
    }

    const handleIsDeleteClient = (client: Client) => {
        setCurrentClient(client);
        setIsDeleteFormOpen(true);
    }



    // EDIT CLIENT
    const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
    const [currentClient, setCurrentClient] = useState<Client>(defaultClient);

    const handleEditClient = (client: Client) => {

        agent.Clients.edit(client.rut, client)
        .then(response => {
            console.log(response); // Manejo de la respuesta exitosa
            setCurrentClient(defaultClient);
            setClients(clients.map(c => (c.rut === client.rut ? client : c)));
            setIsEditFormOpen(false);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            console.log(client);
            setIsEditFormOpen(false);
            setCurrentClient(defaultClient);
        });
    }

    const handleIsEditClient = (client: Client) => {
        setCurrentClient(client);
        setIsEditFormOpen(true);
    }

    const handleClickCloseEditForm = () => {
        setCurrentClient(defaultClient);
        setIsEditFormOpen(false);
    }

    // CREATE CLIENT
    const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);

    const handleCreateClient = async (client: Client) => {
        agent.Clients.create(client)
            .then(data => {
                setClients([...clients, client]);
                console.log("Cliente creado exitosamente", data);
            }).catch(error => {
                console.log(error);
            }).finally(() => {
                setIsCreateFormOpen(false);
            });
    }

    const handleClickCloseCreateForm = () => {
        setIsCreateFormOpen(false);
    }

    const handleIsCreateClient = () => {
        setIsCreateFormOpen(true);
    }

    // BUSCAR CLIENTE
    const [originalClients, setOriginalClients] = useState<Client[]>([]);
    const [searchValueRut, setSearchValueRut] = useState<string>("");
    const [searchValueEmail, setSearchValueEmail] = useState<string>("");


    const handleSearchClientRut = (value: string) => {
        setSearchValueRut(value);
        const filteredClients = originalClients.filter(
            (client) =>
                client.rut.toLowerCase().includes(value.toLowerCase())
        );

        setClients(value === "" ? originalClients : filteredClients);
    }

    const handleSearchClientEmail = (value: string) => {
        setSearchValueEmail(value);
        const filteredClients = originalClients.filter(
            (client) =>
                client.email.toLowerCase().includes(value.toLowerCase())
        );

        setClients(value === "" ? originalClients : filteredClients);
    }

    const handleResetSearch = () => {
        setClients(originalClients);
        setSearchValueRut("");
        setSearchValueEmail("");
    };





    return (
        <Container >

            <Box sx={{ margin: "2rem 0", height:1 }}>
                <Typography variant="h3" component="h1" sx={{ marginBottom: "1rem" }}>
                    Gestionar Clientes
                </Typography>

                <Grid sx={{ mt: 3, mb: 2 }} container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            freeSolo
                            id="buscador-rut"
                            value={searchValueRut}
                            disableClearable
                            options={clients.map((client) => client.rut)}
                            onChange={(event, value) => handleSearchClientRut(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Buscar Rut"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Autocomplete
                            freeSolo
                            id="buscador-email"
                            value={searchValueEmail}
                            disableClearable
                            options={clients.map((client) => client.email)}
                            onChange={(event, value) => handleSearchClientEmail(value)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Buscar Email"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Button sx={{ height: 55 }} variant="outlined" onClick={handleResetSearch}>
                            Reiniciar Búsqueda
                        </Button>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Button sx={{ height: 55 }} onClick={handleIsCreateClient} variant="contained" startIcon={<AddCircleIcon />} fullWidth>
                            Crear Cliente
                        </Button>
                    </Grid>
                </Grid>


                <ClientTable initialClients={clients} handleDelete={handleIsDeleteClient} handleEdit={handleIsEditClient} />

                { // si no esta abierto el formulario de editar cliente, no se muestra nada
                    isEditFormOpen &&
                    <EditUserForm isOpen={isEditFormOpen} initialClient={currentClient} handleClickClose={handleClickCloseEditForm} handdleEditClient={handleEditClient} />
                }

                { // si no esta abierto el formulario de crear cliente, no se muestra nada
                    isCreateFormOpen &&
                    <CreateUserForm isOpen={isCreateFormOpen} initialClient={currentClient} handleClickClose={handleClickCloseCreateForm} handdleCreateClient={handleCreateClient} />
                }

                { // si no esta abierto el formulario de eliminar cliente, no se muestra nada
                    isDeleteFormOpen &&
                    <DobleVerificacion isOpen={isDeleteFormOpen} initialClient={currentClient} handleClickClose={handleClickCloseDeleteForm} handdleDeleteClient={handleDeleteClient} />
                }

            </Box>
        </Container>
    )
}

export default HomePage;