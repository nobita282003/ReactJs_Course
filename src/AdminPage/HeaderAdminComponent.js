import {
  FaRegUserCircle,
  FaPizzaSlice,
  FaUserCheck,
  FaArrowLeft,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import "./header.css";
import useAdminAuth from "../page/Navigation";

function HeaderAdminComponent() {
  useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate(); 
  const { pathname } = location;

  const handleLogout = () => {
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("userrole");
    navigate("/login");
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(43,48,53,1)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "240px",
        alignItems: "center",
      }}
    >
      <div className={"admin-logo"} style={{ padding: "20px" }}>
        <a href="/HomePageAdmin">
          <img
            src="https://img.freepik.com/premium-vector/bird-logo-design_646665-636.jpg"
            alt="logo"
            style={{ width: "100px" }}
          />
        </a>
      </div>
      <ul style={{ color: "#fff", listStyle: "none", padding: 0 }}>
        <li
          style={{
            padding: "20px 10px",
            display: "flex",
            alignItems: "center",
          }}
          className={pathname === "/admin/Usermanagement" ? "active" : ""}
        >
          <FaRegUserCircle style={{ fontSize: "20px" }} />
          <div style={{ width: "8px" }} />
          <Link to="/admin/Usermanagement">User Management</Link>
        </li>
        <li
          style={{
            padding: "20px 10px",
            display: "flex",
            alignItems: "center",
          }}
          className={pathname === "/admin/product-management" ? "active" : ""}
        >
          <FaPizzaSlice style={{ fontSize: "20px" }} />
          <div style={{ width: "8px" }} />
          <Link to="/admin/product-management">Product Management</Link>
        </li>
        <li
          style={{
            padding: "20px 10px",
            display: "flex",
            alignItems: "center",
          }}
          className={pathname === "/admin/profile" ? "active" : ""}
        >
          <FaUserCheck style={{ fontSize: "20px" }} />
          <div style={{ width: "8px" }} />
          <Link to="/admin/profile">Profile</Link>
        </li>
        <li
          style={{
            padding: "20px 10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FaArrowLeft style={{ fontSize: "20px" }} />
          <div style={{ width: "8px" }} />
          <Link onClick={handleLogout} to="/LoginPage">Logout</Link> {/* Thay đổi đây */}
        </li>
      </ul>
    </div>
  );
}

export default HeaderAdminComponent;
