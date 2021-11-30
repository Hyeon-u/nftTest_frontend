import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Typography, Image } from 'antd';
import { apiUrl } from '../../../../config';
const Title=Typography.Title;

function ContentsView(props) {
    // //const dispatch = useDispatch();
    // const sellproductId = props.match.params.sellproductId
    // const [SellProduct, setSellProduct] = useState([])

    // useEffect(() => {
    //     axios.get(`/api/sell_product/sellproducts_by_id?id=${sellproductId}&type=single`)
    //         .then(response => {
    //             console.log('detail:sellprod_by_id=', response.data);
    //             setSellProduct(response.data[0])
    //         })

    // }, [sellproductId])


    return (
        <div>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <img src={`${props.contents.image}`} alt='image' style={{width: '80%'}}/>
            </div>

            {/* <br/>

            <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                <Image src={`${props.contents.image}`} alt='image' style={{width: '60px'}}/>
            </div> */}
        </div>
)
}

// function ContentsView(props) {
//     // //const dispatch = useDispatch();
//     // const sellproductId = props.match.params.sellproductId
//     // const [SellProduct, setSellProduct] = useState([])

//     // useEffect(() => {
//     //     axios.get(`/api/sell_product/sellproducts_by_id?id=${sellproductId}&type=single`)
//     //         .then(response => {
//     //             console.log('detail:sellprod_by_id=', response.data);
//     //             setSellProduct(response.data[0])
//     //         })

//     // }, [sellproductId])


//     return (
//         <div>
//             <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
//                 <img src={`${apiUrl}/${props.contents.OrgUrl}`} alt='image' style={{width: '80%'}}/>
//             </div>

//             <br/>

//             <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
//                 <Image src={`${apiUrl}/${props.contents.OrgUrl}`} alt='image' style={{width: '60px'}}/>
//             </div>
//         </div>
// )
// }

export default ContentsView
