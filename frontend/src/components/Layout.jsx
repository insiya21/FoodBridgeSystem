import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ children, setPage }) {
  const role = localStorage.getItem("role");

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#F5F7FB",
      }}
    >
      {/* Sidebar */}
      <Sidebar role={role} setPage={setPage} />

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