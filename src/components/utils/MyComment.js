import React, { useState, useEffect } from 'react'
import { Checkbox, Button, Input, Col } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

// props.postId 가 전달되면 그 목록들에 대해서 user와 admin이 글을 주고 받음
// 현재 코드에서 postId는 글을 쓴 사람의 id를 의미함
// 1. postId의 모든 comment를 가져와서 보여주고
// 2. admin인 경우는 처리완료 버튼을 보여주어 바꿀 수 있도록 해주고
// 3. 일반 user와 admin에 대해서 글을 올릴 수 있는 상자와 버튼을 만들어줌
function MyComment(props) {
    const user = useSelector(state => state.user);
    const [Comments, setComments] = useState([])
    const [CommentValue, setCommentValue] = useState("")

    useEffect(() => {
        if (user.userData) {
            get_comments(props.postId)
        }
    }, [user.userData, props.postId])

    function get_comments(postid) {
        const dataToSubmit={
            postId:postid
        }
        axios.post('/api/comment/getComments', dataToSubmit)
        .then(response => {
            if (response.data.success) {
                setComments(response.data.comments);
            } else {
                alert('Failed to load Comments')
            }
        })

    }

    function handleChange(e) {
        setCommentValue(e.currentTarget.value)
    }


    function onSubmit(e) {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,      // user id 별로 post를 구분하므로
            content: CommentValue,
            processed: props.adminMode
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    alert('success');
                    get_comments();
                    setCommentValue("")
                } else {
                    alert('Failed to save Comment')
                }
            })
    }

    function onChangeProcessed(index) {
        return function () {
            const new_processed=!Comments[index].processed;

            const dataToSubmit={
                commentId: Comments[index]._id,
                processed: new_processed
            }

            let newComments=[...Comments];
            newComments[index].processed=new_processed;
            setComments(newComments);

            axios.post('/api/comment/updateProcessed', dataToSubmit)
            .then(response => {
                if (response.data.success) {
                    alert('success');
                } else {
                    alert('Failed to save Comment')
                }
            })

        }
    }


    // const renderCards = Comments.map((comment, index) => {
    //     return <div key={index}>
    //         <div>
    //             <Row>
    //                 <Col lg={20} md={20} xs={24}>
    //                     <Card>
    //                         {comment.content}

    //                         {(props.adminMode)?
    //                             <div style={{textAlign:'right'}}>
    //                             <Checkbox checked={comment.processed} onChange={onChangeProcessed(index)}>
    //                                 처리완료
    //                             </Checkbox> </div> : <div/>
    //                         }

    //                     </Card>
    //                 </Col>
    //             </Row>
    //         </div>
    //     </div>
    // })

    const renderCards = Comments.map((comment, index) => {
        const margin=(comment.writer===user.userData._id)? '0':'4';
        const color=(comment.writer===user.userData._id)? 'sandybrown':'powderblue';
        return <div key={index}>
                    <Col lg={{span:16, offset:margin}} md={{span:20, offset:margin}} xs={{span:22, offset:margin}}>
                        <div style={{border:'2px solid none', borderRadius:'16px', background:color, padding:'16px', margin:'8px'}}>
                            {comment.content}

                            {(props.adminMode)?
                                <div style={{textAlign:'right'}}>
                                <Checkbox checked={comment.processed} onChange={onChangeProcessed(index)}>
                                    처리완료
                                </Checkbox> </div> : <div/>
                            }

                        </div>
                    </Col> :
        </div>
    })

    return (
        <div>

            {renderCards}
            <br/>
            <div style={{textAlign:'center'}}>
                <TextArea
                    style={{ width: '90%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="write some comments"
                />
                <br />
                <br />
                <br />
                <Button onClick={onSubmit}>Submit</Button>
            </div>
        </div>
    )
}

export default MyComment
