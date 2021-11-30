import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Typography, Button } from 'antd';
import {GiftOutlined} from '@ant-design/icons'
import { string } from 'yup';
const Title=Typography.Title;

function ContentsDocument(props) {
    // //const dispatch = useDispatch();
    // const sellproductId = props.match.params.sellproductId
    const [Category, setCategory] = useState([]);
    const [EditionDesc, setEditionDesc] = useState('');

    // useEffect(() => {
    //     if (props.contents.category==='digital')
    //         setCategory('Digital Art');
    //     else if (props.contents.category==='fine')
    //         setCategory('Fine Art');
    //     else if (props.contents.category==='anime')
    //         setCategory('Anime');
    //     else
    //         setCategory('');
    // }, [props.contents])

    useEffect(()=>{
        console.log('ContentsDocuments.props=', props);
    }, [props])
    
    // useEffect(()=>{
    //     if (props.contents.Edition==='original')
    //         setEditionDesc('Original');
    //     else {
    //         setEditionDesc('Edition #'+ String(props.contents.EditionA) + '/' + String(props.contents.EditionB));
    //     }
    // }, [props.contents.Edition, props.contents.EditionA, props.contents.EditionB])

    function onClickBuyNow() {
        const cart={
            contents: props.contents
        }

        window.localStorage.setItem('cart', JSON.stringify(cart));
        props.history.push('/payment')
    }

    return (
        <div>
            <Title>{props.contents && props.contents.title}</Title>
            <font size={3} color='black'> {props.contents && props.contents.Medium} </font>
            <br/>
            <br/>
            {/* <font size={3} color='grey'> {props.contents && props.contents.X} X {props.contents && props.contents.Y} {props.contents && props.contents.Measure}</font>
            <br/> */}
            {/* <font size={3} color='grey'> {props.contents && props.contents.FrameX} X {props.contents && props.contents.FrameY} {props.contents && props.contents.FrameMeasure}</font>
            <br/>
            <br/> */}
            {/* <font size={3} color='black'> {props.contents && props.contents.Year} </font> */}
            {/* <br/>
            <br/>
            <font size={3} color='grey'> {props.contents && props.contents.SubCategory} </font>
            <br/>
            <br/> */}
            {/* <font size={3} color='grey'> {EditionDesc} </font> 
            <br/>
            <br/>
            <font size={3} color='black'> Shipping to Asia $10 <br/> Shipping to North America $20 <br/> Shipping to Europe 30</font>
            <br/>
            <hr/>
            <br/>
            <font size={3} color='grey'> LIST PRICE: </font>
            <br/>
            <font size={5}> {props.contents && props.contents.Price} USD </font>
            <br/> */}
            <br/>
            <br/>
            <br/>
<div style={{fontSize:'1.5em', fontWeight:'bold'}}>Description</div>
{/* <font size={3} color='black' >Description</font> */}
<br/>
            <font size={3} color='black'> {props.contents && props.contents.description} </font>

            
            {/* <div style={{textAlign:'right'}}>
                <Button type='primary' onClick={onClickBuyNow} disabled={props.contents.buyable}>
                    <GiftOutlined/> BUY NOW
                </Button>
                <br/>
            </div> */}
        </div>

    )
}

export default withRouter(ContentsDocument)
