import { useEffect, useState } from "react"
import moment from "moment";
import { Button, Modal, TimePicker, notification } from 'antd'

import DatePicker from "react-multi-date-picker"
import axios from "axios";
import {insert_jadwal_pelajaran_time, url_by_institute} from "../../api/reference";
import { useSelector } from "react-redux";
import { pageLoad } from "../misc/loadPage";

export const FormAdminJadwalPelajaran = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDate, setModalDate] = useState(false);
    const [modalTime, setModalTime] = useState(false);
    const [values, setValues] = useState([]);
    const [refreshState, setRefreshState] = useState(false)

    const [time, setTime] = useState([]);
    const [idTime, setIdTime] = useState('');
    const [idTanggal, setIdTanggal] = useState('');

    const dataDateTime = useSelector(state => state?.dataDateTime);
    const getDateTime = dataDateTime.DateTime
    // console.log(JSON.stringify(getDateTime, null, 2));

    const format = 'HH:mm:ss';
    const dateFormat = 'YYYY-MM-DD';

    const onChangeTime = (time, timeString) => {
        console.log(time, timeString);
        setTime(timeString)
    };

    const insertTime = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": insert_jadwal_pelajaran_time,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "insert_jadwal_pelajaran_time",
                        "type": "json",
                        "value": {
                            "id_schedule_date": idTanggal,
                            "time": time
                        }
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const dataRes = JSON.parse(response.data.variables[2].value)
            const code = dataRes.message
            console.log(code);
            if (code == "Success insert time") {
                setModalVisible(false)
                setRefreshState(true);
                // pageLoad()
                notification.success({
                    message: 'Sukses',
                    description: 'Jam berhasil ditambahkan.',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
        })
    }

    const editDate = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": insert_jadwal_pelajaran_time,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "insert_jadwal_pelajaran_time",
                        "type": "json",
                        "value": {
                            "id_schedule_date": idTanggal,
                            "time": time
                        }
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const dataRes = JSON.parse(response.data.variables[2].value)
            const code = dataRes.message
            console.log(code);
            if (code == "Success insert time") {
                setModalVisible(false)
                setRefreshState(true);
                pageLoad()
                notification.success({
                    message: 'Sukses',
                    description: 'Jam berhasil ditambahkan.',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
        })
    }

    const editTime = () => {
        axios.post(url_by_institute,
            {
                "processDefinitionId": insert_jadwal_pelajaran_time,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "insert_jadwal_pelajaran_time",
                        "type": "json",
                        "value": {
                            "id_schedule_date": idTanggal,
                            "time": time
                        }
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const dataRes = JSON.parse(response.data.variables[2].value)
            const code = dataRes.message
            console.log(code);
            if (code == "Success insert time") {
                setModalVisible(false)
                setRefreshState(true);
                pageLoad()
                notification.success({
                    message: 'Sukses',
                    description: 'Jam berhasil ditambahkan.',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Harap isi semua field',
                    placement: 'top'
                })
            }
        })
    }

    const checkInsertTime = (id) => {
        console.log(id);
        setModalVisible(true);
        setIdTanggal(id);
    }
    const checkEditDate = (id) => {
        console.log(id);
        setModalDate(true);
        setIdTanggal(id);
    }
    const checkEditTime = (id) => {
        console.log(id);
        setModalTime(true);
        setIdTime(id);
    }

    const TableTime = () => {
        return (
            <div className="mt-3 mb-5">
                <label className="mont-font fw-600 font-xsss">
                    Tanggal Pertemuan
                </label>

                <table className="table table-bordered mt-4" width="100%">
                    <tr>
                        <th className="text-center px-2" rowSpan={2}>Tanggal</th>
                        <th className="text-center px-2" rowSpan={2}>Edit Tanggal</th>
                        <th className="text-center" rowSpan={2}>Tambah Jam</th>
                        <th className="text-center" width="20%" colSpan={1}>Jam</th>
                        <th className="text-center" rowSpan={2}>Edit Jam</th>
                        <th className="text-center" width="20%" colSpan={1}>Jam</th>
                        <th className="text-center" rowSpan={2}>Edit Jam</th>
                    </tr>

                    <tr>
                        {/* <td className="text-center strong px-2">Jam Mulai</td>
                        <td className="text-center strong px-2">Jam Selesai</td>

                        <td className="text-center strong px-2">Jam Mulai</td>
                        <td className="text-center strong px-2">Jam Selesai</td> */}
                    </tr>

                    {getDateTime?.map((date, index) => {
                        return (
                            <tr>
                                <td className="text-center" value={date?.id_date}>{date?.tanggal}</td>
                                <td className="text-center"><Button disabled={props.title == "View Jadwal Pelajaran" ? true : false} id={date?.id_date} className="rounded-xl ml-4 mr-2" onClick={() => { checkEditDate(date?.id_date) }}><i className="feather-calendar"></i></Button></td>
                                <td className="text-center"><Button disabled={props.title == "View Jadwal Pelajaran" ? true : false} id={date?.id_date} className="rounded-xl ml-4 mr-2" onClick={() => { checkInsertTime(date?.id_date) }}><i className="feather-clock"></i></Button></td>
                                <td className="text-center">{date?.data_jam[0]?.time_start} - {date?.data_jam[0]?.time_end}</td>
                                {/* <td className="text-center">{date?.data_jam[0]?.time_end}</td> */}
                                <td className="text-center"><Button disabled={props.title == "View Jadwal Pelajaran" ? true : false} id={date?.id_date} className="rounded-xl ml-4 mr-2" onClick={() => { checkEditTime(date?.id_date) }}><i className="feather-clock"></i></Button></td>
                                <td className="text-center">{date?.data_jam[1]?.time_start} - {date?.data_jam[1]?.time_end}</td>
                                {/* <td className="text-center">{date?.data_jam[1]?.time_end}</td> */}
                                <td className="text-center"><Button disabled={props.title == "View Jadwal Pelajaran" ? true : false} id={date?.id_date} className="rounded-xl ml-4 mr-2" onClick={() => { checkEditTime(date?.id_date) }}><i className="feather-clock"></i></Button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }

    let disabledButton = props.isDisabled;
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="flex-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i onClick={props.setView} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form id="mataPelajaran_form"
                                    onSubmit={props.submit}
                                    method="POST">
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
                                                        {props.hari == null ? "Pilih Hari" : props.hari.charAt(0).toUpperCase() + props.hari.slice(1)}
                                                    </option>
                                                    <option value="senin">
                                                        Senin
                                                    </option>
                                                    <option value="selasa">
                                                        Selasa
                                                    </option>
                                                    <option value="rabu">
                                                        Rabu
                                                    </option>
                                                    <option value="kamis">
                                                        Kamis
                                                    </option>
                                                    <option value="jumat">
                                                        Jumat
                                                    </option>
                                                    <option value="sabtu">
                                                        Sabtu
                                                    </option>
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
                                                    disabled={props.disabledTanggal}
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
                                                        padding: "3px 10px"
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
                                                    <option value={props.idPelajaran} selected disabled>
                                                        {props.namaPelajaran == null ? "Pilih Mata Pelajaran" : props.namaPelajaran}
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
                                                    <option value={props.idPengajar} selected disabled>
                                                        {props.namaPengajar == null ? "Pilih Guru/Tenaga Pengajar" : props.namaPengajar}
                                                    </option>
                                                    {props.selectGuru}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {props.tanggalPertemuan == true ?

                                        <TableTime />

                                        : null}


                                    <div className="row">
                                        {!disabledButton ? <div className="col-lg-12">
                                            <button
                                                className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                type="submit"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={props.setView}

                                                className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block border-none"
                                            >
                                                Batal
                                            </button>
                                        </div> : null}
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
                                            <Button key="back" onClick={() => setModalVisible(false)}>
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
                                        <TimePicker.RangePicker onChange={onChangeTime}
                                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                            name='waktu_selesai'
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
                                            <Button key="back" onClick={() => setModalTime(false)}>
                                                Cancel
                                            </Button>,
                                            <Button
                                                key="link"
                                                type="primary"
                                                className="ml-2"
                                                // onClick={() => setModalVisible(false)}
                                                // onClick={() => insertTime()}
                                            >
                                                Simpan
                                            </Button>,
                                        ]}
                                    >
                                        <TimePicker.RangePicker onChange={onChangeTime}
                                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                            name='waktu_selesai'
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
                                            <Button key="back" onClick={() => setModalDate(false)}>
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
                                            onChange={setValues}
                                            style={{
                                                backgroundColor: "white",
                                                height: "47px",
                                                width: "520px",
                                                borderRadius: "5px",
                                                fontSize: "14px",
                                                padding: "3px 10px"
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
    );
};