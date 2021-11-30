import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col, Typography } from 'antd';
import ContentsDocument from './Sections/ContentsDocument';
import ContentsView from './Sections/ContentsView';
import ContentsEtc from './Sections/ContentsEtc';
import ContentsBottom from './Sections/ContentsBottom';
import { apiUrl } from '../../../config';
const Title=Typography.Title;

// image 또는 video를 선택하면 나오는 상세 페이지
function DetailContentsPage(props) {
    const contentsId = props.match.params.id
    const [Contents, setContents] = useState([])
    // const [Loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     console.log('loaded=', Loaded);
    // }, [Loaded])
    useEffect(() => {

    })

    useEffect(() => {
        console.log('----------------------', contentsId);
        getContents(contentsId);
    }, [contentsId]);

    function getContents(id) {
        const dataToSubmit = {
            contents_no:id,
        }

        axios.post(`${apiUrl}/api/contents/getContentsInfo`, dataToSubmit)
            .then(response => {
                if (response.data.result) {
                    //alert('load success');
                    console.log('contents=', response.data.info);
                    setContents(response.data.info);
                    //setLoaded(true);
                } else {
                    alert('Failed to fectch contents')
                }
            })
    }
    console.log('detail main props',props)

    return (
        <div>        
        {
            <div style={{ width: '60%', margin: '1rem auto' }}>
                <br/>
                <Row gutter={24}>
                    
                    <Col lg={10} xs={24}>
                        <ContentsView contents={Contents}/>
                    </Col>
                    <Col lg={8} xs={24}>
                        <ContentsDocument contents={Contents}/>
                    </Col>
                </Row>

                <br/>
                <br/>

                <ContentsBottom contents={Contents} history={props.history} user={props.user.userData}/>

                <br/>
                <br/>

            </div>
        }
        </div>
    )
}
// // image 또는 video를 선택하면 나오는 상세 페이지
// function DetailContentsPage(props) {
//     const contentsId = props.match.params.id
//     const [Contents, setContents] = useState([])
//     // const [Loaded, setLoaded] = useState(false);

//     // useEffect(() => {
//     //     console.log('loaded=', Loaded);
//     // }, [Loaded])

//     useEffect(() => {
//         console.log('----------------------', contentsId);
//         getContents(contentsId);
//     }, [contentsId]);

//     function getContents(id) {
//         const dataToSubmit = {
//             id:id,
//         }

//         axios.post('/api/contents/getContentsInfo', dataToSubmit)
//             .then(response => {
//                 if (response.data.success) {
//                     //alert('load success');
//                     console.log('contents=', response.data.result);
//                     setContents(response.data.result);
//                     //setLoaded(true);
//                 } else {
//                     alert('Failed to fectch contents')
//                 }
//             })
//     }

//     return (
//         <div>        
//         {
//             <div style={{ width: '90%', margin: '1rem auto' }}>
//                 <br/>
//                 <Row gutter={24}>
//                     <Col lg={8} xs={24}>
//                         <ContentsDocument contents={Contents}/>
//                     </Col>
//                     <Col lg={10} xs={24}>
//                         <ContentsView contents={Contents}/>
//                     </Col>
//                     <Col lg={6} xs={24}>
//                         <ContentsEtc contents={Contents}/>
//                     </Col>
//                 </Row>

//                 <br/>
//                 <br/>

//                 <ContentsBottom contents={Contents}/>

//                 <br/>
//                 <br/>

//             </div>
//         }
//         </div>
//     )
// }
export default DetailContentsPage
