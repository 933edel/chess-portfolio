import React from "react";

export default function Footer({ onNext, currentGame }) {
  const credits = "3D Chess Models by Jarlan Perez [CC-BY] via Poly Pizza";

  return (
    <footer
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        padding: "0.5rem 1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        fontFamily: "sans-serif",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      <span style={{ position: "absolute", left: "1rem" }}>
        © 2025 Siddharth Patil
      </span>

      <p style={{ fontWeight: "bold" }}>{currentGame}</p>

      <div
        style={{
          position: "absolute",
          right: "1rem",
          display: "flex",
          alignItems: "center",
          pointerEvents: "auto",
        }}
      >
        <span
          style={{
            fontSize: "0.8rem",
            marginRight: "1rem",
            color: "#aaa",
          }}
        >
          {credits}
        </span>
        <span
          onClick={onNext}
          style={{
            fontWeight: "bold",
            color: "#55ccff",
            cursor: "pointer",
          }}
        >
          Next →
        </span>
      </div>
    </footer>
  );
}
