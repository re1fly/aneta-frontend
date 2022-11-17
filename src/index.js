import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./main.scss";

// Common Layout
import Demo from "./demo/Demo";

import Admin from "./pages/Admin";
import Adminemail from "./pages/Adminemail";
import Adminchat from "./pages/Adminchat";
import Adminproductlist from "./pages/Adminproductlist";
import Adminproductgrid from "./pages/Adminproductgrid";
import Adminproductadd from "./pages/Adminproductadd";
import Admincustomer from "./pages/Admincustomer";
import Admincustomerview from "./pages/Admincustomerview";
import Adminorder from "./pages/Adminorder";
import Adminorderview from "./pages/Adminorderview";

import Adminvenderlist from "./pages/Adminvenderlist";
import Adminvenderview from "./pages/Adminvenderview";
import Adminreview from "./pages/Adminreview";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import Coming from "./pages/Coming";
import Notfound from "./pages/Notfound";
import Blog from "./pages/Blog";
import BlogSidebar from "./pages/BlogSidebar";
import BlogSingle from "./pages/BlogSingle";
import Contact from "./pages/Contact";
import Contacttwo from "./pages/Contacttwo";
import About from "./pages/About";
import Service from "./pages/Service";
import Price from "./pages/Price";
import Shopone from "./pages/Shopone";
import Shoptwo from "./pages/Shoptwo";
import Shopthree from "./pages/Shopthree";
import Productone from "./pages/Productone";
import Producttwo from "./pages/Producttwo";
import Productthree from "./pages/Productthree";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

import Coursesgridone from "./pages/Coursesgridone";
import Coursesgridtwo from "./pages/Coursesgridtwo";
import Coursesgridthree from "./pages/Coursesgridthree";
import Popupchat from "./pages/Popupchat";

import Userprofile from "./pages/Userprofile";
import Authorprofile from "./pages/Authorprofile";
import Coursedetails from "./pages/Coursedetails";
import Coursedetailstwo from "./pages/Coursedetailstwo";

import Default from "./pages/Default";
import Defaultcategory from "./pages/Defaultcategory";
import Defaultfollower from "./pages/Defaultfollower";
import Defaultsettings from "./pages/Defaultsettings";
import Defaultsearch from "./pages/Defaultsearch";
import Defaultchannel from "./pages/Defaultchannel";
import Defaultlive from "./pages/Defaultlive";
import Defaultcourseone from "./pages/Defaultcourseone";
import Defaultcoursetwo from "./pages/Defaultcoursetwo";
import Defaultuserprofile from "./pages/Defaultuserprofile";
import Defaultauthorprofile from "./pages/Defaultauthorprofile";
import Defaultanalytics from "./pages/Defaultanalytics";

import Accountinfo from "./pages/Accountinfo";
import Contactinfo from "./pages/Contactinfo";
import Social from "./pages/Social";
import Password from "./pages/Password";
import Payment from "./pages/Payment";
import Chat from "./pages/Chat";
import Email from "./pages/Email";
import Emailopen from "./pages/Emailopen";

import Hometwo from "./pages/Hometwo";
import Homethree from "./pages/Homethree";
import Homefive from "./pages/Homefive";
import Homesix from "./pages/Homesix";
import Homefour from "./pages/Homefour";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

// Role Admin
import BerandaAdmin from "./pages/admin/Beranda";
import TahunAkademikAdmin from "./pages/admin/TahunAkademik";
import ProfilSekolah from "./pages/admin/ProfilSekolah";
import DataGuruAdmin from "./pages/admin/DataGuru";
import DataSiswaAdmin from "./pages/admin/DataSiswa";
import DataKelasAdmin from "./pages/admin/data-kelas/index";
import JadwalPelajaranAdmin from "./pages/admin/jadwal-pelajaran/index";
import JadwalPelajaranAdminDetail from "./pages/admin/jadwal-pelajaran/Detail";
import KompetensiAdmin from "./pages/admin/kompetensi";
import DataMataPelajaranAdmin from "./pages/admin/data-pelajaran/DataMataPelajaran";
import CetakRapor from "./pages/admin/E-Rapor/CetakRapor";

// Role Guru
import BerandaGuru from "./pages/guru/Beranda";
import GuruDataMateri from "./pages/guru/data-materi/index";
// import DataMateriDetail from "./pages/guru/data-materi/Detail";
// import DataMateriGuru from "./pages/guru/data-materi";
// import MateriPelajaranGuru from "./pages/guru/data-materi/Pelajaran";
// import GuruDetailPelajaran from "./pages/guru/data-materi/Detail";

// Role siswa
import TugasiSiswa from "./pages/siswa/kelas-saya/TugasHarian";
import MateriSiswa from "./pages/siswa/kelas-saya/Materi";
import BerandaSiswa from "./pages/siswa/Beranda";
import KelasSiswa from "./pages/siswa/kelas-saya";

// Role Orang Tua
import BerandaOrangtua from "./pages/orangtua/Beranda";
import DataAnakOrangtua from "./pages/orangtua/DataAnak";

import { store } from "./redux/Store";
import { Provider } from "react-redux";
import CapaianPenilaian from "./pages/admin/penilaian/CapaianPenilaian";
import InputDataNilai from "./pages/admin/penilaian/data-nilai";
import InputDataDeskripsiNilai from "./pages/admin/penilaian/InputDataDeskripsiNilai";
import KirimPenilaian from "./pages/admin/penilaian/KirimPenilaian";
import StatusPenilaian from "./pages/admin/E-Rapor/StatusPenilaian";
import DataKkmPelajaran from "./pages/admin/data-pelajaran/DataKkmPelajaran";
import DataPelajaranKelas from "./pages/admin/data-pelajaran/DataPelajaranKelas";
import DataIntervalPredikat from "./pages/admin/data-pelajaran/DataIntervalPredikat";
import PerencanaanNilai from "./pages/admin/penilaian/perencanaan-nilai";
import NilaiPengetahuan from "./pages/admin/penilaian/perencanaan-nilai/NilaiPengetahuan";
import NilaiKeterampilan from "./pages/admin/penilaian/perencanaan-nilai/NilaiKeterampilan";
import NilaiSpiritual from "./pages/admin/penilaian/perencanaan-nilai/NilaiSpiritual";
import NilaiSosial from "./pages/admin/penilaian/perencanaan-nilai/NilaiSosial";
import RencanaBobot from "./pages/admin/penilaian/perencanaan-nilai/RencanaBobot";
import DataNilaiPengetahuan from "./pages/admin/penilaian/data-nilai/DataNilaiPengetahuan";
import DataNilaiKeterampilan from "./pages/admin/penilaian/data-nilai/DataNilaiKeterampilan";
import DataNilaiSpiritual from "./pages/admin/penilaian/data-nilai/DataNilaiSpiritual";
import DataNilaiSosial from "./pages/admin/penilaian/data-nilai/DataNilaiSosial";
import DataNilaiUjian from "./pages/admin/penilaian/data-nilai/DataNilaiUjian";
import ListTahunAkademik from "./pages/admin/tahun-akademik/ListTahunAkademik";
import JadwalPelajaranAdminSubKelas from "./pages/admin/jadwal-pelajaran/SubKelas";
import DataEkstrakurikuler from "./pages/admin/ekstrakurikuler/DataEkstrakurikuler";
import InputNilaiEkskul from "./pages/admin/ekstrakurikuler/InputNilaiEkskul";
import InputDataDeskripsiSikap from "./pages/admin/penilaian/InputDataDeskripsiSikap";
import GuruCreateMateri from "./pages/guru/data-materi/createMateri";
import MateriGuru from "./pages/guru/guruMateri";
import GuruPenilaian from "./pages/guru/nilai-tugas/Penilaian";
import SiswaStatusPenilaian from "./pages/siswa/E-Rapor/StatusPenilaian";
import SiswaCetakRapor from "./pages/siswa/E-Rapor/CetakRapor";
import KompetensiSiswa from "./pages/siswa/kompetensi";
import GuruCapaianPenilaian from "./pages/guru/penilaian/CapaianPenilaian";
import GuruPerencanaanNilai from "./pages/guru/penilaian/perencanaan-nilai";
import GuruNilaiPengetahuan from "./pages/guru/penilaian/perencanaan-nilai/NilaiPengetahuan";
import GuruNilaiKeterampilan from "./pages/guru/penilaian/perencanaan-nilai/NilaiKeterampilan";
import GuruNilaiSpiritual from "./pages/guru/penilaian/perencanaan-nilai/NilaiSpiritual";
import GuruNilaiSosial from "./pages/guru/penilaian/perencanaan-nilai/NilaiSosial";
import GuruRencanaBobot from "./pages/guru/penilaian/perencanaan-nilai/RencanaBobot";
import GuruInputDataNilai from "./pages/guru/penilaian/data-nilai";
import GuruDataNilaiPengetahuan from "./pages/guru/penilaian/data-nilai/DataNilaiPengetahuan";
import GuruDataNilaiKeterampilan from "./pages/guru/penilaian/data-nilai/DataNilaiKeterampilan";
import GuruDataNilaiSpiritual from "./pages/guru/penilaian/data-nilai/DataNilaiSpiritual";
import GuruDataNilaiSosial from "./pages/guru/penilaian/data-nilai/DataNilaiSosial";
import GuruDataNilaiUjian from "./pages/guru/penilaian/data-nilai/DataNilaiUjian";
import GuruInputDataDeskripsiNilai from "./pages/guru/penilaian/InputDataDeskripsiNilai";
import GuruInputDataDeskripsiSikap from "./pages/guru/penilaian/InputDataDeskripsiSikap";
import GuruKirimPenilaian from "./pages/guru/penilaian/KirimPenilaian";
import KompetensiGuru from "./pages/guru/kompetensi";
import GuruPertemuan from "./pages/guru/data-materi/pertemuan";
import GuruPertemuanTugas from "./pages/guru/data-tugas/pertemuan";
import GuruDataTugas from "./pages/guru/data-tugas";
import GuruCreateTugas from "./pages/guru/data-tugas/createTugas";
import AdminTingkatKelas from "./pages/admin/data-kelas/tingkatKelas";
import GuruJadwalPelajaranKelas from "./pages/guru/jadwal-pelajaran/kelas";
import GuruJadwalPelajaranSubKelas from "./pages/guru/jadwal-pelajaran/subKelas";
import GuruJadwalPelajaranMapel from "./pages/guru/jadwal-pelajaran/mapel";
import GuruJadwalPelajaranMateriTugas from "./pages/guru/jadwal-pelajaran/materiTugas";
import SiswaPertemuanMateri from "./pages/siswa/jadwal-pelajaran/materi/pertemuanMateri";
import SiswaPertemuanTugas from "./pages/siswa/jadwal-pelajaran/tugas/pertemuanTugas";
import SiswaJadwalTugas from "./pages/siswa/jadwal-pelajaran/tugas/Tugas";
import SiswaDataTugas from "./pages/siswa/jadwal-pelajaran/tugas/dataTugas";
import SiswaJadwalMateri from "./pages/siswa/jadwal-pelajaran/materi/Materi";
import SiswaDataMateri from "./pages/siswa/jadwal-pelajaran/materi/dataMateri";
import GuruNilaiKelas from "./pages/guru/nilai-tugas/kelas";
import GuruNialiSubKelas from "./pages/guru/nilai-tugas/subKelas";
import GuruNilaiMapel from "./pages/guru/nilai-tugas/mapel";
import TugasGuru from "./pages/guru/guruTugas";
import GuruJadwalPelajaranMapelMateri from "./pages/guru/jadwal-pelajaran/listMapelMateri";
import GuruJadwalPelajaranMapelTugas from "./pages/guru/jadwal-pelajaran/listMapelTugas";
import GuruListPertemuanMateri from "./pages/guru/jadwal-pelajaran/listPertemuanMateri";
import GuruListPertemuanTugas from "./pages/guru/jadwal-pelajaran/listPertemuanTugas";
import { FormAdminJadwalPelajaranJam } from "./components/form/AdminJadwalPelajaranJam";
import GuruNilaiTugas from "./pages/guru/nilai-tugas/tugas";
import SiswaNilaiPelajaran from "./pages/siswa/tugas-nilai/mapel";
import SiswaNilaiTugas from "./pages/siswa/tugas-nilai/Tugas";
import SiswaPenilaian from "./pages/siswa/tugas-nilai/Nilai";
import GuruSubmitRapor from "./pages/guru/E-Rapor/SubmitRapor";
import GuruKalender from "./pages/guru/jadwal-pelajaran/kalender";
import GuruListPertemuanKalender from "./pages/guru/jadwal-pelajaran/kalender/listPertemuan";
import SiswaKalender from "./pages/siswa/jadwal-pelajaran/kalender";
import SiswaListPertemuanKalender from "./pages/siswa/jadwal-pelajaran/kalender/listPertemuan";

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={"/"}>
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/`}
              component={Homefour}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-beranda`}
              component={BerandaAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-tahun-akademik`}
              component={TahunAkademikAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-list-tahun-akademik`}
              component={ListTahunAkademik}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-profil-sekolah`}
              component={ProfilSekolah}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-guru`}
              component={DataGuruAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-siswa`}
              component={DataSiswaAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-kelas`}
              component={DataKelasAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-tingkat-kelas`}
              component={AdminTingkatKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran`}
              component={JadwalPelajaranAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran-sub-kelas-:id`}
              component={JadwalPelajaranAdminSubKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran-detail-:id`}
              component={JadwalPelajaranAdminDetail}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran-jam`}
              component={FormAdminJadwalPelajaranJam}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-matapelajaran`}
              component={DataMataPelajaranAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-kkm-pelajaran`}
              component={DataKkmPelajaran}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-pelajaran-kelas`}
              component={DataPelajaranKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-interval-predikat`}
              component={DataIntervalPredikat}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-kompetensi`}
              component={KompetensiAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-input-deskripsi-nilai`}
              component={InputDataDeskripsiNilai}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-input-deskripsi-sikap`}
              component={InputDataDeskripsiSikap}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-kirim-penilaian`}
              component={KirimPenilaian}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-status-penilaian`}
              component={StatusPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-cetak-rapor`}
              component={CetakRapor}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-beranda`}
              component={BerandaGuru}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-materi`}
              component={GuruDataMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-materi-pertemuan`}
              component={GuruPertemuan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-create-materi`}
              component={GuruCreateMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-tugas`}
              component={GuruDataTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-tugas-pertemuan`}
              component={GuruPertemuanTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-create-tugas`}
              component={GuruCreateTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-kalender`}
              component={GuruKalender}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-list-pertemuan-kalender`}
              component={GuruListPertemuanKalender}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-kelas`}
              component={GuruJadwalPelajaranKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-sub-kelas-:id`}
              component={GuruJadwalPelajaranSubKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-mapel-:id`}
              component={GuruJadwalPelajaranMapel}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-materi-tugas-:id`}
              component={GuruJadwalPelajaranMateriTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-list-materi-:id`}
              component={GuruJadwalPelajaranMapelMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-list-tugas-:id`}
              component={GuruJadwalPelajaranMapelTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-materi-pertemuan-:id`}
              component={GuruListPertemuanMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran-tugas-pertemuan-:id`}
              component={GuruListPertemuanTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-materi-:id`}
              component={MateriGuru}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-tugas-:id`}
              component={TugasGuru}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-nilai-kelas`}
              component={GuruNilaiKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-nilai-sub-kelas-:id`}
              component={GuruNialiSubKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-nilai-mapel-:id`}
              component={GuruNilaiMapel}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-nilai-tugas-:id`}
              component={GuruNilaiTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-penilaian-:id`}
              component={GuruPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-kompetensi`}
              component={KompetensiGuru}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-capaian-penilaian`}
              component={GuruCapaianPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-perencanaan-nilai`}
              component={GuruPerencanaanNilai}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-perencanaan-nilai-pengetahuan`}
              component={GuruNilaiPengetahuan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-perencanaan-nilai-keterampilan`}
              component={GuruNilaiKeterampilan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-perencanaan-nilai-spiritual`}
              component={GuruNilaiSpiritual}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-perencanaan-nilai-sosial`}
              component={GuruNilaiSosial}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-perencanaan-nilai-bobot`}
              component={GuruRencanaBobot}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-input-nilai`}
              component={GuruInputDataNilai}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-nilai-pengetahuan`}
              component={GuruDataNilaiPengetahuan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-nilai-keterampilan`}
              component={GuruDataNilaiKeterampilan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-nilai-spiritual`}
              component={GuruDataNilaiSpiritual}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-nilai-sosial`}
              component={GuruDataNilaiSosial}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-nilai-ujian`}
              component={GuruDataNilaiUjian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-input-deskripsi-nilai`}
              component={GuruInputDataDeskripsiNilai}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-input-deskripsi-sikap`}
              component={GuruInputDataDeskripsiSikap}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-kirim-penilaian`}
              component={GuruKirimPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-submit-rapor`}
              component={GuruSubmitRapor}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-beranda`}
              component={BerandaSiswa}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-kelas`}
              component={KelasSiswa}
            />
            
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-kelas-tugas-:id`}
              component={TugasiSiswa}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-jadwal-pelajaran-kalender`}
              component={SiswaKalender}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-list-pertemuan-kalender`}
              component={SiswaListPertemuanKalender}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-jadwal-materi`}
              component={SiswaJadwalMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-data-materi-:id`}
              component={SiswaDataMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-pertemuan-materi-:id`}
              component={SiswaPertemuanMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-kelas-materi-:id`}
              component={MateriSiswa}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-jadwal-tugas`}
              component={SiswaJadwalTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-data-tugas-:id`}
              component={SiswaDataTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-pertemuan-tugas-:id`}
              component={SiswaPertemuanTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-penilaian-:id`}
              component={SiswaPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-nilai-pelajaran`}
              component={SiswaNilaiPelajaran}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-nilai-tugas-:id`}
              component={SiswaNilaiTugas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-status-penilaian`}
              component={SiswaStatusPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-cetak-rapor`}
              component={SiswaCetakRapor}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-kompetensi`}
              component={KompetensiSiswa}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/orangtua-beranda`}
              component={BerandaOrangtua}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/orangtua-data-anak`}
              component={DataAnakOrangtua}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-capaian-penilaian`}
              component={CapaianPenilaian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-perencanaan-nilai`}
              component={PerencanaanNilai}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-perencanaan-nilai-pengetahuan`}
              component={NilaiPengetahuan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-perencanaan-nilai-keterampilan`}
              component={NilaiKeterampilan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-perencanaan-nilai-spiritual`}
              component={NilaiSpiritual}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-perencanaan-nilai-sosial`}
              component={NilaiSosial}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-perencanaan-nilai-bobot`}
              component={RencanaBobot}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-input-nilai`}
              component={InputDataNilai}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-nilai-pengetahuan`}
              component={DataNilaiPengetahuan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-nilai-keterampilan`}
              component={DataNilaiKeterampilan}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-nilai-spiritual`}
              component={DataNilaiSpiritual}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-nilai-sosial`}
              component={DataNilaiSosial}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-nilai-ujian`}
              component={DataNilaiUjian}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-data-ekstrakurikuler`}
              component={DataEkstrakurikuler}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-input-data-ekstrakurikuler`}
              component={InputNilaiEkskul}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin`}
              component={Admin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-email`}
              component={Adminemail}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-chat`}
              component={Adminchat}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-productlist`}
              component={Adminproductlist}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-productgrid`}
              component={Adminproductgrid}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-productadd`}
              component={Adminproductadd}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-customer`}
              component={Admincustomer}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-customerview`}
              component={Admincustomerview}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-order`}
              component={Adminorder}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-orderview`}
              component={Adminorderview}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-venderlist`}
              component={Adminvenderlist}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-venderview`}
              component={Adminvenderview}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-review`}
              component={Adminreview}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/register`}
              component={Register}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgot`}
              component={Forgot}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/coming-soon`}
              component={Coming}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/notfound`}
              component={Notfound}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/blog`}
              component={Blog}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/blog-sidebar`}
              component={BlogSidebar}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/blog-single`}
              component={BlogSingle}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/contact`}
              component={Contact}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/contact-2`}
              component={Contacttwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/about`}
              component={About}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/service`}
              component={Service}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/price`}
              component={Price}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/shop-1`}
              component={Shopone}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/shop-2`}
              component={Shoptwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/shop-3`}
              component={Shopthree}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/single-product`}
              component={Productone}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/single-product-2`}
              component={Producttwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/single-product-3`}
              component={Productthree}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/cart`}
              component={Cart}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/checkout`}
              component={Checkout}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default`}
              component={Default}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-categories`}
              component={Defaultcategory}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-follower`}
              component={Defaultfollower}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-settings`}
              component={Defaultsettings}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-search`}
              component={Defaultsearch}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-live-stream`}
              component={Defaultlive}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-channel`}
              component={Defaultchannel}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-course-one`}
              component={Defaultcourseone}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-course-two`}
              component={Defaultcoursetwo}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-user-profile`}
              component={Defaultuserprofile}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-analytics`}
              component={Defaultanalytics}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/default-author-profile`}
              component={Defaultauthorprofile}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/popup-chat`}
              component={Popupchat}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/account-information`}
              component={Accountinfo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/contact-information`}
              component={Contactinfo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/social`}
              component={Social}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/payment`}
              component={Payment}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/password`}
              component={Password}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/email-box`}
              component={Email}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/defaultemailopen`}
              component={Emailopen}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/message`}
              component={Chat}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/courses-grid-1`}
              component={Coursesgridone}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/courses-grid-2`}
              component={Coursesgridtwo}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/courses-grid-3`}
              component={Coursesgridthree}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/user-profile`}
              component={Userprofile}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/author-profile`}
              component={Authorprofile}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/course-details`}
              component={Coursedetails}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/course-details-2`}
              component={Coursedetailstwo}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home-3`}
              component={Homethree}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home-5`}
              component={Homefive}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home-6`}
              component={Homesix}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home-4`}
              component={Homefour}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/home-2`}
              component={Hometwo}
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.register();
