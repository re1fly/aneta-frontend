import {Button, Card, DatePicker, Divider, Tooltip, Upload} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import React from "react";

const ButtonFormOrtu = (props) => {
    return (
        <>
            <Divider>
                <Tooltip title="Tambahkan Orang Tua">
                    <Button style={{
                        marginTop: 10,
                        width: '50px',
                        height: '50px',
                    }}
                            onClick={props.viewFormOrtu}
                            size='large' type="primary" shape="circle"
                            icon={<UserAddOutlined/>}/>
                </Tooltip>
            </Divider>
        </>
    )
}

export const DataFormSiswaCreate = (props) => {
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
                        <form id="student_form"
                              onSubmit={props.submit}
                              method="POST">
                            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                                    <i
                                        onClick={() => props.setView}
                                        className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                                    ></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        Tambah Data Siswa & Orang Tua
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <div className="row">
                                        <div className="col-lg-12 mb-5">
                                            <div className="d-flex justify-content-center">
                                                <Card className="bg-lightblue" style={{width: 157}}>
                                                    {/*<ImgCrop rotate>*/}
                                                    {/*    <Upload*/}
                                                    {/*        className="avatar-uploader"*/}
                                                    {/*        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                                                    {/*        listType="picture-card"*/}
                                                    {/*        fileList={fileList}*/}
                                                    {/*        onChange={onChange}*/}
                                                    {/*        onPreview={onPreview}*/}
                                                    {/*    >*/}
                                                    {/*        {fileList.length < 1 && <PlusOutlined/>}*/}
                                                    {/*    </Upload>*/}
                                                    {/*</ImgCrop>*/}
                                                </Card>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NISN
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nisn_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Siswa
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nama_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kelas
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="idclass_siswa"
                                                    required
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Kelas
                                                    </option>
                                                    {props.selectKelas}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tempat Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="tempatlahir_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tanggal Lahir
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="tanggallahir_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No. HP
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="hp_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Provinsi
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="provinsi_siswa"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idProvSiswa} selected disabled hidden>
                                                        {props.provSiswa}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kota
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kota_siswa"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idKotaSiswa} selected disabled hidden>
                                                        {props.kotaSiswa}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kecamatan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kecamatan_siswa"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idKecSiswa} selected disabled hidden>
                                                        {props.kecSiswa}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kelurahan
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kelurahan_siswa"
                                                    required
                                                    disabled={props.isDisabled}
                                                >
                                                    <option value={props.idKelurahanSiswa} selected disabled hidden>
                                                        {props.kelurahanSiswa}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">
                                                Alamat
                                            </label>
                                            <textarea
                                                className="form-control mb-0 p-3 bg-greylight lh-16"
                                                rows="5"
                                                placeholder="Isi alamat detail anda..."
                                                name="alamat_siswa"
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                    {props.formOrtu ? <DataFormOrangtua setView={props.setView}/> : <ButtonFormOrtu  viewFormOrtu={props.viewFormOrtu}/>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

const DataFormOrangtua = (props) => {
    return (
        <>
            <h1 className="mt-5 mb-4">Form Orang Tua</h1>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Nama Orang Tua / Wali
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="nama_ortu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            NIK
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="nik_ortu"
                            required
                        />
                    </div>
                </div>

            </div>
            <div className="row">

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Profesi
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="profesi_ortu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Rata-rata Penghasilan Per-bulan
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="penghasilan_ortu"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Keterangan Orang Tua
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="keterangan_ortu"
                            required
                        >
                            <option value="" selected disabled>
                                Pilih Keterangan Ortu
                            </option>
                            <option value="1">
                                Ayah
                            </option>
                            <option value="2">
                                Ibu
                            </option>
                            <option value="3">
                                Wali Orang Tua
                            </option>
                        </select>
                    </div>
                </div>


            </div>


            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tempat Lahir
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="tempatlahir_ortu"
                            required
                        />
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tahun Lahir Orang Tua
                        </label>
                        <DatePicker
                            className="form-control"
                            picker="year"
                            placeholder="Pilih Tahun"
                            name="tahunlahir_ortu"
                            required
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name="email_ortu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            No. HP
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="hp_ortu"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Provinsi
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="provinsi_ortu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idProvSiswa} selected disabled hidden>
                                {props.provSiswa}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kota
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kota_ortu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKotaSiswa} selected disabled hidden>
                                {props.kotaSiswa}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kecamatan
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kecamatan_ortu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKecSiswa} selected disabled hidden>
                                {props.kecSiswa}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kelurahan
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kelurahan_ortu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKelurahanSiswa} selected disabled hidden>
                                {props.kelurahanSiswa}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-12 mb-3">
                    <label className="mont-font fw-600 font-xsss">
                        Alamat
                    </label>
                    <textarea
                        className="form-control mb-0 p-3 bg-greylight lh-16"
                        rows="5"
                        placeholder="Isi alamat detail anda..."
                        name="alamat_ortu"
                        required
                    ></textarea>
                </div>

                <div className="col-lg-12">
                    <button
                        className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        type="submit"
                    >
                        Simpan
                    </button>
                    <a
                        onClick={props.setView}
                        className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                    >
                        Kembali
                    </a>
                </div>
            </div>
        </>
    )
        ;
};