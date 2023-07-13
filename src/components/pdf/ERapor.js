/*
import React, {useEffect, useState} from "react";
import "../../style/rapor.css"

const ERapor = React.forwardRef((props, ref) => {
    const {data} = props;


    const [predicate, setPredicate] = useState('')
    const [predicateSocial, setPredicateSocial] = useState('')

    function capitalizeFirstLetter(string) {
        let result = '';
        let initText = '';
        let lastText = '';

        const splittedText = string?.split(' ');

        if (splittedText?.length === 1) {
            result =
                splittedText[0]?.charAt(0)?.toUpperCase() +
                splittedText[0]?.slice(1)?.toLowerCase();
        } else if (splittedText?.length > 1) {
            for (let i = 0; i < splittedText?.length; i++) {
                if (i !== splittedText?.length - 1) {
                    let res =
                        splittedText[i]?.charAt(0)?.toUpperCase() +
                        splittedText[i]?.slice(1)?.toLowerCase() +
                        ' ';
                    initText += res;
                } else {
                    lastText =
                        splittedText[i]?.charAt(0)?.toUpperCase() +
                        splittedText[i]?.slice(1)?.toLowerCase();
                }
            }
            result = initText + lastText;
        }
        return result;
    }

    const switchPredicate = (value) => {
        switch (value) {
            case 'Sangat Kurang':
                setPredicate("SK");
                setPredicateSocial("SK")
                break;
            case 'Sangat Baik':
                setPredicate("SB");
                setPredicateSocial("SB");
                break;
            case 'Kurang':
                setPredicate("K");
                setPredicateSocial("K");
                break;
            default:
                return null;
        }
    }

    useEffect(() => {
        switchPredicate(data?.predikat_spiritual)
    }, [data])
    console.log('rspor', data)


    return (
        <div className="px-3 py-4 ml-5 mr-5 mt-5" ref={ref}>

            <h1 className="text-center">RAPOR PESERTA DIDIK DAN PROFIL PESERTA DIDIK</h1>
            {/!* Header profie  *!/}
            <div className="d-flex mt-5">
                <div className="d-flex mr-5">
                    <div>
                        <p>
                            Nama Peserta Didik
                        </p>
                        <p>
                            Nomor Induk/NISN
                        </p>
                        <p>
                            Nama Sekolah
                        </p>
                        <p>
                            Alamat
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
                            {capitalizeFirstLetter(data?.nama_siswa)}
                        </p>
                        <p>
                            {data?.nisn}
                        </p>
                        <p>
                            {capitalizeFirstLetter(data?.nama_sekolah)}
                        </p>
                        <p>
                            {capitalizeFirstLetter(data?.alamat)}
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
                            {data?.kelas}
                        </p>
                        <p>
                            {data?.semester} {data?.semester == 1 ? '(Satu)/Ganjil' : '(Dua)/Genap'}
                        </p>
                        <p>
                            {data?.tahun_academic}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-bottom-dark"></div>

            {/!* Penilaian sikap spiritual  *!/}
            <div className="mt-4">
                <h5 className="strong">A. SIKAP</h5>
                <table className="rapor-table" width="100%">
                    <thead>
                    <tr>
                        <th className="text-center" colSpan={2}>Deskripsi</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="strong" width="20%">1. Sikap Spritual</td>
                        <td className="p-2 text-capitalize" height="60px"> {data?.predikat_spritual_desc}
                        </td>
                    </tr>
                    <tr>
                        <td className="strong" width="20%">2. Sikap Sosial</td>
                        <td className="p-2 text-capitalize" height="60px"> {data?.predikat_social_desc}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/!* Nilai pengetahuan *!/}
            <div className="mt-5">
                <h5 className="strong">B. PENGETAHUAN DAN KETERAMPILAN</h5>
                <h5 className="strong">Kriteria Ketuntasan Minimal Satuan Pendidikan= 65</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%" rowSpan={2}>No</th>
                        <th className="text-center" width="27%" rowSpan={2}>Mata Pelajaran</th>
                        <th className="text-center" width="35%" colSpan={3}>Pengetahuan</th>
                        <th className="text-center" width="35%" colSpan={3}>Keterampilan</th>
                    </tr>

                    <tr>
                        <td className="text-center strong px-2" width="6%">Angka</td>
                        <td className="text-center strong px-2" width="6%">Predikat</td>
                        <td className="text-center strong" width="23%">Deskripsi</td>
                        <td className="text-center strong px-2" width="6%">Angka</td>
                        <td className="text-center strong px-2" width="6%">Predikat</td>
                        <td className="text-center strong" width="23%">Deskripsi</td>
                    </tr>

                    {/!*{data?.mata_pelajaran?.map((item, index) => {*!/}
                    {/!*    console.log('items', item)*!/}
                    {/!*    return(*!/}
                    {/!*        <tr>*!/}
                    {/!*            <td className="text-center">{index + 1}</td>*!/}
                    {/!*            <td className="pl-2">{item?.nama_mapel}</td>*!/}
                    {/!*            <td className="text-center">{item?.nilai}</td>*!/}
                    {/!*            <td className="text-center">{item?.predikat}</td>*!/}
                    {/!*            <td className="text-center">{item?.desc}</td>*!/}
                    {/!*            <td className="text-center">A</td>*!/}
                    {/!*            <td className="text-center">{item?.predikat}</td>*!/}
                    {/!*        </tr>*!/}
                    {/!*    )*!/}
                    {/!*})}*!/}

                    <tr>
                        <td className="strong pl-2"
                            colSpan={8}>{capitalizeFirstLetter(data?.mata_pelajaran?.pengetahuan[1]?.nama_kelompok)}</td>
                    </tr>
                    {data?.mata_pelajaran.pengetahuan[1]?.data.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2 text-capitalize">{item?.nama_mapel}</td>
                            <td className="text-center">{item?.kkm}</td>
                            <td className="text-center">B</td>
                            <td className="text-center">A</td>
                            <td className="text-center">80</td>
                            <td className="text-center">A</td>
                            <td className="text-center">Deskripsi Panjang TEST TEST TEST TEST TEST TEST TEST TEST</td>
                        </tr>
                    ))}
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">C. EKSTRA KURIKULER</h5>
                <table className="rapor-table" width="100%">
                    <thead>
                    <tr>
                        <th className="text-center" height="60px" width="2.5%" rowSpan={2}>No</th>
                        <th className="text-center" height="60px" width="25%">Kegiatan Ekstrakurikuler</th>
                        <th className="text-center" height="60px" width="55%">Keterangan</th>
                    </tr>
                    </thead>
                    {data?.extrakurikuler?.map((item, index) => (
                        <tbody>
                        <tr>
                            <td className="text-center strong">{index + 1}</td>
                            <td className="pl-2 text-capitalize">{item.name}</td>
                            <td className="text-center text-capitalize">{item.description}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">D. SARAN-SARAN</h5>
                <table className="rapor-table" width="100%">
                    <thead>
                    <tr>
                        <th height="60px" width="5%" className="p-3 text-capitalize">{data?.absensi?.saran}
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">E. TINGGI DAN BERAT BADAN</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%" rowSpan={2}>No</th>
                        <th className="text-center" rowSpan={2}>Aspek Yang Dinilai</th>
                        <th className="text-center" colSpan={3}>Semester</th>
                    </tr>

                    <tr>
                        <td className="text-center strong px-2">1 (Satu)</td>
                        <td className="text-center strong px-2">2 (Dua)</td>
                    </tr>
                    <tr>
                        <td className="text-center">1</td>
                        <td className="text-center">Berat Badan</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.berat_badan_semester1} kg</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.berat_badan_semester2} kg</td>
                    </tr>
                    <tr>
                        <td className="text-center">2</td>
                        <td className="text-center">Tinggi Badan</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.tinggi_badan_semester1} cm</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.tinggi_badan_semester2} cm</td>
                    </tr>
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">F. KONDISI KESEHATAN</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%">No</th>
                        <th className="text-center" width="25%">Aspek Yang Dinilai</th>
                        <th className="text-center">Keterangan</th>
                    </tr>
                    <tr>
                        <td className="text-center">1</td>
                        <td className="pl-2">Pendengaran</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.pendengaran}</td>
                    </tr>
                    <tr>
                        <td className="text-center">2</td>
                        <td className="pl-2">Penglihatan</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.penglihatan}</td>
                    </tr>
                    <tr>
                        <td className="text-center">3</td>
                        <td className="pl-2">Gigi</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.gigi}</td>
                    </tr>
                    <tr>
                        <td className="text-center">4</td>
                        <td className="pl-2">Lainnya</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.lainnya}</td>
                    </tr>

                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">G. PRESTASI</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%">No</th>
                        <th className="text-center" width="30%">Jenis Prestasi</th>
                        <th className="text-center">Keterangan</th>
                    </tr>

                    {data?.prestasi?.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2 text-capitalize">{item?.jenis_prestasi}</td>
                            <td className="text-center text-capitalize">{item?.keterangan}</td>
                        </tr>
                    ))}

                </table>
            </div>

            <div className="row mt-5">
                <div className="mt-5 col-7">
                    <h5 className="strong">D. KETIDAKHADIRAN</h5>
                    <table className="rapor-table" width="100%">
                        <tr>
                            <td className="pl-2" width="35%">
                                Sakit
                            </td>
                            <td className="pl-2" width="15%">
                                {data?.absensi?.sakit} Hari
                            </td>
                        </tr>

                        <tr>
                            <td className="pl-2">
                                Izin
                            </td>
                            <td className="pl-2">
                                {data?.absensi?.izin} Hari
                            </td>
                        </tr>

                        <tr>
                            <td className="pl-2">
                                Tanpa Keterangan
                            </td>
                            <td className="pl-2">
                                {data?.absensi?.tanpa_keterangan} Hari
                            </td>
                        </tr>

                    </table>
                </div>

                <div className="mt-5 col-5">
                    <table className="rapor-table" width="100%" style={{marginTop: "23.8px"}}>
                        <thead>
                        <tr>
                            <th className="pt-3 pl-3 pb-1" style={{borderBottomStyle: "none"}}>Keputusan:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="pl-3 pt-0" style={{
                                borderTopStyle: "none",
                                borderBottomStyle: "none",
                                paddingRight: "200px"
                            }}>Berdasarkan pencapaian seluruh kompetensi, peserta didik
                                dinyatakan:
                            </td>
                        </tr>
                        <tr>
                            <td className="strong pl-3 pb-3 pt-3"
                                style={{borderTopStyle: "none"}}>{data?.absensi?.naik_kelas == true ? "Lulus" : "Tidak Lulus"} dari
                                Satuan Pendidikan
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="mt-4 col-4">
                    <p>Mengetahui,</p>
                    <div>
                        <p className="mb-5">Orang Tua/Wali,</p>
                        <p className="mb-5 pt-5">.........................................</p>
                    </div>
                </div>

                <div className="mt-4 col-4">
                    <div>
                        <p className="mb-5" style={{marginTop: "200px"}}>Kepala Sekolah</p>
                        <p className="mb-5 text-capitalize pt-5 font-weight-bold">
                            <u>{data?.keterangan_sekolah?.nama_kepala_sekolah}</u></p>
                    </div>
                </div>

                <div className="mt-4 col-4">
                    <div>
                        <p className="p-0 m-0 mb-2 text-capitalize">{data?.keterangan_sekolah?.tempat_tanggal}</p>
                        <p className="mb-5">Wali Kelas,</p>
                        <p className="mb-5 pt-5">.................................</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ERapor;*/
import React, {useEffect, useState} from "react";
import "../../style/rapor.css"

const ERapor = React.forwardRef((props, ref) => {
    const {data} = props;
    console.log('pete', data)

    const [predicate, setPredicate] = useState('')
    const [predicateSocial, setPredicateSocial] = useState('')

    function capitalizeFirstLetter(string) {
        let result = '';
        let initText = '';
        let lastText = '';

        const splittedText = string?.split(' ');

        if (splittedText?.length === 1) {
            result =
                splittedText[0]?.charAt(0)?.toUpperCase() +
                splittedText[0]?.slice(1)?.toLowerCase();
        } else if (splittedText?.length > 1) {
            for (let i = 0; i < splittedText?.length; i++) {
                if (i !== splittedText?.length - 1) {
                    let res =
                        splittedText[i]?.charAt(0)?.toUpperCase() +
                        splittedText[i]?.slice(1)?.toLowerCase() +
                        ' ';
                    initText += res;
                } else {
                    lastText =
                        splittedText[i]?.charAt(0)?.toUpperCase() +
                        splittedText[i]?.slice(1)?.toLowerCase();
                }
            }
            result = initText + lastText;
        }
        return result;
    }

    const switchPredicate = (value) => {
        switch (value) {
            case 'Sangat Kurang':
                setPredicate("SK");
                setPredicateSocial("SK")
                break;
            case 'Sangat Baik':
                setPredicate("SB");
                setPredicateSocial("SB");
                break;
            case 'Kurang':
                setPredicate("K");
                setPredicateSocial("K");
                break;
            default:
                return null;
        }
    }

    useEffect(() => {
        switchPredicate(data?.predikat_spiritual)
    }, [data])
    console.log('rspor', data)


    return (
        <div className="px-3 py-4 ml-5 mr-5 mt-5" ref={ref}>

            <h1 className="text-center">RAPOR PESERTA DIDIK DAN PROFIL PESERTA DIDIK</h1>
            {/* Header profie  */}
            <div className="d-flex mt-5">
                <div className="d-flex mr-5">
                    <div>
                        <p>
                            Nama Peserta Didik
                        </p>
                        <p>
                            Nomor Induk/NISN
                        </p>
                        <p>
                            Nama Sekolah
                        </p>
                        <p>
                            Alamat
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
                            {capitalizeFirstLetter(data?.nama_siswa)}
                        </p>
                        <p>
                            {data?.nisn}
                        </p>
                        <p>
                            {capitalizeFirstLetter(data?.nama_sekolah)}
                        </p>
                        <p>
                            {capitalizeFirstLetter(data?.alamat)}
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
                            {data?.kelas}
                        </p>
                        <p>
                            {data?.semester} {data?.semester == 1 ? '(Satu)/Ganjil' : '(Dua)/Genap'}
                        </p>
                        <p>
                            {data?.tahun_academic}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-bottom-dark"></div>

            {/* Penilaian sikap spiritual  */}
            <div className="mt-4">
                <h5 className="strong">A. SIKAP</h5>
                <table className="rapor-table" width="100%">
                    <thead>
                    <tr>
                        <th className="text-center" colSpan={2}>Deskripsi</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="strong" width="20%">1. Sikap Spritual</td>
                        <td className="p-2 text-capitalize" height="60px"> {data?.predikat_spritual_desc}
                        </td>
                    </tr>
                    <tr>
                        <td className="strong" width="20%">2. Sikap Sosial</td>
                        <td className="p-2 text-capitalize" height="60px"> {data?.predikat_social_desc}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            {/* Nilai pengetahuan */}
            <div className="mt-5">
                <h5 className="strong">B. PENGETAHUAN DAN KETERAMPILAN</h5>
                <h5 className="strong">Kriteria Ketuntasan Minimal Satuan Pendidikan= 65</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%" rowSpan={2}>No</th>
                        <th className="text-center" width="27%" rowSpan={2}>Mata Pelajaran</th>
                        <th className="text-center" width="35%" colSpan={3}>Pengetahuan</th>
                        <th className="text-center" width="35%" colSpan={3}>Keterampilan</th>
                    </tr>

                    <tr>
                        <td className="text-center strong px-2" width="6%">Angka</td>
                        <td className="text-center strong px-2" width="6%">Predikat</td>
                        <td className="text-center strong" width="23%">Deskripsi</td>
                        <td className="text-center strong px-2" width="6%">Angka</td>
                        <td className="text-center strong px-2" width="6%">Predikat</td>
                        <td className="text-center strong" width="23%">Deskripsi</td>
                    </tr>


                    {/*{data?.mata_pelajaran?.muatan_wajib[0].data.map((item, index) => {*/}
                    {/*        return (*/}
                    {/*            <tr>*/}
                    {/*                <td className="text-center">{index + 1}</td>*/}
                    {/*                <td className="text-center">{item.nama_matpel}</td>*/}
                    {/*                <td className="text-center">{item.nilai}</td>*/}
                    {/*                <td className="text-center">{item.predikat}</td>*/}
                    {/*                <td className="text-center">{item.desc}</td>*/}

                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*)}*/}
                    {data?.mata_pelajaran?.muatan_wajib[0].data.map((val, index) => {
                        return (
                            <tr>
                                <td className="text-center">{index + 1}</td>
                                <td className="text-center text-capitalize">{val.nama_matpel}</td>
                                <td className="text-center">{val.nilai}</td>
                                <td className="text-center">{val.predikat}</td>
                                <td className="text-center text-capitalize">{val.desc == null ? "-" : val.desc}</td>
                                <td className="text-center">{data?.mata_pelajaran?.muatan_wajib[1].data[index].nilai}</td>
                                <td className="text-center">{data?.mata_pelajaran?.muatan_wajib[1].data[index].predikat}</td>
                                <td className="text-center text-capitalize">{data?.mata_pelajaran?.muatan_wajib[1].data[index].desc == null ? "-" : data?.mata_pelajaran?.muatan_wajib[1].data[index].desc }</td>
                            </tr>
                        )
                    })}


                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">C. EKSTRA KURIKULER</h5>
                <table className="rapor-table" width="100%">
                    <thead>
                    <tr>
                        <th className="text-center" height="60px" width="2.5%" rowSpan={2}>No</th>
                        <th className="text-center" height="60px" width="25%">Kegiatan Ekstrakurikuler</th>
                        <th className="text-center" height="60px" width="55%">Keterangan</th>
                    </tr>
                    </thead>
                    {data?.extrakurikuler?.map((item, index) => (
                        <tbody>
                        <tr>
                            <td className="text-center strong">{index + 1}</td>
                            <td className="pl-2 text-capitalize">{item.name}</td>
                            <td className="text-center text-capitalize">{item.description}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">D. SARAN-SARAN</h5>
                <table className="rapor-table" width="100%">
                    <thead>
                    <tr>
                        <th height="60px" width="5%" className="p-3 text-capitalize">{data?.absensi?.saran}
                        </th>
                    </tr>
                    </thead>
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">E. TINGGI DAN BERAT BADAN</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%" rowSpan={2}>No</th>
                        <th className="text-center" rowSpan={2}>Aspek Yang Dinilai</th>
                        <th className="text-center" colSpan={3}>Semester</th>
                    </tr>

                    <tr>
                        <td className="text-center strong px-2">1 (Satu)</td>
                        <td className="text-center strong px-2">2 (Dua)</td>
                    </tr>
                    <tr>
                        <td className="text-center">1</td>
                        <td className="text-center">Berat Badan</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.berat_badan_semester1} kg</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.berat_badan_semester2} kg</td>
                    </tr>
                    <tr>
                        <td className="text-center">2</td>
                        <td className="text-center">Tinggi Badan</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.tinggi_badan_semester1} cm</td>
                        <td className="text-center">{data?.kondisi_kesehatan?.tinggi_badan_semester2} cm</td>
                    </tr>
                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">F. KONDISI KESEHATAN</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%">No</th>
                        <th className="text-center" width="25%">Aspek Yang Dinilai</th>
                        <th className="text-center">Keterangan</th>
                    </tr>
                    <tr>
                        <td className="text-center">1</td>
                        <td className="pl-2">Pendengaran</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.pendengaran}</td>
                    </tr>
                    <tr>
                        <td className="text-center">2</td>
                        <td className="pl-2">Penglihatan</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.penglihatan}</td>
                    </tr>
                    <tr>
                        <td className="text-center">3</td>
                        <td className="pl-2">Gigi</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.gigi}</td>
                    </tr>
                    <tr>
                        <td className="text-center">4</td>
                        <td className="pl-2">Lainnya</td>
                        <td className="text-center text-capitalize">{data?.kondisi_kesehatan?.lainnya}</td>
                    </tr>

                </table>
            </div>

            <div className="mt-5">
                <h5 className="strong">G. PRESTASI</h5>
                <table className="rapor-table" width="100%">
                    <tr>
                        <th className="text-center px-2" width="3%">No</th>
                        <th className="text-center" width="30%">Jenis Prestasi</th>
                        <th className="text-center">Keterangan</th>
                    </tr>

                    {data?.prestasi?.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2 text-capitalize">{item?.jenis_prestasi}</td>
                            <td className="text-center text-capitalize">{item?.keterangan}</td>
                        </tr>
                    ))}

                </table>
            </div>

            <div className="row mt-5">
                <div className="mt-5 col-7">
                    <h5 className="strong">D. KETIDAKHADIRAN</h5>
                    <table className="rapor-table" width="100%">
                        <tr>
                            <td className="pl-2" width="35%">
                                Sakit
                            </td>
                            <td className="pl-2" width="15%">
                                {data?.absensi?.sakit} Hari
                            </td>
                        </tr>

                        <tr>
                            <td className="pl-2">
                                Izin
                            </td>
                            <td className="pl-2">
                                {data?.absensi?.izin} Hari
                            </td>
                        </tr>

                        <tr>
                            <td className="pl-2">
                                Tanpa Keterangan
                            </td>
                            <td className="pl-2">
                                {data?.absensi?.tanpa_keterangan} Hari
                            </td>
                        </tr>

                    </table>
                </div>

                <div className="mt-5 col-5">
                    <table className="rapor-table" width="100%" style={{marginTop: "23.8px"}}>
                        <thead>
                        <tr>
                            <th className="pt-3 pl-3 pb-1" style={{borderBottomStyle: "none", fontSize: "17px"}}>Keputusan:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="pl-3 pt-0" style={{
                                borderTopStyle: "none",
                                borderBottomStyle: "none",
                                fontSize: "18px"
                            }}>Berdasarkan pencapaian seluruh kompetensi, peserta didik
                                dinyatakan:
                            </td>
                        </tr>
                        <tr>
                            <td className="strong pl-3 pb-3 pt-3"
                                style={{borderTopStyle: "none", fontSize: "18px"}}>{data?.absensi?.naik_kelas == true ? "Lulus" : "Tidak Lulus"} dari
                                Satuan Pendidikan
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="mt-4 col-4">
                    <p>Mengetahui,</p>
                    <div>
                        <p className="mb-5">Orang Tua/Wali,</p>
                        <p className="mb-5 pt-5">.........................................</p>
                    </div>
                </div>

                <div className="mt-4 col-4">
                    <div>
                        <p className="mb-5" style={{marginTop: "200px"}}>Kepala Sekolah</p>
                        <p className="mb-5 text-capitalize pt-5 font-weight-bold">
                            <u>{data?.keterangan_sekolah?.nama_kepala_sekolah}</u></p>
                    </div>
                </div>

                <div className="mt-4 col-4">
                    <div>
                        <p className="p-0 m-0 mb-2 text-capitalize">{data?.keterangan_sekolah?.tempat_tanggal}</p>
                        <p className="mb-5">Wali Kelas,</p>
                        <p className="mb-5 pt-5 text-capitalize">{data?.wali_kelas}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ERapor;
