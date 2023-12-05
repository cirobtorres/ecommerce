'use client';

import { useEffect, useState, createContext } from 'react';

type AuthContextProps = {}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider(props: any) {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function login() {}

    async function logout() {}

    async function register() {}

    async function update() {}

    async function sessionConfigure() {}

    async function getAccessToken() {}

    async function refreshAccessToken() {}

    useEffect(() => {}, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            register,
            update,
            sessionConfigure,
            getAccessToken,
            refreshAccessToken
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export const AuthContextConsumer = AuthContext.Consumer;

/*
'use client';

import { useEffect, useState, createContext } from 'react';

type AuthContextProps = {}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthContextProvider(props: any) {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function login() {}

    async function logout() {}

    async function register() {}

    async function update() {}

    async function sessionConfigure() {}

    async function getAccessToken() {}

    async function refreshAccessToken() {}

    useEffect(() => {}, []);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            register,
            update,
            sessionConfigure,
            getAccessToken,
            refreshAccessToken
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export const AuthContextConsumer = AuthContext.Consumer;
*/