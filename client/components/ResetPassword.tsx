import React, { FC, useState } from 'react';
import { Paper, TextField, makeStyles, Typography, Button, Popover } from '@material-ui/core';
import { useForm } from "react-hook-form";
import useApi from "../hooks/useApi";
import { useHistory, useParams } from 'react-router-dom';
import NavBar from './NavBar';

const ResetPassword: FC = () => {

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
    });

    const { token, userId } = useParams() as any;

    const history = useHistory();
    const api = useApi();

    const { register, handleSubmit, errors, setError } = useForm();
    const onSubmit = async ({password, confirmPassword}) => {
        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: "password",
                message: "Egaliser les mots de passe"
            });
        } else {
            try {
                await api.post('auth/resetPassword', {
                    password,
                    token,
                    userId
                });
                setOpen(true);
                setPopoverStatus(200);
            } catch (err) {
                setOpen(true);
                setPopoverStatus(404);
            }
        }
    }

    const [open, setOpen] = useState(false);
    const [popoverStatus, setPopoverStatus] = useState(0);
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const id = open ? 'simple-popover' : undefined;

    const onConnect = () => {
        history.push('/connexion');
    }
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
                            inputProps={{role: 'input', 'aria-label': 'password' }}
                            name="password"
                            type="password"
                            label={<Typography>Mot de passe</Typography>}
                            inputRef={register({ required: true })}
                            error={errors.password}
                            helperText={errors.password ? <Typography>Le mot de passe est obligatoire</Typography> : null}
                        />
                        <TextField
                            className={classes.field}
                            inputProps={{role: 'input', 'aria-label': 'confirmPassword' }}
                            name="confirmPassword"
                            type="password"
                            label={<Typography>Confirmation du mot de passe</Typography>}
                            inputRef={register({ required: true })}
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword ? <Typography>La confirmation du mot de passe est obligatoire et doit correspondre au mot de passe</Typography> : null}
                        />
                        <Button
                            role="submit"
                            className={classes.field}
                            color="primary"
                            variant="outlined"
                            type="submit"
                        >
                            Changer
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
                    {popoverStatus === 200 ? 
                    <Typography className={classes.popover}>Votre mot de passe a été changé avec succès</Typography> : 
                    (popoverStatus === 404 ?
                    <Typography className={classes.popover}>Aucun compte actif trouvé</Typography> :
                    null)    
                }   
                </Popover>
            </div>
        </div>
    );
};

export default ResetPassword;