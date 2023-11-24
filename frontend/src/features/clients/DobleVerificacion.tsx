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
    handdleDeleteClient: (rut : string) => void;
}


// recordar colocar el tipo de dato que va a recibir el componente del Props
const DobleVerificacion = ({ isOpen, initialClient, handleClickClose, handdleDeleteClient }: Props ) => {


    const [open, setOpen] = useState(isOpen);
    const [client, setClient] = useState<Client>(initialClient);

    const handleClose = () => {
        setOpen(false);
        handleClickClose();
    };




    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Deletear Cliente {initialClient.id}</DialogTitle>
                <DialogContent>
                    
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={() => handdleDeleteClient(initialClient.rut)}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DobleVerificacion;