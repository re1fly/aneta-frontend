import React from "react";
import { Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";

export const FormAdminPelajaran = (props) => {
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
                                    <div className="row justify-content-center">
                                        <div className="col-lg-4 text-center">
                                            <figure className="avatar mr-auto mb-4 mt-2 w100">
                                                <Card style={{ width: 200 }}>
                                                    <ImgCrop rotate>
                                                        <Upload
                                                            name="image_siswa"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        // onPreview={onPreview}
                                                        >
                                                            <PlusOutlined />
                                                        </Upload>
                                                    </ImgCrop>
                                                </Card>
                                            </figure>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Pelajaran
                                                </label>
                                                <input
                                                    type="text"
                                                    name='nama_pelajaran'
                                                    className="form-control"
                                                    defaultValue={props.namaPelajaran}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kode Pelajaran
                                                </label>
                                                <input
                                                    type="text"
                                                    name='kode_pelajaran'
                                                    className="form-control"
                                                    defaultValue={props.kode}
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
                                                    Kelompok
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kelompok"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idKelompok} selected disabled>
                                                        {props.kelompok == null ? "Pilih Kelompok Belajar" : props.kelompok}
                                                    </option>
                                                    {props.selectKelompokBelajar}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No urut Rapor
                                                </label>
                                                <input
                                                    type="text"
                                                    name='noUrut_rapor'
                                                    className="form-control"
                                                    defaultValue={props.kode}
                                                    required
                                                    disabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">


                                        <div className="col-lg-12 mb-3">
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
                                                    <option value={props.status} selected disabled>
                                                        {props.status == null ? "Pilih Status" : props.status}
                                                    </option>
                                                    <option value="true">
                                                        Aktif
                                                    </option>
                                                    <option value="false">
                                                        Tidak Aktif
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

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