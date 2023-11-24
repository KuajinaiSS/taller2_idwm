import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Client } from '../../app/models/Client';
import { useState } from 'react';


// definimos lo que va a recibir el componente
interface Props {
    isOpen: boolean;
    initialClient: Client;
    handleClickClose: () => void;
    handdleEditClient: (client : Client) => void;
}


// recordar colocar el tipo de dato que va a recibir el componente del Props
const EditUserForm = ({ isOpen, initialClient, handleClickClose, handdleEditClient }: Props ) => {


    const [open, setOpen] = useState(isOpen);
    const [client, setClient] = useState<Client>(initialClient);

    const handleClientChange = (event: any) => {
        setClient({ ...client, [event.target.id]: event.target.value });
    }

    const handleOnSubmit = (event: any) => {

    }

    const handleClickOpen = () => {
        setOpen(true);
    };

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
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={client.email}
                        onChange={e => handleClientChange(e)}
                    />

                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => handdleEditClient(client)}>Actualizar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditUserForm;