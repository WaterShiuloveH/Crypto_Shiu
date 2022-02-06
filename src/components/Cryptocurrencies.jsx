import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../server/cryptoApi";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currentLang = useSelector((state) => state.language.lang);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search CryptoCurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((cur) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={cur.uuid}>
            <Link to={`/crypto/${cur.uuid}`}>
              <Card
                title={`${cur.rank}. ${cur.name}`}
                extra={<img className="crypto-image" src={cur.iconUrl} />}
                hoverable
              >
                <p>
                  {currentLang === "中文" ? "Price: " : "價格: "}
                  {millify(cur.price)}
                </p>
                <p>
                  {currentLang === "中文" ? "Market Cap: " : "總市值: "}
                  {millify(cur.marketCap)}
                </p>
                <p>
                  {currentLang === "中文" ? "Daily Change: " : "每日漲跌幅: "}
                  {millify(cur.change)}%
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
