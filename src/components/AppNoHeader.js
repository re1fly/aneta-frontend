import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import Darkbutton from "../components/Darkbutton";
import { Collapse, notification } from "antd";
import CryptoJS from "crypto-js";
import firebase from "firebase/app";
import "firebase/messaging";
import axios from "axios";
import { BASE_URL } from "../api/Url.js";
import {
    global_join_sub_where_get,
    url_by_institute,
} from "../api/reference.js";

function AppNoHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [role, setRole] = useState("");
    const [isWalikelas, setIsWalikelas] = useState("");
    const [dataNotif, setDataNotif] = useState([]);
    let router = useHistory();
    const email = localStorage.getItem("user");
    const key = localStorage.getItem("key");
    const decrypted = CryptoJS.AES.decrypt(key, "Secret Passphrase");
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    const isEkskul = localStorage.getItem("is_ekskul");
    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const isVerification = localStorage.getItem("is_verification");
    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleActive = () => setIsActive(!isActive);
    const navClass = `${isOpen ? " nav-active" : ""}`;
    const searchClass = `${isActive ? " show" : ""}`;

    // const fbConfig = {
    //   apiKey: "AIzaSyCZTgLpZkjyjb5YcweXVhOosHNASd3VGaM",
    //   authDomain: "anetaapp-80352.firebaseapp.com",
    //   databaseURL:
    //     "https://anetaapp-80352-default-rtdb.asia-southeast1.firebasedatabase.app",
    //   projectId: "anetaapp-80352",
    //   storageBucket: "anetaapp-80352.appspot.com",
    //   messagingSenderId: "720796861195",
    //   appId: "1:720796861195:web:a7fd2b72ab86a42287980e",
    //   measurementId: "G-EY34WYS0T9",
    // };
    // if (!firebase.apps.length) {
    //   firebase.initializeApp(fbConfig);
    // }

    // const messaging = firebase.messaging();

    // const onMessageListener = () =>
    //   new Promise((resolve) => {
    //     messaging.onMessage((payload) => {
    //       resolve(payload);
    //     });
    //   });

    const _getAllNotif = () => {
        axios
            .post(
                url_by_institute,
                {
                    processDefinitionId: global_join_sub_where_get,
                    returnVariables: true,
                    variables: [
                        {
                            name: "global_join_where_sub",
                            type: "json",
                            value: {
                                tbl_induk: "x_academic_subjects_schedule_contents_upload",
                                select: [
                                    "users.name",
                                    "x_academic_subjects_schedule_contents_upload.content_id",
                                    "x_academic_subjects_schedule_contents.tittle",
                                ],
                                paginate: 5,
                                join: [
                                    {
                                        tbl_join: "x_academic_subjects_schedule_contents",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_upload",
                                        foregenkey: "content_id",
                                    },
                                    {
                                        tbl_join: "x_academic_students",
                                        refkey: "id",
                                        tbl_join2: "x_academic_subjects_schedule_contents_upload",
                                        foregenkey: "user_id",
                                    },
                                    {
                                        tbl_join: "users",
                                        refkey: "id",
                                        tbl_join2: "x_academic_students",
                                        foregenkey: "user_id",
                                    },
                                ],
                                kondisi: [
                                    {
                                        keterangan: "deleted_at",
                                        kolom: "x_academic_students.deleted_at",
                                    },
                                ],
                                where: [
                                    {
                                        tbl_coloumn: "x_academic_subjects_schedule_contents",
                                        tbl_field: "created_by",
                                        tbl_value: userId,
                                        operator: "=",
                                    },
                                ],
                                order_coloumn:
                                    "x_academic_subjects_schedule_contents_upload.id",
                                order_by: "desc",
                            },
                        },
                        {
                            name: "page",
                            type: "string",
                            value: "1",
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: "Basic YWRtaW46TWFuYWczciE=",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const dataRes = JSON.parse(response?.data?.variables[3]?.value);
                const notif = dataRes.data.data;
                setDataNotif(notif);
            });
    };

    // onMessageListener()
    //   .then((payload) => {
    //     _getAllNotif();
    //     notification.info({
    //       message: "Notifikasi baru",
    //       description: payload.notification.title,
    //       placement: "topRight",
    //     });
    //   })
    //   .catch((err) => console.log("failed: ", err));

    useEffect(() => {
        const getStorageRole = localStorage.getItem("role");
        setRole(getStorageRole);
        setIsWalikelas(localStorage.getItem("is_walikelas"));

        if (isVerification == "true") {
            _getAllNotif();
        }
    }, []);

    const _handleLogout = () => {
        localStorage.clear();
        window.location.href = "https://lms.aneta.id/login";
    };
    const { Panel } = Collapse;

    return (
        <div className="middle-sidebar-header bg-white">
            <div className={`app-header-search ${searchClass}`}>
                <form
                    method="post"
                    id="form_wp"
                    action="https://lms.aneta.id:8443/wp-login.php"
                >
                    <input id="log" name="log" value={email} />
                    <input id="pwd" name="pwd" value={originalText} />
                </form>

                <form className="search-form">
                    <div className="form-group searchbox mb-0 border-0 p-1">
                        <input
                            type="text"
                            className="form-control border-0"
                            placeholder="Search..."
                        />
                        <i className="input-icon">
                            <ion-icon
                                name="search-outline"
                                role="img"
                                className="md hydrated"
                                aria-label="search outline"
                            ></ion-icon>
                        </i>
                        <span className="ms-1 mt-1 d-inline-block close searchbox-close">
              <i className="ti-close font-xs" onClick={toggleActive}></i>
            </span>
                    </div>
                </form>
            </div>

            <button onClick={toggleOpen} className="header-menu"></button>
            {/* <form action="#" className="float-left header-search">
                <div className="form-group mb-0 icon-input">
                    <i className="feather-search font-lg text-grey-400"></i>
                    <input
                        type="text"
                        placeholder="Start typing to search.."
                        className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
                    />
                </div>
            </form> */}

            <nav className={`navigation scroll-bar ${navClass}`}>
                <div className="container pl-0 pr-0">
                    <div className="nav-content">
                        <div className="nav-top">
                            <Link to="/">
                                {/*<i className="feather-slack text-success display1-size mr-3 ml-3"></i>*/}
                                <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl ml-3 logo-text mb-0">
                  Aneta.
                </span>
                            </Link>
                            <span
                                onClick={toggleOpen}
                                className="close-nav d-inline-block d-lg-none"
                            >
                <i className="ti-close bg-grey mb-4 btn-round-sm font-xssss fw-700 text-dark ml-auto mr-2 "></i>
              </span>
                        </div>
                        {role === "superadmin" ? (
                            <>
                                <div className="nav-caption fw-600 font-xssss text-grey-500">
                                    <span>Super Admin </span>
                                </div>
                                <ul className="mb-3">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/superadmin-verification"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-check-circle mr-3"></i>
                                            <span>Verifikasi Sekolah</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </>
                        ) : null}
                        {role === "admin" ? (
                            <>
                                <div className="nav-caption fw-600 font-xssss text-grey-500">
                                    <span>Admin </span>
                                </div>
                                <ul className="mb-3">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-beranda"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-home mr-3"></i>
                                            <span>Beranda</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-list-tahun-akademik"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-calendar mr-3"></i>
                                            <span>Tahun Akademik</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-profil-sekolah"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-pocket mr-3"></i>
                                            <span>Profil Sekolah</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-data-guru"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-book-open mr-3"></i>
                                            <span>Data Guru</span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-data-kelas"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-user mr-3"></i>
                                            <span>Data Kelas</span>
                                        </NavLink>
                                    </li> */}
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-user mr-2 droupdown-toggle"></i>
                                            <span>Data Kelas</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-tingkat-kelas"
                                                >
                                                    <span>Tambah Tingkat Kelas</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-data-kelas"
                                                >
                                                    <span>Tambah Kelas</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-data-siswa"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-book mr-3"></i>
                                            <span>Data Siswa</span>
                                        </NavLink>
                                    </li>

                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>Data Pelajaran</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-data-matapelajaran"
                                                >
                                                    <span>Data Mata Pelajaran</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-data-kkm-pelajaran"
                                                >
                                                    <span>Data KKM Pelajaran</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-data-pelajaran-kelas"
                                                >
                                                    <span>Data Pelajaran Kelas</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-data-interval-predikat"
                                                >
                                                    <span>Data Interval Predikat</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-jadwal-pelajaran"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-calendar mr-3"></i>
                                            <span>Jadwal Pelajaran</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-kompetensi"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-clipboard mr-3"></i>
                                            <span>Kompetensi</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-perencanaan-nilai"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-layout mr-3"></i>
                                            <span>Perencanaan Penilaian</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-input-nilai"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-database mr-3"></i>
                                            <span>Input Data Nilai</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-capaian-penilaian"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-trending-up mr-3"></i>
                                            <span>Capaian Penilaian</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-input-deskripsi-nilai"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-hard-drive mr-3"></i>
                                            <span>Input Data Deskripsi Nilai</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-input-deskripsi-sikap"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-hard-drive mr-3"></i>
                                            <span>Input Data Deskripsi Sikap</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-kirim-penilaian"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-send mr-3"></i>
                                            <span>Status Penilaian</span>
                                        </NavLink>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>E-Rapor</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-status-penilaian"
                                                >
                                                    <span>Pratinjau Status Penilaian</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-cetak-rapor"
                                                >
                                                    <span>Cetak Rapor</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-pocket mr-2 droupdown-toggle"></i>
                                            <span>EkstraKurikuler</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-data-ekstrakurikuler"
                                                >
                                                    <span>Data Ekstrakurikuler</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/admin-input-data-ekstrakurikuler"
                                                >
                                                    <span>Input Nilai EkstraKurikuler</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </>
                        ) : null}

                        {role === "guru" ? (
                            <>
                                <div className="nav-caption fw-600 font-xssss text-grey-500">
                                    <span>Guru </span>
                                </div>
                                <ul className="mb-3">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-beranda"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-home mr-3"></i>
                                            <span>Beranda</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-create-materi"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-box mr-3"></i>
                                            <span>LMS</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-forum"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-message-square mr-3"></i>
                                            <span>Forum</span>
                                        </NavLink>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>Data Materi</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-data-materi"
                                                >
                                                    <span>Buat Materi</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-materi-pertemuan"
                                                >
                                                    <span>Buat Pertemuan</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-file-text mr-2 droupdown-toggle"></i>
                                            <span>Data Tugas</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-data-tugas"
                                                >
                                                    <span>Buat Tugas</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-tugas-pertemuan"
                                                >
                                                    <span>Buat Pertemuan</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-calendar mr-2 droupdown-toggle"></i>
                                            <span>Jadwal Pelajaran</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-jadwal-pelajaran-kelas"
                                                >
                                                    <span>Mata Pelajaran</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-jadwal-pelajaran-kalender"
                                                >
                                                    <span>Kalender</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>Nilai Tugas</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-nilai-kelas"
                                                >
                                                    <span>Nilai</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>Nilai Rapor</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-kompetensi"
                                                >
                                                    <span>Kompetensi</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-capaian-penilaian"
                                                >
                                                    <span>Capaian Penilaian</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-perencanaan-nilai"
                                                >
                                                    <span>Perencanaan Penilaian</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-input-nilai"
                                                >
                                                    <span>Input Data Nilai</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-input-deskripsi-nilai"
                                                >
                                                    <span>Input Data Deskripsi Nilai</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-input-deskripsi-sikap"
                                                >
                                                    <span>Input Data Deskripsi Sikap</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/guru-kirim-penilaian"
                                                >
                                                    <span>Status Penilaian</span>
                                                </NavLink>
                                            </li>
                                            {isEkskul == "true" ? (
                                                <li className="nav-item">
                                                    <NavLink
                                                        className="navi-link nav-content-bttn open-font"
                                                        to="/guru-input-data-ekstrakurikuler"
                                                    >
                                                        <span>Input Nilai EkstraKurikuler</span>
                                                    </NavLink>
                                                </li>
                                            ) : null}
                                        </ul>
                                    </li>
                                    {isWalikelas == "true" ? (
                                        <li className="has-droupdown nav-item">
                                            <Link to="#" className="navi-link">
                                                <i className="feather-book mr-2 droupdown-toggle"></i>
                                                <span>E-Rapor</span>
                                            </Link>
                                            <ul className="submenu">
                                                <li className="nav-item">
                                                    <NavLink
                                                        className="navi-link nav-content-bttn open-font"
                                                        to="/guru-submit-rapor"
                                                    >
                                                        <span>Publish Rapor</span>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : null}
                                    {/* <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-penilaian"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>Penilaian</span>
                                        </NavLink>
                                    </li> */}
                                    {/* <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-kompetensi"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-clipboard mr-3"></i>
                                            <span>Kompetensi</span>
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </>
                        ) : null}
                        {role === "siswa" ? (
                            <>
                                <div className="nav-caption fw-600 font-xssss text-grey-500">
                                    <span>Siswa </span>
                                </div>
                                <ul className="mb-3">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-beranda"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-home mr-3"></i>
                                            <span>Beranda</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-kelas"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>Kelas Saya</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-forum"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-message-square mr-3"></i>
                                            <span>Forum</span>
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-jadwal-pelajaran"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-calendar mr-3"></i>
                                            <span>Jadwal Pelajaran</span>
                                        </NavLink>
                                    </li> */}
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-calendar mr-2 droupdown-toggle"></i>
                                            <span>Jadwal Pelajaran</span>
                                        </Link>
                                        <ul className="submenu">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="siswa-jadwal-materi"
                                                >
                                                    <span>Materi</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/siswa-jadwal-tugas"
                                                >
                                                    <span>Tugas</span>
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/siswa-jadwal-pelajaran-kalender"
                                                >
                                                    <span>Kalender</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>Nilai</span>
                                        </Link>
                                        <ul className="submenu">
                                            {/* <li className="nav-item">
                                                <NavLink className="navi-link nav-content-bttn open-font" to="/siswa-tugas">
                                                    <span>Tugas</span>
                                                </NavLink>
                                            </li> */}
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/siswa-nilai-pelajaran"
                                                >
                                                    <span>Nilai</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="has-droupdown nav-item">
                                        <Link to="#" className="navi-link">
                                            <i className="feather-book mr-2 droupdown-toggle"></i>
                                            <span>E-Rapor</span>
                                        </Link>
                                        <ul className="submenu">
                                            {/* <li className="nav-item">
                                                <NavLink className="navi-link nav-content-bttn open-font" to="/siswa-status-penilaian">
                                                    <span>Status Penilaian</span>
                                                </NavLink>
                                            </li> */}
                                            <li className="nav-item">
                                                <NavLink
                                                    className="navi-link nav-content-bttn open-font"
                                                    to="/siswa-cetak-rapor"
                                                >
                                                    <span>Cetak Rapor</span>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-kehadiran"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-user mr-3"></i>
                                            <span>Kehadiran</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-kompetensi"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-clipboard mr-3"></i>
                                            <span>Kompetensi</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </>
                        ) : null}
                        {role === "orangtua" ? (
                            <>
                                <div className="nav-caption fw-600 font-xssss text-grey-500">
                                    <span>Orang Tua </span>
                                </div>
                                <ul className="mb-3">
                                    <li className="logo d-none d-xl-block d-lg-block"></li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/orangtua-beranda"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-home mr-3"></i>
                                            <span>Beranda</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/orangtua-data-anak"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-user mr-3"></i>
                                            <span>Data Anak</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/orangtua-nilai-anak"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>Nilai Anak</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/orangtua-erapor-anak"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>E-Rapot Anak</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/orangtua-evaluasi-anak"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-clipboard mr-3"></i>
                                            <span>Evaluasi Anak</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/orangtua-konsultasi-anak"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-user mr-3"></i>
                                            <span>Konsultasi</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </>
                        ) : null}
                        {/*<div className="nav-caption fw-600 font-xssss text-grey-500">*/}
                        {/*    <span>New </span>Feeds*/}
                        {/*</div>*/}
                        {/*<ul className="mb-3">*/}
                        {/*    <li className="logo d-none d-xl-block d-lg-block"></li>*/}
                        {/*    <li>*/}
                        {/*        <NavLink*/}
                        {/*            activeClassName="active"*/}
                        {/*            to="/default"*/}
                        {/*            className="nav-content-bttn open-font"*/}
                        {/*            data-tab="chats"*/}
                        {/*        >*/}
                        {/*            <i className="feather-tv mr-3"></i>*/}
                        {/*            <span>Course Feed</span>*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <NavLink*/}
                        {/*            activeClassName="active"*/}
                        {/*            to="/default-follower"*/}
                        {/*            className=" nav-content-bttn open-font"*/}
                        {/*            data-tab="friends"*/}
                        {/*        >*/}
                        {/*            <i className="feather-shopping-bag mr-3"></i>*/}
                        {/*            <span>Followers</span>*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <NavLink*/}
                        {/*            activeClassName="active"*/}
                        {/*            to="/default-channel"*/}
                        {/*            className="nav-content-bttn open-font"*/}
                        {/*            data-tab="favorites"*/}
                        {/*        >*/}
                        {/*            <i className="feather-globe mr-3"></i>*/}
                        {/*            <span>Explore Channel</span>*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <NavLink*/}
                        {/*            activeClassName="active"*/}
                        {/*            to="/default-live-stream"*/}
                        {/*            className="nav-content-bttn open-font"*/}
                        {/*            data-tab="favorites"*/}
                        {/*        >*/}
                        {/*            <i className="feather-play-circle mr-3"></i>*/}
                        {/*            <span>Live Stream</span>*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*    <li className="flex-lg-brackets">*/}
                        {/*        <NavLink*/}
                        {/*            activeClassName="active"*/}
                        {/*            to="/default-user-profile"*/}
                        {/*            data-tab="archived"*/}
                        {/*            className="nav-content-bttn open-font"*/}
                        {/*        >*/}
                        {/*            <i className="feather-video mr-3"></i>*/}
                        {/*            <span>Saved Course</span>*/}
                        {/*        </NavLink>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}

                        {/*<div className="nav-caption fw-600 font-xssss text-grey-500">*/}
                        {/*    <span>Following </span>Author*/}
                        {/*</div>*/}
                        {/*<ul className="mb-3">*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/default-author-profile"*/}
                        {/*            className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"*/}
                        {/*            data-tab="chats"*/}
                        {/*        >*/}
                        {/*            <img*/}
                        {/*                src="assets/images/user.png"*/}
                        {/*                alt="user"*/}
                        {/*                className="w40 mr-2 rounded-circle"*/}
                        {/*            />*/}
                        {/*            <span>Surfiya Zakir </span>*/}
                        {/*            <span className="circle-icon bg-success mt-3"></span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/default-author-profile"*/}
                        {/*            className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"*/}
                        {/*            data-tab="chats"*/}
                        {/*        >*/}
                        {/*            <img*/}
                        {/*                src="assets/images/user.png"*/}
                        {/*                alt="user"*/}
                        {/*                className="w40 mr-2 rounded-circle"*/}
                        {/*            />*/}
                        {/*            <span>Vincent Parks </span>*/}
                        {/*            <span className="circle-icon bg-warning mt-3"></span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/default-author-profile"*/}
                        {/*            className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"*/}
                        {/*            data-tab="chats"*/}
                        {/*        >*/}
                        {/*            <img*/}
                        {/*                src="assets/images/user.png"*/}
                        {/*                alt="user"*/}
                        {/*                className="w40 mr-2 rounded-circle"*/}
                        {/*            />*/}
                        {/*            <span>Richard Bowers </span>*/}
                        {/*            <span className="circle-icon bg-success mt-3"></span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/default-author-profile"*/}
                        {/*            className="nav-content-bttn open-font pl-2 pb-2 pt-1 h-auto"*/}
                        {/*            data-tab="chats"*/}
                        {/*        >*/}
                        {/*            <img*/}
                        {/*                src="assets/images/user.png"*/}
                        {/*                alt="user"*/}
                        {/*                className="w40 mr-2 rounded-circle"*/}
                        {/*            />*/}
                        {/*            <span>John Lambert </span>*/}
                        {/*            <span className="circle-icon bg-success mt-3"></span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                        {/*<div className="nav-caption fw-600 font-xssss text-grey-500">*/}
                        {/*    <span></span> Account*/}
                        {/*</div>*/}
                        {/*<ul className="mb-3">*/}
                        {/*    <li className="logo d-none d-xl-block d-lg-block"></li>*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/default-settings"*/}
                        {/*            className="nav-content-bttn open-font h-auto pt-2 pb-2"*/}
                        {/*        >*/}
                        {/*            <i className="font-sm feather-settings mr-3 text-grey-500"></i>*/}
                        {/*            <span>Settings</span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/default-analytics"*/}
                        {/*            className="nav-content-bttn open-font h-auto pt-2 pb-2"*/}
                        {/*        >*/}
                        {/*            <i className="font-sm feather-pie-chart mr-3 text-grey-500"></i>*/}
                        {/*            <span>Analytics</span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*    <li>*/}
                        {/*        <Link*/}
                        {/*            to="/message"*/}
                        {/*            className="nav-content-bttn open-font h-auto pt-2 pb-2"*/}
                        {/*        >*/}
                        {/*            <i className="font-sm feather-message-square mr-3 text-grey-500"></i>*/}
                        {/*            <span>Chat</span>*/}
                        {/*            <span className="circle-count bg-warning mt-0">23</span>*/}
                        {/*        </Link>*/}
                        {/*    </li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default AppNoHeader;
