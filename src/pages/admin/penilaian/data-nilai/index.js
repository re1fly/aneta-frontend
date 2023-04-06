import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {PageHeader} from "antd";

function InputDataNilai() {
    const getPerencanaan = [
        {
            title: 'Input Nilai Pengetahuan',
            url: 'admin-data-nilai-pengetahuan'
        },
        {
            title: 'Input Nilai Keterampilan',
            url: 'admin-data-nilai-keterampilan'
        },
        {
            title: 'Input Nilai Sikap Spiritual',
            url: 'admin-data-nilai-spiritual'
        },
        {
            title: 'Input Nilai Sikap Sosial',
            url: 'admin-data-nilai-sosial'
        },
        // {
        //     title: 'Input Nilai PTS dan PAS',
        //     url: 'admin-data-nilai-ujian'
        // },
    ]

    const listPenilaian = getPerencanaan.map((data, index) => {
        return {
            title: data.title,
            url: data.url
        }
    })

    const CardPenilaian = () => {
        return (
            <div className="row">
                {listPenilaian.map((value, index) => {
                    return (
                        <div className="col-xl-3 col-lg-4 col-md-4">
                            <Link
                                to={value.url}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center card mb-4 d-block ant-card-hoverable h150 w-100 shadow-md rounded-xl p-xxl-5 text-center">
                                    <h2 className="ml-auto mr-auto p-3 font-weight-bold">{value.title}</h2>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row pb-5">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Input Data Penilaian"
                                />
                            </div>
                        </div>
                        <CardPenilaian />
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default InputDataNilai;