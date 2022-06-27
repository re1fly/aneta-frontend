import Navheader from "../../../../components/Navheader";
import Appheader from "../../../../components/Appheader";
import Adminfooter from "../../../../components/Adminfooter";
import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import { PageHeader} from "antd";

function DataNilaiSosial() {
    const dataKelas = [
        {
            "id_class": 36,
            "class": "ac",
            "sub_class": "b",
            "class_location": "jakarta",
            "academic_year": "2002",
            "name": "Guru Baru",
            "institute_id": 106
        },
        {
            "id_class": 34,
            "class": "asda",
            "sub_class": "asd",
            "class_location": "asd",
            "academic_year": "2013",
            "name": "deco12",
            "institute_id": 106
        },
        {
            "id_class": 35,
            "class": "ccac",
            "sub_class": "cc",
            "class_location": "asda",
            "academic_year": "2013",
            "name": "Hello Bagus",
            "institute_id": 106
        },
        {
            "id_class": 38,
            "class": "Kelas 1",
            "sub_class": "A",
            "class_location": "Ruang 01",
            "academic_year": "2000",
            "name": "deco1",
            "institute_id": 106
        },
        {
            "id_class": 39,
            "class": "Kelas 1",
            "sub_class": "A",
            "class_location": "Ruang 01",
            "academic_year": "2002",
            "name": "Hello Bagus",
            "institute_id": 106
        },
        {
            "id_class": 9,
            "class": "qqqqwca",
            "sub_class": "qqqq2",
            "class_location": "qqqq3",
            "academic_year": "2002",
            "name": "Hello Bagus",
            "institute_id": 106
        },
        {
            "id_class": 44,
            "class": "testdel",
            "sub_class": "a",
            "class_location": "asdads",
            "academic_year": "2020",
            "name": "Guru Baru",
            "institute_id": 106
        },
        {
            "id_class": 1,
            "class": "XII - IPS",
            "sub_class": "A",
            "class_location": "JAkartasa",
            "academic_year": "2020",
            "name": "Hello Bagus",
            "institute_id": 106
        }
    ]
    const dataMapel = [
        {
            "id_course": 1,
            "academic_year_id": 1,
            "course_name": "javascript 1",
            "course_grade_id": 1,
            "course_code": "JD",
            "is_active": "T",
            "max_student": 40,
        },
        {
            "id_course": 2,
            "academic_year_id": 1,
            "course_name": "komputer 2",
            "course_grade_id": 1,
            "course_code": "30",
            "is_active": "T",
            "max_student": 40,
        },
        {
            "id_course": 3,
            "academic_year_id": 1,
            "course_name": "komputer 3",
            "course_grade_id": 1,
            "course_code": "30",
            "is_active": "T",
            "max_student": 40,
        },
    ]
    const dataSiswa = [
        {
            "id_siswa": 10,
            "nama_siswa": 'Muhammad Aziz'
        },
        {
            "id_siswa": 11,
            "nama_siswa": 'Muhammad Khoirul'
        },
        {
            "id_siswa": 12,
            "nama_siswa": 'Troy Gumelar'
        },
        {
            "id_siswa": 13,
            "nama_siswa": 'Adi Sucipto'
        },
        {
            "id_siswa": 14,
            "nama_siswa": 'Joko Lee'
        },
        {
            "id_siswa": 15,
            "nama_siswa": 'Coki Pardede'
        }
    ]

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    <div className="container px-3 py-4">
                        <div className="row pb-5">
                            <div className="col-lg-12">
                                <PageHeader
                                    className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                                    onBack={() => window.history.back()}
                                    title="Input Nilai Sosial"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        aria-label="Default"
                                        name="pilih_kelas"
                                    >
                                        <option value="" selected disabled>
                                            Pilih Kelas
                                        </option>
                                        {dataKelas.map((data) => (
                                            <option value={data.id_class}>{data.class}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        aria-label="Default"
                                        name="pilih_kelas"
                                    >
                                        <option value="" selected disabled>
                                            Pilih Mata Pelajaran
                                        </option>
                                        {dataMapel.map((data) => (
                                            <option className="text-capitalize"
                                                    value={data.id_course}>{data.course_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12 pt-3">
                                <div className="table-responsive-xl">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr className='bg-current text-light'>
                                            {/*<th scope="col" style={{borderRightStyle: 'hidden'}}></th>*/}
                                            <th scope="col" rowSpan={2} style={{textAlign: 'center', verticalAlign: 'middle'}}>Nama Siswa</th>
                                            <th scope="col" colSpan='3' className='text-center'>Kompetensi Dasar / Indikator Sikap Sosial</th>
                                        </tr>
                                        <tr className='bg-current text-light'>

                                            <th scope="col" className='text-center'>1.1 Menghargai</th>
                                            <th scope="col" className='text-center'>1.2 Disiplin</th>
                                            <th scope="col" className='text-center'>1.3 Jujur</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {dataSiswa.map((value) => (
                                            <tr>
                                                <th scope="row" style={{lineHeight: 3.5}}>{value.nama_siswa}</th>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default"
                                                        name={`menghargai${value.id_siswa}`}
                                                    >
                                                        <option value="3" selected>
                                                            Sangat Baik
                                                        </option>
                                                        <option value="2">
                                                            Baik
                                                        </option>
                                                        <option value="1">
                                                            Kurang
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default"
                                                        name={`disiplin${value.id_siswa}`}
                                                    >
                                                        <option value="3" selected>
                                                            Sangat Baik
                                                        </option>
                                                        <option value="2">
                                                            Baik
                                                        </option>
                                                        <option value="1">
                                                            Kurang
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        aria-label="Default"
                                                        name={`jujur_${value.id_siswa}`}
                                                    >
                                                        <option value="3" selected>
                                                            Sangat Baik
                                                        </option>
                                                        <option value="2">
                                                            Baik
                                                        </option>
                                                        <option value="1">
                                                            Kurang
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div className="mt-5 float-right">
                                        <button
                                            className="bg-current border-0 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                            type="submit"
                                        >
                                            Simpan
                                        </button>
                                        <a
                                            onClick={() => window.history.back()}
                                            className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                        >
                                            Batal
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    )
}

export default DataNilaiSosial;