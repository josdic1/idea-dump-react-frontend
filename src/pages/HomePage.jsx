import { TerminalCard } from "../layout/AppLayout";

export function HomePage() {
  return (
    <>

   
 
      <div className="ascii-art">
        {`
  ___  ___  __  __  ___  __  __ 
 / __|/ _ \\|  \\/  || _ \\|  \\/  |
 \\__ \\ (_) | |\\/| ||  _/| |\\/| |
 |___/\\___/|_|  |_||_|  |_|  |_|
`}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "20px",
        }}
      >
        <TerminalCard title="System Login" id="AUTH-01">
          <label>ACCESS CODE</label>
          <input type="text" placeholder="ENTER PASSWORD..." />
          <div style={{ display: "flex", gap: "10px" }}>
            <button>AUTHENTICATE</button>
            <button className="danger">ABORT</button>
          </div>
        </TerminalCard>

        <TerminalCard title="Data Stream" id="NET-99">
          <div className="terminal-screen">
            <code>
              {`> CONNECTING TO MAINFRAME...
> HANDSHAKE ACCEPTED.
> DOWNLOADING PACKETS [||||||||||] 100%
> DECRYPTION COMPLETE.`}
            </code>
          </div>
        </TerminalCard>
      </div>
    </>
  );
}
