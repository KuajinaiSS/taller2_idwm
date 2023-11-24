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
    handdleCreateClient: (client : Client) => void;
}

// recordar colocar el tipo de dato que va a recibir el componente del Props
const CreateUserForm = ({ isOpen, initialClient, handleClickClose, handdleCreateClient }: Props ) => {


    const [open, setOpen] = useState(isOpen);
    const [client, setClient] = useState<Client>(initialClient);

    const handleClientChange = (event: any) => {
        setClient({ ...client, [event.target.id]: event.target.value });
    }

    const handleClose = () => {
        setOpen(false);
        handleClickClose();
    };



    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Crear Cliente</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="first_name"
                        label="Nombre"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => handleClientChange(e)}
                    />

                    <TextField
                        margin="dense"
                        id="last_name"
                        label="Apellido"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => handleClientChange(e)}
                    />

                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => handleClientChange(e)}
                    />

                    <TextField
                        margin="dense"
                        id="rut"
                        label="Rut"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={e => handleClientChange(e)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => handdleCreateClient(client)}>Crear</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CreateUserForm;