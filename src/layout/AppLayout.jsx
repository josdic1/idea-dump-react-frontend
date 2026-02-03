// MAIN LAYOUT WRAPPER
import { Link } from "react-router-dom";

export const AppLayout = ({ children }) => {
  return (
    <div className="app-container">
      {/* CRT Scanline Overlay */}
      <div className="scanline" />

      {/* Navigation */}
      <nav className="terminal-nav">
        <div className="nav-brand">
          <span className="blink">█</span> SYSTEM_OS
        </div>
        <div className="nav-links">
          <Link to="/">[ HOME ]</Link>
          <Link to="/logs">[ LOGS ]</Link>
          <Link to="/settings">[ CONFIG ]</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">{children}</main>

      {/* Footer */}
      <footer
        style={{
          padding: "20px",
          textAlign: "center",
          opacity: 0.6,
          fontSize: "10px",
        }}
      >
        SYS_STATUS: ONLINE | MEM: 64K OK |{" "}
        <span className="pulse">CONNECTED</span>
      </footer>
    </div>
  );
};

// REUSABLE TERMINAL CARD
export const TerminalCard = ({ title, id = "0000", children }) => {
  return (
    <div className="terminal-card">
      <div className="terminal-header">
        <span>ID: {id}</span>
        <span>STATUS: ACTIVE</span>
      </div>
      <div className="terminal-body">
        <h3 className="terminal-title">{title}</h3>
        {children}
      </div>
    </div>
  );
};
