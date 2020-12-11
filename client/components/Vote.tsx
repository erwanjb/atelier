import react, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { Paper, Avatar, makeStyles, useMediaQuery, Button } from '@material-ui/core';
import NavBar from './NavBar';

interface Cat {
    id: string;
    url: string;
}

const Vote = () => {

    const matches = useMediaQuery('(max-width:700px)');

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
            height: 'calc(50vw - 320px)',
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
            maxHeight: matches ? 100 : 'calc(50vw - 230px)',
        }
    });

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

    return (
        <div>
            <NavBar />
            <div className={classes.body}>
                <div className={classes.contentBtn}>
                    <Button onClick={handleGenerate} variant="outlined" color="secondary" className={classes.btn}>Autres Chats</Button>
                </div>
                <div className={classes.contentPaper}>
                    <Paper className={classes.paper} elevation={6}>
                        <Avatar className={classes.avatar} src={cat1.url} alt={cat1.id}/>
                    </Paper>
                    <Paper className={classes.paper} elevation={6}>
                        <Avatar className={classes.avatar} src={cat2.url} alt={cat2.id}/>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Vote;