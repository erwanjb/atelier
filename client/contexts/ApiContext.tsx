import React, { useMemo, FC, createContext } from "react";
import axios, { AxiosInstance } from "axios";
import useToken from "../hooks/useToken";

const ApiContext = createContext<AxiosInstance>(axios);

interface IProps {
    baseURL: string;
}

export const ApiProvider: FC<IProps> = ({ baseURL, children }) => {

    const token = useToken();

    const client = useMemo(() => {
        const instance = axios.create({ baseURL });

        if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        return instance;

    }, [token])

    return <ApiContext.Provider value={client}>{children}</ApiContext.Provider>;
};

export default ApiContext;
