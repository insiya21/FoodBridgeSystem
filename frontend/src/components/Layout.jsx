import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";
import "./Layout.css";

function Layout({ children, setPage }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);  
  const role = localStorage.getItem("role");

  return (
    <div
  style={{
    display:
      window.innerWidth <= 768
        ? "block"
        : "flex",
    minHeight: "100vh",
    backgroundColor: "#F5F7FB",
  }}
>

<button
  className="mobile-menu-btn"
  onClick={() => {
    console.log("MENU CLICKED");
    setSidebarOpen(!sidebarOpen);
  }}
>
  ☰
</button>

      {/* Sidebar */}
<div
  style={{
    position:
      window.innerWidth <= 768
        ? "fixed"
        : "relative",

    left:
      window.innerWidth <= 768
        ? sidebarOpen
          ? "0"
          : "-250px"
        : "0",

    top: 0,

    zIndex: 1500,

    transition: "0.3s",

    height: "100vh",
  }}
>
  <Sidebar
    role={role}
    setPage={(page) => {
      setPage(page);

      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      }
    }}
  />
</div>

{sidebarOpen &&
  window.innerWidth <= 768 && (
    <div
      onClick={() =>
        setSidebarOpen(false)
      }
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,0.4)",
        zIndex: 1400,
      }}
    />
)}
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
            background: "#F5F7FB",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;