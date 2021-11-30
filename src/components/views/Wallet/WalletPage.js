import React, { useEffect, useState } from "react";
import { Col, Row, Image, Card, Divider } from "antd";
import axios from "axios";

const { Meta } = Card;

// 판매 상품을 표시하는 기본 화면
function WalletPage(props) {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("");

  useEffect(() => {
    getMyWallet();
  }, []);

  console.log("wallet props?", props);
  // console.log("id?",props.user.userData.user_id);

  function getMyWallet() {
    setWalletAddress(props.user.userData.wallet_address);
    const dataToSubmit = {
      user_id: props.user.userData.user_id,
    };

    axios.post("/api/wallet/getwallet", dataToSubmit).then((response) => {
      console.log("data", response.data);
      if (response.data.result) {
        
        setEthBalance(response.data.eth_balance);
      } else {
        alert("Failed to wallet server connect");
      }
    });
  }

  return (
    <div style={{ width: "50%", margin: "3rem auto" }}>
      <h1>MY Wallet</h1>
      <br />
      <Divider />
      <br />
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        <Row>
          <Col span={8}>입금 주소</Col>
          <Col span={16} style={{ textAlign: "right" }}>
            {walletAddress}
          </Col>
        </Row>
        <Divider />
        <br />
        <Row>
          <Col span={8}>잔액</Col>
          <Col span={16} style={{ textAlign: "right" }}>
            {ethBalance}&nbsp;(ETH)
          </Col>
        </Row>
        <Divider />
      </div>
    </div>
  );
}

export default WalletPage;
