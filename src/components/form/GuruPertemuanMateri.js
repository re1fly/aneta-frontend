import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
import { GetIdJam, GetMateri, GetTanggalPertemuan, GetWaktuPertemuan } from "../../redux/Action";

export const FormCreatePertemuanMateri = (props) => {

    const dispatch = useDispatch();
    const dataPertemuanMateri = useSelector(state => state.pertemuanMateri);

    const materi = dataPertemuanMateri?.DataMateri
    const tanggal = dataPertemuanMateri?.DataTanggal
    const jam = dataPertemuanMateri?.DataJam

    const [idMateri, setIdMateri] = useState('');
    const [idTanggal, setIdTanggal] = useState('');
    const [idJam, setIdJam] = useState([]);

    useEffect(() => {
        dispatch(GetMateri());
        if (idMateri != '') {
            dispatch(GetTanggalPertemuan(idMateri));
        }
        if (idTanggal != '') {
            dispatch(GetWaktuPertemuan(idTanggal));
        }
        // if (idJam != '') {
        //     dispatch(GetIdJam(idJam));
        // }
    }, [idMateri, idTanggal])

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
    };

    let disabledButton = props.disabledButton;
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
                                                    Nama Materi
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_materi"
                                                    required
                                                    disabled={props.isDisabled}
                                                    onChange={(event) => {
                                                        if (idMateri != '') {
                                                            if (event.currentTarget.value != idMateri) {
                                                                dispatch({ type: "SET_MATERITANGGAL", value: [] });
                                                                dispatch({ type: "SET_MATERIJAM", value: [] });
                                                                setIdTanggal('');
                                                                setIdJam('');
                                                            }
                                                        }
                                                        setIdMateri(event.currentTarget.value);
                                                    }}
                                                >
                                                    <option value="" selected={idMateri == '' ? false : true}>
                                                        {props.namaMateri == undefined ? "Pilih Materi" : props.namaMateri}
                                                    </option>
                                                    {materi.map((data, i) => {
                                                        return (
                                                            <option value={data.id}
                                                            // selected={data.id != idProv ? false : true}
                                                            >
                                                                {`${data.tittle} - ${data.class_type}/${data.sub_class}`}
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
                                                    disabled={props.titleDisable}
                                                    defaultValue={props.namaPertemuan}
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
                                                    <option value="" selected={idTanggal == '' ? false : true}>
                                                        {props.tanggalPertemuan == undefined ? "Pilih Tanggal" : props.tanggalPertemuan}
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
                                                    placeholder={props.jam == undefined ? "Pilih Jam" : props.jam}
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