import { TimePicker } from "antd";
import moment from "moment";

export const FormAdminJadwalPelajaran = (props) => {

    const onChange = (time, timeString) => {
        console.log(time, timeString);
    };

    const format = 'HH:mm:ss';

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
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
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

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Waktu Mulai
                                                </label>
                                                {props.selectTimeStart}
                                                {/* <TimePicker onChange={onChange}
                                                    defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                                                    name='waktu_mulai'
                                                    className="form-control"
                                                    required
                                                    defaultValue={moment(props.waktuMulai, format)}
                                                    format={format}
                                                    disabled={props.isDisabled}
                                                    /> */}
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Waktu Selesai
                                                </label>
                                                {props.selectTimeEnd}
                                                {/* <TimePicker onChange={onChange}
                                                    defaultOpenValue={moment('00:00', 'HH:mm')}
                                                    name='waktu_selesai'
                                                    className="form-control"
                                                    required
                                                    disabled={props.isDisabled}
                                                    /> */}
                                            </div>
                                        </div>
                                    </div>

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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};