import React from "react";

export const FormAdminKelas = (props) => {
    let disabledButton = props.isDisabled;
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                <i onClick={props.setView}
                                   className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                                <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                    {props.title}
                                </h4>
                            </div>
                            <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                                <form onSubmit={props.submit}
                                      method="POST">
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tingkat Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="nama_kelas"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idTingkatKelas} selected disabled hidden>
                                                        {props.namaKelas}
                                                    </option>
                                                    {props.selectTingkatKelas}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Sub Kelas
                                                </label>
                                                <input type="text"
                                                       name="sub_kelas"
                                                       className="form-control"
                                                       defaultValue={props.subKelas}
                                                       required
                                                       disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Lokasi Kelas
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lokasi_kelas"
                                                    className="form-control"
                                                    defaultValue={props.lokasiKelas}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tahun Akademik
                                                </label>

                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="tahun_akademik"
                                                    required
                                                    disabled
                                                >
                                                    <option value={props.idTahunAkademik} selected disabled hidden>
                                                        {props.tahunAkademik}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Wali Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="wali_kelas"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idWaliKelas} selected disabled hidden>
                                                        {props.waliKelas}
                                                    </option>
                                                    {props.selectWaliKelas}
                                                </select>
                                            </div>
                                        </div>

                                        {/*<div className="col-lg-6 mb-3">*/}
                                        {/*    <div className="form-group">*/}
                                        {/*        <label className="mont-font fw-600 font-xsss">*/}
                                        {/*           Gambar / Icon Kelas*/}
                                        {/*        </label>*/}
                                        {/*        <input className="form-control" type="file" name="gambar_kelas" required/>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {!disabledButton ? <div className="col-lg-12">
                                            <button
                                                className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                type="submit"
                                            >
                                                Simpan
                                            </button>
                                            <button
                                                onClick={props.setView}
                                                className="ml-2 bg-lightblue border-0 text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
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