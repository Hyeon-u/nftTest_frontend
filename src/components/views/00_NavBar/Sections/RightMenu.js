/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import axios from "axios";
import { USER_SERVER } from "../../../Config";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { clientId } from "../../../../config";

function RightMenu(props) {
  const [Email, setEmail] = useState("");

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.userData) {
      // console.log('redux user', user.userData)
      setEmail(user.userData.email);
    }
  }, [user.userData]);

  const logoutHandler = () => {
      axios.get(`${USER_SERVER}/logout`).then((response) => {
      console.log("logout res:", response);
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  function onMyContents() {
    props.history.push("/mycontents");
  }

  function onMyWallet() {
    props.history.push("/wallet");
  }

  function CaseNotLoged(props1) {
    return (
      <Menu mode={props1.mode}>
        <Menu.Item key="mail">
          <a href="/login">SignIn</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">SignUp</a>
        </Menu.Item>
      </Menu>
    );
  }
  

  function CaseLoged(props1) {
    // console.log("props: ", props1);
    return (
      <Menu mode={props1.mode}>
        <Menu.Item key="mycontents">
          <a onClick={onMyContents}>My Contents</a>
        </Menu.Item>
        {!props1.admin && (
          <Menu.Item key="wallet">
            <a onClick={onMyWallet}>Wallet</a>
          </Menu.Item>
        )}
        {props1.admin && (
          <Menu.Item key="admin">
            <a href="/fileUpload">Upload</a>
          </Menu.Item>
        )}
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }

  return (
    <div>
      {user.userData && !user.userData.isAuth ? (
        <CaseNotLoged mode={props.mode} />
      ) : (
        <CaseLoged
          mode={props.mode}
          admin={user.userData && user.userData.isAdmin}
          role={user.userData && user.userData.role}
        />
      )}
    </div>
  );
}

export default withRouter(RightMenu);
