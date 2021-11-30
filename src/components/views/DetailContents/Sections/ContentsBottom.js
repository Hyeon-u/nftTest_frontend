import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button, Modal, Spin } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import Chart from "react-apexcharts";
import { apiUrl } from "../../../../config";

function ContentsBottom(props) {
  const Title = Typography.Title;
  const [Options, setOptions] = useState([]);
  const [Series, setSeries] = useState([]);
  const [PlotValid, setPlotValid] = useState(false);
  const [ModalVisible, setModalVisible] = useState(false);
  const [WaitModalVisible, setWaitModalVisible] = useState(false);

  // console.log('1234props', props)

  function onBuy() {
    if (!props.user.isAuth) {
      alert("로그인이 필요 합니다");
      props.history.push("/login");
    } else {
      setModalVisible(true);
    }
  }

  function handleOk() {
    setModalVisible(false);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  const { contents, history } = props;

  console.log("detailpage props: ", props);
  function onClickBuyNow() {
    setModalVisible(false);
    setWaitModalVisible(true);
    const dataToSubmit = {
      user_id: props.user.user_id,
      contents_no: props.contents.id,
    };

    axios.post("/api/contents/orderbuy", dataToSubmit).then((response) => {
      setWaitModalVisible(false);
      if (response.data.result) {
        alert("Contents Buy Success");
        props.history.push("/");
      } else {
        console.log("res", response.data);
        if (response.data.errMsg) {
          if (response.data.errMsg === "Not enough Balance") {
            alert("구매 실패\n 잔액이 부족합니다. 지갑을 충전해 주세요");
            props.history.push("/wallet");
          } else {
            alert("구매 실패\n" + response.data.errMsg);
          }
        } else {
          alert("구매 실패\n다시 로그인 해주세요");
        }
      }
    });

    // window.localStorage.setItem('cart', JSON.stringify(cart));
    // props.history.push('/payment')
  }

  let buyAble = props.contents.isBuyable && props.user.user_id !== "admin";

  return (
    <div style={{ width: "80%", margin: "1rem auto", textAlign: "right" }}>
      <div style={{ fontSize: "22px" }}>
        <br />
        {props.contents.price ? props.contents.price : 0}
        &nbsp;&nbsp;&nbsp;(ETH)
      </div>
      <br />

      {buyAble && (
        <Button type="primary" onClick={onBuy}>
          <GiftOutlined /> 구매하기
        </Button>
      )}
      <br />

      <Modal
        title="구매 팝업"
        onOk={handleOk}
        onCancel={handleCancel}
        visible={ModalVisible}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        maskClosable={true}
        footer={null}
        width={400}
        style={{ textAlign: "center" }}
      >
        구입 하시 겠습니까?
        <br />
        {props.contents.price}&nbsp;(ETH) + [거래 수수료] 가 차감 됩니다
        <br />
        <br />
        <Button type="primary" onClick={onClickBuyNow}>
          <GiftOutlined /> 결제하기
        </Button>
      </Modal>

      <Modal
        title="BlockChain Network 처리중"
        visible={WaitModalVisible}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        footer={null}
        width={300}
        style={{ textAlign: "center" }}
      >
        NFT 생성중 입니다
        <br />
        잠시만 기다려 주세요
        <br />
        <br />
        <Spin />
      </Modal>

      {/* <Title>Trading History</Title>  

            {PlotValid? 
                <div className="app">
                    <div className="row">
                    <div className="mixed-chart">
                        <Chart
                        options={Options}
                        series={Series}
                        type="line"
                        width="500"
                        />
                    </div>
                    </div>
                </div> : ''
            }


            <table frame='void'>
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Price</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        props.contents && props.contents.history && props.contents.history.map((action,index) => (
                        <tr key={index}>
                            <td>{action.event}</td>
                            <td>{action.price} USD</td>
                            <td>{action.from && action.from.username}</td>
                            <td>{action.to && action.to.username}</td>
                            <td>{action.createdAt}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>             */}
    </div>
  );
}

export default ContentsBottom;
