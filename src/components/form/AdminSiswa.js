import React from "react";
import {Button, Card, DatePicker, Divider, Tooltip} from "antd";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import {PlusOutlined, UserAddOutlined} from "@ant-design/icons";
import {RequiredTooltip} from "../misc/RequiredTooltip";
import {FormDaerah} from "./FormDaerah.js";


// const ButtonFormOrtu = (props) => {
//     return (
//         <>
//             <Divider>
//                 <Tooltip title="Tambahkan Orang Tua">
//                     <Button
//                         style={{
//                             marginTop: 10,
//                             width: "50px",
//                             height: "50px",
//                         }}
//                         onClick={props.viewFormOrtu}
//                         size="large"
//                         type="primary"
//                         shape="circle"
//                         icon={<UserAddOutlined/>}
//                     />
//                 </Tooltip>
//             </Divider>
//         </>
//     );
// };

const DataFormOrangtua = (props) => {
    let disabledButton = props.isDisabled;
    return (
        <>
            <h1 className="pt-5 mb-5">Form Orang Tua</h1>
            <form id="parent_form" onSubmit={props.createOrtu} method="POST">
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
                            <label className="mont-font fw-600 font-xsss">NIK</label>
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
                            <label className="mont-font fw-600 font-xsss">Profesi</label>
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
                                <option value="1">Ayah</option>
                                <option value="2">Ibu</option>
                                <option value="3">Wali Orang Tua</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Tempat Lahir</label>
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
                            <label className="mont-font fw-600 font-xsss">Email</label>
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
                            <label className="mont-font fw-600 font-xsss">No. HP</label>
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
                            <label className="mont-font fw-600 font-xsss">Provinsi</label>
                            <input
                                type="text"
                                className="form-control"
                                name="provinsi_ortu"
                                required
                                defaultValue="11"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Kota</label>
                            <input
                                type="text"
                                className="form-control"
                                name="kota_ortu"
                                defaultValue="1101"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Kecamatan</label>
                            <input
                                type="text"
                                className="form-control"
                                name="kecamatan_ortu"
                                defaultValue="1101010"
                                required
                            />
                        </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                        <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">Kelurahan</label>
                            <input
                                type="text"
                                className="form-control"
                                name="kelurahan_ortu"
                                defaultValue="1101010001"
                                required
                            />
                        </div>
                    </div>

                    <div className="col-lg-12 mb-3">
                        <label className="mont-font fw-600 font-xsss">Alamat</label>
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
                            onClick={() => props.setView}
                            className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                            Kembali
                        </a>
                    </div>
                </div>
            </form>
        </>
    );
};

export const FormAdminSiswa = (props) => {
    let disabledButton = props.isDisabled;
    return (
        <div className="container px-3 py-4">
            <div className="row">
                <div className="col-lg-12">
                    <div className="middle-wrap">
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

                            <form id="student_form" onSubmit={props.submit} method="POST">
                                <div className="card-body p-lg-5 p-4 w-100 border-0">
                                    <h1 className="mb-2">Form Siswa</h1>
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
                                                    NISN <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nisn_siswa"
                                                    defaultValue={props.nisnSiswa}
                                                    disabled={props.isDisabled}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Nama Siswa <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="nama_siswa"
                                                    defaultValue={props.namaSiswa}
                                                    disabled={props.isDisabled}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Kelas <RequiredTooltip />
                                                </label>
                                                <select
                                                    className="form-control"
                                                    aria-label="Default select example"
                                                    name="idclass_siswa"
                                                    disabled={props.isDisabled}
                                                    required
                                                >
                                                    <option value={props.idKelas} selected disabled>
                                                        {props.namaKelas}
                                                    </option>
                                                    {/*{dataClass.map((data) => (*/}
                                                    {/*    <option value={data.id}>{data.class}</option>*/}
                                                    {/*))}*/}
                                                    {props.selectKelas}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tempat Lahir <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="tempatlahir_siswa"
                                                    defaultValue={props.tempatLahirSiswa}
                                                    disabled={props.isDisabled}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Tanggal Lahir <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="tanggallahir_siswa"
                                                    defaultValue={props.tanggalLahirSiswa}
                                                    disabled={props.isDisabled}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Email <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email_siswa"
                                                    defaultValue={props.emailSiswa}
                                                    disabled={props.disabledEmail}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label className="mont-font fw-600 font-xsss">
                                                    No. HP <RequiredTooltip />
                                                </label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="hp_siswa"
                                                    defaultValue={props.hpSiswa}
                                                    disabled={props.isDisabled}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <FormDaerah location="edit"
                                                nameProvinsi="provinsi_siswa"
                                                idProvinsi={props.idProvSiswa}
                                                provinsi={props.provSiswa}
                                                nameKota="kota_siswa"
                                                idKota={props.idKotaSiswa}
                                                kota={props.kotaSiswa}
                                                nameKecamatan="kecamatan_siswa"
                                                idKec={props.idKecSiswa}
                                                kecamatan={props.kecSiswa}
                                                nameKelurahan="kelurahan_siswa"
                                                kelurahan={props.kelurahanSiswa}
                                                idKel={props.idKelurahanSiswa}
                                                isDisabled={props.isDisabled}
                                                isRequired={true}
                                    />
                                    <div className="row">
                                        <div className="col-lg-12 mb-3">
                                            <label className="mont-font fw-600 font-xsss">
                                                Alamat <RequiredTooltip />
                                            </label>
                                            <textarea
                                                className="form-control mb-0 p-3 bg-greylight lh-16"
                                                rows="5"
                                                placeholder="Isi alamat detail anda..."
                                                name="alamat_siswa"
                                                defaultValue={props.alamatSiswa}
                                                disabled={props.isDisabled}
                                                required
                                            ></textarea>
                                        </div>

                                        {!disabledButton ? <div className="col-lg-12 mt-5 mb-5">
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
                                            : null
                                        }
                                    </div>
                                    {props.formOrtu ?
                                        <DataFormOrangtua createOrtu={props.createOrtu} setView={props.setView}/> :
                                        null}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}