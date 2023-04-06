import React, { Fragment, useEffect, useState } from 'react';
import { PageHeader } from 'antd';
import { FilePdfOutlined } from "@ant-design/icons";
import { useParams } from 'react-router-dom';

import Navheader from '../../components/Navheader';
import Appheader from '../../components/Appheader';
import Adminfooter from '../../components/Adminfooter';
import axios from 'axios';
import { global_join_sub_first, url_by_institute } from '../../api/reference';


export default function TugasGuru() {
    const [getContent, setGetContent] = useState([])

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
                            "class_type", "sub_class", "file_name", "file_path", "x_academic_subjects_schedule_contents.tittle", "x_academic_subjects_schedule_contents_meeting.meeting_name"],
                        "join": [
                            {
                                "tbl_join": "x_academic_class",
                                "refkey": "id",
                                "tbl_join2": "x_academic_subjects_schedule_contents",
                                "foregenkey": "class_id"
                            }, {
                                "tbl_join": "r_class_type",
                                "refkey": "id",
                                "tbl_join2": "x_academic_class",
                                "foregenkey": "class"
                            }, {
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
            console.log(response);
            const dataRes = JSON.parse(response?.data?.variables[2]?.value);
            setGetContent(dataRes?.data);
        })
    }, [userId])

    return (
        <Fragment>
            <div id="main-wrapper">
                <Navheader />
                <div className='main-content'>
                    <Appheader />
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
                                            {/* <h4 className="mt-5 strong text-lg">1.1 Bangun Ruang</h4> */}
                                            <iframe src={`https://lms.aneta.id:8443/wp-admin/admin-ajax.php?action=h5p_embed&id=${getContent?.file_path}`} width="958" style={{ minHeight: '800px' }} frameborder="0" allowfullscreen="allowfullscreen" title="test soal multiple"></iframe><script src="https://lms.aneta.id:8443/wp-content/plugins/h5p/h5p-php-library/js/h5p-resizer.js" charset="UTF-8"></script>

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
                                </div>
                            </div>
                        </div>
                    </div>
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}