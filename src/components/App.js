import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import RegisterPage from "./views/01_RegisterPage/RegisterPage.js";
import LoginPage from "./views/02_LoginPage/LoginPage.js";
import NavBar from "./views/00_NavBar/NavBar";
import LandingPage 		from "./views/10_LandingPage/LandingPage.js";
import DetailContentsPage from "./views/DetailContents/DetailContentsPage"
import DetailMyContentsPage from "./views/DetailContents/DetailMyContentsPage"
import WalletPage from './views/Wallet/WalletPage';
// my account
import MyContentsPage 	from './views/03_MyProfile/MyContentsPage';

// fileUpload
import simpleFileUpload from '../components/utils/SimpleFileUpload'


function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}> 
      <NavBar />
      <div style={{minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
			{/* null-->누구나 접근가능, true-->로그인한 사용자만 접근가능, false-->로그인 안한 사용자만 접근가능 */}
			<Route exact path="/" component={Auth(LandingPage, null)} />
			<Route exact path="/login" component={Auth(LoginPage, false)} />
			<Route exact path="/register" component={Auth(RegisterPage, false)} />
			<Route exact path="/contents/:id" component={Auth(DetailContentsPage, null)} />
			<Route exact path="/mycontents/:id" component={Auth(DetailMyContentsPage, null)} />

			{/* My Account */}
			<Route exact path="/mycontents" component={Auth(MyContentsPage, true)} />
			<Route exact path="/wallet" component={Auth(WalletPage, true)} />
			
			{/* file upload */}
			<Route exact path="/fileUpload" component={Auth(simpleFileUpload, true)} />

        </Switch>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
