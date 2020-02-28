import React from "react";
import "./style.css";

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="home-footer">
      <span>© NJU-ITXIA {year}</span>
    </footer>
  );
}
