import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PathTugasNilaiGuru } from "../../../redux/Action";
import {
  Menu,
  Card,
  Button,
  Dropdown,
  message,
  PageHeader,
  Row,
  Col,
  notification,
} from "antd";
import {
  DownOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Search from "antd/es/input/Search";
import Adminfooter from "../../../components/Adminfooter";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {
  export_matpel,
  global_join_sub_where_get,
  url_by_institute,
} from "../../../api/reference";

export default function GuruNilaiTugas() {
  const [grid, setGrid] = useState(false);
  const [getMateri, setGetMateri] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const academicYear = localStorage.getItem("academic_year");
  const instituteId = localStorage.getItem("institute");
  const userId = localStorage.getItem("user_id");

  const _onSearch = (value) => console.log(value);

  const params = useParams();
  const idMapel = params.id;
  const location = useLocation();
  // const dataKelas = location.state.dataKelas
  // const mapel = location.state.mapel

  const dispatch = useDispatch();
  const PathNilaiGuru = useSelector((state) => state.dataPathNilaiGuru);
  const kelas = PathNilaiGuru.kelas;
  const subKelas = PathNilaiGuru.subKelas;
  const mapel = PathNilaiGuru.mapel;

  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    });
  };
  const downloadLoading = () => {
    setIsLoading(true);
    enterLoading(0);
    _exportDataExcel();
  };

  useEffect(() => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: global_join_sub_where_get,
          returnVariables: true,
          variables: [
            {
              name: "global_join_where_sub",
              type: "json",
              value: {
                tbl_induk: "x_academic_subjects_schedule_contents_meeting",
                select: [
                  "x_academic_subjects_schedule_contents_meeting.contents_id as id",
                  "x_academic_subjects_schedule_contents_meeting.meeting_name",
                  "x_academic_subjects_schedule_date.date",
                  "x_academic_subjects_schedule_time.time_start",
                  "x_academic_subjects_schedule_time.time_end",
                  "x_academic_subjects_schedule_contents.is_upload",
                ],
                paginate: 10,
                join: [
                  {
                    tbl_join: "x_academic_subjects_schedule_date",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "schedule_date_id",
                  },
                  {
                    tbl_join: "x_academic_subjects_schedule_time",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "schedule_time_id",
                  },
                  {
                    tbl_join: "x_academic_subjects_schedule_contents",
                    refkey: "id",
                    tbl_join2: "x_academic_subjects_schedule_contents_meeting",
                    foregenkey: "contents_id",
                  },
                ],
                where: [
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "subjects_content_type_id",
                    tbl_value: "2",
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "created_by",
                    tbl_value: userId,
                    operator: "=",
                  },
                  {
                    tbl_coloumn: "x_academic_subjects_schedule_contents",
                    tbl_field: "subjects_master_id",
                    tbl_value: idMapel,
                    operator: "=",
                  },
                ],
                order_coloumn:
                  "x_academic_subjects_schedule_contents_meeting.updated_at",
                order_by: "desc",
              },
            },
            {
              name: "page",
              type: "string",
              value: "1",
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
        const dataRes = JSON.parse(response?.data?.variables[3]?.value);
        const materi = dataRes?.data?.data;
        setGetMateri(materi);
      });
  }, [academicYear]);

  const channelList = getMateri?.map((data, index) => {
    return {
      id: data.id,
      materi: data.meeting_name,
      isUpload: data.is_upload,
    };
  });

  let history = useHistory();
  const handleSubClass = (id, isUpload, tugas) => {
    dispatch(PathTugasNilaiGuru(tugas));
    history.push(`/guru-penilaian-${id}-${isUpload}`);
  };

  const _exportDataExcel = () => {
    axios
      .post(url_by_institute, {
        processDefinitionId: export_matpel,
        returnVariables: true,
        variables: [
          {
            name: "data",
            type: "json",
            value: {
              id_user: userId,
              id_matpel: idMapel,
            },
          },
        ],
      })
      .then((response) => {
        console.log(response);
        const resData = JSON.parse(response.data.variables[2].value);
        console.log(resData);
        if (resData != 0) {
          setIsLoading(false);
        }
        const dataExcel = resData.data;
        const byteCharacters = atob(dataExcel);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "DataNilai.xlsx"); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    // .catch(function (error) {
    //     console.log(error);
    //     if (error.code == "ERR_BAD_RESPONSE") {
    //         notification.error({
    //             message: "Download gagal",
    //             description: "Harap klik kembali tombol download nilai",
    //             placement: 'top'
    //         })
    //     }
    // })
  };

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader
              className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title={`Data Nilai / Kelas ${kelas} / ${subKelas} / ${mapel}`}
            />
            <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
              <Row>
                <Col span={8}>
                  {/* <Button className="mr-4" style={{ backgroundColor: '#00a629', color: 'white' }}
                                        shape="round" size='middle'
                                        onClick={() => _exportDataExcel()}>
                                        Download Nilai
                                    </Button> */}
                  <Button
                    className="mr-4"
                    style={{ backgroundColor: "#00a629", color: "white" }}
                    loading={isLoading}
                    shape="round"
                    size="middle"
                    onClick={() => downloadLoading()}
                  >
                    Download Nilai
                  </Button>
                </Col>
                {/* <Col span={4}>
                            <div className="float-right">
                                <Search className="mr-5" placeholder="Cari kata kunci" allowClear
                                    onSearch={_onSearch} style={{ width: 250, lineHeight: '20px' }} />
                            </div>
                        </Col> */}
              </Row>
            </Card>

            <div className="px-1 py-2 ">
              <div className="row">
                {channelList?.map((value, index) => {
                  return (
                    <div className="col-xl-3 col-lg-4 col-md-4">
                      <div
                        className="d-flex align-items-center justify-content-center card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 text-center"
                        onClick={() =>
                          handleSubClass(value.id, value.isUpload, value.materi)
                        }
                      >
                        <h2 className="ml-auto mr-auto font-weight-bold mb-0">
                          {value.materi}
                        </h2>
                      </div>
                    </div>
                  );
                })}
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
