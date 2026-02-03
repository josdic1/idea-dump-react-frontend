// src/routes.jsx
import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";
import { HomePage } from "./pages/HomePage";
import { LogsPage } from "./pages/LogsPage";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";
import { SettingsPage } from "./pages/SettingsPage";
import { NoResults } from "./pages/NoResults";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      // Home page (this is "/")
      { index: true, element: <HomePage /> },

      // Other pages
      { path: "logs", element: <LogsPage /> },
      { path: "settings", element: <SettingsPage /> },

      // Catch-all
      { path: "no", element: <NoResults /> },
    ],
  },
];
