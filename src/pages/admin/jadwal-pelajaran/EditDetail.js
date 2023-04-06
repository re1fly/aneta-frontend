import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Modal, TimePicker, notification, DatePicker } from "antd";

// import DatePicker from "react-multi-date-picker"
import axios from "axios";
import {
  jadwal_pelajaran_get_date,
  url_by_institute,
} from "../../../api/reference";
import { pageLoad } from "../../../components/misc/loadPage";
import { Fragment } from "react";
import Adminfooter from "../../../components/Adminfooter";
import Navheader from "../../../components/Navheader";
import Appheader from "../../../components/Appheader";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditJadwalPelajaran() {
  const [dataTanggal, setDataTanggal] = useState([]);
  // console.log(JSON.stringify(dataTanggal, null, 2));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [date, setDate] = useState("");
  const [modalTime, setModalTime] = useState(false);
  const [values, setValues] = useState([]);
  const [refreshState, setRefreshState] = useState(false);

  const [time, setTime] = useState([]);
  const [idTime, setIdTime] = useState("");
  const [idTanggal, setIdTanggal] = useState("");

  const dataDateTime = useSelector((state) => state?.dataDateTime);
  const getDateTime = dataDateTime.DateTime;
  // console.log(JSON.stringify(getDateTime, null, 2));

  const dataSelectedSchedule = useSelector((state) => state?.dataJadwalDetail);
  const props = dataSelectedSchedule.record;

  const params = useParams();
  const idPelajaran = params.id;

  const format = "HH:mm:ss";
  const dateFormat = "YYYY-MM-DD";

  const onChangeTime = (time, timeString) => {
    console.log(time, timeString);
    setTime(timeString);
  };
  const onChangeDate = (date, dateString) => {
    // console.log(date, dateString);
    setDate(dateString);
  };

  const _getDataTanggal = () => {
    axios
      .post(url_by_institute, {
        processDefinitionId: jadwal_pelajaran_get_date,
        returnVariables: true,
        variables: [
          {
            name: "data",
            type: "json",
            value: {
              id_schedule: idPelajaran,
            },
          },
        ],
      })
      .then(function (response) {
        const dataRes = JSON.parse(response?.data?.variables[2]?.value);
        setDataTanggal(dataRes?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    _getDataTanggal();
  }, [idPelajaran]);

  const insertTime = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId:
            "insertjadwalpelajarantime:1:8961dc9b-49df-11ed-8f22-927b5be84510",
          returnVariables: true,
          variables: [
            {
              name: "insert_jadwal_pelajaran_time",
              type: "json",
              value: {
                id_schedule_date: idTanggal,
                time: time,
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
        const dataRes = JSON.parse(response.data.variables[2].value);
        const code = dataRes.message;
        console.log(code);
        if (code == "Success insert time") {
          setModalVisible(false);
          setRefreshState(true);
          _getDataTanggal();
          notification.success({
            message: "Sukses",
            description: "Jam berhasil ditambahkan.",
            placement: "top",
          });
        } else {
          notification.error({
            message: "Error",
            description: "Harap isi semua field",
            placement: "top",
          });
        }
      });
  };

  const editDate = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId: "64d701ad-9165-11ed-9c1d-6ea2a406192e",
          returnVariables: true,
          variables: [
            {
              name: "data",
              type: "json",
              value: {
                id_date: idTanggal,
                id_schedule: idPelajaran,
                date: date,
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
        const code = dataRes.code;
        const message = dataRes.message;
        if (code == true) {
          setModalDate(false);
          setRefreshState(true);
          _getDataTanggal();
          notification.success({
            message: "Sukses",
            description: "Tanggal berhasil diedit.",
            placement: "top",
          });
        } else {
          notification.error({
            message: "Error",
            description: message,
            placement: "top",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editTime = () => {
    axios
      .post(
        url_by_institute,
        {
          processDefinitionId:
            "GlobalUpdateRecord:2:184b8903-2ccb-11ed-aacc-9a44706f3589",
          returnVariables: true,
          variables: [
            {
              name: "global_updatedata",
              type: "json",
              value: {
                tbl_name: "x_academic_subjects_schedule_timeModel",
                id: idTime,
                tbl_coloumn: {
                  time_start: time[0],
                  time_end: time[1],
                },
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
        const code = dataRes.status;
        const message = dataRes.message;
        if (code == "success") {
          setModalDate(false);
          setRefreshState(true);
          _getDataTanggal();
          notification.success({
            message: "Sukses",
            description: "Tanggal berhasil diedit.",
            placement: "top",
          });
        } else {
          notification.error({
            message: "Error",
            description: message,
            placement: "top",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteTime = (idTime) => {
    Swal.fire({
      title: "Apakah anda yakin menghapus data?",
      text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batalkan",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            url_by_institute,
            {
              processDefinitionId:
                "GlobalDeleteRecord:1:caa1240f-2cc9-11ed-aacc-9a44706f3589",
              returnVariables: true,
              variables: [
                {
                  name: "global_delete",
                  type: "json",
                  value: {
                    tbl_name: "x_academic_subjects_schedule_timeModel",
                    id: idTime,
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
            const code = dataRes.status;
            if (code == "success") {
              setModalDate(false);
              setRefreshState(true);
              _getDataTanggal();
              Swal.fire("Data telah terhapus!", "success");
            } else {
              notification.error({
                message: "Error",
                description: "Data non found",
                placement: "top",
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const deleteDate = (idDate) => {
    Swal.fire({
      title: "Apakah anda yakin menghapus data?",
      text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batalkan",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(
            url_by_institute,
            {
              processDefinitionId:
                "GlobalDeleteRecord:1:caa1240f-2cc9-11ed-aacc-9a44706f3589",
              returnVariables: true,
              variables: [
                {
                  name: "global_delete",
                  type: "json",
                  value: {
                    tbl_name: "x_academic_subjects_schedule_dateModel",
                    id: idDate,
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
            const code = dataRes.status;
            console.log(code);
            if (code == "success") {
              setModalDate(false);
              setRefreshState(true);
              _getDataTanggal();
              Swal.fire("Data telah terhapus!", "success");
            } else {
              Swal.fire("Data telah terhapus!", "success");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  const checkInsertTime = (id) => {
    console.log(id);
    setModalVisible(true);
    setIdTanggal(id);
  };
  const checkEditDate = (id) => {
    console.log(id);
    setModalDate(true);
    setIdTanggal(id);
  };
  const checkEditTime = (id) => {
    console.log(id);
    setModalTime(true);
    setIdTime(id);
  };

  const TableTime = () => {
    return (
      <div className="mt-3 mb-5">
        <label className="mont-font fw-600 font-xsss">Tanggal Pertemuan</label>

        <table className="table table-bordered mt-4" width="100%">
          <tr>
            <th className="text-center px-2" rowSpan={2}>
              Tanggal
            </th>
            <th className="text-center px-2" rowSpan={2}>
              Aksi
            </th>
            <th className="text-center" rowSpan={2}>
              Tambah Jam
            </th>

            <th className="text-center" width="20%" colSpan={1}>
              Jam Pertama
            </th>
            <th className="text-center" rowSpan={2}>
              Aksi
            </th>

            <th className="text-center" width="20%" colSpan={1}>
              Jam Kedua
            </th>
            <th className="text-center" rowSpan={2}>
              Aksi
            </th>
          </tr>

          <tr>
            {/* <td className="text-center strong px-2">Jam Mulai</td>
                        <td className="text-center strong px-2">Jam Selesai</td>
                        <td className="text-center strong px-2">Jam Mulai</td>
                        <td className="text-center strong px-2">Jam Selesai</td> */}
          </tr>

          {dataTanggal?.map((date, index) => {
            return (
              <tr>
                <td className="text-center" value={date?.id_date}>
                  {date?.tanggal}
                </td>
                <td className="text-center">
                  <EditOutlined
                    style={{ color: "blue" }}
                    onClick={() => {
                      checkEditDate(date?.id_date);
                    }}
                  />
                  <DeleteOutlined
                    className="ml-2"
                    style={{ color: "red" }}
                    onClick={() => {
                      deleteDate(date?.id_date);
                    }}
                  />
                </td>
                <td className="text-center">
                  <ClockCircleOutlined
                    style={{ color: "green" }}
                    onClick={() => {
                      checkInsertTime(date?.id_date);
                    }}
                  />
                </td>
                <td className="text-center">
                  {date?.data_jam[0]?.time_start} -{" "}
                  {date?.data_jam[0]?.time_end}
                </td>
                <td className="text-center">
                  <EditOutlined
                    style={{ color: "blue" }}
                    onClick={() => {
                      checkEditTime(date?.data_jam[0]?.id);
                    }}
                  />
                  <DeleteOutlined
                    className="ml-2"
                    style={{ color: "red" }}
                    onClick={() => {
                      deleteTime(date.data_jam[0]?.id);
                    }}
                  />
                </td>

                <td className="text-center">
                  {date?.data_jam[1]?.time_start} -{" "}
                  {date?.data_jam[1]?.time_end}
                </td>
                <td className="text-center">
                  <EditOutlined
                    style={{ color: "blue" }}
                    onClick={() => {
                      checkEditTime(date?.data_jam[0]?.id);
                    }}
                  />
                  <DeleteOutlined
                    className="ml-2"
                    style={{ color: "red" }}
                    onClick={() => {
                      deleteTime(date.data_jam[1]?.id);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="main-wrapper">
        <Navheader />
        <div className="main-content">
          <Appheader />
          <div className="container px-3 py-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="flex-wrap">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                      <ArrowLeftOutlined
                        onClick={() => window.history.back()}
                        className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                      />
                      <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                        Edit Jadwal Pelajaran
                      </h4>
                    </div>
                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                      <form
                        id="mataPelajaran_form"
                        onSubmit={props.submit}
                        method="POST"
                      >
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Hari
                              </label>
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                name="hari"
                                required
                                disabled={props.isDisabled}
                              >
                                <option value={props.hari} selected disabled>
                                  {props.hari == null
                                    ? "Pilih Hari"
                                    : props.hari.charAt(0).toUpperCase() +
                                      props.hari.slice(1)}
                                </option>
                                <option value="senin">Senin</option>
                                <option value="selasa">Selasa</option>
                                <option value="rabu">Rabu</option>
                                <option value="kamis">Kamis</option>
                                <option value="jumat">Jumat</option>
                                <option value="sabtu">Sabtu</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Tanggal
                              </label>
                              <DatePicker
                                multiple
                                // className="form-control"
                                disabled={true}
                                format={dateFormat}
                                placeholder="Pilih Tanggal"
                                name="tanggal"
                                onChange={setValues}
                                style={{
                                  backgroundColor: "white",
                                  height: "47px",
                                  width: "520px",
                                  borderRadius: "5px",
                                  fontSize: "14px",
                                  padding: "3px 10px",
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Mata Pelajaran
                              </label>
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                name="mata_pelajaran"
                                required
                                disabled={props.isDisabled}
                              >
                                <option
                                  value={props.idPelajaran}
                                  selected
                                  disabled
                                >
                                  {props.namaPelajaran == null
                                    ? "Pilih Mata Pelajaran"
                                    : props.namaPelajaran}
                                </option>
                                {props.selectMataPelajaran}
                              </select>
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                              <label className="mont-font fw-600 font-xsss">
                                Guru/Tenaga Pengajar
                              </label>
                              <select
                                className="form-control"
                                aria-label="Default select example"
                                name="guru"
                                required
                                disabled={props.isDisabled}
                              >
                                <option
                                  value={props.idPengajar}
                                  selected
                                  disabled
                                >
                                  {props.namaPengajar == null
                                    ? "Pilih Guru/Tenaga Pengajar"
                                    : props.namaPengajar}
                                </option>
                                {props.selectGuru}
                              </select>
                            </div>
                          </div>
                        </div>

                        <TableTime />

                        <div className="row">
                          <div className="col-lg-12">
                            <button
                              className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                              type="submit"
                              disabled
                            >
                              Simpan
                            </button>
                            <button
                              onClick={props.setView}
                              className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
                            >
                              Batal
                            </button>
                          </div>
                        </div>
                        <Modal
                          title="Tambah Jam Pertemuan"
                          okText="Close"
                          width={1000}
                          style={{
                            top: 100,
                          }}
                          visible={modalVisible}
                          onOk={() => setModalVisible(false)}
                          onCancel={() => setModalVisible(false)}
                          footer={[
                            <Button
                              key="back"
                              onClick={() => setModalVisible(false)}
                            >
                              Cancel
                            </Button>,
                            <Button
                              key="link"
                              type="primary"
                              className="ml-2"
                              onClick={() => insertTime()}
                            >
                              Simpan
                            </Button>,
                          ]}
                        >
                          <TimePicker.RangePicker
                            onChange={onChangeTime}
                            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                            name="waktu_selesai"
                            className="form-control"
                            required
                          />
                        </Modal>

                        <Modal
                          title="Edit Jam Pertemuan"
                          okText="Close"
                          width={1000}
                          style={{
                            top: 100,
                          }}
                          visible={modalTime}
                          onOk={() => setModalTime(false)}
                          onCancel={() => setModalTime(false)}
                          footer={[
                            <Button
                              key="back"
                              onClick={() => setModalTime(false)}
                            >
                              Cancel
                            </Button>,
                            <Button
                              key="link"
                              type="primary"
                              className="ml-2"
                              onClick={() => editTime()}
                            >
                              Simpan
                            </Button>,
                          ]}
                        >
                          <TimePicker.RangePicker
                            onChange={onChangeTime}
                            defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                            name="waktu_selesai"
                            className="form-control"
                            required
                          />
                        </Modal>

                        <Modal
                          title="Edit Tanggal"
                          okText="Close"
                          width={600}
                          style={{
                            top: 100,
                          }}
                          visible={modalDate}
                          onOk={() => setModalDate(false)}
                          onCancel={() => setModalDate(false)}
                          footer={[
                            <Button
                              key="back"
                              onClick={() => setModalDate(false)}
                            >
                              Cancel
                            </Button>,
                            <Button
                              key="link"
                              type="primary"
                              className="ml-2"
                              onClick={() => editDate()}
                            >
                              Simpan
                            </Button>,
                          ]}
                        >
                          <DatePicker
                            multiple={false}
                            format={dateFormat}
                            placeholder="Pilih Tanggal"
                            name="tanggal"
                            onChange={onChangeDate}
                            style={{
                              backgroundColor: "white",
                              height: "47px",
                              width: "520px",
                              borderRadius: "5px",
                              fontSize: "14px",
                              padding: "3px 10px",
                            }}
                          />
                        </Modal>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Adminfooter />
        </div>
      </div>
    </Fragment>
  );
}
