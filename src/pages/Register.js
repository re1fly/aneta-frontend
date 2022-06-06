import React, {Fragment, useState} from 'react';
import {notification, Button, Modal, Card} from "antd";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import {PlusOutlined} from "@ant-design/icons";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Modals
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const _handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            notification.error({
                message: 'Login Failed', description: 'Passwords do not match, Try Again !'
            })
        }
        else{
            alert('Login Successful');
        }


    }

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

                    <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-lg overflow-hidden">
                        <div className="card shadow-none border-0 ml-auto mr-auto login-card">
                            <div className="card-body rounded-0 text-left">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">
                                    Create Your<br/>
                                    Aneta Account
                                </h2>
                                <form onSubmit={_handleSubmit}>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pr-0"></i>
                                        <input
                                            type="email"
                                            className="style2-input pl-5 form-control text-grey-900 font-xsss fw-600"
                                            placeholder="Your Email Address"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group icon-input mb-3">
                                        <input
                                            type="Password"
                                            className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                        <i className="font-sm ti-lock text-grey-500 pr-0"></i>
                                    </div>
                                    <div className="form-group icon-input mb-1">
                                        <input
                                            type="Password"
                                            className="style2-input pl-5 form-control text-grey-900 font-xss ls-3"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
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
                                            Accept Term and Conditions
                                        </label>
                                    </div>


                                <div className="col-sm-12 p-0 text-left">
                                    <div className="form-group mb-1">
                                        <button
                                            type='submit'
                                            className="btn font-xsss form-control text-center style2-input text-white fw-600 bg-current border-0 p-0 "
                                            disabled={email && password && confirmPassword && password == confirmPassword    ? false : true}
                                        >
                                            Register
                                        </button>
                                    </div>
                                    <h6 className="text-grey-500 font-xssss fw-500 mt-0 mb-0 lh-32">
                                        Already have account{' '}
                                        <a href="/login" className="fw-700 ml-1">
                                            Login
                                        </a>
                                    </h6>
                                </div>
                                </form>
                                {/* <div>
                                    <Button type="primary" onClick={showModal}>
                                        Show Modal
                                    </Button>
                                    <Modal title="Register Step 2" 
                                           visible={isModalVisible}
                                           onOk={handleOk}
                                           onCancel={handleCancel}
                                           closable={false}
                                           centered={true}
                                           className="w-50 h-75">
                                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                    <div class="row">
                                        <div className="col-lg-12 mb-5">
                                            <div className="d-flex justify-content-center">
                                                <Card className="bg-lightblue" style={{width: 157}}>
                                                    <ImgCrop rotate>
                                                        <Upload
                                                            className="avatar-uploader"
                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onChange={onChange}
                                                            onPreview={onPreview}
                                                        >
                                                            {fileList.length < 1 && <PlusOutlined/>}
                                                        </Upload>
                                                    </ImgCrop>
                                                </Card>
                                            </div>
                                        </div>
                                    </div>
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Nama
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Email
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Phone
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Fax
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Website
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Type
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Provinsi
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kecamatan
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-4 mb-1">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Kelurahan
                                                    </label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 mb-1">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Alamat
                                                </label>
                                                <textarea
                                                    className="form-control mb-0 p-3 bg-greylight lh-16"
                                                    rows="5"
                                                    placeholder="Isi alamat detail anda..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                </Modal>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Register;
