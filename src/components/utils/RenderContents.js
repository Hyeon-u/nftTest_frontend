import './RenderContents.css';
import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Card, Pagination } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {useTranslation, withTranslation} from "react-i18next";
import { apiUrl } from '../../config';
//import ArtCollection from '../../../assets/images/art_collection.jpeg';

// 판매 상품을 모아서 여러개를 표시하는 기본 화면
// 입력으로 contentsList를 주면 됨.
function RenderContents(props) {
    useEffect(()=>{
        console.log(props)
    }, []);
    
    function onClickCard(obj) {
        return function(){
            console.log(obj);
            props.onClickCardCallback(obj);
        };
    }

    const renderCards = props.contentsList && props.contentsList.map((contents, index) => {
        //console.log('contents=', contents);
        // Col을 div로 감싸면 안됨
        // Card가 Col의 중심에 오도록 하기 위해서 style={{display:'flex', flexDirection:'row', justifyContent:'center'}}
        // Artist와 Owner를 boundary에 붙이기 위해서 style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}
        return (
            <Col key={index} >
                <div onClick={onClickCard(`/contents/${contents._id}`)} style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <Card hoverable style={{width:250}} bodyStyle={{padding: "0"}}
                        cover={
                            <div className='img-outer'>
                                <img className='zoom' src={`${apiUrl}/${contents.Thumbnail}`}/>
                            </div>
                        }
                    >
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <h4>{contents.Title}</h4>
                            <div>USD {contents.Price}</div>
                        </div>
                        <hr/>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <img src={`${apiUrl}/${contents.ArtistId.image}`} width='40px' height='40px' alt='icon'/>
                                &nbsp;
                                <div>Artist <br/> {contents.ArtistId.displayname}</div>
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <img src={`${apiUrl}/${contents.owner.image}`} width='40px' height='40px' alt='icon'/>
                                &nbsp;
                                <div>Owner <br/> {contents.owner.displayname}</div>
                            </div>
                        </div>
                        
                        {/* <div className=" duration"
                                style={{ bottom: 0, right:0, position: 'absolute', margin: '8px', 
                                color: '#fff', backgroundColor: 'rgba(18, 18, 250, 0.8)', opacity: 0.8, 
                                padding: '2px 4px', borderRadius:'2px', letterSpacing:'0.5px', fontSize:'16px',
                                fontWeight:'500', lineHeight:'12px' }}>
                                <span>{sell_product.state}</span>
                        </div> */}
                    </Card>
                </div>
            </Col>
        )
    })


    return (
        // <div style={{ width: '85%', margin: '1rem auto' }}>
        <div style={{ width: '80%', margin: '1rem auto' }}>
            <Row gutter={[32, 32]}>
                {props.contentsList && renderCards}
            </Row>


        </div>
    )
}

export default RenderContents
