import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../server/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const { Title } = Typography;

const HomePage = () => {
  const currentLang = useSelector((state) => state.language.lang);

  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        {currentLang === "中文" ? "Global Crypto Stats" : "全球加密貨幣概況"}
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title={
              currentLang === "中文" ? "Total Cryptocurrencies" : "總加密貨幣數"
            }
            value={globalStats.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={currentLang === "中文" ? "Total Exchanges" : "總交易所"}
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={currentLang === "中文" ? "Total Market Cap" : "總市值"}
            value={`$${millify(globalStats.totalMarketCap)}`}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={
              currentLang === "中文" ? "Total 24h Volume" : "總交易量(24h)"
            }
            value={`$${millify(globalStats.total24hVolume)}`}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title={currentLang === "中文" ? "Total Markets" : "總市場數"}
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          {currentLang === "中文"
            ? "Top 10 Cryptos In The World"
            : "加密貨幣世界前十名"}
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">
            {currentLang === "中文" ? "Show more" : "更多"}
          </Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          {currentLang === "中文" ? "Latest Crypto News" : "加密貨幣最新消息"}
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">
            {currentLang === "中文" ? "Show more" : "更多"}
          </Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
