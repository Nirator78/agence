import { Navigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Bien from "./pages/Bien";
import GestionRendezVous from "./pages/GestionRendezVous";
import Inscription from "./pages/Inscription";
import Interface from "./pages/Interface";
import ListBiens from "./pages/ListBiens";
import NotFound from "./pages/NotFound";

const MAP_ROUTES = [
    { path: "/", element: <Navigate to="/" /> },
    {
        path: "/", element: <Interface />, children: [
            { index: true, element: <Accueil /> },
            {
                path: "bien", children: [
                    { index: true, element: <ListBiens /> },
                    { path: ":id", element: <Bien /> },
                ]
            },
            { index: true, path: "inscription", element: <Inscription /> },
            { index: true, path: "gestion-rendez-vous", element: <GestionRendezVous /> },
            { index: true, path: "gestion-agent", element: <Inscription /> },
            { path:'*', element: <NotFound /> },    
        ]
    },
];

export default MAP_ROUTES;
