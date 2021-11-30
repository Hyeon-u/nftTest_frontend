import React, { useEffect, useState } from "react";
import { Col, Row, Image, Card, Pagination } from "antd";
import axios from "axios";

const { Meta } = Card;

// 판매 상품을 표시하는 기본 화면
function MyContentsPage(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getMyProducts();
  }, []);

  console.log("props?",props.user);
  console.log("id?",props.user.userData.user_id);

  function getMyProducts() {
    const dataToSubmit = {
        user_id: props.user.userData.user_id
    }
    
    axios
      .post("/api/contents/getusercontents", dataToSubmit)
      .then((response) => {
        console.log("data", response.data);
        if (response.data.result) {
          setProducts(response.data.list);
        } else {
          alert("Failed to fectch product datas");
        }
      });
  }

  function onClickCard(obj) {
    return function () {
      console.log(obj);
      props.history.push(obj);
    };
  }

  const renderCards = products.map((product, index) => {
    return (
            <Col lg={8} md={8} xs={24} key={index}>
              <Card
                hoverable={true}
                cover={
                  <img style={{width: '100%', maxHeight: '250px' }} alt="example" src={`${product.filelocation}`} />
                }
                onClick={onClickCard(`/mycontents/${product.id}`)}
              >
                <Meta title={product.name} />
              </Card>
            </Col>
   
    );
  });


  return (
    <div style={{ width: '50%', margin: '3rem auto' }}>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <h1>
          <u> MY ITEMS </u>
        </h1>
        <br />
        <br />
      
        <Row gutter={[64, 64]}>{renderCards}</Row>
        <br />

      </div>
    </div>
  );
}

export default MyContentsPage;
