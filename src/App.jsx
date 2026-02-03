// src/App.jsx
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { NavBar } from "./components/shared/NavBar";
import { ToastContainer } from "./components/shared/ToastContainer";
import { useToast } from "./hooks/useToast";
import { AppLayout } from "./layout/AppLayout";
import { GridSphere } from "./visual/GridSphere";

export const ToastContext = createContext(null);

export default function App() {
  const { toasts, addToast, removeToast } = useToast();

  return (
    <div className="crt-root">
      <div
        style={{
          position: "fixed",
          top: 10,
          right: 40,
          zIndex: 5, // below main-content (yours is 50)
          opacity: 0.9,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <GridSphere size={220} internalScale={0.5} speed={0.7} />
      </div>
      <div className="outrun-grid" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />
      <div className="crt-warp" aria-hidden="true" />
      <div className="crt-scanlines" aria-hidden="true" />

      <ToastContext.Provider value={{ addToast }}>
        <AppLayout>
          <ToastContainer toasts={toasts} removeToast={removeToast} />
          <NavBar />
          <main className="main-content">
            <Outlet />
          </main>
        </AppLayout>
      </ToastContext.Provider>
    </div>
  );
}
