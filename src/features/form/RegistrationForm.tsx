
//═══════════════════════

import { FormField } from "./formField";
import { SubmittedOutput } from "./submittedOutput";
import { ROLE_OPTIONS } from "./types";
import { useRegistrationForm } from "./useRegistrationForm";

// ── Shared input style factory ─────────────────────────────
const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "10px 14px",
  fontSize: 15,
  background: "#0b0b0f",
  border: `1px solid ${hasError ? "#c0392b" : "#2a2a38"}`,
  borderRadius: 8,
  color: "#e8e6e1",
  outline: "none",
  boxSizing: "border-box",
});

export default function RegistrationForm() {
  // One hook call gives us EVERYTHING we need.
  // Destructure only what this component uses.
  const {
    formData,
    errors,
    hasSubmitted,
    submittedData,
    handleChange,
    handleSubmit,
    handleReset,
  } = useRegistrationForm();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "#e8e6e1",
        padding: "2rem 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* ── Header ──────────────────────────────────────── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-block",
              background: "#1a1a24",
              border: "1px solid #2a2a38",
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: 12,
              color: "#7b7a85",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            React + TypeScript
          </div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: "0 0 8px",
              color: "#fafaf8",
            }}
          >
            Team registration
          </h1>
          <p style={{ fontSize: 15, color: "#7b7a85", margin: 0 }}>
            Controlled form with separated concerns
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          {/* ════════════ FORM PANEL ════════════ */}
          <div
            style={{
              background: "#111118",
              border: "1px solid #1e1e2a",
              borderRadius: 12,
              padding: "1.75rem",
            }}
          >
            {/* Each FormField gets: label, error, and the input as children */}

            <FormField
              label="Name"
              required
              error={errors.name}
              hint="value={formData.name} → controlled by state"
            >
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Jane Doe"
                style={inputStyle(!!errors.name)}
              />
            </FormField>

            <FormField
              label="Email"
              required
              error={errors.email}
              hint="Same handleChange, different field key"
            >
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="jane@company.com"
                style={inputStyle(!!errors.email)}
              />
            </FormField>

            <FormField
              label="Role"
              hint="TypeScript narrows value to the union type"
            >
              <select
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                style={{ ...inputStyle(false), cursor: "pointer" }}
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Years of experience"
              required
              error={errors.experience}
            >
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                placeholder="5"
                min="0"
                max="50"
                style={inputStyle(!!errors.experience)}
              />
            </FormField>

            <FormField label="Bio (optional)" error={errors.bio}>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                style={{
                  ...inputStyle(!!errors.bio),
                  resize: "vertical",
                  minHeight: 80,
                }}
              />
            </FormField>

            {/* ── Actions ── */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleSubmit}
                style={{
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: 600,
                  background: "#e8e6e1",
                  color: "#0b0b0f",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
              <button
                onClick={handleReset}
                style={{
                  padding: "10px 28px",
                  fontSize: 14,
                  fontWeight: 500,
                  background: "transparent",
                  color: "#7b7a85",
                  border: "1px solid #2a2a38",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* ════════════ OUTPUT PANEL ════════════ */}
          <div>
            {/* Live state preview */}
            <div
              style={{
                background: "#111118",
                border: "1px solid #1e1e2a",
                borderRadius: 12,
                padding: "1.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#7b7a85",
                  margin: "0 0 1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Live state
              </h2>
              <pre
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "#a8a7b2",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>

            {/* Validation errors (only after first submit) */}
            {hasSubmitted && Object.keys(errors).length > 0 && (
              <div
                style={{
                  background: "#1a1114",
                  border: "1px solid #3a1a1a",
                  borderRadius: 12,
                  padding: "1.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h2
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#c0392b",
                    margin: "0 0 1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Validation errors
                </h2>
                <pre
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: "#e88b8b",
                    margin: 0,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {JSON.stringify(errors, null, 2)}
                </pre>
              </div>
            )}

            {/* Success output — extracted to its own component */}
            {submittedData && <SubmittedOutput data={submittedData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
