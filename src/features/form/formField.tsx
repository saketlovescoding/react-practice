import React from "react";

interface FormFieldProps {
  /** The label text shown above the input */
  label: string;

  /** Whether the field is required (shows red asterisk) */
  required?: boolean;

  /** Error message — if present, field shows error styling */
  error?: string;

  /** Hint text shown below the input (for learning purposes) */
  hint?: string;

  /** The input/select/textarea element to render */
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Label */}
      <label
        style={{
          display: "block",
          fontSize: 13,
          fontWeight: 500,
          color: "#a8a7b2",
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: "#c0392b" }}> *</span>}
      </label>

      {/* The actual input — passed as children for maximum flexibility */}
      {children}

      {/* Error message — only renders when error is truthy */}
      {error && (
        <p
          style={{
            color: "#c0392b",
            fontSize: 13,
            margin: "4px 0 0",
            fontWeight: 500,
          }}
        >
          {error}
        </p>
      )}

      {/* Hint text */}
      {hint && (
        <p
          style={{
            fontSize: 12,
            color: "#4a4955",
            margin: "6px 0 0",
            fontFamily: "monospace",
          }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
