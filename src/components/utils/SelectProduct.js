import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import axios from 'axios';
import { apiUrl } from '../../config';

function SelectProduct(props) {
    const [Products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    //////////////////// Select ////////////////////////
    function getProducts() {
        axios.get('/api/product/getProductList')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }

    function onClickCard(index) {
        return function(){
            const product=Products[index];
            props.onSelect(product);
        };
    }


    const renderCards = Products.map((product, index) => {
        return <div key={index} style={{position:'relative'}} onClick={onClickCard(index)}>
                        <Col lg={6} md={8} xs={24}>
                            <img style={{width:'250%'}} src={`${apiUrl}/${product.images[0]}`} alt=''/>
                        </Col>
                </div>
    })



    return (
        <div style={{ width: '95%', margin: '3rem auto' }}>
            <Row gutter={2}>
                {renderCards}
            </Row>
        </div>
    )

}

export default SelectProduct

