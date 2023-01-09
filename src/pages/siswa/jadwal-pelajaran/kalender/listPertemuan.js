import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PathKalenderSiswa } from "../../../../redux/Action";
import axios from "axios";
import Adminfooter from "../../../../components/Adminfooter";
import { Button, Card, Col, PageHeader, Row, Space, Table, Tag } from "antd";
import {
  AppstoreOutlined,
  MenuOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import Search from "antd/es/input/Search";
import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import {
  global_join_sub_where_get,
  role_siswa_get_kalender_detail,
  url_by_institute,
} from "../../../../api/reference";
import { useHistory } from "react-router-dom";

function SiswaListPertemuanKalender() {
  const [grid, setGrid] = useState(false);
  const [detailDate, setDetailDate] = useState([])

  const [btnPagination, setBtnPagination] = useState([]);
  const [paramsPage, setParamsPage] = useState("1");

  const academicId = localStorage.getItem("academic_id");
  const userId = localStorage.getItem("user_id");

  const dispatch = useDispatch();
  const tanggalKalenderSiswa = useSelector((state) => state.dataPathKalenderSiswa)
  const tanggal = tanggalKalenderSiswa.tanggal

  useEffect(() => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: role_siswa_get_kalender_detail,
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {
                id_siswa: userId,
                date: tanggal,
                id_academik: academicId,
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic YWRtaW46TWFuYWczciE=",
          },
        }
      )
      .then(function (response) {
        const dataRes = JSON.parse(response?.data?.variables[2]?.value);
        const dataList = dataRes?.data;
        setDetailDate(dataList);
        // const pagination = dataRes?.data?.links;
        // setBtnPagination(pagination)
      });
  }, [userId, paramsPage]);

  let history = useHistory();
  const handleRouter = (id, record) => {
    dispatch(PathKalenderSiswa(record))
    if (record.keterangan == "Materi") {
      history.push(`/siswa-jadwal-pelajaran-kalender-materi-${id}`)
    } else if (record.keterangan == "Tugas") {
      history.push(`/siswa-jadwal-pelajaran-kalender-tugas-${id}`)
    }
  }


  const data = detailDate.map((data, index) => {
    return {
      no: index + 1,
      id: data.id,
      namaPelajaran: data.nama_mata,
      namaPertemuan: data.meeting_name,
      tanggalPertemuan: data.date,
      jam: `${data.time_start} - ${data.time_end}`,
      meeting_name: data.meeting_name,
      tittle: data.tittle,
      namaMateri: data.tittle,
      keterangan: [data.subjects_content_type_id == 1 ? "Materi" : "Tugas"],
    };
  });

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      align: "center",
    },
    {
      title: "Nama Pelajaran",
      dataIndex: "namaPelajaran",
      align: "center",
    },
    {
      title: "Nama Materi / Tugas",
      dataIndex: "namaMateri",
      align: "center",
    },
    {
      title: "Nama Pertemuan",
      dataIndex: "namaPertemuan",
      align: "center",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      align: "center",
      render: (keterangan) => (
        <>
          {keterangan.map((keterangan) => {
            let color = keterangan == "Materi" ? "green" : "orange";
            return (
              <Tag
                style={{ borderRadius: "15px" }}
                color={color}
                key={keterangan}
              >
                {keterangan}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Jam",
      dataIndex: "jam",
      align: "center",
    },
    {
      title: "Aksi",
      key: "action",
      responsive: ["sm"],
      render: (text, record) => (
        <Space size="middle">
          <SearchOutlined
            onClick={() => handleRouter(record.id, record)}
            style={{ color: "black" }}
          />
        </Space>
      ),
    },
  ];

  function onChangeTable(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  function onChangeTable(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const _onSearch = value => console.log(value);

  const ViewMateri = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row mb-3">
          <div className="col-lg-12">
            <PageHeader
              className="site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title="Jadwal Pelajaran Kalender / Materi dan Tugas"
            />
          </div>
        </div>
        <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
          <Row>
            <Col span={12}>
            </Col>
            <Col span={12}>
              <div className="float-right">
                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                  onSearch={_onSearch} style={{ width: 250, lineHeight: '20px' }} />
              </div>
            </Col>
          </Row>
        </Card>

        <Table className=""
          columns={columns}
          dataSource={data}
          onChange={onChangeTable}
          pagination={false}
          rowClassName="bg-greylight text-grey-900" />
        <div className='text-center mt-4'>
          {btnPagination?.map((dataBtn) => {
            const labelBtn = dataBtn.label;
            const label = labelBtn
              .replace(/(&laquo\;)/g, "")
              .replace(/(&raquo\;)/g, "");
            let linkUrl = dataBtn.url;

            if (linkUrl != null) {
              linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
            }

            return (
              <Button
                className="btn btn-primary mr-2 font-xssss fw-600"
                disabled={linkUrl == null ? true : false}
                onClick={() => {
                  setParamsPage(linkUrl);
                }}
              >
                {label}
              </Button>
            );
          })}
        </div>
        <Adminfooter />
      </div>
    )
  }

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          <ViewMateri />
        </div>
      </div>
    </Fragment>
  );
};

export default SiswaListPertemuanKalender;
