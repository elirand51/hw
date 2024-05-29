'use client';
import React, { createContext } from 'react'
import {tAlertItem} from "@/app/components/alerts/types";

type AppStateType = {
    AppState: { alerts: tAlertItem | null} | undefined,
    AppDispatch: Function | undefined
}

export const AppContext = createContext<AppStateType>({AppDispatch: undefined, AppState: undefined});
