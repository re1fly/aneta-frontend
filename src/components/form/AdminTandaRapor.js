import React from "react";

export const FormTandaRapor = (props) => {
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
                                      className="p-4"
                                      method="POST">
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Kepala Sekolah
                                                </label>
                                                <input
                                                    defaultValue={props.kepalaSekolah}
                                                    name="nama_kepsek"
                                                    type="text"
                                                    className="form-control"
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
                                                    name="tahun_akademik"
                                                    className="form-control"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.x_academic_year_id} disabled selected>
                                                        {props.academic_year}
                                                    </option>
                                                    {/*{getTahunAkademik.map(data => (*/}
                                                    {/*    <>*/}
                                                    {/*        <option value={data.id}>{data.academic_year}</option>*/}
                                                    {/*    </>*/}
                                                    {/*))}*/}
                                                    {props.selectAcademicYear}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tempat Tanggal
                                                </label>
                                                <input
                                                    type="text"
                                                    defaultValue={props.tempat_tanggal}
                                                    name="address_rapor"
                                                    className="form-control"
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {!disabledButton ?
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <button
                                                    className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                                    type="submit"
                                                >
                                                    Simpan
                                                </button>
                                            </div>
                                        </div>
                                        : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}