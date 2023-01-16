import React from "react";
import { Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const TanggalPertemuan = () => {

    const dataSource = [
        {
            key: '1',
            namaMateri: 'Bangun Ruang',
            namaPertemuan: 'Pengenalan Bangun Ruang',
            tanggalPertemuan: '12-10-2022',
            detailMateri: <Link to={{ pathname: `/guru-materi` }}><EyeOutlined className="text-black"/></Link>,

        },
        {
            key: '2',
            namaMateri: 'Bangun Ruang',
            namaPertemuan: 'Pengenalan Bangun Ruang',
            tanggalPertemuan: '19-10-2022',
            detailMateri: <Link to={{ pathname: `/guru-materi` }}><EyeOutlined className="text-black"/></Link>,

        },
        {
            key: '3',
            namaMateri: 'Bangun Ruang',
            namaPertemuan: 'Latihan Soal',
            tanggalPertemuan: '26-10-2022',
            detailMateri: <Link to={{ pathname: `/guru-materi` }}><EyeOutlined className="text-black"/></Link>,

        },
        {
            key: '4',
            namaMateri: 'Bangun Ruang',
            namaPertemuan: 'Quiz',
            tanggalPertemuan: '02-11-2022',
            detailMateri: <Link to={{ pathname: `/guru-materi` }}><EyeOutlined className="text-black"/></Link>,
        },
    ];

    const columns = [
        {
            title: 'Nama Materi / Tugas',
            dataIndex: 'namaMateri',
            key: 'namaMateri',
        },
        {
            title: 'Nama Pertemuan',
            dataIndex: 'namaPertemuan',
            key: 'namaPertemuan',
        },
        {
            title: 'Tanggal Pertemuan',
            dataIndex: 'tanggalPertemuan',
            key: 'tanggalPertemuan',
        },
        {
            title: 'Detail Materi / Tugas',
            dataIndex: 'detailMateri',
            key: 'detailMateri',
            align: 'center',
        },
    ];

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </>
    )
}