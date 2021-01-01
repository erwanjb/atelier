import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Avatar } from '@material-ui/core';
import useApi from '../hooks/useApi';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Home = () => {

    const useStyle = makeStyles({
        contentCat: {
            backgroundColor: '#7AEDFA',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        },
        paper: {
            padding: 20,
            width: 100,
            height: 150,
            margin: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        avatar: {
            width: 100,
            height: 100,
            marginBottom: 20
        },
        iconHeart: {
            marginRight: 10
        }
    });

    const api = useApi();

    useEffect(() => {
        const start = async () => {
            const getCats = await api.get('/cats');
            setCats(getCats.data);
        }
        start();
    }, [])

    const [cats, setCats] = useState([]);

    const classes = useStyle();

    return (
        <div>
            <NavBar />
            <div className={classes.contentCat}>
                {cats.map((cat, index) => {
                    return (
                        <Paper className={classes.paper} elevation={6} role="cat" key={index}>
                            <Avatar className={classes.avatar} alt={cat.id} src={cat.url} />
                            <span>
                                <FontAwesomeIcon className={classes.iconHeart} color="#DB261E" icon={faHeart} />
                                {cat.likes.length} likes
                            </span>
                        </Paper>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;