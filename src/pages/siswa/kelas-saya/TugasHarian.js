import React, {Fragment, useEffect, useState} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';

import {PageHeader, Upload, notification, Spin} from "antd";

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import axios from 'axios';
import {
    global_join_sub_first,
    role_siswa_get_pertemuan,
    role_siswa_update_status_tugas, role_siswa_upload_tugas_2,
    url_by_institute
} from '../../../api/reference';
import {InboxOutlined, LoadingOutlined} from '@ant-design/icons';
import {pageLoad} from '../../../components/misc/loadPage';
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import CryptoJS from "crypto-js";
import AppNoHeader from "../../../components/AppNoHeader.js";

export default function TugasiSiswa() {
    const params = useParams()
    const location = useLocation();
    const history = useHistory();
    const idContent = params.id
    const selectedContent = location.state.dataTugas
    // console.log(window.location.pathname)
    const [duration, setDuration] = useState(selectedContent.menit)
    const [isFinished, setIsfinished] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [fileUrl, setFileUrl] = useState('');
    const [typeFile, setTypeFile] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const iFrame = selectedContent?.file_name
    const forWidth = iFrame?.split('width="')[1]
    const height = forWidth?.split('"')[0]

    const userId = localStorage.getItem('user_id');
    const academicId = localStorage.getItem('academic_id')
    const emailUser = localStorage.getItem('email')

    const loadingIcon = (
        <LoadingOutlined style={{ fontSize: 20, color: "white" }} spin />
    );


    const renderTime = ({remainingTime}) => {
        setDuration(remainingTime)
        if (remainingTime === 0) {
            setIsfinished(true)
            return <div className="timer" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center'
            }}>Waktu telah habis</div>;
        }
        const hours = Math.floor(remainingTime / 3600)
        const minutes = Math.floor((remainingTime % 3600) / 60)
        const seconds = remainingTime % 60

        return (
            <>
                <div className="timer" style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/*<div className="text" style={{ color: '#aaa'}}>Remaining</div>*/}
                    <div className="value" style={{fontSize: '30px'}}>{hours}</div>
                    <div className="text" style={{color: '#aaa'}}>Jam</div>
                </div>

                <div className="timer" style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', margin: '0 20px'
                }}>
                    {/*<div className="text" style={{ color: '#aaa'}}>Remaining</div>*/}
                    <div className="value" style={{fontSize: '30px'}}>{minutes}</div>
                    <div className="text" style={{color: '#aaa'}}>Menit</div>
                </div>

                <div className="timer" style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    {/*<div className="text" style={{ color: '#aaa'}}>Remaining</div>*/}
                    <div className="value" style={{fontSize: '30px'}}>{seconds}</div>
                    <div className="text" style={{color: '#aaa'}}>Detik</div>
                </div>
            </>
        );
    };

    const _finishedTask = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": role_siswa_update_status_tugas,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_siswa": userId,
                        "id": selectedContent.id,
                        "status": 1,
                        "id_academic": academicId
                    }
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }).then(response => {
            console.log(response)
                if (isSubmited == true) {
                    notification.info({
                        message: "Informasi",
                        description: "Tugas telah di submit !",
                        placement: 'topRight',
                        duration: 10
                    })
                }else if(isFinished == true) {
                    notification.info({
                        message: "Informasi",
                        description: "Waktu mengerjakan tugas telah habis",
                        placement: 'topRight'
                    })
                }
            }
        )
    }

    const _finishedTaskEnd = () => {
        setIsLoading(true)
        axios.post(url_by_institute, {
            "processDefinitionId": role_siswa_update_status_tugas,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {
                        "id_siswa": userId,
                        "id": selectedContent.id,
                        "status": 2,
                        "id_academic": academicId,
                        "email": emailUser
                    }
                }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }).then(response => {
            console.log(response)
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
                if (isSubmited == true) {
                    notification.info({
                        message: "Informasi",
                        description: "Tugas telah di submit !",
                        placement: 'topRight',
                    })
                    setTimeout(() => {
                        window.history.back()
                    }, 1500)
                }else if(isFinished == true) {
                    notification.info({
                        message: "Informasi",
                        description: "Waktu mengerjakan tugas telah habis",
                        placement: 'topRight'
                    })
                }else if(dataRes.code == 200){
                    notification.info({
                        message: "Informasi",
                        description: "Tugas telah di submit !",
                        placement: 'topRight',
                    })
                    setTimeout(() => {
                        window.history.back()
                    }, 1500)
                }
            }
        )
    }

    useEffect(() => {
        if(selectedContent.status_siswa == 2){
            _finishedTask()
        }
    }, [isFinished === true]);

    // useEffect(() => {
    //     const unlisten = history.listen((location) => {
    //         // React.createElement('form',{method: 'post', id: 'form_wp', action: 'https://lms.aneta.id:8443/wp-login.php'},
    //         //     [
    //         //         React.createElement('input',{id: 'log', name: 'log', type: 'hidden',value: email}),
    //         //         React.createElement('input', {id: 'pwd', name: 'pwd', type: 'hidden',value: originalText}),
    //         //     ]
    //         // )
    //         console.log('new location: ', location)
    //         document.getElementById("form_wp").submit();
    //         console.log('after login')
    //         setTimeout(function () {
    //             console.log('timer')
    //         }, 3000);
    //     })
    //     return function cleanup() {
    //         unlisten()
    //     }
    // }, [])


    const convertBase64 = (uploaded) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploaded);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handleUploadChange = async (e) => {
        // console.log("test", e);
        let uploaded = e?.target?.files[0];
        console.log(uploaded);
        const base64 = await convertBase64(uploaded);
        setFileUrl(base64?.split(',')[1])
        console.log(base64.split(',')[1]);
        const nameFile = uploaded?.name?.split('.');
        const nameType = nameFile?.slice(-1)
        setTypeFile(nameType?.toString())
    }

    const handleSubmitUpload = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": role_siswa_upload_tugas_2,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "file": fileUrl,
                            "file_type": typeFile,
                            "user_id": userId,
                            "id_academic": academicId,
                            "id_content": selectedContent.idTugas,
                            "id_pertemuan": selectedContent.id
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                }
            }
        ).then(function (response) {
            console.log(response)
            const resData = JSON.parse(response.data.variables[2].value)
            const resCode = resData.message
            if (resCode == "success upload") {
                // setRefreshState(true);
                // pageLoad()
                notification.success({
                    message: "Sukses",
                    description: 'Tugas berhasil di Upload',
                    placement: 'top'
                })
                setTimeout(() => {
                    window.history.back()
                }, 1500)
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal Upload Tugas, mohon cek kembali file anda.',
                    placement: 'top'
                })
            }
        })
    }

    return (
        <Fragment>
            <div id="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <AppNoHeader/>
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="flex-wrap">
                                    {selectedContent != null ?
                                        <>
                                            <PageHeader
                                                className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                                onBack={() => window.history.back()}
                                                title={`${selectedContent?.class_type}/${selectedContent?.sub_class} - ${selectedContent?.meeting_name} - ${selectedContent?.tittle}`}
                                            />
                                            <div className="timer-wrapper m-4"
                                                 style={{display: 'flex', justifyContent: 'center'}}>
                                                <CountdownCircleTimer
                                                    isPlaying
                                                    duration={selectedContent.menit * 60}
                                                    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                                                    colorsTime={[10, 6, 3, 0]}
                                                    onComplete={() => ({shouldRepeat: false, delay: 1})}
                                                    size={240}
                                                >
                                                    {renderTime}
                                                </CountdownCircleTimer>
                                            </div>
                                            {/* <h4 className="mt-5 strong text-lg">1.1 Bangun Ruang</h4> */}
                                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                                <iframe
                                                    src={`https://lms.aneta.id:8443/wp-admin/admin-ajax.php?action=h5p_embed&id=${selectedContent?.file_path}`}
                                                    width="1000" frameBorder="0"
                                                    allowFullScreen="allowfullscreen"
                                                    style={{minHeight: '550px'}}
                                                    title="test soal multiple"></iframe>
                                                <script
                                                    src="https://lms.aneta.id:8443/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js"
                                                    charSet="UTF-8"></script>
                                            </div>
                                            {selectedContent.statusSiswa == 1 && selectedContent.status == 1 && selectedContent.is_upload == false ||
                                            selectedContent.statusSiswa == 0 && selectedContent.status == 1 && selectedContent.is_upload == false ||
                                            selectedContent.statusSiswa == 1 && selectedContent.status == 2 && selectedContent.is_upload == false
                                                ?
                                                <div className="text-center">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    onClick={() => {
                                                        setIsSubmited(true)
                                                        _finishedTaskEnd()
                                                    }}
                                                    disabled={ isLoading ? true : false}
                                                >
                                                    {!isLoading ? (
                                                        ""
                                                    ) : (
                                                        <Spin indicator={loadingIcon} />
                                                    )} Selesaikan
                                                </button>
                                            </div> : null
                                            }


                                            {/* download materi
                      <div className="d-flex mt-2 mb-5">
                        <div className="h5 text-center cursor-pointer">
                          <i style={{ border: 'none' }}>
                            <FilePdfOutlined style={{ fontSize: '40px' }} />
                          </i>
                          <p className="font-xssss">file 4.pdf</p>
                        </div>
                      </div> */}
                                        </>
                                        : <PageHeader
                                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                            onBack={() => window.history.back()}
                                            title="Materi Kosong"
                                        />}
                                    <div className="col-lg-12 d-flex justify-content-center">
                                        <div>
                                            {selectedContent.is_upload == true ?

                                                <>
                                                    <h5 className="mt-3 strong text-lg">Upload tugas dibawah sini</h5>
                                                    <form id='form'>
                                                        <input onChange={handleUploadChange} type='file'/>
                                                    </form>

                                                    <button
                                                        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 mt-2 w175 rounded-lg d-inline-block"
                                                        onClick={handleSubmitUpload}
                                                    >
                                                        Submit Tugas
                                                    </button>
                                                </>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
};