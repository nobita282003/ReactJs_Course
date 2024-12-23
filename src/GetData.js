import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

function GetData({ children }) {
  const [brands, setBrands] = useState([]);
  const [statuss, setStatuss] = useState([]);
  const [products, setProducts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const urls = [
        "http://localhost:9999/brands",
        "http://localhost:9999/status",
        "http://localhost:9999/products",
        "http://localhost:9999/accounts",
        "http://localhost:9999/cart",
        "http://localhost:9999/news"
      ];

      const responses = await Promise.all(urls.map(url => axios.get(url)));
      setBrands(responses[0].data);
      setStatuss(responses[1].data);
      setProducts(responses[2].data);
      setAccounts(responses[3].data);
      setCart(responses[4].data);
      setNews(responses[5].data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAccount = async (newAccount) => {
    try {
      setAccounts(prevAccounts => [...prevAccounts, newAccount]);
      await axios.post("http://localhost:9999/accounts", newAccount);
    } catch (error) {
      console.error("Error adding account:", error);
      setError("Failed to add account. Please try again later.");
    }
  };

  const addToCart = async (newItem) => {
    try {
      setCart(prevCart => [...prevCart, newItem]);
      await axios.post("http://localhost:9999/cart", newItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Failed to add item to cart. Please try again later.");
    }
  };

  return (
    <DataContext.Provider
      value={{
        brands,
        statuss,
        products,
        accounts,
        users,
        setUsers,
        addAccount,
        cart,
        addToCart,
        searchItem,
        setSearchItem,
        news,
        error,
      }}
    >
      {children}
      {error && <div className="error-message">{error}</div>}
    </DataContext.Provider>
  );
}

export default GetData;
