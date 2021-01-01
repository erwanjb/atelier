import React, { FC, useState } from 'react';
import useAuth from "../hooks/useAuth";
import { Paper, TextField, Button, makeStyles, Typography, Popover } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';

const Connexion: FC = () => {

    const useStyles = makeStyles({
        body: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            width: 300,
            padding: 30
        },
        field: {
            display: 'block',
            marginBottom: 30,
            "& div": {
                width: "100%"
            }
        },
        popover: {
            padding: 20
        }
    });

    const history = useHistory();

    const { register, handleSubmit, errors, setError } = useForm();

    const classes = useStyles();
    const auth = useAuth();

    const onSubmit = async ({email, password}) => {
        try {
            await auth.login(email, password);
            setOpen(true);
            setPopoverStatus(200);
        } catch (err) {
            setOpen(true);
            setPopoverStatus(404);
        }
    }

    const onReset = () => {
        history.push('/resetPassword');
    }

    const onCreate = () => {
        history.push('/addUser');
    }

    const handleHome = () => {
        history.push('/');
    }

    const [open, setOpen] = useState(false);
    const [popoverStatus, setPopoverStatus] = useState(0);
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <NavBar />
            <div className={classes.body}>
                <Paper className={classes.content}>
                    <Button onClick={handleHome}>Retour à l'accueil</Button>
                    <form onSubmit={handleSubmit(onSubmit)} role="form">
                        <TextField
                            className={classes.field}
                            inputProps={{role: 'input', 'aria-label': 'email' }}
                            name="email"
                            InputLabelProps={{"data-shrink" : "true"} as any}
                            label={<Typography>Email</Typography>}
                            inputRef={register({ required: true, pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                            error={errors.email}
                            helperText={errors.email ? <Typography>Le mail est obligatoire en format mail -@-.-</Typography> : null}
                        />
                        <TextField
                            className={classes.field}
                            inputProps={{role: 'input', 'aria-label': 'password' }}
                            name="password"
                            InputLabelProps={{"data-shrink" : "true"} as any}
                            type="password"
                            label={<Typography>Mot de passe</Typography>}
                            inputRef={register({ required: true })}
                            error={errors.password}
                            helperText={errors.password ? <Typography>Le mot de passe est obligatoire</Typography> : null}
                        />
                        <Button
                            className={classes.field}
                            type="submit"
                            variant="outlined"
                            color="primary"
                            role="submit"
                        >Se connecter</Button>
                        <Button
                            className={classes.field}
                            color="primary"
                            onClick={onReset}
                        >Mot de passe oublié</Button>
                        <Button
                            className={classes.field}
                            color="primary"
                            onClick={onCreate}
                        >Créer un compte</Button>
                    </form>
                </Paper>
            </div>
            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                role='popover'
            >
                {
                    popoverStatus === 200 ? 
                    <Typography className={classes.popover}>Vous êtes connecté</Typography> : 
                    (popoverStatus === 404 ?
                    <Typography className={classes.popover}>Aucun compte actif trouvé avec ces identifiants</Typography> :
                    null)    
                }   
            </Popover>
        </div>
    );
};

export default Connexion;