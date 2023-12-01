"use client";

import { useEffect, useState, createContext } from 'react';

const AuthContext = createContext<AuthContextProps>({})

export function AuthContextProvider(props: any) {
    return (
        <AuthContext.Provider value={{}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export const AuthContextConsumer = AuthContext.Consumer;