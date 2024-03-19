"use client";
import * as React from "react";
import { store } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";

interface ProviderProps extends React.PropsWithChildren {
    //
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Provider;
