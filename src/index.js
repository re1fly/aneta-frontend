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
import DataMateriDetail from "./pages/guru/data-materi/Detail";
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
import JadwalPelajaranSiswa from "./pages/siswa/jadwal-pelajaran";
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
import JadwalPelajaranGuru from "./pages/guru/jadwal-pelajaran";
import GuruCreateMateri from "./pages/guru/data-materi/createMateri";

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
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran`}
              component={JadwalPelajaranAdmin}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran-sub-kelas`}
              component={JadwalPelajaranAdminSubKelas}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/admin-jadwal-pelajaran-detail-:id`}
              component={JadwalPelajaranAdminDetail}
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
              path={`${process.env.PUBLIC_URL}/guru-create-materi`}
              component={GuruCreateMateri}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-data-materi-detail`}
              component={DataMateriDetail}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/guru-jadwal-pelajaran`}
              component={JadwalPelajaranGuru}
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
              path={`${process.env.PUBLIC_URL}/siswa-kelas-materi`}
              component={MateriSiswa}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-kelas-tugas`}
              component={TugasiSiswa}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/siswa-jadwal-pelajaran`}
              component={JadwalPelajaranSiswa}
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
