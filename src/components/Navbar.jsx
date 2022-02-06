import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import icon from "../images/截圖 2021-06-16 下午7.13.12.png";
import { useDispatch, useSelector } from "react-redux";
import { updateLang, Langs } from "../app/reducer";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.lang);

  const handleLangUpdate = () => {
    if (currentLang === "中文") {
      dispatch(updateLang("English"));
    } else {
      dispatch(updateLang("中文"));
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryto_Shiu</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">{currentLang === "中文" ? "Home" : "首頁"}</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">
              {currentLang === "中文" ? "Cryptocurrencies" : "加密貨幣"}
            </Link>
          </Menu.Item>
          {/* <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item> */}
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">
              {currentLang === "中文" ? "News" : "相關新聞"}
            </Link>
          </Menu.Item>
          <Menu.Item icon={<TranslationOutlined />} onClick={handleLangUpdate}>
            <a>{currentLang}</a>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
