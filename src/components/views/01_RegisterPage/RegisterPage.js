import React, { useState } from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import { Modal, Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const tailFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 8,
    },
    sm: {
      span: 24,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  // const [isModalVisible, setIsModalVisible] = useState(true);

  const [errorUserName, setErrorUserName] = useState(false);
  const [errorUserNameMsg, setErrorUserNameMsg] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorEmailMsg, setErrorEmailMsg] = useState("");
  const [errorPasswordMsg, setErrorPasswordMsg] = useState("");

  // function handleOk() {
  //   setIsModalVisible(false);
  // }

  // function handleCancel() {
  //   setIsModalVisible(false);
  // }

  function resetErrorMsg() {
    setErrorUserName(false);
    setErrorUserNameMsg("");
    setErrorEmail(false);
    setErrorEmailMsg("");
  }

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  function checkPassword(password) {
    // let errMsg = null;
    const pw_str = String(password).trim();
    const blank = pw_str.search(/\s/);
    const number = pw_str.search(/[0-9]/g);
    const special = pw_str.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    const engUnder = pw_str.search(/[a-z]/g);
    const engUpper = pw_str.search(/[A-Z]/g);

    let numberExsist = 0;
    let specialExsist = 0;
    let engUnderExsist = 0;
    let engUpperExsist = 0;

    if (number > -1) {
      numberExsist = 1;
    }
    if (special > -1) {
      specialExsist = 1;
    }
    if (engUnder > -1) {
      engUnderExsist = 1;
    }
    if (engUpper > -1) {
      engUpperExsist = 1;
    }
    // console.log('blank: ', blank);
    // console.log(number + ' / ' + special + ' / ' + engUnder + ' / ' + engUpper);
    // console.log(numberExsist + ' / ' + specialExsist + ' / ' + engUnderExsist + ' / ' + engUpperExsist);

    let confirmCount =
      numberExsist + specialExsist + engUnderExsist + engUpperExsist;
    // console.log('confirmCount: ', confirmCount);

    return confirmCount;
  }

  Yup.addMethod(Yup.string, "checkValid", function (errorMessage) {
    return this.test(`test-password-valid`, errorMessage, function (value) {
      const { path, createError } = this;

      return (
        checkPassword(value) > 1 || createError({ path, message: errorMessage })
      );
    });
  });

  const dispatch = useDispatch();
  return (
    // <Modal title="Sign up with" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
    //   cancelButtonProps={{ style: { display: 'none' } }}
    //   okButtonProps={{ style: { display: 'none' } }}
    //   maskClosable={false}>
    <div style={{ width: "30rem", margin: "1rem auto" }}>
      <h2 style={{ textAlign: "center" }}>SIGN UP</h2>
      <Formik
        initialValues={{
          userId: "",
          password: "",
          confirmPassword: "",
          userName: "",
          email: "",
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().required("ID is required"),
          userName: Yup.string().required("User Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            // .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          // .checkValid(
          //   "Please choose a stronger password. Try a mix of letters, numbers, and symbols"
          // ),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Password didn't match.")
            .required("Confirm Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          resetErrorMsg();
          setTimeout(() => {
            let dataToSubmit = {
              user_id: values.userId,
              email: values.email,
              password: values.password,
              user_name: values.userName,
            };

            dispatch(registerUser(dataToSubmit)).then((response) => {
              if (response.payload.result) {
                alert("회원가입이 성공 하였습니다");
                props.history.push("/login");
              } else {
                console.log("err:", response.payload.errMsg);
                alert(`Error\n${response.payload.errMsg}`);
              }
            });

            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            //dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            //handleReset,
          } = props;

          return (
            <div>
              <Form
                style={{ minWidth: "375px" }}
                {...formItemLayout}
                onSubmit={handleSubmit}
                layout="vertical"
              >
                <Form.Item required label="ID">
                  <Input
                    id="userId"
                    placeholder="Enter your ID"
                    type="text"
                    value={values.userId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.userId && touched.userId
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.userId && touched.userId && (
                    <div className="input-feedback">
                      {errors.userId}
                      <br />
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  required
                  label="E-mail Address"
                  hasFeedback
                  validateStatus={
                    // errors.email && touched.email ? "error" : 'success'
                    (function () {
                      if (!touched.email) {
                        return "";
                      } else if (!errors.email) {
                        return "success";
                      } else {
                        return "error";
                      }
                    })()
                  }
                >
                  <Input
                    id="email"
                    placeholder="Enter your Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.email && touched.email && (
                    <div className="input-feedback">
                      {errors.email}
                      <br />
                    </div>
                  )}
                  {errorEmail && (
                    <div style={{ color: "red" }}>{errorEmailMsg}</div>
                  )}
                </Form.Item>

                <Form.Item required label="Username">
                  <Input
                    id="userName"
                    placeholder="Enter your User Name"
                    type="text"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.userName && touched.userName
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.userName && touched.userName && (
                    <div className="input-feedback">
                      {errors.userName}
                      <br />
                    </div>
                  )}
                  {errorUserName && (
                    <div style={{ color: "red" }}>
                      {errorUserNameMsg}
                      <br />
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  required
                  label="Password"
                  hasFeedback
                  validateStatus={
                    // errors.password && touched.password ? "error" : 'success'
                    (function () {
                      if (!touched.password) {
                        return "";
                      } else if (!errors.password) {
                        return "success";
                      } else {
                        return "error";
                      }
                    })()
                  }
                >
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.password && touched.password
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {/* <div style={{ fontSize: "1ex" }}>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols
                  </div> */}
                  {errors.password && touched.password && (
                    <div className="input-feedback">
                      {errors.password}
                      <br />
                    </div>
                  )}
                </Form.Item>

                <Form.Item
                  required
                  label="Confirm Password"
                  hasFeedback
                  validateStatus={
                    // errors.confirmPassword && touched.confirmPassword ? "error" : 'success'
                    (function () {
                      if (!touched.confirmPassword) {
                        return "";
                      } else if (!errors.confirmPassword) {
                        return "success";
                      } else {
                        return "error";
                      }
                    })()
                  }
                >
                  <Input
                    id="confirmPassword"
                    placeholder="Enter your confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.confirmPassword && touched.confirmPassword
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="input-feedback">
                      {errors.confirmPassword}
                      <br />
                    </div>
                  )}
                </Form.Item>

                <div style={{ textAlign: "center" }}>
                  <br />
                  <Form.Item>
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
      <br />
    </div>

    // </Modal>
  );
}

export default RegisterPage;
