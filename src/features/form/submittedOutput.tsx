import { FormData } from "./types";
interface SubmittedOutputProps {
  data: FormData;
}

export function SubmittedOutput({ data }: SubmittedOutputProps) {
  return (
    <div>
      <h2>Submitted Successfully</h2>
      <div style={{ display: "grid", gap: 12 }}>
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "8px 0",
              borderBottom: "1px solid #1a3a24",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "#5c8a6a",
                fontFamily: "monospace",
              }}
            >
              {key}
            </span>
            <span
              style={{
                fontSize: 14,
                color: "#b8e6c8",
                fontWeight: 500,
                maxWidth: "60%",
                textAlign: "right",
                wordBreak: "break-word",
              }}
            >
              {value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
