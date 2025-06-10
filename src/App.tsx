import { useState } from "react";

function App() {
  const [resources, setResources] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  const handleSendName = () => {
    setResources((currentResources) => [...currentResources, name]);
    setName("");
  };
  return (
    <div
      style={{
        boxSizing: "border-box",
        height: "100vh",
        padding: "1rem",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <span>Resources count: {resources.length}</span>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSendName}
          disabled={name.length < 3}
        >
          Send
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, 150px)",
          gridTemplateRows: "1fr",
          gap: "1rem",
        }}
      >
        {resources.map((resource, index) => (
          <div
            key={index}
            style={{
              border: "1px solid blue",
              borderRadius: "1rem",
              height: "5rem",
              display: "grid",
              placeItems: "center",
              position: "relative",
            }}
          >
            <div
              style={{ position: "absolute", top: "0.2rem", right: "0.25rem" }}
            >
              <button
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#f00c",
                  padding: 0,
                  color: "#fff",
                  width: "2.2rem",
                  height: "2.2rem",
                  display: "grid",
                  placeItems: "center",
                  outline: 'none'
                }}
                type="button"
              >
                x
              </button>
            </div>
            {resource}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
