import React, { useEffect, useState } from "react";
import { Col, Row, Image, Card, Pagination } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useTranslation, withTranslation } from "react-i18next";
import { apiUrl } from "../../../config";
// import Banner from "../Banner/Banner";
// import ArtCollection from "../../../assets/images/art_collection.jpeg";

const { Meta } = Card;

// 판매 상품을 표시하는 기본 화면
function LandingPage(props) {
  const initLimit = 10; //페이지로 나눌 때, 처음에 한페이지에 표시할 default item개수

  const [SellProducts, setSellProducts] = useState([]);
  const [NumItem, setNumItem] = useState(initLimit);
  const [PageSize, setPageSize] = useState(initLimit);
  const [CurrPage, setCurrPage] = useState(1);

 

  useEffect(() => {
    getSellProducts();
  }, []);

  function getSellProducts() {
    axios
      .get("/api/contents/getnftlist")
      // axios.post('/api/sell_product/getSellProducts', variables)
      .then((response) => {
        console.log("data", response.data);
        if (response.data.result) {
        //   setNumItem(response.data.list.length);
          setSellProducts(response.data.list);
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

  function onChangePage(page, pageSize) {
    setPageSize(pageSize);
    setCurrPage(page);
    console.log("curr page=", page);
  }

  function onShowSizeChange(current, size) {
    console.log("onshowsizechage=", current, "  , ", size);
    setCurrPage(current);
    setPageSize(size);
  }

  const renderCards = SellProducts.map((sell_product, index) => {
    return (
            <Col lg={6} md={8} xs={24} key={index}>
              <Card
                hoverable={true}
                cover={
                  <img style={{width: '100%', maxHeight: '200px' }} alt="example" src={`${sell_product.filelocation}`} />
                }
                onClick={onClickCard(`/contents/${sell_product.id}`)}
              >
                <Meta title={sell_product.name} />
              </Card>
            </Col>
  
    );
  });

  const { t } = useTranslation();

  return (
    <div style={{ width: '50%', margin: '3rem auto' }}>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <h1>
          <u> SELECT ITEM </u>
        </h1>
        <br />

  
            <br />
        <Row gutter={[32, 32]}>{renderCards}</Row>
        <br />
      </div>
    </div>
  );
}

export default withRouter(withTranslation()(LandingPage));
