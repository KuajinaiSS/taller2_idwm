import { Typography } from "@mui/material";

const ErrorPage = () => {
    return (
        <>
            <Typography variant="h3" component="h1" gutterBottom>
                Error Page
            </Typography>
            
            <Typography variant="h5" component="h2" gutterBottom>
                Oppss... Something went wrong.
            </Typography>
        </>

    );
};

export default ErrorPage;