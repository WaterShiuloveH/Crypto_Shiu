import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../server/cryptoApi.js";
import LineChart from "./LineChart.jsx";
import Loader from "./Loader.jsx";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const currentLang = useSelector((state) => state.language.lang);

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  // console.log(coinId);

  // console.log(data);

  const time = ["3h", "24h", "7d", "30d", "3m", "1y", "3y", "5y"];

  const stats = [
    {
      title: currentLang === "中文" ? "Price In USD" : "美元",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: currentLang === "中文" ? "Rank" : "排名",
      value: cryptoDetails?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: currentLang === "中文" ? "24h Volume" : "總交易量(24h)",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: currentLang === "中文" ? "Market Cap" : "總市值",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title:
        currentLang === "中文"
          ? "All-time-high(daily avg.)"
          : "歷史新高（每日平均)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: currentLang === "中文" ? "Number Of Markets" : "市場總數",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: currentLang === "中文" ? "Number Of Exchanges" : "交易所總數",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: currentLang === "中文" ? "Aprroved Supply" : "批准供應",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: currentLang === "中文" ? "Total Supply" : "總供應數",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: currentLang === "中文" ? "Circulating Supply" : "流通供應",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.symbol})
          {currentLang === "中文" ? "Price" : "價格"}
        </Title>
        <p>
          {data?.data?.coin.name}
          {currentLang === "中文"
            ? "live price in US Dollar (USD). View value statistics, market cap and supply."
            : " 美元現價，更多價位統計數據、總市值及供應資訊．"}
        </p>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          placeholder="Select Time period"
          onChange={(value) => setTimeperiod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails?.price)}
          coinName={cryptoDetails?.name}
        />
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {data?.data?.coin.name}
                {currentLang === "中文" ? "Value Statistics" : " 價位統計數據"}
              </Title>
              <p>
                {currentLang === "中文"
                  ? `An overview showing the statistics of ${data?.data?.coin.name},
                such as the base and quote currency, the rank, and trading
                volume.`
                  : `${data?.data?.coin.name} 的綜觀數據，以下數據包括: 基礎、計價、排名及交易量等相關資訊．`}
              </p>
            </Col>
            {stats.map(({ title, value, icon }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
          <Col className="other-stats-Info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {currentLang === "中文" ? "Other Statistics" : " 其他統計數據"}
              </Title>
              <p>
                {currentLang === "中文"
                  ? `An overview showing the statistics of ${cryptoDetails.name}, such
                  as the base and quote currency, the rank, and trading volume.`
                  : `${data?.data?.coin.name} 的綜觀數據，以下數據包括: 基礎、計價、排名及交易量等相關資訊．`}
              </p>
            </Col>
            {genericStats.map(({ title, value, icon }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className="stats">{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              {currentLang === "中文" ? "What is " : "什麼是 "}
              {cryptoDetails.name} ?{HTMLReactParser(cryptoDetails.description)}
            </Title>
          </Row>
          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name}
              {currentLang === "中文" ? "Links " : " 相關連結"}
            </Title>
            {cryptoDetails.links.map((link) => (
              <Row className="coin-link" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
