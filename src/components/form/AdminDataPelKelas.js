import React from "react";

export const FormAdminDataPelKelas = (props) => {
    let disabledButton = props.isDisabled;

    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i
                                    onClick={props.isViewTable}
                                    className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                                ></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title} Data Pelajaran Kelas
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0">
                                <form
                                    onSubmit={props.submit}
                                    method="POST"
                                >
                                    <div className="row">
                                        <div className="col-lg-3 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                   Tingkat Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    name="tingkat_kelas"
                                                    required
                                                    id="subClass_datapelajaran"
                                                    disabled={props.isDisableForm}
                                                    onChange={props.onChangeTingkatKelas}
                                                    value={props.selectedTingkatKelas}
                                                >
                                                    <option value={props.idKelas} selected disabled hidden>
                                                        {props.namaKelas}
                                                    </option>
                                                    {props.selectKelas}
                                                </select>
                                            </div>
                                        </div>

                                            <div className="col-lg-3 mb-3">
                                                <div className="form-group">
                                                    <label className="mont-font fw-600 font-xsss">
                                                        Sub Kelas
                                                    </label>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default select example"
                                                        name="sub_kelas"
                                                        required
                                                        disabled={props.isDisableForm}
                                                    >
                                                        <option value={props.idSubKelas} selected disabled hidden>
                                                            {props.namaSubKelas}
                                                        </option>
                                                        {props.selectSubKelas}
                                                        {props.allSubClass}
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
                                                    disabled={props.isDisableForm}
                                                >
                                                    <option value={props.idMapel} selected disabled hidden>
                                                        {props.namaMapel}
                                                    </option>
                                                    {props.selectMapel}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tahun Akademik - Semester
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="thn_akademik"
                                                    required
                                                    // disabled={props.isDisabled}
                                                    disabled
                                                >
                                                    {/*<option value={props.idThAkademik} selected disabled hidden>*/}
                                                    {/*    {props.thAkademik} / Semester {props.semester}*/}
                                                    {/*</option>*/}
                                                    {/*{props.selectThAkademik}*/}
                                                    <option value={props.idThAkademik} selected disabled hidden>
                                                        {props.selectThAkademik}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Status
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="status"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.valStatus} selected disabled hidden>
                                                        {props.status}
                                                    </option>
                                                    <option value="true">Aktif</option>
                                                    <option value="false">Nonaktif</option>
                                                </select>
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
                                            <a
                                                onClick={props.isViewTable}
                                                className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                            >
                                                Batal
                                            </a>
                                        </div> : null}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}