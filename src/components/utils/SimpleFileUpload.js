import React, { useState, useEffect } from "react";
import { PlusCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import { Input, Upload, Button, Modal, Spin } from "antd";
import ImgCrop from "antd-img-crop";

import axios from "axios";
import { apiUrl } from "../../config";

// 하나의 이미지를 서버에 upload함.
// upload하기 전에는 + button
// upload 이후에는 image를 표시
function SimpleFileUpload(props) {
  //   const [uploadFileList, setUploadFileList] = useState([{}]);
  const [Image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [WaitModalVisible, setWaitModalVisible] = useState(false)
  const { TextArea } = Input;

  console.log('props', props);
//   console.log('id', props.user.userData.user_id);
  function onChangeName(event) {
    setName(event.currentTarget.value);
  }

  function onChangeDescription(event) {
    setDescription(event.currentTarget.value);
  }

  function onChangePrice(event) {
    if(isNaN(event.currentTarget.value)) {

    } else {
    setPrice(event.currentTarget.value);
    }
  }

  function handleFileUpload() {
    setWaitModalVisible(true);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", Image);
    formData.append("user_id", props.user.userData.user_id);    
    formData.append("name", name);    
    formData.append("description", description);
    formData.append("price", price);
    
    axios
      .post(`${apiUrl}/api/contents/uploadFile`, formData, config)
      .then((response) => {
        setWaitModalVisible(false);
        if (response.data.result) {
          alert("Upload Success");
          props.history.push('/');
        } else {
          alert("Failed to save the Image in Server");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const imgProps = {
    listType: "picture",
    beforeUpload(file) {
      setImage(file);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "50px Arial";
            ctx.fillText("Ant Design", 20, 20);
            canvas.toBlob(resolve);
          };
        };
      });
    },
  };

  return (
    <div style={{ width: "60%", margin: "1rem auto" }}>
      <br />
      <br />
      <div style={{ width: "50%" }}>
        <Upload {...imgProps}>
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
        
        <br />
        <br />
        <br />

        <b>Title</b>
        <Input
          placeholder="input Name"
          value={name}
          allowClear
          onChange={onChangeName}
        />
        <br />
        <br />
        <b>Description</b>
        <TextArea
          placeholder="input Description"
          value={description}
          allowClear
          onChange={onChangeDescription}
        />
        <br />
        <br />
        <b>Price (ETH)</b>
        <Input
          placeholder="input Price (ETH)"
          value={price}
          allowClear
          onChange={onChangePrice}
        />
      </div>
      <br />
      <button onClick={handleFileUpload}>업로드</button>

      <Modal
        title="파일 업로드"
        visible={WaitModalVisible}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        maskClosable={false}
        footer={null}
        width={300}
        style={{ textAlign: "center" }}
      >
        파일 업로드 중 입니다
        <br />
        잠시만 기다려 주세요
        <br />
        <br />
        <Spin />
      </Modal>
    </div>
  );
}

export default SimpleFileUpload;
