import React from "react";

import { Routes as RouterRoutes, Route } from "react-router-dom";

import { Webgeo, Errors } from "../views";

import Login from "../views/gbp/login";

import { ProtectedRoutes } from "./protected.routes";

import { RoutesConfigGbp } from "../config/gbp/RoutesConfig";
import Menus from "../views/gbp/menus";
import { Agenda } from "../views/gbp/agenda";
import Dashboard from "../views/gbp/dashboard";

export const Routes: React.FC = () => {
    return (
        <RouterRoutes>
            <Route path="/" element={<Login />} />
            <Route path="/active-user" element={<Webgeo.WebgeoActiveUser />} />
            <Route
                path="/reset-password"
                element={<Webgeo.WebgeoResetPassword />}
            />
            <Route
                path="/consulta-previa/:subscription"
                element={<Webgeo.WebgeoConsultaPrevia />}
            />
            <Route
                path="/confrontante/:subscription"
                element={
                    <ProtectedRoutes>
                        <Webgeo.WebgeoConfrontante />
                    </ProtectedRoutes>
                }
            />
            <Route
                path="/bci/:subscription"
                element={
                    <ProtectedRoutes>
                        <Webgeo.WebgeoBci />
                    </ProtectedRoutes>
                }
            />
            <Route path="/gbp/login" element={<Login />} />
            <Route path="/calendario" element={<Agenda />} />
            <Route path="/gestor-gabinete" element={<ProtectedRoutes />}>
                {RoutesConfigGbp.protected.modules.map((module) => (
                    <Route
                        path={module.path}
                        element={
                            module.element ? <module.element /> : <Menus />
                        }
                        key={module.key}
                    />
                ))}

                {RoutesConfigGbp.protected.submenus.map((submenu) => (
                    <Route
                        path={submenu.path}
                        key={submenu.key}
                        element={submenu.element ? <submenu.element /> : null}
                    />
                ))}
            </Route>
            <Route
                path="/unauthorized"
                element={<Errors.PermissionNotGranted />}
            />
            <Route path="*" element={<Errors.NotFound />} />
        </RouterRoutes>
    );
};
