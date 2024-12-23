import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../GetData';
import { Col } from 'react-bootstrap';

const TabBar = () => {
  const {
    searchItem,
    setSearchItem,
    users,
    setUsers,
  } = useContext(DataContext);

  const styles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    logo: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: '#333',
    },
    searchInput: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '50%',
      margin: '0 10px',
    },
    navItems: {
      display: 'flex',
      gap: '20px',
    },
    navItem: {
      textDecoration: 'none',
      color: '#007bff',
      fontSize: '1em',
      transition: 'color 0.3s',
    },
    navItemHover: {
      color: '#0056b3',
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/HomePage" style={{ color: '#333', textDecoration: 'none' }}>
          Tiki Shop
        </Link>
      </div>
      <input
        type="text"
        placeholder="Tìm kiếm..."
        style={styles.searchInput}
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <div style={styles.navItems}>
        <Link
          to="/Profile"
          style={styles.navItem}
          onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
        >
          Hồ Sơ
        </Link>

        {!users && (
          <Link to="/LoginPage" style={styles.navItem}>
            Login
          </Link>
        )}

        {users && (
<>

          <Col className="d-flex justify-content-end">
              <div>
                <Link to={`/CartPage`}>                 
                  Cart
                </Link>
              </div>
            </Col> 
          
          <Link
            onClick={() => {
              setUsers(null);
              alert("Đăng xuất thành công!");
              
    sessionStorage.removeItem("userid"); //
    sessionStorage.removeItem("userrole"); //
    
            }}
            style={styles.navItem}
            onMouseEnter={(e) => (e.target.style.color = styles.navItemHover.color)}
            onMouseLeave={(e) => (e.target.style.color = styles.navItem.color)}
          >
            Đăng Xuất
          </Link>
       </> )}
      </div>
    </nav>
  );
};

export default TabBar;
