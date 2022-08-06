import React, {useState} from "react";
import {Button, Modal, Space, Table} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

export const FormAdminEkskul = (props) => {
    let disabledButton = props.isDisabled;
    let isViewEdit = props.isEdit;
    const dataSiswa = [
        {
            id_siswa: 1,
            nisn: 123321,
            nama_siswa: "Lola",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 2,
            nisn: 12134,
            nama_siswa: "Rachel",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 3,
            nisn: 10132,
            nama_siswa: "Lizzy",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 3,
            nisn: 10132,
            nama_siswa: "Lizzy",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 3,
            nisn: 10132,
            nama_siswa: "Lizzy",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 3,
            nisn: 10132,
            nama_siswa: "Lizzy",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        },
        {
            id_siswa: 3,
            nisn: 10132,
            nama_siswa: "Lizzy",
            id_kelas: 1,
            nama_kelas: "I",
            sub_kelas: "B"
        }
    ]
    const [isModalVisible, setIsModalVisible] = useState(false);

    const allDataSiswa = dataSiswa.map((data, index) => {
        return {
            no: index + 1,
            idSiswa: data.id_siswa,
            nisn: data.nisn,
            namaSiswa: data.nama_siswa,
            idKelas: data.id_kelas,
            namaKelas: data.nama_kelas,
            subKelas: data.sub_kelas
        }
    })
    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
        },
        {
            title: 'NISN',
            dataIndex: 'nisn',
        },
        {
            title: 'Nama Siswa',
            dataIndex: 'namaSiswa',

        },
        {
            title: 'Kelas',
            dataIndex: 'namaKelas',
        },
        {
            title: 'Aksi',
            key: 'action',
            responsive: ['sm'],
            align: 'center',
            render: (text, record) => (
                <Space size="middle">
                    <DeleteOutlined style={{color: 'red'}} onClick={() => console.log(record)}/>
                </Space>
            ),
        },
    ];
    const columnsAddSiswa = [
        {
            title: 'Pilih Siswa',
            key: 'action',
            responsive: ['sm'],
            align: 'center',
            render: (text, record) => (
                <input
                    type="checkbox"
                    className="form-control"
                    style={{zoom: 0.4}}
                    name="siswa"
                    id={record.id}
                />
            ),
        },
        {
            title: 'NISN',
            dataIndex: 'nisn',
        },
        {
            title: 'Nama Siswa',
            dataIndex: 'namaSiswa',

        },
        {
            title: 'Kelas',
            dataIndex: 'namaKelas',
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className="container px-3 py-4">
            <Modal title="Tambah Data Siswa"
                   visible={isModalVisible}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   width={1000}
                   footer={[
                       <Button key="submit" type="primary" onClick={handleOk} className='bg-current border-0 rounded-pill'>
                           Submit
                       </Button>,
                       <Button key="back" onClick={handleCancel} className='rounded-pill'>
                           Cancel
                       </Button>

                   ]}
            >
                <Table className="py-8 p-3"
                       columns={columnsAddSiswa}
                       dataSource={allDataSiswa}
                       pagination={false}
                       rowClassName="bg-white text-grey-900"
                       scroll={{y: 250}}
                       height={250}
                />
            </Modal>
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i onClick={props.setView}
                                   className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form onSubmit={props.submit}
                                      method="POST">
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Ekstrakurikuler
                                                </label>
                                                <input type="text"
                                                       name="nama_ekskul"
                                                       className="form-control"
                                                       defaultValue={props.namaEkskul}
                                                       required
                                                       disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    TA / Semester
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="ta_semester"
                                                    required
                                                >
                                                    <option value={props.idTahunAkademik} selected disabled hidden>
                                                        {props.thAkademik} / {props.semester}
                                                    </option>
                                                    {props.selectTahunAkademik}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Pembina
                                                </label>

                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_pembina"
                                                    required
                                                >
                                                    <option value={props.idPembina} selected disabled hidden>
                                                        {props.namaPembina}
                                                    </option>
                                                    {props.selectPembina}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Prasarana / Lokasi Ekstrakurikuler
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lokasi_ekskul"
                                                    className="form-control"
                                                    defaultValue={props.lokasiEkskul}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    {
                                        isViewEdit ?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="mt-3 float-right">
                                                    <button
                                                        className="bg-linkedin border-0 text-center text-white font-xsss fw-600 p-2 w150 rounded-pill d-inline-block"
                                                        type="button"
                                                        onClick={showModal}
                                                    >
                                                        Tambah Siswa
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <h2 className='mt-5 pt-4 mb-3 text-center'>Daftar Siswa</h2>
                                                <Table className="py-8"
                                                       columns={columns}
                                                       dataSource={allDataSiswa}
                                                       pagination={false}
                                                       rowClassName="bg-white text-grey-900"
                                                       scroll={{y: 250}}
                                                       height={250}
                                                       style={{
                                                           boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                                                       }}
                                                />
                                            </div>

                                        </div> : null
                                    }

                                    <div className="mt-5 pt-2 float-right">
                                        {!disabledButton ?
                                            <div className="col-lg-12">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    onClick={props.setView}
                                                    className="ml-2 bg-lightblue border-0 text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                >
                                                    Batal
                                                </button>
                                            </div> : null}

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}