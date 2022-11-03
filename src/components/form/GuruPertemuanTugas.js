import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { GetMateri, GetTanggalPertemuan, GetTanggalPertemuanTugas, GetTugas, GetWaktuPertemuan, GetWaktuPertemuanTugas } from "../../redux/Action";

export const FormCreatePertemuanTugas = (props) => {

    const dispatch = useDispatch();
    const dataPertemuanTugas = useSelector(state => state.pertemuanTugas);

    const tugas = dataPertemuanTugas?.DataTugas
    const tanggal = dataPertemuanTugas?.DataTanggal
    const jam = dataPertemuanTugas?.DataJam

    const [idTugas, setIdTugas] = useState('');
    const [idTanggal, setIdTanggal] = useState('');
    const [idJam, setIdJam] = useState([]);
    // console.log(idJam);

    useEffect(() => {
        dispatch(GetTugas());
        if (idTugas != '') {
            dispatch(GetTanggalPertemuanTugas(idTugas));
        }
        if (idTanggal != '') {
            dispatch(GetWaktuPertemuanTugas(idTanggal));
        }
    }, [idTugas, idTanggal])

    const { Option } = Select;
    const children = [];

    children.push(
        <Option key="1">08:00 - 09:00</Option>,
        <Option key="2">09:00 - 10:00</Option>,
        <Option key="3">10:00 - 11:00</Option>,
        <Option key="3">13:00 - 14:00</Option>,
    );

    const handleChange = (id, e) => {
        setIdJam(id)
        localStorage.setItem("idJam", [id]);
    };

    let disabledButton = props.isDisabled;
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i onClick={props.setView} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form id="teacher_form"
                                    onSubmit={props.submit}
                                    method="POST">

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Tugas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_materi"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idTugas != '') {
                                                            if (event.currentTarget.value != idTugas) {
                                                                dispatch({ type: "SET_MATERITANGGAL", value: [] });
                                                                dispatch({ type: "SET_MATERIJAM", value: [] });
                                                                setIdTanggal('');
                                                                setIdJam('');
                                                            }
                                                        }
                                                        setIdTugas(event.currentTarget.value);
                                                    }}
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih tugas
                                                    </option>
                                                    {tugas.map((data, i) => {
                                                        return (
                                                            <option value={data.id}
                                                            // selected={data.id != idProv ? false : true}
                                                            >
                                                                {data.tittle}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Pertemuan
                                                </label>
                                                <input
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_pertemuan"
                                                    disabled={props.isDisabled}
                                                    required
                                                >
                                                </input>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tanggal Pertemuan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="tanggal_pertemuan"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idTanggal != '') {
                                                            if (event.currentTarget.value != idTanggal) {
                                                                dispatch({ type: "SET_MATERIJAM", value: [] });
                                                                setIdJam('');
                                                            }
                                                        }
                                                        setIdTanggal(event.currentTarget.value);
                                                    }}
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Tanggal
                                                    </option>
                                                    {tanggal.map((data, i) => {
                                                        return (
                                                            <option value={data.id}
                                                            // selected={data.id != idProv ? false : true}
                                                            >
                                                                {data.date}
                                                            </option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <input type="hidden" name="jam_pertemuan" value={idJam} />

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jam
                                                </label>
                                                <Select
                                                    className="pt-1 pb-1"
                                                    name="jam_pertemuan"
                                                    size="large"
                                                    mode="multiple"
                                                    allowClear
                                                    style={{ width: '100%', borderRadius: '0.25rem', color: '#495057', }}
                                                    placeholder="Pilih Jam"
                                                    // onChange={props.GetIdJam}
                                                    onChange={handleChange}
                                                    disabled={props.isDisabled}
                                                >
                                                    {jam.map((data, i) => {
                                                        return (
                                                            <Option value={data.id} key={data.id}
                                                            // selected={data.id != idProv ? false : true}
                                                            >
                                                                {`${data.time_start} - ${data.time_end}`}
                                                            </Option>
                                                        )
                                                    })}
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {!disabledButton ? <div className="col-lg-12">
                                            <button
                                                className="ml-2 bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}