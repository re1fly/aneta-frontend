import React, { Fragment, useState } from "react"
import {
    Card,
    PageHeader
} from "antd";
import {
    AppstoreOutlined,
    MenuOutlined,
} from "@ant-design/icons";

import { useHistory, useParams } from 'react-router-dom';
import Search from "antd/es/input/Search";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';

export default function GuruJadwalPelajaranMateriTugas() {
    const [grid, setGrid] = useState(false)

    const _onSearch = value => console.log(value);

    const params = useParams()
    const idMapel = params?.id

    let history = useHistory();
    const handleSubClass1 = (id) => {
        console.log(id);
        history.push(`/guru-jadwal-pelajaran-list-materi-${id}`)
    }

    const handleSubClass2 = (id) => {
        console.log(id);
        history.push(`/guru-jadwal-pelajaran-list-tugas-${id}`)
    }

    const ViewPelajaran = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                            className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Materi dan Tugas"
                        />
                        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                </div>
                                <div className="col-lg-4 col-md-6 my-2">
                                    <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                                        onSearch={_onSearch} style={{ width: '80%' }} />
                                </div>
                            </div>
                        </Card>

                        <div className="px-1 py-2 ">
                            <div className="row">
                                {/* {channelList.map((value, index) => {

                                    return ( */}
                                        <div className="col-xl-3 col-lg-4 col-md-4">
                                            {/* <Link to={{ pathname: `/guru-jadwal-pelajaran-materi` }}> */}
                                                <div
                                                    className="card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center"
                                                    onClick={() => handleSubClass1(idMapel)}
                                                >
                                                    {/* <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">Kelas {value.kelas}</h2> */}
                                                    <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">Materi</h2>
                                                </div>
                                            {/* </Link> */}
                                        </div>
                                        <div className="col-xl-3 col-lg-4 col-md-4">
                                            {/* <Link to={{ pathname: `/guru-jadwal-pelajaran-tugas` }}> */}
                                                <div
                                                    className="card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center"
                                                    onClick={() => handleSubClass2(idMapel)}
                                                >
                                                    {/* <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">Kelas {value.kelas}</h2> */}
                                                    <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">Tugas</h2>
                                                </div>
                                            {/* </Link> */}
                                        </div>
                                    {/* )
                                })} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    <ViewPelajaran />
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}