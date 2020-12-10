import react from 'react';
import { AppBar, makeStyles, IconButton, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

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
        }
    });

    const classes = useStyle();
    const history = useHistory();

    const handleDirect = (page) => {
        history.push(`/${page}`);
    }

    return (
        <AppBar className={classes.bar} position="sticky">
            <Typography>Cat Mash</Typography>
            <IconButton className={classes.btn} onClick={handleDirect.bind(null, '')}>Accueil</IconButton>
            <IconButton className={classes.btn} onClick={handleDirect.bind(null, 'vote')}>Voter</IconButton>
        </AppBar>
    )
}

export default NavBar;