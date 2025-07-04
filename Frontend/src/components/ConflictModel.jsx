const ConflictModal = ({ conflict, onResolve, onCancel }) => {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h3>⚠️ Conflict Detected</h3>
        <p>Choose which version to keep:</p>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          <div>
            <h4>Your Changes</h4>
            <pre>{JSON.stringify(conflict.client, null, 2)}</pre>
            <button onClick={() => onResolve(conflict.client)}>Keep Mine</button>
          </div>
          <div>
            <h4>Server Version</h4>
            <pre>{JSON.stringify(conflict.server, null, 2)}</pre>
            <button onClick={() => onResolve(conflict.server)}>Keep Server</button>
          </div>
        </div>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConflictModal;
