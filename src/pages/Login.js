import React, {Fragment, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "../api/Url";
import {notification, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let router = useHistory();
    const loadingIcon = <LoadingOutlined style={{ fontSize: 25, color: 'white' }} spin />;

    const _handleLogin = (e) => {
        e.preventDefault()
        axios.post(BASE_URL, {
            "processDefinitionId": "login:2:15730599-becf-11ec-8be5-8a5605738a79",
            "returnVariables": true,
            "variables": [
                {
                    "name": "email",
                    "value": email
                },
                {
                    "name": "password",
                    "value": password
                }
            ]
        }, {
            headers: {
                // 'X-API-Key' : 'e59ec059-5c65-48bf-847c-43c94d874f49',
                'Authorization': 'Basic YWRtaW46TWFuYWczciE=',
                'Content-Type': 'application/json',
            },
        }).then(res => {
            const getData = res.data.variables[3].value
            const dataLogin = JSON.parse(getData)
            console.log(dataLogin);
            if (dataLogin.status === true) {
                localStorage.setItem('user_name', (dataLogin.user.name))
                localStorage.setItem('token', dataLogin.token)
                localStorage.setItem('institute', dataLogin.user.institute_id)
                // localStorage.setItem('institute', 'null')


                if (dataLogin.user.user_role_id === 1) {
                    localStorage.setItem('role', 'admin')
                    router.push('/admin-beranda');
                } else if (dataLogin.user.user_role_id === 2) {
                    localStorage.setItem('role', 'guru')
                    router.push('/guru-beranda');
                } else if (dataLogin.user.user_role_id === 3) {
                    localStorage.setItem('role', 'siswa')
                    router.push('/siswa-beranda');
                } else if (dataLogin.user.user_role_id === 4) {
                    localStorage.setItem('role', 'orangtua')
                    router.push('/orangtua-beranda');
                }
            } else {
                setIsLoading(false);
                notification.error({
                    message: 'Login Failed', description: dataLogin.message,
                    placement: 'top'
                })
            }
        }).catch(err => {
            notification.error({
                message: 'error', description: err,
            })
        });

    };

    return (
        <Fragment>
            <div className="main-wrap">
                <div className="row">
                    <div
                        className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                        style={{
                            backgroundImage: `url("https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80")`,
                        }}
                    ></div>

                    <div className="col-xl-7 vh-lg-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
                        <div className="card shadow-none border-0 ml-auto mr-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-3">
                                    Login Aneta Account
                                </h2>
                                <form method="post"
                                      onSubmit={e => _handleLogin(e)}>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pr-0"></i>
                                        <input
                                            type="email"
                                            className="style2-input pl-5 form-control text-grey-900 font-xssss fw-600"
                                            placeholder="Email Address"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input
                                            type="Password"
                                            className="style2-input pl-5 form-control text-grey-900 font-xssss ls-3"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                                    </div>
                                    <div className="form-check text-left mb-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input mt-2"
                                            id="exampleCheck1"
                                        />
                                        <label
                                            className="form-check-label font-xssss text-grey-500"
                                            htmlFor="exampleCheck1"
                                        >
                                            Remember me
                                        </label>
                                        <a
                                            href="/forgot"
                                            className="fw-600 font-xssss text-grey-700 mt-1 float-right"
                                        >
                                            Forgot your Password?
                                        </a>
                                    </div>

                                    <div className="col-sm-12 p-0 text-left">
                                        <div className="form-group mb-1">
                                            <button
                                                type='submit'
                                                className="btn font-xsss form-control text-center style2-input text-white fw-600 bg-current border-0 p-0 "
                                                onClick={() => setIsLoading(true)}
                                                disabled={email && password ? false : true}
                                            >
                                                { !isLoading ? 'Login' : <Spin indicator={loadingIcon} /> }
                                            </button>
                                        </div>
                                        <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                                            Dont have account{' '}
                                            <a href="/register" className="fw-700 ml-1">
                                                Register
                                            </a>
                                        </h6>
                                    </div>
                                </form>
                                <div className="col-sm-12 p-0 text-center mt-2">
                                    <h6 className="mb-0 d-inline-block bg-white fw-500 font-xssss text-grey-500 mb-3">
                                        Or, Sign in with your social account{' '}
                                    </h6>
                                    <div className="form-group mb-1">
                                        <a
                                            href="/login"
                                            className="form-control text-left style2-input text-white fw-600 bg-pinterest border-0 p-0 mb-2"
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/archive/5/53/20210618182605%21Google_%22G%22_Logo.svg"
                                                alt="icon"
                                                className="ml-2 w30 mb-1 mr-5 ml-4"
                                            />
                                            {' '}
                                            Sign in with Google
                                        </a>
                                    </div>
                                    <div className="form-group mb-1">
                                        <a
                                            href="/login"
                                            className="form-control text-left style2-input text-white fw-600 bg-twiiter border-0 p-0 "
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Facebook_logo_%28square%29.png"
                                                alt="icon"
                                                className="ml-2 w40 mb-1 mr-5 ml-2"
                                            />{' '}
                                            Sign in with Facebook
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;
