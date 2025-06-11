import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  value: number;
  description: string;
  quantity: number;
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [resources, setResources] = useState<string[]>([]);

  const onSubmit = (data: Inputs) =>
    setResources((prevResources) => [...prevResources, data.name]);

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
      <form
        style={{ display: "flex", gap: "1rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/, // letters and spaces only
              message: "Name must contain only letters",
            },
          })}
          placeholder="Name *"
        />
        <input
          {...register("value", {
            required: "Value is required",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/, // dot notation with optional 2 decimal places
              message: "Use dot (.) for decimals, e.g. 10.99",
            },
          })}
          type="number"
          step="0.01"
          placeholder="Value *"
        />
        <input {...register("description")} placeholder="Description" />
        <input
          {...register("quantity", {
            validate: (value) => {
              if (!value) return true;
              const parsed = Number(value);
              if (isNaN(parsed) || !Number.isInteger(parsed)) {
                return "Quantity must be an integer";
              }
              return true;
            },
          })}
          type="number"
          placeholder="Quantity"
        />
        <button type="submit">Send</button>
      </form>
      <div style={{height: '7rem', display: "flex", flexDirection: "column", gap: "1rem" }}>
        <span>{errors?.name?.message || ""}</span>
        <span>{errors?.value?.message || ""}</span>
        <span>{errors?.quantity?.message || ""}</span>
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
                  outline: "none",
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
