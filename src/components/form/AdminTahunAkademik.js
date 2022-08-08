import React, { memo } from "react";
import { DatePicker, Input, PageHeader, Select, Button } from "antd";
import moment from 'moment';
import { RequiredTooltip } from "../misc/RequiredTooltip";

export const FormAdminTahunAkademik = (props) => {
    let disabledButton = props.isDisabled;
    const dateFormat = 'YYYY-MM-DD';

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
                                                    Tahun Akademik <RequiredTooltip />
                                                </label>
                                                <DatePicker
                                                    className="form-control"
                                                    picker="year"
                                                    placeholder="Pilih Tahun Akademik"
                                                    defaultValue={ props.location == "edit" || props.location == "detail" ? moment(props.tahunAkademik,'YYYY') : '' }
                                                    name="tahun_akademik"
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Semester <RequiredTooltip />
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="semester"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.semester} selected disabled>
                                                        {props.semester}
                                                    </option>
                                                    <option value="1">
                                                        1
                                                    </option>
                                                    <option value="2">
                                                        2
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Periode Awal <RequiredTooltip />
                                                </label>
                                                    <DatePicker
                                                        className="form-control"
                                                        format={dateFormat}
                                                        placeholder="Pilih Periode Awal"
                                                        name="periode_awal"
                                                        defaultValue={ props.location == "edit" || props.location == "detail" ? moment(props.periodeAwal,'YYYY-MM-DD') : '' }
                                                        disabled={props.isDisabled}
                                                    />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Periode AKhir <RequiredTooltip />
                                                </label>
                                                <DatePicker
                                                    className="form-control"
                                                    format={dateFormat}
                                                    placeholder="Pilih Periode Akhir"
                                                    name="periode_akhir"
                                                    defaultValue={ props.location == "edit" || props.location == "detail" ? moment(props.periodeAkhir,'YYYY-MM-DD') : '' }
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tahun Akademik Aktif <RequiredTooltip />
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="tahunAkademik_aktif"
                                                    required
                                                    disabled={props.isDisabledStatus}
                                                >
                                                    <option value={props.tahunAkademikAktif == "T" || props.getTahunAkademik == null ? "T" : "F"} selected disabled>
                                                        {props.tahunAkademikAktif == "T" || props.getTahunAkademik == null ? "Aktif" : "Tidak Aktif"}
                                                    </option>
                                                    {/* {props.getTahunAkademik != null ? <option className="form-control" value="F">Tidak Aktif</option>
                                                    : <option className="form-control" value="T">Aktif</option>} */}
                                                    {/* <option value="T">
                                                        Aktif
                                                    </option>
                                                    <option value="F">
                                                        Tidak Aktif
                                                    </option> */}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jumlah Murid <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="number"
                                                    name='jumlah_murid'
                                                    className="form-control"
                                                    defaultValue={props.jumlahMurid}
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
                                                    Jumlah Guru <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="number"
                                                    name='jumlah_guru'
                                                    className="form-control"
                                                    defaultValue={props.jumlahGuru}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jumlah Staff <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="number"
                                                    name='jumlah_staff'
                                                    className="form-control"
                                                    maxLength={4}
                                                    defaultValue={props.jumlahStaff}
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
            </div >
        </div >
    );
}