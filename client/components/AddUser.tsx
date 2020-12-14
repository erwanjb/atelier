import React, { FC, useCallback, useState } from 'react';
import { Paper, Typography, TextField, Button, makeStyles, FormHelperText, Avatar, Popover } from "@material-ui/core";
import { useForm } from "react-hook-form";
import useApi from "../hooks/useApi";
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import * as EmailValidator from 'email-validator';

const AddUser: FC = () => {

    const api = useApi();

    const useStyles = makeStyles({
        body: {
            marginTop: 30,
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
        drop: {
            marginTop: 20,
            border: "1px solid #05647A",
            backgroundColor: '#5F8883',
            borderRadius: 12,
            color: "#fff",
            padding: 5
        },
        red: {
            color: '#f44336'
        },
        white: {
            color: "#fff"
        },
        label: {
            width: 260,
            display: 'flex'
        },
        popover: {
            padding: 20,
        }
    })

    const history = useHistory();
    const classes = useStyles();

    const { register, handleSubmit, errors, setError } = useForm();
    
    const onSubmit = async (user) => {
        if (user.password !== user.confirmPassword) {
            setError('confirmPassword', {
                type: "password",
                message: "Egaliser les mots de passe"
            });
        } else if (!EmailValidator.validate(user.email)) {
            setError('email', {
                type: "email",
                message: "Email pas valide"
            });
        } else {
            try {
                await api.post('users', user);
                setOpen(true);
                setPopoverStatus(201);
            } catch (err) {
                console.log(err.message)
                setOpen(true);
                setPopoverStatus(409)
            }
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
    
    return (
        <div>
            <NavBar />
            <div className={classes.body}>
                <Paper
                    className={classes.content}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Typography>Créer un compte</Typography>
                        <TextField
                            className={classes.field}
                            name="email"
                            label={<Typography>Email</Typography>}
                            inputRef={register({ required: true, pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}
                            error={errors.email}
                            helperText={errors.email ? <Typography>Le mail est obligatoire et doit être valide</Typography> : null}
                        />
                        <TextField
                            className={classes.field}
                            name="password"
                            type="password"
                            label={<Typography>Mot de passe</Typography>}
                            inputRef={register({ required: true })}
                            error={errors.password}
                            helperText={errors.password ? <Typography>Le mot de passe est obligatoire</Typography> : null}
                        />
                        <TextField
                            className={classes.field}
                            name="confirmPassword"
                            type="password"
                            label={<Typography>Confirmation du mot de passe</Typography>}
                            inputRef={register({ required: true })}
                            error={errors.confirmPassword}
                            helperText={errors.confirmPassword ? <Typography>La confirmation du mot de passe est obligatoire et doit correspondre au mot de passe</Typography> : null}
                        />
                        <TextField
                            className={classes.field}
                            name="name"
                            label={<Typography>Nom ou pseudo</Typography>}
                            inputRef={register({ required: true })}
                            error={errors.name}
                            helperText={errors.name ? <Typography>Le nom ou pseudo est obligatoire</Typography> : null}
                        />
                        <Button
                            className={classes.field}
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >Créer</Button>
                        <Button
                            color="primary"
                            className={classes.field}
                            onClick={onConnect}
                        >
                            Retour à la connexion
                        </Button>
                    </form>
                </Paper>
                <Popover
                    id={id}
                    open={open}
                    onClose={handleClose}
                    
                >
                    {popoverStatus === 201 ? 
                    <Typography className={classes.popover}>
                        Votre compte a été créé, allez dans vos mails pour activer le compte et puis aller sur la page de connexion pour vous connecter
                    </Typography> : 
                    (popoverStatus === 409 ?
                    <Typography className={classes.popover}>Un compte avec le même email existe déjà, veuillez changer de mail</Typography> :
                    null)    
                }   
                </Popover>
            </div>
        </div>
    );
};

export default AddUser;