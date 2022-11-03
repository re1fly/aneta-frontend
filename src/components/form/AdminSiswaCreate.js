import {Button, Card, DatePicker, Divider, Image, Tooltip, Upload} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {RequiredTooltip} from "../misc/RequiredTooltip";
import DefaultAvatar from '../../assets/images/user-default.png';
import UploadImage from "../misc/UploadImage";

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
                                        onClick={props.setView}
                                        className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"
                                    ></i>
                                    <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                                        {props.title}
                                    </h4>
                                </div>
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <h1 className="mb-4">Form Siswa</h1>
                                    <div className="row">
                                        <div className="col-lg-12 mb-5">
                                            <div className="d-flex justify-content-center">
                                                <UploadImage
                                                    imageUrl={props.imageUrl}
                                                    isDisabled={props.isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NISN <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nisn_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NIPD <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nipd_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Siswa <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nama_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jenis Kelamin <RequiredTooltip/>
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="jk_siswa"
                                                    required
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Jenis Kelamin
                                                    </option>
                                                    <option value="L">
                                                        Laki - Laki
                                                    </option>
                                                    <option value="P">
                                                        Perempuan
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kewarganegaraan
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="kewarganegaraan_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    NIK <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nik_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Agama <RequiredTooltip/>
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="agama_siswa"
                                                    required
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Agama
                                                    </option>
                                                    <option value="islam">
                                                        Islam
                                                    </option>
                                                    <option value="protestan">
                                                        Protestan
                                                    </option>
                                                    <option value="katolik">
                                                        Katolik
                                                    </option>
                                                    <option value="hindu">
                                                        Hindu
                                                    </option>
                                                    <option value="buddha">
                                                        Buddha
                                                    </option>
                                                    <option value="khonghucu">
                                                        Khonghucu
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
                                                    name="tempatlahir_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tanggal Lahir <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="tanggallahir_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No. Registrasi Akta Lahir
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="noakta_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Anak Ke-Berapa
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="noanak_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jumlah Saudara Kandung
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="jumlahsaudara_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jarak Rumah ke Sekolah (km)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="jarakrumah_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Lintang
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="lintang_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Bujur
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="bujur_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tinggi Badan (cm)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="tinggi_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Berat Badan(kg)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="berat_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-4 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Lingkar Kepala(cm)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="lingkarkepala_siswa"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Email <RequiredTooltip/>
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Provinsi <RequiredTooltip/>
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
                                                    Kota <RequiredTooltip/>
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
                                                    Kecamatan <RequiredTooltip/>
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
                                                    Kelurahan <RequiredTooltip/>
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

                                        <div className="col-lg-5 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Dusun
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="dusun_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    RT
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="rt_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-2 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    RW
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="rw_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-3 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kode POS
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="kodepos_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">
                                                Alamat <RequiredTooltip/>
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

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Jenis Tinggal <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="jenistinggal_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Alat Transportasi <RequiredTooltip/>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="transportasi_siswa"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    SKHUN
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="skhun_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Penerima KPS
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kps_siswa"
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Jenis KPS
                                                    </option>
                                                    <option value={true}>
                                                        Iya
                                                    </option>
                                                    <option value={false}>
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No. KPS
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nokps_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kelas <RequiredTooltip/>
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

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor Peserta Ujian Nasional
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nopersertaun_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nomor Seri Ijazah
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="noseriijazah_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Penerima KIP
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kip_siswa"
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Jenis
                                                    </option>
                                                    <option value={true}>
                                                        Iya
                                                    </option>
                                                    <option value={false}>
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No. KIP
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nokip_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama di KIP
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="namakip_siswa"
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Jenis
                                                    </option>
                                                    <option value={true}>
                                                        Iya
                                                    </option>
                                                    <option value={false}>
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No. KKS
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="nokks_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Sekolah Asal
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="sekolahasal_siswa"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kebutuhan Khusus
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="kebutuhankhusus_siswa"
                                                >
                                                    <option value="" selected disabled>
                                                        Pilih Jenis
                                                    </option>
                                                    <option value={true}>
                                                        Iya
                                                    </option>
                                                    <option value={false}>
                                                        Tidak
                                                    </option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>


                                    {<DataFormOrangtua setView={props.setView}
                                                       provSiswa="ACEH"
                                                       idProvSiswa="11"
                                                       kotaSiswa="KABUPATEN SIMEULUE"
                                                       idKotaSiswa="1101"
                                                       kecSiswa="TEUPAH SELATAN"
                                                       idKecSiswa="1101010"
                                                       kelurahanSiswa="LATIUNG"
                                                       idKelurahanSiswa="1101010001"
                                                       provAyah="ACEH"
                                                       idProvAyah="11"
                                                       kotaAyah="KABUPATEN SIMEULUE"
                                                       idKotaAyah="1101"
                                                       kecAyah="TEUPAH SELATAN"
                                                       idKecAyah="1101010"
                                                       kelurahanAyah="LATIUNG"
                                                       idKelurahanAyah="1101010001"
                                                       provIbu="ACEH"
                                                       idProvIbu="11"
                                                       kotaIbu="KABUPATEN SIMEULUE"
                                                       idKotaIbu="1101"
                                                       kecIbu="TEUPAH SELATAN"
                                                       idKecIbu="1101010"
                                                       kelurahanIbu="LATIUNG"
                                                       idKelurahanIbu="1101010001"
                                                       provWali="ACEH"
                                                       idProvWali="11"
                                                       kotaWali="KABUPATEN SIMEULUE"
                                                       idKotaWali="1101"
                                                       kecWali="TEUPAH SELATAN"
                                                       idKecWali="1101010"
                                                       kelurahanWali="LATIUNG"
                                                       idKelurahanWali="1101010001"
                                    />}
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
            <h1 className="mt-5">Form Orang Tua</h1>
            <h2 className="mt-5 mb-4">Data Ayah</h2>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Nama Ayah
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="nama_ayah"
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            NIK
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="nik_ayah"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Pekerjaan
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="pekerjaan_ayah"
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Penghasilan
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="penghasilan_ayah"
                        />
                    </div>
                </div>
            </div>

            {/* <div className="row">
                <div className="col-lg-12 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Keterangan Orang Tua <RequiredTooltip/>
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
            </div>*/}

            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tempat Lahir <RequiredTooltip/>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="tempatlahir_ayah"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tahun Lahir
                        </label>
                        <DatePicker
                            className="form-control"
                            picker="year"
                            placeholder="Pilih Tahun"
                            name="tahunlahir_ayah"
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Email <RequiredTooltip/>
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name="email_ayah"
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
                            name="hp_ayah"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Provinsi <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="provinsi_ayah"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idProvAyah} selected disabled hidden>
                                {props.provAyah}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kota <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kota_ayah"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKotaAyah} selected disabled hidden>
                                {props.kotaAyah}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kecamatan <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kecamatan_ayah"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKecAyah} selected disabled hidden>
                                {props.kecAyah}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kelurahan <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kelurahan_ayah"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKelurahanAyah} selected disabled hidden>
                                {props.kelurahanAyah}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-12 mb-3">
                    <label className="mont-font fw-600 font-xsss">
                        Alamat <RequiredTooltip/>
                    </label>
                    <textarea
                        className="form-control mb-0 p-3 bg-greylight lh-16"
                        rows="5"
                        placeholder="Isi alamat detail anda..."
                        name="alamat_ayah"
                        required
                    ></textarea>
                </div>
            </div>


            <h2 className="mb-4">Data Ibu</h2>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Nama Ibu <RequiredTooltip/>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="nama_ibu"
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
                            type="number"
                            className="form-control"
                            name="nik_ibu"
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Pekerjaan <RequiredTooltip/>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="pekerjaan_ibu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Penghasilan <RequiredTooltip/>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="penghasilan_ibu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tempat Lahir <RequiredTooltip/>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="tempatlahir_ibu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tahun Lahir <RequiredTooltip/>
                        </label>
                        <DatePicker
                            className="form-control"
                            picker="year"
                            placeholder="Pilih Tahun"
                            name="tahunlahir_ibu"
                            required
                        />
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Email <RequiredTooltip/>
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name="email_ibu"
                            required
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            No. HP <RequiredTooltip/>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="hp_ibu"
                            required
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Provinsi <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="provinsi_ibu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idProvIbu} selected disabled hidden>
                                {props.provIbu}
                            </option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kota <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kota_ibu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKotaIbu} selected disabled hidden>
                                {props.kotaIbu}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kecamatan <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kecamatan_ibu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKecIbu} selected disabled hidden>
                                {props.kecIbu}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Kelurahan <RequiredTooltip/>
                        </label>
                        <select
                            className="form-control"
                            aria-label="Default select example"
                            name="kelurahan_ibu"
                            required
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKelurahanIbu} selected disabled hidden>
                                {props.kelurahanIbu}
                            </option>
                        </select>
                    </div>
                </div>

                <div className="col-lg-12 mb-3">
                    <label className="mont-font fw-600 font-xsss">
                        Alamat <RequiredTooltip/>
                    </label>
                    <textarea
                        className="form-control mb-0 p-3 bg-greylight lh-16"
                        rows="5"
                        placeholder="Isi alamat detail anda..."
                        name="alamat_ibu"
                        required
                    ></textarea>
                </div>
            </div>

            <h2 className="mb-4">Data Wali</h2>
            <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Nama Wali
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="nama_wali"
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            NIK
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="nik_wali"
                        />
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Pekerjaan
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="pekerjaan_wali"
                        />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Penghasilan
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="penghasilan_wali"
                        />
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tempat Lahir
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="tempatlahir_wali"
                        />
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Tahun Lahir
                        </label>
                        <DatePicker
                            className="form-control"
                            picker="year"
                            placeholder="Pilih Tahun"
                            name="tahunlahir_wali"
                        />
                    </div>
                </div>

                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            name="email_wali"
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
                            name="hp_wali"
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
                            name="provinsi_wali"
                            disabled={props.isDisabled}
                        >
                            <option value={props.idProvWali} selected disabled hidden>
                                {props.provWali}
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
                            name="kota_wali"
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKotaWali} selected disabled hidden>
                                {props.kotaWali}
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
                            name="kecamatan_wali"
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKecWali} selected disabled hidden>
                                {props.kecWali}
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
                            name="kelurahan_wali"
                            disabled={props.isDisabled}
                        >
                            <option value={props.idKelurahanWali} selected disabled hidden>
                                {props.kelurahanWali}
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
                        name="alamat_wali"
                    ></textarea>
                </div>
            </div>

            <div className="col-lg-12 mt-5">
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
            {/*  <div className="row">
                <div className="col-lg-6 mb-3">
                    <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                            Provinsi <RequiredTooltip/>
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
                            Kota <RequiredTooltip/>
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
                            Kecamatan <RequiredTooltip/>
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
                            Kelurahan <RequiredTooltip/>
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
                        Alamat <RequiredTooltip/>
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
            </div>*/}
        </>
    )
        ;
};