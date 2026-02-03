
// Reusable Layout Component
export const TerminalLayout = ({ children }) => {
  return (
    <div className="app-container">
      {/* The CRT Scanline Overlay */}
      <div className="scanline" />
      
      {/* Navigation */}
      <nav className="terminal-nav">
        <div className="brand">
          <span className="blink">█</span> SYSTEM_OS
        </div>
        <div className="nav-links">
          <a href="#">[ DASHBOARD ]</a>
          <a href="#">[ LOGS ]</a>
          <a href="#">[ SETTINGS ]</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ padding: '20px', textAlign: 'center', opacity: 0.5, fontSize: '10px' }}>
        SYS:ONLINE | MEM:OK | <span className="pulse">CONNECTED</span>
      </footer>
    </div>
  );
};

// Example Card Component
export const TerminalCard = ({ title, id, children }) => (
  <div className="terminal-card">
    <div className="terminal-header">
      <span>ID: {id}</span>
      <span>STATUS: ACTIVE</span>
    </div>
    <div className="terminal-body">
      <h3>{title}</h3>
      {children}
    </div>
  </div>
);