'use client';
import React, { useMemo, useContext, useReducer } from 'react';
import {AppContext} from "@/app/context/index";
import {eAppStateDispatchType} from "@/app/context/types";
import {tAlertItem} from "@/app/components/alerts/types";

export type AppStateReducerActionType =
    | { type: eAppStateDispatchType.ADD_ALERT; payload: tAlertItem }
    | { type: eAppStateDispatchType.REMOVE_ALERT; payload: undefined };

type tState = {alerts: tAlertItem | null};

function ApStateReducer(state: tState, action: AppStateReducerActionType) {
    const {type, payload} = action;

    switch (type) {
        case eAppStateDispatchType.ADD_ALERT:
            return {
                ...state,
                alerts: payload
            };
        case eAppStateDispatchType.REMOVE_ALERT:
            return {
                ...state,
                alerts: null
            };
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

const initState = {
    alerts: null
};

function AppContextProvider({children} : {children: React.ReactNode}) {
    const [AppState, AppDispatch] = useReducer(ApStateReducer, initState);

    const value = useMemo(
        () => ({AppState, AppDispatch}),
        [AppState, AppDispatch]
    );

    return (
        <AppContext.Provider
            value={value}
        >
            {children}
        </AppContext.Provider>
    )
}

function useAppContext() {
    return useContext(AppContext);
}

export {useAppContext, AppContextProvider}
