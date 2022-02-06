import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";

Chart.register(...registerables);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const currentLang = useSelector((state) => state.language.lang);

  // console.log(coinHistory);

  for (let i = coinHistory?.data?.history?.length - 1; i >= 0; i -= 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory.data.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }
  // console.log(coinTimestamp);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: currentLang === "中文" ? "Price In USD" : "美元",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} {currentLang === "中文" ? "Price Chart" : "價格變化圖"}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {currentLang === "中文" ? "Change: " : "漲跌幅度: "}
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            {currentLang === "中文" ? "Current " : "現今 "}
            {coinName} {currentLang === "中文" ? "Price :" : "價格 :"} $
            {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
