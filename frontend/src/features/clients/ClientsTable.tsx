import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { primaryGreen } from '../../app/constants/colors';
import { Client } from '../../app/models/Client';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: primaryGreen,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


interface Props {
    initialClients: Client[];
    handleDelete: (client: Client) => void;
    handleEdit: (client: Client) => void;
};



const ClientsTable = ({ initialClients, handleDelete , handleEdit }: Props) => {
    const [clients, setClients] = useState<Client[]>(initialClients);

    useEffect(() => {
        setClients(initialClients);
    }, [initialClients]);

    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Apellido</StyledTableCell>
                        <StyledTableCell align="center">Rut</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Puntos</StyledTableCell>
                        <StyledTableCell align="center">Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {clients.map((client) => (
                        <StyledTableRow key={client.id}>
                            <StyledTableCell component="th" scope="row" align="center">
                                {client.first_name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{client.last_name}</StyledTableCell>
                            <StyledTableCell align="center">{client.rut}</StyledTableCell>
                            <StyledTableCell align="center">{client.email}</StyledTableCell>
                            <StyledTableCell align="center">{client.puntos}</StyledTableCell>
                            <StyledTableCell align="center">

                                <IconButton size="large" color="default" aria-label="edit" onClick={() => handleEdit(client)}>
                                    <EditIcon />
                                </IconButton>

                                <IconButton size="large" color="error" aria-label="delete" onClick={() => handleDelete(client)}>
                                    <DeleteForeverIcon />
                                </IconButton>

                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default ClientsTable;

