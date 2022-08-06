import React from "react";

export const FormKkmPelajaran = (props) => {
    let disabledButton = props.isDisabled;
    let disableEditPelajaran = props.isDisableFormPelajaran
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
                                                    Mata Pelajaran
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="mata_pelajaran"
                                                    required
                                                    disabled={disableEditPelajaran ? true : props.isDisabled}
                                                >
                                                    <option value={props.mataPelajaran} selected disabled>
                                                        {props.mataPelajaran == null ? "Pilih Mata Pelajaran" : props.mataPelajaran}
                                                    </option>
                                                    {props.selectPelajaran}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tahun Akademik / Semester
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="ta_semester"
                                                    required
                                                    disabled
                                                >
                                                    <option value={props.idTa_semester} selected disabled hidden>
                                                        {props.ta_semester}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tingkat Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="tingkat_kelas"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.tingkatKelas} selected disabled>
                                                        {props.tingkatKelas == null ? "Pilih Tingkat Kelas" : props.tingkatKelas}
                                                    </option>
                                                    <option value={1}>
                                                        Kelas 1
                                                    </option>
                                                    <option value={2}>
                                                        Kelas 2
                                                    </option>
                                                    <option value={3}>
                                                        Kelas 3
                                                    </option>
                                                    <option value={4}>
                                                        Kelas 4
                                                    </option>
                                                    <option value={5}>
                                                        Kelas 5
                                                    </option>
                                                    <option value={6}>
                                                        Kelas 6
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nilai KKM
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nilai_kkm'
                                                    className="form-control"
                                                    defaultValue={props.nilaiKkm}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
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
}