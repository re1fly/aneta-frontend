import React, { useEffect, useState } from "react";
import "../../style/rapor.css"

const ERapor = React.forwardRef((props, ref) => {
    const { data } = props;

    console.log(JSON.stringify(data, null, 2));

    const [predicate, setPredicate] = useState('')
    console.log(predicate);
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
                            {capitalizeFirstLetter(data?.nama_sekolah)}
                        </p>
                        <p>
                            {capitalizeFirstLetter(data?.alamat)}
                        </p>
                        <p>
                            {capitalizeFirstLetter(data?.nama_siswa)}
                        </p>
                        <p>
                            {data?.nisn}
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
                            <td className="text-center strong" width="20%">{data?.predikat_spiritual}</td>
                            <td className="text-center" height="60px">{data?.predikat_spritual_desc == null ? "-" : data?.predikat_spritual_desc?.charAt(0).toUpperCase() + data?.predikat_spritual_desc?.slice(1)}
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
                            <td className="text-center strong" width="20%">{data?.predikat_social}</td>
                            <td className="text-center" height="60px">{data?.predikat_social_desc == null ? "-" : data?.predikat_social_desc?.charAt(0).toUpperCase() + data?.predikat_social_desc?.slice(1)}
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
                        <td className="strong pl-2" colSpan={6}>{capitalizeFirstLetter(data?.mata_pelajaran.pengetahuan[0].nama_kelompok)}</td>
                    </tr>
                    {data?.mata_pelajaran.pengetahuan[0]?.data.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2">{item?.nama_mapel}</td>
                            <td className="text-center">{item?.kkm}</td>
                            <td className="text-center">{item?.nilai}</td>
                            <td className="text-center">{item?.predikat}</td>
                            <td className="pl-2">{item?.desc == null ? "-" : item.desc?.charAt(0).toUpperCase() + item.desc?.slice(1)}</td>
                        </tr>
                    ))}

                    <tr>
                        <td className="strong pl-2" colSpan={6}>{capitalizeFirstLetter(data?.mata_pelajaran.pengetahuan[1].nama_kelompok)}</td>
                    </tr>
                    {data?.mata_pelajaran.pengetahuan[1]?.data.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2">{item?.nama_mapel}</td>
                            <td className="text-center">{item?.kkm}</td>
                            <td className="text-center">{item?.nilai}</td>
                            <td className="text-center">{item?.predikat}</td>
                            <td className="pl-2">{item?.desc == null ? "-" : item.desc?.charAt(0).toUpperCase() + item.desc?.slice(1)}</td>
                        </tr>
                    ))}
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
                        <td className="strong pl-2" colSpan={6}>{capitalizeFirstLetter(data?.mata_pelajaran.keterampilan[0].nama_kelompok)}</td>
                    </tr>
                    {data?.mata_pelajaran.keterampilan[0]?.data.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2">{item?.nama_mapel}</td>
                            <td className="text-center">{item?.kkm}</td>
                            <td className="text-center">{item?.nilai}</td>
                            <td className="text-center">{item?.predikat}</td>
                            <td className="pl-2">{item?.desc == null ? "-" : item.desc?.charAt(0).toUpperCase() + item.desc?.slice(1)}</td>
                        </tr>
                    ))}

                    <tr>
                        <td className="strong pl-2" colSpan={6}>{capitalizeFirstLetter(data?.mata_pelajaran.keterampilan[1].nama_kelompok)}</td>
                    </tr>
                    {data?.mata_pelajaran.keterampilan[1]?.data.map((item, index) => (
                        <tr>
                            <td className="text-center">{index + 1}</td>
                            <td className="pl-2">{item?.nama_mapel}</td>
                            <td className="text-center">{item?.kkm}</td>
                            <td className="text-center">{item?.nilai}</td>
                            <td className="text-center">{item?.predikat}</td>
                            <td className="pl-2">{item?.desc == null ? "-" : item.desc?.charAt(0).toUpperCase() + item.desc?.slice(1)}</td>
                        </tr>
                    ))}
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
                            <td className="pl-2" >-</td>
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
                <p className="p-0 m-0 mb-2">Bandung, 08 Agustus 2022</p>
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
});

export default ERapor;