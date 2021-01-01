import React, { FC, useState } from 'react';
import { Paper, TextField, makeStyles, Typography, Button, Popover } from '@material-ui/core';
import { useForm } from "react-hook-form";
import useApi from "../hooks/useApi";
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';

const SendResetPassword: FC = () => {
    const useStyle = makeStyles({
        body: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        content: {
            width: 280,
            padding: 10
        },
        field: {
            display: 'block',
            marginTop: 20,
            "& div": {
                width: "100%"
            }
        },
        popover: {
            padding: 20
        }
    })

    const history = useHistory();
    const api = useApi();

    const { register, handleSubmit, errors, setError } = useForm();
    const onSubmit = async ({email}) => {
        try {
            await api.post('auth/sendResetPassword', {
                email
            })
            setOpen(true);
            setPopoverStatus(200);
        } catch (err) {
            setOpen(true);
            setPopoverStatus(404);
        }
    }

    const onConnect = () => {
        history.push('/connexion');
    }

    const [open, setOpen] = useState(false);
    const [popoverStatus, setPopoverStatus] = useState(0);
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const id = open ? 'simple-popover' : undefined;
    const classes = useStyle();
    return (
        <div>
            <NavBar />
            <div className={classes.body}>
                <Paper
                    className={classes.content}
                >
                    <form onSubmit={handleSubmit(onSubmit)} role="form">
                        <TextField
                            className={classes.field}
                            inputProps={{role: 'input', 'aria-label': 'email' }}
                            name="email"
                            label={<Typography>Email</Typography>}
                            inputRef={register({ required: true, pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                            error={errors.email}
                            helperText={errors.email ? <Typography>Le mail est obligatoire en format mail -@-.-</Typography> : null}
                        />
                        <Button
                            className={classes.field}
                            color="primary"
                            variant="outlined"
                            type="submit"
                        >
                            Envoyer
                        </Button>
                        <Button
                            color="primary"
                            className={classes.field}
                            onClick={onConnect}
                        >Retour à la connexion</Button>
                    </form>
                </Paper>
                <Popover
                    id={id}
                    open={open}
                    onClose={handleClose}
                    
                >
                    {
                        popoverStatus === 200 ? 
                        <Typography className={classes.popover}>Un email vous a été envoyé à votre adresse pour refaire votre mot de passe</Typography> : 
                        (popoverStatus === 404 ?
                        <Typography className={classes.popover}>Aucun compte actif trouvé a cet email</Typography> :
                        null)    
                    }   
                </Popover>
            </div>
        </div>
    );
};

export default SendResetPassword;