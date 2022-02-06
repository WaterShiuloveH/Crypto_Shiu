import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Exchanges,
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";
import "./App.css";
import { useSelector } from "react-redux";

const App = () => {
  const currentLang = useSelector((state) => state.language.lang);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="exchanges" element={<Exchanges />} />
              <Route path="cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="crypto/:coinId" element={<CryptoDetails />} />
              <Route path="news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryto_Shiu <br /> All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">{currentLang === "中文" ? "Home" : "首頁"}</Link>
            {/* <Link to="/exchanges">Exchanges</Link> */}
            <Link to="/news">{currentLang === "中文" ? "News" : "新聞"}</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
