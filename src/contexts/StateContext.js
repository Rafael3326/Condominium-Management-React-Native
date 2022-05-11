import React, { createContext, useContext, useReducer, useState } from "react";
import UserReducer from "../reducers/UserReducer";

const InitialState = {

    user: UserReducer
}   // setting the initial state

const MainReducer = (state, action) => ({

    user: UserReducer(state.user, action)
})  // creating  a structure for reducers

export const StateContext = createContext()  // initializing the context

export const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(MainReducer, InitialState) // configure the reducer
    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)