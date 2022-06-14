import React, {Fragment, useEffect, useState} from 'react';
import Adminfooter from "../../components/Adminfooter";
import {Card, DatePicker, notification, PageHeader} from "antd";
import Upload from "antd/es/upload/Upload";
import {CheckOutlined, PlusOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import axios from "axios";
import {BASE_URL} from "../../api/Url";

function ProfilSekolah() {
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const institute = localStorage.getItem('institute');
    const [dataSekolah, setDataSekolah] = useState({})
    const [yearSekolah, setYearSekolah] = useState(dataSekolah.year_of_found)

    useEffect(() => {
        axios.post(BASE_URL, {
                "processDefinitionId": "globaljoinsubfirst:1:20ca0e47-eb01-11ec-a658-66fc627bf211",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where_sub_first",
                        "type": "json",
                        "value": {
                            "tbl_induk": "m_institutes",
                            "select": ["m_institutes.id as id_institute",
                                "m_institutes.name",
                                "m_institutes.state_id",
                                "r_state.state",
                                "m_institutes.city_id",
                                "r_city.city",
                                "m_institutes.district_id",
                                "r_district.district",
                                "m_institutes.sub_district_id",
                                "r_sub_district.sub_district",
                                "m_institutes.phone",
                                "m_institutes.fax",
                                "m_institutes.address",
                                "m_institutes.website",
                                "m_institutes.year_of_found"
                            ],
                            "join": [
                                {
                                    "tbl_join": "r_district",
                                    "refkey": "id",
                                    "tbl_join2": "m_institutes",
                                    "foregenkey": "district_id"

                                }, {
                                    "tbl_join": "r_state",
                                    "refkey": "id",
                                    "tbl_join2": "m_institutes",
                                    "foregenkey": "state_id"
                                }, {
                                    "tbl_join": "r_sub_district",
                                    "refkey": "id",
                                    "tbl_join2": "m_institutes",
                                    "foregenkey": "sub_district_id"
                                }, {
                                    "tbl_join": "r_city",
                                    "refkey": "id",
                                    "tbl_join2": "m_institutes",
                                    "foregenkey": "city_id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "m_institutes",
                                    "tbl_field": "id",
                                    "tbl_value": institute,
                                    "operator": "="
                                }
                            ]
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const dataRes = JSON.parse(response.data.variables[2].value);
            setDataSekolah(dataRes.data)
            console.log(response)
        }).catch(error => {
            alert(error)
        })
    }, [])
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

    const _submitProfile = (e) => {
        e.preventDefault();
        console.log('submitted')
        notification.open({
            message: 'Success',
            description:
                'Profil Sekolah berhasil diubah',
            icon: <CheckOutlined style={{color: '#108ee9'}}/>,
            duration: 2
        });
    }

    const handleYear = (value, date) => {
        setYearSekolah(date)
    }

    const editInstitute = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios.post(BASE_URL,
            {
                "processDefinitionId": "GlobalUpdateRecord:2:d08b0e52-d595-11ec-a2ad-3a00788faff5",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_updatedata",
                        "type": "json",
                        "value": {
                            "tbl_name": "m_institutesModel",
                            "id": institute,
                            "tbl_coloumn": {
                                "name": data.nama_sekolah,
                                "phone": data.phone_sekolah,
                                "fax": data.fax_sekolah,
                                "address": data.address_sekolah,
                                "state_id": data.provinsi_sekolah,
                                "city_id": data.kota_sekolah,
                                "district_id": data.kecamatan_sekolah,
                                "sub_district_id": data.kelurahan_sekolah,
                                "year_of_found": yearSekolah,
                                "website": data.website_sekolah
                            }
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const resCode = JSON.parse(response.data.variables[2].value)
            const isSuccess = resCode.status;
            if (isSuccess == 'success') {
                notification.success({
                    message: "Sukses",
                    description: 'Data Sekolah berhasil di edit',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal edit data sekolah.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>

                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row mb-3">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Profil Sekolah"
                                />
                            </div>
                            <div className="col-lg-12 mt-5">
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
                        <form onSubmit={editInstitute}
                              method="POST">
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Name
                                        </label>
                                        <input
                                            defaultValue={dataSekolah.name}
                                            name="nama_sekolah"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Provinsi
                                        </label>
                                        <input
                                            defaultValue={dataSekolah.state_id}
                                            name="provinsi_sekolah"
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Phone
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={dataSekolah.phone}
                                            name="phone_sekolah"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Kota / Kabupaten
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={dataSekolah.city_id}
                                            name="kota_sekolah"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Fax
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={dataSekolah.fax}
                                            name="fax_sekolah"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Kecamatan
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={dataSekolah.district_id}
                                            name="kecamatan_sekolah"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={dataSekolah.address}
                                            name="address_sekolah"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Kelurahan
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={dataSekolah.sub_district_id}
                                            name="kelurahan_sekolah"
                                            className="form-control"
                                        />
                                    </div>
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
                                            defaultValue={dataSekolah.website}
                                            name="website_sekolah"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Tahun Berdiri
                                        </label>
                                        <DatePicker
                                            className="form-control"
                                            picker="year"
                                            mode="year"
                                            placeholder={dataSekolah.year_of_found}
                                            onChange={handleYear}
                                            format="YYYY"
                                            name="tahun_berdiri"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <button
                                        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                        type="submit"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default ProfilSekolah;