import React, { useState } from 'react';
import { AppBar, makeStyles, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useUserConnected } from '../hooks/useToken';
import useAuh from '../hooks/useAuth';

const NavBar = () => {

    const useStyle = makeStyles({
        bar: {
            height: 80,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 50
        },
        btn: {
            fontSize: 15,
            color: '#7AEDFA'
        },
        menuButton: {
            position: 'absolute',
            right: 30,
            top: 20
        }
    });

    const user = useUserConnected();
    const auth = useAuh();
    const classes = useStyle();
    const history = useHistory();

    const handleDirect = (page) => {
        history.push(`/${page}`);
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleConnect = () => {
        setAnchorEl(null);
        history.push('/connexion');
    }

    const handleDeco = async() => {
        setAnchorEl(null);
        await auth.logout();
    }

    return (
        <AppBar className={classes.bar} position="sticky">
            <Typography>Cat Mash</Typography>
            <IconButton role="btnHome" className={classes.btn} onClick={handleDirect.bind(null, '')}>Accueil</IconButton>
            <IconButton role="btnVote" className={classes.btn} onClick={handleDirect.bind(null, 'vote')}>Voter</IconButton>
            <div className={classes.menuButton}>
                {user ? <Typography>{user.name}</Typography> : null}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleProfileMenuOpen}
                    role="btnMenu"
                    >
                    <MenuIcon />
                </IconButton>
            </div>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id="primary-search-account-menu"
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {
                    user ?
                    <MenuItem role="btnDeco" onClick={handleDeco}>Se Déconnecter</MenuItem> :
                    <MenuItem role="btnCo" onClick={handleConnect}>Se Connecter</MenuItem>
                }
            </Menu>
        </AppBar>
    )
}

export default NavBar;