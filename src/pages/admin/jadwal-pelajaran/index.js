import React, { Fragment, useState, useEffect } from "react"
import {
  Menu,
  Card,
  Button,
  Dropdown,
  message,
  PageHeader
} from "antd";
import {
  DownOutlined,
  AppstoreOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { Link, useHistory} from 'react-router-dom';
import axios from "axios";
import Search from "antd/es/input/Search";
import { BASE_URL } from "../../../api/Url";
import Adminfooter from '../../../components/Adminfooter';
import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import { useDispatch } from "react-redux";
import { GetIdClass } from "../../../redux/Action";

export default function JadwalPelajaranAdmin() {
  const [grid, setGrid] = useState(false)
  const [isViewPelajaran, setIsViewPelajaran] = useState(true);
  const [getKelas, setGetKelas] = useState([]);
  // const [getProcessDefId, setGetProcessDefId] = useState([]);

  const academicYear = localStorage.getItem('academic_year')

  const dispatch = useDispatch();

  const _onSelectMenu = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  const _filterMenu = (
    <Menu onClick={_onSelectMenu}>
      <Menu.Item key="1">1st filter</Menu.Item>
      <Menu.Item key="2">2nd filter</Menu.Item>
      <Menu.Item key="3">3rd filter</Menu.Item>
    </Menu>
  );

  const _sortMenu = (
    <Menu onClick={_onSelectMenu}>
      <Menu.Item key="1">1st sort</Menu.Item>
      <Menu.Item key="2">2nd sort</Menu.Item>
      <Menu.Item key="3">3rd sort</Menu.Item>
    </Menu>
  );

  const _onSearch = value => console.log(value);

  const institute = localStorage.getItem('institute');

  useEffect(() => {
    axios.post(BASE_URL,
      {
        "processDefinitionId": "globalgroupby:2:e74b2da9-f754-11ec-ac5e-66fc627bf211",
        "returnVariables": true,
        "variables": [
          {
            "name": "groupby",
            "type": "json",
            "value": {
              "tbl_name": "x_academic_class",
              "select": [
                "class"
              ],
              "where": [
                {
                  "keterangan": "where",
                  "kolom": "academic_year_id",
                  "operator": "=",
                  "value": academicYear
                }, {
                  "keterangan": "where",
                  "kolom": "deleted_at",
                  "operator": "=",
                  "value": ""
                }
              ],
              "order_by" : "asc",
              "order_coloumn" : "class",
              "groupby": "class"
            }
          }
        ]
      }, {
      headers: {
        "Content-Type": "application/json",
      }
    }
    ).then(function (response) {
      const dataRes = JSON.parse(response?.data?.variables[2]?.value);
      const kelas = dataRes?.data
      setGetKelas(kelas);
    })
  }, [academicYear])

  const channelList = getKelas.map((data, index) => {
    return {
      kelas: data.class,
    }
  })

  let history = useHistory();
  const handleSubClass = () => {
    history.push(`/admin-jadwal-pelajaran-sub-kelas/${"Kelas 2"}`)
  }

  const ViewPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <PageHeader
              className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
              onBack={() => window.history.back()}
              title="Jadwal Pelajaran"
            />
            <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
              <div className="row">
                <div className="col-lg-8 col-md-6 my-2">
                  {/* <Button className="mr-4" type="primary" shape="round" size='middle'
                    onClick={() => setIsViewPelajaran(false)}>
                    Tambah Data
                  </Button> */}
                </div>
                <div className="col-lg-4 col-md-6 my-2">
                  <Search className="mr-3" placeholder="Cari kata kunci" allowClear
                    onSearch={_onSearch} style={{ width: '80%' }} />
                  {grid == false ?
                    <a>
                      <AppstoreOutlined style={{ fontSize: '2em', lineHeight: 1 }}
                        onClick={() => setGrid(true)} />
                    </a> :
                    <a>
                      <MenuOutlined style={{ fontSize: '2em', lineHeight: 1 }}
                        onClick={() => setGrid(false)} />
                    </a>}
                </div>
              </div>
            </Card>

            <div className="px-1 py-2 ">
              <div className="row">
                {channelList.map((value, index) => {

                  return (
                    <div className="col-xl-3 col-lg-4 col-md-4">
                      <Link
                        onClick={() => {
                          dispatch({ type: 'SET_CLASS', value: value })
                        }
                        }
                        to={{ pathname: `/admin-jadwal-pelajaran-sub-kelas` }}
                      >
                        <div
                          className="card mb-4 d-block h150 w-100 shadow-md rounded-xl p-xxl-5 pt-3 text-center"
                          onClick={handleSubClass}
                          >
                          <h2 className="ml-auto mr-auto font-weight-bold mt-5 mb-0">{value.kelas}</h2>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TambahPelajaran = () => {
    return (
      <div className="container px-3 py-4">
        <div className="row">
          <div className="col-lg-12">
            <div className="middle-wrap">
              <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                  <i onClick={() => setIsViewPelajaran(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                  <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                    Tambah Jadwal Pelajaran
                  </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Hari
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Mata Pelajaran
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Guru/Tenaga Pengajar
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-6 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Waktu Mulai
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-12 mb-3">
                        <div className="form-group">
                          <label className="mont-font fw-600 font-xsss">
                            Waktu Selesai
                          </label>
                          <input type="text" className="form-control" />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <Link
                          to="/account-information"
                          className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                          Save
                        </Link>
                        <Link
                          to="/account-information"
                          className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                          Batal
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
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
          {isViewPelajaran ? <ViewPelajaran /> : <TambahPelajaran />}
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}