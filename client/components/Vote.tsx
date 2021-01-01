import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { Paper, Avatar, makeStyles, useMediaQuery, Button, Popover, Typography } from '@material-ui/core';
import NavBar from './NavBar';
import { useUserConnected } from '../hooks/useToken';

interface Cat {
    id: string;
    url: string;
}

const Vote = () => {

    const matches = useMediaQuery('(max-width:900px)');
    const matches1300 = useMediaQuery('(min-width:1300px)');

    const useStyles = makeStyles({
        body: {
            backgroundColor: '#7AEDFA'
        },
        btn: {
            height: 30,
            marginTop: 30,
            marginBottom: 30
        },
        contentBtn: {
            display: 'flex',
            justifyContent: 'center'
        },
        contentPaper: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            minHeight: 'calc(100vh - 270px)',
            paddingTop: 50,
            paddingBottom: 50
        },
        paper: {
            width: 'calc(50% - 50px)',
            height: matches1300 ? 350 : 'calc(50vw - 420px)',
            minHeight: 120,
            paddingTop: 50,
            paddingBottom: 50,
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: '#C3E9E4',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
        },
        avatar: {
            width: '80%',
            height: 'auto',
            maxHeight: matches ? 100 : matches1300 ? 350 : 'calc(50vw - 330px)',
        },
        typography: {
            padding: 30
        }
    });

    const user = useUserConnected();

    const classes = useStyles();

    const api = useApi();

    const [cat1, setCat1] = useState({} as Cat);
    const [cat2, setCat2] = useState({} as Cat);

    const [reload, setReload] = useState(false);

    useEffect(() => {
        const start = async () => {
            const getCatsRandom = await api.get('/cats/getTwoCatsRandom');
            setCat1(getCatsRandom.data[0]);
            setCat2(getCatsRandom.data[1]);
        }
        start();
    }, [reload]);

    const handleGenerate = () => {
        setReload(!reload);
    }

    const handleVote = async (idCat, event) => {
        if (!user) {
            setAnchorElNoConnect(event.target);
        } else {
            const response = await api.post('/cats/vote', { catId: idCat });
            if (response.data.status === 'OK') {
                setReload(!reload);
            } else {
                setAnchorElAlready(event.target);
            }
        }
    }

    const [anchorElNoConnect, setAnchorElNoConnect] = useState(null);

    const handleCloseNoConnect = () => {
        setAnchorElNoConnect(null);
    };

    const openNoConnect = Boolean(anchorElNoConnect);
    const idNoConnect = openNoConnect ? 'simple-popover' : undefined;

    const [anchorElAlready, setAnchorElAlready] = useState(null);

    const handleCloseAlready = () => {
        setAnchorElAlready(null);
    };

    const openAlready = Boolean(anchorElAlready);
    const idAlready = openAlready ? 'simple-auther-popover' : undefined;

    return (
        <div>
            <NavBar />
            <div className={classes.body}>
                <div className={classes.contentBtn}>
                    <Button onClick={handleGenerate} variant="outlined" color="secondary" className={classes.btn}>Autres Chats</Button>
                </div>
                <div className={classes.contentPaper}>
                    <Paper onClick={handleVote.bind(null, cat1.id)} className={classes.paper} elevation={6} role="cat1">
                        <Avatar className={classes.avatar} src={cat1.url} alt={cat1.id} />
                    </Paper>
                    <Paper onClick={handleVote.bind(null, cat2.id)} className={classes.paper} elevation={6} role="cat2">
                        <Avatar className={classes.avatar} src={cat2.url} alt={cat2.id} />
                    </Paper>
                </div>
            </div>
            <Popover
                id={idNoConnect}
                open={openNoConnect}
                anchorEl={anchorElNoConnect}
                onClose={handleCloseNoConnect}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>Vous devez vous connecter pour liker. Le bouton se connecter est dans la nav barre</Typography>
            </Popover>
            <Popover
                id={idAlready}
                open={openAlready}
                anchorEl={anchorElAlready}
                onClose={handleCloseAlready}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography role='popover' className={classes.typography}>Vous avez déjà liké ce chat, choisissez un autre</Typography>
            </Popover>
        </div>
    )
}

export default Vote;