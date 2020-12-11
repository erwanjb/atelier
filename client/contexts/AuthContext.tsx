import React, { FC, createContext, useState, useEffect } from 'react';
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";
import { setToken, clearToken } from "../store/auth/actions";

interface Auth {
    login: Function;
    logout: Function;
}

const AuthContext = createContext({} as Auth);


export const AuthProvider: FC = ({ children }) => {
    const dispatch = useDispatch();
    const api = useApi();

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await api.post('/auth/login', {
                username: email,
                password
            });
    
            const tokenNow = response.data.token;
            dispatch(setToken(tokenNow));
        } catch (err) {
           console.log(err);
        }

    }

    const logout = () => {
        dispatch(clearToken());
    }

   

    return (
        <AuthContext.Provider value={{ login, logout }} >{children}</AuthContext.Provider>
    )
  }

  export default AuthContext;