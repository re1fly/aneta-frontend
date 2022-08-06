import React from "react";
import "../../style/rapor.css"

const ERapor = React.forwardRef((props, ref) => {
    // render() {
        return (
            <div className="px-3 py-4 ml-5 mr-5 mt-5" ref={ref}>

                {/* Header profie  */}
                <div className="d-flex mt-5">
                    <div className="d-flex mr-5">
                        <div>
                            <p>
                                Nama Sekolah
                            </p>
                            <p>
                                Alamat
                            </p>
                            <p>
                                Nama Peserta Didik
                            </p>
                            <p>
                                NIS / NISN
                            </p>
                        </div>
                        <div className="ml-4">
                            <p>
                                :
                            </p>
                            <p>
                                :
                            </p>
                            <p>
                                :
                            </p>
                            <p>
                                :
                            </p>
                        </div>
                        <div className="ml-5">
                            <p>
                                SMA Mulya Kencana
                            </p>
                            <p>
                                Jl. Sunter Jaya 10
                            </p>
                            <p>
                                Agus Solehudin
                            </p>
                            <p>
                                20110 / 0075888597
                            </p>
                        </div>
                    </div>

                    <div className="d-flex left-margin">
                        <div>
                            <p>
                                Kelas
                            </p>
                            <p>
                                Semester
                            </p>
                            <p>
                                Tahun Pelajaran
                            </p>
                        </div>
                        <div className="ml-4">
                            <p>
                                :
                            </p>
                            <p>
                                :
                            </p>
                            <p>
                                :
                            </p>
                        </div>
                        <div className="ml-5">
                            <p>
                                XI IPA 1
                            </p>
                            <p>
                                1 (satu) / Ganjil
                            </p>
                            <p>
                                2022 / 2023
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-bottom-dark"></div>
                <h4 className="text-center strong mt-3">Capaian Hasil Belajar</h4>

                {/* Penilaian sikap spiritual  */}
                <div className="mt-4">
                    <h5 className="strong">A. SIKAP</h5>
                    <h5 className="ml-3 strong">1. Sikap Spiritual</h5>
                    <table className="rapor-table" width="100%">
                        <thead>
                            <tr>
                                <th className="text-center" >Predikat</th>
                                <th className="text-center" >Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center strong" width="20%">SB</td>
                                <td className="text-center" height="60px">Selalu berdoa sebelum dan sesudah melakukan kegiatan, memberi salam pada saat awal dan akhir
                                    kegiatan dan sikap bersyukur atas nikmat dan karunia Tuhan Yang Maha Esa mulai berkembang
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Penilaian sikap sosial  */}
                <div className="mt-5">
                    <h5 className="ml-3 strong">2. Sikap Sosial</h5>
                    <table className="rapor-table" width="100%">
                        <thead>
                            <tr>
                                <th className="text-center" >Predikat</th>
                                <th className="text-center" >Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center strong" width="20%">SB</td>
                                <td className="text-center" height="60px">Selalu menunjukkan sikap jujur, toleransi, percaya diri, sedangkan sikap disiplin mengalami peningkatan
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Nilai pengetahuan */}
                <div className="mt-5">
                    <h5 className="strong">B. PENGETAHUAN DAN KETERAMPILAN</h5>
                    <table className="rapor-table" width="100%">
                        <tr>
                            <th className="text-center px-2" rowSpan={2}>No</th>
                            <th className="text-center" rowSpan={2}>Mata Pelajaran</th>
                            <th className="text-center" colSpan={4}>Pengetahuan</th>
                        </tr>

                        <tr>
                            <td className="text-center strong px-2">KKM</td>
                            <td className="text-center strong px-2">Nilai</td>
                            <td className="text-center strong px-2">Predikat</td>
                            <td className="text-center strong">Deskripsi</td>
                        </tr>

                        <tr>
                            <td className="strong pl-2" colSpan={6}>Kelompok A (KKM = 75)</td>
                        </tr>
                        <tr>
                            <td className="text-center">1</td>
                            <td className="pl-2">Pendidikan Agama dan Budi Pekerti</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td className="pl-2">Pendidikan Pancasila dan Kewarganegaraan</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td className="pl-2">Bahasa Indonesia</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td className="pl-2">Matematika</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">5</td>
                            <td className="pl-2">Ilmu Pengetahuan Alam</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">6</td>
                            <td className="pl-2">Ilmu Pengetahuan Sosial</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">7</td>
                            <td className="pl-2">Bahasa Inggris</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>

                        <tr>
                            <td className="strong pl-2" colSpan={6}>Kelompok B (KKM = 75)</td>
                        </tr>
                        <tr>
                            <td className="text-center">1</td>
                            <td className="pl-2">Seni Budaya</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td className="pl-2">Pendidikan Jasmani dan olahraga</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td className="pl-2">Prakarya</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td className="pl-2">Bahasa Sunda</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">5</td>
                            <td className="pl-2">Bahasa Arab</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                    </table>
                </div>

                {/* Nilai keterampilan */}
                <div className="mt-3">
                    <table className="rapor-table" width="100%">
                        <tr>
                            <th className="text-center px-2" rowSpan={2}>No</th>
                            <th className="text-center" rowSpan={2}>Mata Pelajaran</th>
                            <th className="text-center" colSpan={4}>Keterampilan</th>
                        </tr>

                        <tr>
                            <td className="text-center strong px-2">KKM</td>
                            <td className="text-center strong px-2">Nilai</td>
                            <td className="text-center strong px-2">Predikat</td>
                            <td className="text-center strong">Deskripsi</td>
                        </tr>

                        <tr>
                            <td className="strong pl-2" colSpan={6}>Kelompok A (KKM = 75)</td>
                        </tr>
                        <tr>
                            <td className="text-center">1</td>
                            <td className="pl-2">Pendidikan Agama dan Budi Pekerti</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td className="pl-2">Pendidikan Pancasila dan Kewarganegaraan</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td className="pl-2">Bahasa Indonesia</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td className="pl-2">Matematika</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">5</td>
                            <td className="pl-2">Ilmu Pengetahuan Alam</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">6</td>
                            <td className="pl-2">Ilmu Pengetahuan Sosial</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">7</td>
                            <td className="pl-2">Bahasa Inggris</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>

                        <tr>
                            <td className="strong pl-2" colSpan={6}>Kelompok B (KKM = 75)</td>
                        </tr>
                        <tr>
                            <td className="text-center">1</td>
                            <td className="pl-2">Seni Budaya</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">2</td>
                            <td className="pl-2">Pendidikan Jasmani dan olahraga</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">3</td>
                            <td className="pl-2">Prakarya</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">4</td>
                            <td className="pl-2">Bahasa Sunda</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                        <tr>
                            <td className="text-center">5</td>
                            <td className="pl-2">Bahasa Arab</td>
                            <td className="text-center">75</td>
                            <td className="text-center">96</td>
                            <td className="text-center">A</td>
                            <td className="pl-2">Sangat Baik dalam menguasai seluruh kompetensi, terutama dalam
                                Mengidentifikasi perilaku rendah hati, hemat, dan sederhana</td>
                        </tr>
                    </table>
                </div>

                <div className="mt-5">
                    <h5 className="strong">C. EKSTRA KURIKULER</h5>
                    <table className="rapor-table" width="100%">
                        <thead>
                            <tr>
                                <th className="text-center" height="60px" width="5%">No</th>
                                <th className="text-center" height="60px" width="30%" >Kegiatan Ekstrakurukuler</th>
                                <th className="text-center" height="60px" width="10%" >Predikat</th>
                                <th className="text-center" height="60px" width="55%" >Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center strong" >1</td>
                                <td className="pl-2" >Pramuka</td>
                                <td className="text-center" >-</td>
                                <td className="text-center" >-</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td className="text-center strong" >2</td>
                                <td className="pl-2" >-</td>
                                <td className="text-center" >-</td>
                                <td className="text-center" >-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-5">
                    <h5 className="strong">D. KETIDAKHADIRAN</h5>
                    <table className="rapor-table" width="50%">
                        <tr>
                            <td className="pl-2" width="35%">
                                Sakit
                            </td>
                            <td className="pl-2" width="15%">
                                : -
                            </td>
                            <td className="pl-2" width="30%">
                                Hari
                            </td>
                        </tr>

                        <tr>
                            <td className="pl-2">
                                Izin
                            </td>
                            <td className="pl-2">
                                : -
                            </td>
                            <td className="pl-2">
                                Hari
                            </td>
                        </tr>

                        <tr>
                            <td className="pl-2">
                                Tanpa Keterangan
                            </td>
                            <td className="pl-2">
                                : -
                            </td>
                            <td className="pl-2">
                                Hari
                            </td>
                        </tr>

                    </table>
                </div>


                <div className="mt-4">
                    <p className="p-0 m-0 mb-2">Bogor, 23 Agustus 2022</p>
                    <p>Mengetahui,</p>
                </div>

                <div className="mt-4 d-flex">
                    <div className="left-margin-l">
                        <p className="mb-5 ml-4">Orang Tua</p>
                        <p className="mb-5">.........................................</p>
                    </div>

                    <div className="left-margin">
                        <p className="mb-5 ml-4">Wali Kelas</p>
                        <p className="mb-5">Toni rostandi, S.Pd.</p>
                    </div>
                </div>

                <div className="mt-4 d-flex">
                    <div className="left-margin-xl">
                        <p className="mb-5 ml-4">Kepala Sekolah</p>
                        <p className="mb-5">Dr. H. Ahmad Sanusi, M.Pd.</p>
                    </div>
                </div>

            </div>
        );
    // }
});

export default ERapor;