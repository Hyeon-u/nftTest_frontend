import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Modal, Button, Checkbox } from 'antd';
import { loginUser, loginGoogleUser, loginFacebookUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';
// import { GoogleLogin } from 'react-google-login';
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// import { clientId } from '../../../config';
// import FacebookLogin from "react-facebook-login";
// const clientId = '887960247818-s7g1hi2bqc9tg2vuvpjga63paqse4fir.apps.googleusercontent.com';

// const expireTime = 60 * 60 * 24 * 365; // 365days

function LoginPage(props) {
	const dispatch = useDispatch();

	const [UserId, setUserId] = useState("")
	const [Password, setPassword] = useState("")
	const [userName, setuserName] = useState("")
	const [isModalVisible, setIsModalVisible] = useState(true);
	// const [isKeepSignedIn, setIsKeepSignedIn] = useState(false);
	const [isFailedLogIn, setIsFailedLogIn] = useState(false);

	// useEffect(() => {
	// 	if (cookies.rememberEmail !== undefined) {
	// 		setEmail(cookies.rememberEmail);
	// 		setIsKeepSignedIn(true);
	// 	}
	// }, []);

	const onUserIdHandler = (event) => {
		setUserId(event.currentTarget.value)
	}

	const onUserNameHandler = (event) => {
		setuserName(event.currentTarget.value)
	}

	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value)
	}

	const onSubmitHandler = (event) => {
		event.preventDefault();
		// if (isKeepSignedIn) {
		// 	setCookie('rememberEmail', Email, { maxAge: expireTime });
		// } else {
		// 	removeCookie('rememberEmail');
		// }

		let body = {
			user_id: UserId,
			password: Password
		}

		dispatch(loginUser(body))
			.then(response => {
				if (response.payload.result) {
					props.history.push('/');
				} else {
					setIsFailedLogIn(true);
				}
			})
	}

	function handleOk() {
		setIsModalVisible(false);
	}

	function handleCancel() {
		setIsModalVisible(false);
	}

	return (
		<div>

			<div style={{ width: '30rem', margin: '1rem auto' }}>

				<br />
				<h2 style={{ textAlign: 'center' }}>LOGIN TO YOUR ACCOUNT</h2>

				<br />
				<br />
				<br />

				<div style={{ textAlign: 'left' }}>

					
					<form style={{ display: 'flex', flexDirection: 'column' }}
					// onSubmit={onSubmitHandler}
					>
						<label>ID</label>
						<input type="test" value={UserId} onChange={onUserIdHandler}/>
						<br />
						<label>Password</label>
						<input type="password" value={Password} onChange={onPasswordHandler} />
						<br />
						{/* <Checkbox onChange={checkboxChange} checked={isKeepSignedIn}>Keep me signed in</Checkbox> */}
						<br />
						{isFailedLogIn && (
							<div style={{ color: 'red' }}>Invalid ID or password<br></br></div>
						)}

						<Button type="primary" onClick={onSubmitHandler}>
							Login
						</Button>
						<br />
						
						<div style={{ textAlign: 'center' }}>
							{/* <a href='/'>Forgot your password?</a>
							<br /> */}
							<a href='/register'>Register</a>
						</div>
					</form>
					{/* </div> */}
				</div>
			</div>

		</div>
	)
}

export default withRouter(LoginPage)
