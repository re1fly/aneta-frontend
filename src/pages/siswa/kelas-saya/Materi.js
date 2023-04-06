import React, {Fragment, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {PageHeader} from 'antd';

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';
import {global_join_sub_first, url_by_institute} from '../../../api/reference';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

export default function MateriSiswa() {
    const [getContent, setGetContent] = useState([])
    const [duration, setDuration] = useState(getContent.duration_minute)
    console.log('conteeeent', getContent);

    const userId = localStorage.getItem('user_id');
    const academic_year_id = localStorage.getItem('academic_year')

    const params = useParams()
    const idContent = params.id

    useEffect(() => {
        axios.post(url_by_institute, {
            "processDefinitionId": global_join_sub_first,
            "returnVariables": true,
            "variables": [
                {
                    "name": "global_join_where_sub_first",
                    "type": "json",
                    "value": {
                        "tbl_induk": "x_academic_subjects_schedule_contents",
                        "select": [
                            "x_academic_subjects_schedule_contents_files.file_name",
                            "x_academic_subjects_schedule_contents_files.file_path",
                            "r_class_type.class_type",
                            "x_academic_class.sub_class",
                            "x_academic_subjects_schedule_contents_meeting.meeting_name",
                            "x_academic_subjects_schedule_contents.tittle"
                        ],
                        "join": [

                            {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "class_type_id"
                            },
                            {
                                "tbl_join": "x_academic_class",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "class_id"
                            },
                            {
                                "tbl_join": "x_academic_subjects_schedule_contents_meeting",
                                "refkey": "contents_id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "id"
                            },
                            {
                                "tbl_join": "x_academic_subjects_schedule_contents_files",
                                "refkey": "subjects_schedule_contents_id",
                                "tbl_join2": "x_academic_subjects_schedule_contents_meeting",
                                "foregenkey": "id"
                            }
                        ],
                        "where": [
                            {
                                "tbl_coloumn": "x_academic_subjects_schedule_contents_meeting",
                                "tbl_field": "id",
                                "tbl_value": idContent,
                                "operator": "="
                            }
                        ]
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
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setGetContent(dataRes?.data);
        })
    }, [userId])

    return (
        <Fragment>
            <div id="main-wrapper">
                <Navheader/>
                <div className='main-content'>
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="flex-wrap">
                                    {getContent != null ?
                                        <>
                                            <PageHeader
                                                className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                                onBack={() => window.history.back()}
                                                title={`${getContent?.class_type}/${getContent?.sub_class} - ${getContent?.meeting_name} - ${getContent?.tittle}`}
                                            />
                                            {/*<CountdownCircleTimer*/}
                                            {/*    isPlaying*/}
                                            {/*    duration={getContent.duration_minute}*/}
                                            {/*    colors={['#004777', '#F7B801', '#A30000', '#A30000']}*/}
                                            {/*    colorsTime={[7, 5, 2, 0]}*/}
                                            {/*>*/}
                                            {/*    {({ remainingTime }) => remainingTime}*/}
                                            {/*</CountdownCircleTimer>*/}
                                            {/* <h4 className="mt-5 strong text-lg">1.1 Bangun Ruang</h4> */}
                                            <iframe
                                                src={`https://lms.aneta.id:8443/wp-admin/admin-ajax.php?action=h5p_embed&id=${getContent?.file_path}`}
                                                width="100%" style={{ minHeight: '800px' }} frameBorder="0"
                                                allowFullScreen="allowfullscreen" title="test soal multiple"></iframe>
                                            <script
                                                src="https://lms.aneta.id:8443/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js"
                                                charSet="UTF-8"></script>

                                            {/* <iframe src={`http://localhost:8080/wordpress/wp-admin/admin-ajax.php?action=h5p_embed&id=${getContent?.file_path}`} width="958" height="876" frameborder="0" allowfullscreen="allowfullscreen" title="Materi Matematika"></iframe><script src="http://localhost:8080/wordpress/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js" charset="UTF-8"></script> */}
                                            {/* <iframe src= "http://localhost:8080/wordpress/wp-admin/admin-ajax.php?action=h5p_embed&id=3" width="958" height="876" frameborder="0" allowfullscreen="allowfullscreen" title="Materi Matematika"></iframe><script src="http://localhost:8080/wordpress/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js" charset="UTF-8"></script> */}
                                            {/* // download materi
                                        // <div className="d-flex mt-2 mb-5">
                                        // <div className="h5 text-center cursor-pointer">
                                        //     <i style={{ border: 'none' }}>
                                        //         <FilePdfOutlined style={{ fontSize: '40px' }} />
                                        //     </i>
                                        //     <p className="font-xssss">file 4.pdf</p>
                                        // </div>
                                        // <div className="h5 text-center ml-2 cursor-pointer">
                                        //     <i style={{ border: 'none' }}>
                                        //         <FilePdfOutlined style={{ fontSize: '40px' }} />
                                        //     </i>
                                        //     <p className="font-xssss">file 4.pdf</p>
                                        // </div>
                                        // <div className="h5 text-center ml-2 cursor-pointer">
                                        //     <i style={{ border: 'none' }}>
                                        //         <FilePdfOutlined style={{ fontSize: '40px' }} />
                                        //     </i>
                                        //     <p className="font-xssss">file 4.pdf</p>
                                        // </div>
                                        // <div className="h5 text-center ml-2 cursor-pointer">
                                        //     <i className="text-center" style={{ border: 'none' }}>
                                        //         <FilePdfOutlined style={{ fontSize: '40px' }} />
                                        //     </i>
                                        //     <p className="font-xssss">file 4.pdf</p>
                                        // </div>
                                        // </div> */}
                                        </>
                                        : <PageHeader
                                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                                            onBack={() => window.history.back()}
                                            title="Materi Kosong"
                                        />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}