import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {PageHeader} from "antd";

function GuruPerencanaanNilai() {
    const getPerencanaan = [
        {
            title: 'Nilai Pengetahuan',
            url: '/guru-perencanaan-nilai-pengetahuan'
        },
        {
            title: 'Nilai Keterampilan',
            url: '/guru-perencanaan-nilai-keterampilan'
        },
        {
            title: 'Nilai Sikap Spiritual',
            url: '/guru-perencanaan-nilai-spiritual'
        },
        {
            title: 'Nilai Sikap Sosial',
            url: '/guru-perencanaan-nilai-sosial'
        },
        {
            title: 'Bobot PH, PTS, dan PAS',
            url: '/guru-perencanaan-nilai-bobot'
        },
    ]

    const listPerencanaan = getPerencanaan.map((data, index) => {
        return {
            title: data.title,
            url: data.url
        }
    })

    const CardPerencanaan = () => {
        return (
            <div className="row">
                {listPerencanaan.map((value, index) => {
                    return (
                        <div className="col-xl-3 col-lg-4 col-md-4">
                            <Link
                                to={value.url}
                            >
                                <div
                                    className="card mb-4 d-block ant-card-hoverable h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center">
                                    <h2 className="ml-auto mr-auto p-3 mt-4 font-weight-bold">{value.title}</h2>
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
                                    title="Perencanaan Nilai"
                                />
                            </div>
                        </div>
                        <CardPerencanaan/>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default GuruPerencanaanNilai;