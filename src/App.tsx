import React from "react";
import "./css/index.css";

import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { ToastAnimated } from "./components/global/toast";
import { LoadingProvider } from "./components/global/loading";
import { AuthProvider } from "./shared/contexts/auth.context";

const App: React.FC = () => (
    <>
        <AuthProvider>
            <LoadingProvider>
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </LoadingProvider>
        </AuthProvider>
        <ToastAnimated />
    </>
);

export default App;
