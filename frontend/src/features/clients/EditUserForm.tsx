import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Client } from '../../app/models/Client';
import { useEffect, useState } from 'react';


// definimos lo que va a recibir el componente
interface Props {
    isOpen: boolean;
    initialClient: Client;
    handleClickClose: () => void;
    handdleEditClient: (client : Client) => void;
}


// recordar colocar el tipo de dato que va a recibir el componente del Props
const EditUserForm = ({ isOpen, initialClient, handleClickClose, handdleEditClient }: Props ) => {

    // crearemos el user state para el disabled del boton de enviar
    const [disabled, setDisabled] = useState<boolean>(true);


    const [open, setOpen] = useState(isOpen);
    const [client, setClient] = useState<Client>(initialClient);

    const handleClientChange = (event: any) => {
        setClient({ ...client, [event.target.id]: event.target.value });
    }

    const isFormFilled = () => {
        return (
            client.first_name.trim() !== '' &&
            client.last_name.trim() !== '' &&
            client.email.trim() !== '' &&
            client.puntos !== 0
        );
    };
    useEffect(() => {
        setDisabled(!isFormFilled());
    }, [client]);


    const handleClose = () => {
        setOpen(false);
        handleClickClose();
    };




    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Editar Cliente {initialClient.id}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first_name"
                        label="Nombre"
                        fullWidth
                        variant="standard"
                        value={client.first_name}
                        onChange={e => handleClientChange(e)}
                    />

                    <TextField
                        margin="dense"
                        id="last_name"
                        label="Apellido"
                        fullWidth
                        variant="standard"
                        value={client.last_name}
                        onChange={e => handleClientChange(e)}
                    />

                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        fullWidth
                        type='email'
                        variant="standard"
                        value={client.email}
                        onChange={e => handleClientChange(e)}
                    />

                    <TextField
                        margin="dense"
                        id="puntos"
                        label="Puntos"
                        fullWidth
                        type='number'
                        variant="standard"
                        value={client.puntos}
                        onChange={e => handleClientChange(e)}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button disabled={disabled} onClick={() => handdleEditClient(client)}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditUserForm;