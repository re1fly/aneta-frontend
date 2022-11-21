import React, {Fragment, useEffect, useRef, useState} from 'react';
import Chart from 'react-apexcharts';
import Adminfooter from '../../components/Adminfooter';
import axios from "axios";
import * as https from "https";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import {Alert, Button, Card, DatePicker, Divider, Modal, notification, PageHeader, Space, Spin, Tooltip} from "antd";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import {LoadingOutlined, PlusOutlined, SearchOutlined, UserAddOutlined} from "@ant-design/icons";
import {BASE_URL} from "../../api/Url";
import {Link, useHistory} from "react-router-dom";
import {RequiredTooltip} from "../../components/misc/RequiredTooltip";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {create_institute, dashboard_admin} from "../../api/reference";

const lineChart = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',],
    series: [{
        name: '', data: [35, 16, 34, 36, 18, 35, 26, 34, 26, 18, 36, 18, 36, 34, 36, 18, 16, 18,],
    }, {
        name: '', data: [12, 24, 12, 11, 7, 12, 34, 12, 11, 7, 11, 7, 34, 12, 11, 7, 11, 7],
    },],
    options: {
        chart: {
            height: 100, type: 'bar', // width:'50%',
            stacked: true, toolbar: {
                show: false,
            },
        }, responsive: [{
            breakpoint: 480, options: {
                legend: {
                    position: 'bottom', offsetX: -10, offsetY: 0,
                },
            },
        },], plotOptions: {
            columnWidth: '40%', bar: {
                horizontal: false, borderRadius: 10,
            },
        }, dataLabels: {
            enabled: false,
        }, legend: {
            show: false,
        }, fill: {
            opacity: 1,
        },
    },
};

function BerandaAdmin() {
    const user = localStorage.getItem('user_name');
    const institute = localStorage.getItem('institute');
    const academicYear = localStorage.getItem("academic_year");
    ;
    const [visible, setVisible] = useState(false);
    const [formPic, setFormPic] = useState(true);
    const [dataDashboard, setDataDashboard] = useState({})
    const [submittedNpsn, setSubmittedNpsn] = useState(false);
    const [dataNpsn, setDataNpsn] = useState({})
    const [dataNpsnSearch, setDataNpsnSearch] = useState([])
    console.log(dataNpsnSearch)
    let router = useHistory();


    useEffect(() => {
        if (institute == 'null') {
            setVisible(true)
            setTimeout(() => {
                notification.info({
                    message: `Informasi`,
                    description:
                        'Sebelum masuk ke dashboard, mohon isi form Institute dan PIC terlebih dahulu.',
                    placement: 'top',
                    duration: 4
                });
            }, 700)

        } else {
            setVisible(false);
            //getacademic
            console.log('institute: ',institute)
            axios.post(BASE_URL, {
                    "processDefinitionId": "getwherenojoin:1:3510ed73-2cc3-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_year",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "x_academic_year.id",
                                "order_by": "desc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "institute_id",
                                        "tbl_value": institute,
                                        "operator": "="
                                    },
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "is_active",
                                        "tbl_value": "T",
                                        "operator": "="
                                    }
                                ],
                                "tbl_coloumn": [
                                    "*"
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
                const resData = response.data.variables[2].value;
                const academic = JSON.parse(resData);
                const isVerification = localStorage.getItem('is_verification')
                console.log('isVerif',isVerification)
                console.log('insst',institute)
                if (academic.status == false) {
                    const btn = (
                        <Button href='/admin-list-tahun-akademik' type="primary" shape="round" size="middle">
                            Disini
                        </Button>
                    );
                    if(isVerification == 'false' && institute != null){
                           router.push("/not-verification");
                    }else{
                        notification.info({
                            message: 'Warning !',
                            description: 'Mohon isi tahun akademik terlebih dahulu dengan klik button disini',
                            btn,
                            duration: null,
                            placement: 'top'
                        });
                    }
                } else {
                    localStorage.setItem('academic_year', academic[0].id);
                    localStorage.setItem('year', academic[0].academic_year);
                    localStorage.setItem('semester', academic[0].semester);
                }
            });

        }
    }, []);

    useEffect(() => {
        axios.post(BASE_URL, {
                "processDefinitionId": dashboard_admin,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "count_siswa",
                        "type": "json",
                        "value": {
                            "tbl_name": "users",
                            "kondisi": [
                                {
                                    "keterangan": "where",
                                    "kolom": "users.institute_id",
                                    "value": institute
                                }, {
                                    "keterangan": "where",
                                    "kolom": "users.user_role_id",
                                    "value": "3"
                                }
                            ]
                        }
                    },
                    {
                        "name": "count_guru",
                        "type": "json",
                        "value": {
                            "tbl_name": "users",
                            "kondisi": [
                                {
                                    "keterangan": "where",
                                    "kolom": "users.institute_id",
                                    "value": institute
                                }, {
                                    "keterangan": "where",
                                    "kolom": "users.user_role_id",
                                    "value": "2"
                                }
                            ]
                        }
                    }, {
                        "name": "count_class",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_academic_class",
                            "kondisi": [
                                {
                                    "keterangan": "where",
                                    "kolom": "x_academic_class.academic_year_id",
                                    "value": academicYear
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

            const resData = response.data.variables;
            console.log(resData)
            let jumlahSiswa = resData.find(item => item.name === "count_siswa");
            jumlahSiswa = jumlahSiswa.value

            let jumlahGuru = resData.find(item => item.name === "count_guru");
            jumlahGuru = jumlahGuru.value

            let jumlahKelas = resData.find(item => item.name === "count_kelas");
            jumlahKelas = jumlahKelas.value


            setDataDashboard({
                siswa: jumlahSiswa,
                guru: jumlahGuru,
                kelas: jumlahKelas
            })
        });
    }, [academicYear])

   /* const getDataNpsn = () => {
        const npsn = document.querySelector('input[name="npsn_institute"]').value
        axios.post(BASE_URL, {
                "processDefinitionId": "getwherenojoinfirst:1:84d5c713-2cc7-11ed-aacc-9a44706f3589",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_get_where",
                        "type": "json",
                        "value": {
                            "tbl_name": "dapodik_sekolah",
                            "pagination": false,
                            "total_result": 2,
                            "order_coloumn": "dapodik_sekolah.nama",
                            "order_by": "asc",
                            "data": [
                                {
                                    "kondisi": "where",
                                    "tbl_coloumn": "npsn",
                                    "tbl_value": npsn,
                                    "operator": "="
                                }
                            ],
                            "tbl_coloumn": [
                                "nama",
                                "status_sekolah",
                                "bentuk_pendidikan",
                                "npsn"
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
            const resData = JSON.parse(response.data.variables[2].value);
            const resCode = resData.code
            const data = resData.data

            if(resCode == 200){
                setDataNpsn(data)
                setSubmittedNpsn(true)
            }else if(resCode == 404){
                notification.info({
                    message: 'Tidak ditemukan',
                    description: 'Mohon masukkan NPSN yang sudah terdaftar di KEMENDIKBUD.',
                    placement: 'top'
                })
            }else{
                notification.error({
                    message: 'Error',
                    description: 'Mohon hubungi Admin',
                    placement: 'top'
                })
            }
        });
    }*/

    const PicForm = () => {
        return (
            <>
                <h1 className="mt-5 pt-5">PIC Form</h1>
                <div className="row mt-4">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Name <RequiredTooltip />
                            </label>
                            <input
                                name="name_pic"
                                type="text"
                                className="form-control"
                                defaultValue=""
                                required
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Phone <RequiredTooltip />
                            </label>
                            <input
                                type="number"
                                name="phone_pic"
                                className="form-control"
                                defaultValue=""
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Mobile Phone <RequiredTooltip />
                            </label>
                            <input
                                type="number"
                                name="mobile_pic"
                                className="form-control"
                                defaultValue=""
                                required
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Email <RequiredTooltip />
                            </label>
                            <input
                                name="email_pic"
                                type="email"
                                className="form-control"
                                defaultValue=""
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Posisi / Jabatan <RequiredTooltip />
                            </label>
                            <input
                                name="position_pic"
                                type="text"
                                className="form-control"
                                defaultValue=""
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        className="bg-current border-0 mt-4 text-white font-xsss fw-600 p-3 w175 rounded-lg"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-primary border-0 ml-4 mt-4 text-white font-xsss fw-600 p-3 w175 rounded-lg"
                        type="button"
                        onClick={() => {
                            setDataNpsn({})
                            setSubmittedNpsn(false)
                            setDataNpsnSearch([])
                        }}
                    >
                        Reset
                    </button>
                </div>
            </>
        )
    }

    // const ButtonPic = () => {
    //     return (
    //         <>
    //             <Divider>
    //                 <Tooltip title="Tambahkan PIC">
    //                     <Button style={{
    //                         marginTop: 10,
    //                         width: '50px',
    //                         height: '50px',
    //                     }}
    //                             onClick={() => setFormPic(true)}
    //                             size='large' type="primary" shape="circle"
    //                             icon={<UserAddOutlined/>}/>
    //                 </Tooltip>
    //             </Divider>
    //         </>
    //     )
    // }

    const CreateInstitute = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('user_id');
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        console.log(data)
        axios.post(BASE_URL,
            {
                "processDefinitionId": create_institute,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "validasi",
                        "type": "json",
                        "value": {
                            "data": {
                                "user_id": "required",
                                "institute_npsn": "required|unique:m_institutes,npsn",
                                "institute_bentuk_sekolah": "required",
                                "institute_status": "required",
                                "institute_name": "required",
                                "institute_email": "required",
                                "institute_phone": "required",
                                "institute_fax": "required",
                                "institute_address": "required",
                                "institute_sub_district_id": "required",
                                "institute_district_id": "required",
                                "institute_city_id": "required",
                                "institute_state_id": "required",
                                "institute_website": "required",
                                "institute_year_of_found": "required",
                                "institute_image": "required",
                                "institute_image_type": "required",
                                "pic_name": "required",
                                "pic_phone": "required",
                                "pic_mobile_phone": "required",
                                "pic_email": "required",
                                "pic_postition": "required"
                            },
                            "institute_npsn": dataNpsnSearch?.npsn,
                            "institute_bentuk_sekolah": data.type_institute,
                            "institute_status": data.status_institute,
                            "user_id": userId,
                            "institute_name": data.name_institute,
                            "institute_email": data.email_institute,
                            "institute_phone": data.phone_institute,
                            "institute_fax": data.fax_institute,
                            "institute_address": data.address_institute,
                            "institute_sub_district_id": data.subdistrict_institute,
                            "institute_district_id": data.district_institute,
                            "institute_city_id": data.city_institute,
                            "institute_state_id": data.state_institute,
                            "institute_website": data.website_institute,
                            "institute_year_of_found": data.year_institute,
                            "institute_image": "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",
                            "institute_image_type": "png",
                            "pic_name": data.name_pic,
                            "pic_phone": data.phone_pic,
                            "pic_mobile_phone": data.mobile_pic,
                            "pic_email": data.email_pic,
                            "pic_postition": data.position_pic
                        }
                    },
                    {
                        "name": "user_id",
                        "type": "string",
                        "value": userId
                    },
                    {
                        "name": "m_institute",
                        "type": "json",
                        "value": {
                            "tbl_name": "m_institutesModel",
                            "tbl_coloumn": {
                                "npsn": dataNpsn.npsn,
                                "bentuk_sekolah": data.type_institute,
                                "status_sekolah": data.status_institute,
                                "name": data.name_institute,
                                "email": data.email_institute,
                                "phone": data.phone_institute,
                                "fax": data.fax_institute,
                                "address": data.address_institute,
                                "sub_district_id": data.subdistrict_institute,
                                "district_id": data.district_institute,
                                "city_id": data.city_institute,
                                "state_id": data.state_institute,
                                "website": data.website_institute,
                                "year_of_found": data.year_institute
                            }
                        }
                    },
                    {
                        "name": "upload_image",
                        "type": "json",
                        "value": {
                            "image": "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",
                            "image_type": "png",
                            "nama_folder": "image_institute"
                        }
                    },
                    {
                        "name": "m_institute_pic",
                        "type": "json",
                        "value": {
                            "tbl_name": "m_institute_pic",
                            "tbl_coloumn": {
                                "name": data.name_pic,
                                "phone": data.phone_pic,
                                "mobile_phone": data.mobile_pic,
                                "email": data.email_pic,
                                "position": data.position_pic
                            }
                        }
                    }
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic YWRtaW46TWFuYWczciE="
                },
            }
        )
            .then(function (response) {
                const message = response.data.variables[8].value;
                console.log('create_isntitute',response)
                if (response.data.variables[6].value == 422) {
                    notification.error({
                        message: "Error",
                        description: "Harap isi semua data dan pastikan NPSN belum pernah terdaftar",
                        placement: 'top'
                    })
                } else if (response.data.variables[6].value == 200) {
                    localStorage.setItem('institute', response.data.variables[9].value)
                    setVisible(false)
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error);
            });

    }

    const FormInstitute = () => {

        const dataSearch = [dataNpsnSearch] || {}

        const handleOnSearch = (string, results) => {
            axios.post(BASE_URL, {
                    "processDefinitionId": "getwherenojoinfirst:1:84d5c713-2cc7-11ed-aacc-9a44706f3589",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "dapodik_sekolah",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "dapodik_sekolah.nama",
                                "order_by": "asc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "npsn",
                                        "tbl_value": string,
                                        "operator": "="
                                    }
                                ],
                                "tbl_coloumn": [
                                    "nama",
                                    "status_sekolah",
                                    "bentuk_pendidikan",
                                    "npsn"
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
                const resData = JSON.parse(response.data.variables[2].value);
                const resCode = resData.code
                const data = resData.data

                if(resCode == 200){
                    setDataNpsnSearch(data)
                    // setSubmittedNpsn(true)
                }else if(resCode == 404){
                    notification.info({
                        message: 'Tidak ditemukan',
                        description: 'Mohon masukkan NPSN yang sudah terdaftar di KEMENDIKBUD.',
                        placement: 'top'
                    })
                }else{
                    notification.error({
                        message: 'Error',
                        description: 'Mohon hubungi Admin',
                        placement: 'top'
                    })
                }
                console.log(resData)
            });
            // onSearch will have as the first callback parameter
            // the string searched and for the second the results.
            console.log('hasil data',string, results)
            console.log('hasill', dataSearch)
        }

        const handleOnHover = (result) => {
            // the item hovered
            console.log(result)
        }

        const handleOnSelect = (item) => {
            // the item selected
            console.log(item)
        }

        const handleOnFocus = () => {
            console.log('Focused')
        }

        const formatResult = (dataSearch) => {
            console.log('res',dataSearch)
            return (
                <>
                    {/*<span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>*/}
                    {/*<span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>*/}
                    <span style={{ display: 'block', textAlign: 'left' }}>name: {dataSearch.name}</span>
                </>
            )
        }

        const FormNpsn = () => {
            // const npsn = [dataNpsn];
            const items = [
                {
                    id: 0,
                    name: 'Cobol'
                },
                {
                    id: 1,
                    name: 'JavaScript'
                },
                {
                    id: 2,
                    name: 'Basic'
                },
                {
                    id: 3,
                    name: 'PHP'
                },
                {
                    id: 4,
                    name: 'Java'
                }
            ]

            return (
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                NPSN
                            </label>
                            {/*<input*/}
                            {/*    name="npsn_institute"*/}
                            {/*    type="text"*/}
                            {/*    className="form-control"*/}
                            {/*/>*/}
                            <div style={{ width: 400 }}>
                                <ReactSearchAutocomplete
                                    items={items}
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    autoFocus
                                    formatResult={formatResult}
                                />
                            </div>
                        </div>

                        <p>Sekolah Anda : <a className='text-info' onClick={() => setSubmittedNpsn(true)}>{dataSearch[0]?.npsn} - {dataSearch[0]?.nama}</a></p>
                    </div>
                    {/*<div className="col-lg-6">*/}
                    {/*    <button*/}
                    {/*        className="bg-current hovering-pan border-0 text-white font-xsss fw-600 p-2 rounded-lg"*/}
                    {/*        style={{marginTop: '35px'}}*/}
                    {/*        type='button'*/}
                    {/*        onClick={(e) => getDataNpsn(e)}*/}
                    {/*    >*/}
                    {/*        Submit Npsn*/}
                    {/*    </button>*/}
                    {/*</div>*/}

                </div>
            )
        }

        const FormDetail = () => (
            <>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Name <RequiredTooltip />
                            </label>
                            <input
                                name="name_institute"
                                type="text"
                                className="form-control"
                                defaultValue={dataSearch[0]?.nama}
                                disabled
                                required
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Phone <RequiredTooltip />
                            </label>
                            <input
                                type="number"
                                name="phone_institute"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Email <RequiredTooltip />
                            </label>
                            <input
                                name="email_institute"
                                type="email"
                                className="form-control"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Fax
                            </label>
                            <input
                                type="number"
                                name="fax_institute"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Provinsi <RequiredTooltip />
                            </label>
                            <select
                                className="form-control"
                                aria-label="Default select example"
                                name="state_institute"
                                required
                            >
                                <option value="11" selected disabled hidden>
                                    ACEH
                                </option>
                            </select>
                            {/*<input*/}
                            {/*    name="state_institute"*/}
                            {/*    type="text"*/}
                            {/*    className="form-control"*/}
                            {/*    defaultValue="11"*/}
                            {/*    required*/}
                            {/*/>*/}
                        </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Kota / Kabupaten <RequiredTooltip />
                            </label>
                            <select
                                className="form-control"
                                aria-label="Default select example"
                                name="city_institute"
                                required
                            >
                                <option value="1101" selected disabled hidden>
                                    KABUPATEN SIMEULUE
                                </option>
                            </select>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    name="city_institute"*/}
                            {/*    className="form-control"*/}
                            {/*    defaultValue="1101"*/}
                            {/*    required*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Kecamatan <RequiredTooltip />
                            </label>
                            <select
                                className="form-control"
                                aria-label="Default select example"
                                name="district_institute"
                                required
                            >
                                <option value="1101010" selected disabled hidden>
                                    TEUPAH SELATAN
                                </option>
                            </select>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    name="district_institute"*/}
                            {/*    className="form-control"*/}
                            {/*    defaultValue="1101010"*/}
                            {/*    required*/}
                            {/*/>*/}
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Kelurahan <RequiredTooltip />
                            </label>
                            <select
                                className="form-control"
                                aria-label="Default select example"
                                name="subdistrict_institute"
                                required
                            >
                                <option value="1101010001" selected disabled hidden>
                                    LATIUNG
                                </option>
                            </select>
                            {/*<input*/}
                            {/*    type="text"*/}
                            {/*    name="subdistrict_institute"*/}
                            {/*    className="form-control"*/}
                            {/*    defaultValue="1101010001"*/}
                            {/*    required*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss">
                            Alamat <RequiredTooltip />
                        </label>
                        <textarea
                            className="form-control mb-0 p-3 bg-greylight lh-16"
                            rows="5"
                            placeholder="Isi alamat detail..."
                            name="address_institute"
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Website
                            </label>
                            <input
                                type="text"
                                name="website_institute"
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Tahun Berdiri <RequiredTooltip />
                            </label>
                            <DatePicker
                                className="form-control"
                                picker="year"
                                placeholder="Pilih Tahun"
                                name="year_institute"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label className="mont-font fw-600 font-xsss">
                            Tipe Sekolah <RequiredTooltip />
                        </label>
                        <input
                            type="text"
                            name="type_institute"
                            className="form-control"
                            defaultValue={dataSearch[0]?.bentuk_pendidikan}
                            disabled
                            required
                        />
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label className="mont-font fw-600 font-xsss">
                            Status Sekolah <RequiredTooltip />
                        </label>
                        <input
                            type="text"
                            name="status_institute"
                            className="form-control"
                            defaultValue={dataSearch[0]?.status_sekolah}
                            disabled
                            required
                        />
                    </div>
                </div>

                <PicForm />
            </>
        )
        return (
            <>
                <h1>Institute Form</h1>
                <p className='text-danger font-weight-bold'>Mohon isi Institute dan PIC form sebelum dapat mengakses
                    fitur Dashboard.</p>
                <div className="row mb-3">
                    {/*<div className="col-lg-12 mb-5">*/}
                    {/*    <PageHeader*/}
                    {/*        className="site-page-header card bg-lightblue text-grey-900 fw-700"*/}
                    {/*        title="Create Institute"*/}
                    {/*        style={{ position:'fixed', width: '56rem', zIndex: 1000 }}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div className="col-lg-12 mt-5">
                        <div className="d-flex justify-content-center">
                            <Card className="bg-lightblue" style={{width: 157}}>
                                {/*<ImgCrop rotate>*/}
                                {/*    <Upload*/}
                                {/*        className="avatar-uploader"*/}
                                {/*        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                                {/*        listType="picture-card"*/}
                                {/*        fileList={fileList}*/}
                                {/*        onChange={onChange}*/}
                                {/*        onPreview={onPreview}*/}
                                {/*    >*/}
                                {/*        {fileList.length < 1 && <PlusOutlined/>}*/}
                                {/*    </Upload>*/}
                                {/*</ImgCrop>*/}
                            </Card>
                        </div>
                    </div>
                </div>
                <form className="px-3 py-4"
                      id="institute_form"
                      onSubmit={CreateInstitute}
                      method="POST">
                    {submittedNpsn ? <FormDetail/> : <FormNpsn/>}
                </form>
            </>
        )
    }

    const iconlList = [
        {
            name: dataDashboard.siswa,
            count: 'Siswa',
            status: 'warning',
            icon: 'feather-hard-drive'
        },
        {
            name: dataDashboard.guru,
            count: 'Guru',
            status: 'success',
            icon: 'feather-box'
        },
        {
            name: dataDashboard.kelas,
            count: 'Kelas Aktif',
            status: 'info',
            icon: 'feather-award'
        }
    ];
    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>

                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <Modal
                            // title="Please Create Istitute before using Dashboard"
                            centered
                            visible={visible}
                            width={1000}
                            bodyStyle={{overflowY: 'auto', maxHeight: 'calc(100vh - 100px)'}}
                            maskStyle={{backgroundColor: 'rgba(0, 0, 0, 0.85)'}}
                            onOk={() => setVisible(false)}
                            footer={null}
                            closable={false}>
                            <div className="container px-3 py-4">
                                <FormInstitute/>
                            </div>
                        </Modal>
                        <div className="row">
                            <div className="col-lg-12">
                                <div
                                    className="card w-100 bg-lightblue p-lg-5 p-4 mb-5 border-0 rounded-lg d-block float-left">
                                    <h2 className="display1-size display2-md-size d-inline-block float-left mb-0 text-grey-900 fw-700">
                                        Hi, {user}
                                        <span className="font-xssss fw-600 text-grey-600 d-block mb-2 ml-1">
                                                    Selamat datang di Aneta, Semoga Harimu Menyenangkan.
                                                </span>
                                    </h2>
                                    <img
                                        src="data:image/jpeg;base64,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"
                                        alt="banner"
                                        className="w250 right-15 top-0 position-absolute d-none d-xl-block"
                                    />
                                </div>
                            </div>
                            {/* <div className="col-lg-12 d-flex mb-4">
                                <h2 className="text-grey-900 ml-1 font-md fw-700">Statistik Sekolah</h2>
                                <select
                                    className="form-select ml-auto float-right border-0 font-xssss fw-600 text-grey-700 bg-transparent"
                                    aria-label="Default select example"
                                >
                                    <option>Sort by latest</option>
                                    <option defaultValue="1">Sort by popularity</option>
                                    <option defaultValue="2">
                                        Sort by price : low to high
                                    </option>
                                    <option defaultValue="3">
                                        Sort by price : high to low
                                    </option>
                                </select>
                            </div> */}
                        </div>


                        <div className="row">
                            {iconlList.map((value, index) => (<div key={index} className="col-lg-4">
                                <div
                                    className={`card mb-4 border-0 pt-4 pb-4 text-center alert-${value.status} align-items-center rounded-10`}
                                >
                                    <i
                                        className={`psor text-white btn-round-md font-xs ${value.icon} bg-${value.status}`}
                                    ></i>
                                    <h3 className="fw-700 font-xl text-grey-900 mt-2 ls-3 mb-0">
                                        {value.name}
                                    </h3>
                                    <span className="font-xssss ls-0 text-grey-900 fw-700 mt-0">
                          {value.count}
                        </span>
                                </div>
                            </div>))}
                        </div>

                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card border-0 p-4 mt-2 rounded-10">
                                    <div className="card-body d-flex">
                                        <h4 className="font-xss text-grey-800 mb-4 mt-3 fw-700">
                                            Statistik Nilai Siswa
                                        </h4>
                                        <h5 className="ml-auto mr-3 mt-2 text-grey-600 font-xssss fw-700">
                                            <span className="btn-round-xss bg-warning mr-1"></span>
                                            SD
                                        </h5>
                                        <h5 className="mt-2 text-grey-600 font-xssss fw-700">
                                            <span className="btn-round-xss bg-success mr-1"></span>
                                            TK
                                        </h5>
                                    </div>
                                    <Chart
                                        options={lineChart.options}
                                        series={lineChart.series}
                                        type="bar"
                                        width="100%"
                                        height="350"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Adminfooter/>
                </div>
            </div>
        </Fragment>);
}

export default BerandaAdmin;
