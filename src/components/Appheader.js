import React, {useEffect, useState} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import Darkbutton from '../components/Darkbutton';

function Appheader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    // const [collapseShow, setCollapseShow] = useState("hidden");
    const [role, setRole] = useState("");
    let router = useHistory();


    const toggleOpen = () => setIsOpen(!isOpen);
    const toggleActive = () => setIsActive(!isActive);

    const navClass = `${isOpen ? ' nav-active' : ''}`;
    const searchClass = `${isActive ? ' show' : ''}`;


    useEffect(() => {
        const getStorageRole = localStorage.getItem("role");
        setRole(getStorageRole);
    }, []);

    const _handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    }

    return (
        <div className="middle-sidebar-header bg-white">
            <div className={`app-header-search ${searchClass}`}>
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
            <form action="#" className="float-left header-search">
                <div className="form-group mb-0 icon-input">
                    <i className="feather-search font-lg text-grey-400"></i>
                    <input
                        type="text"
                        placeholder="Start typing to search.."
                        className="bg-transparent border-0 lh-32 pt-2 pb-2 pl-5 pr-3 font-xsss fw-500 rounded-xl w350"
                    />
                </div>
            </form>
            <ul className="d-flex ml-auto right-menu-icon">
                <li>
                    <Link to="#">
                        <span className="dot-count bg-warning"></span>
                        <i className="feather-bell font-xl text-current"></i>
                        <div className="menu-dropdown">
                            <h4 className="fw-700 font-xs mb-4">Notification</h4>
                            <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                                <img
                                    src="assets/images/user-8.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Hendrix Stamp
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">3 min</span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                    There are many variations of pass..
                                </h6>
                            </div>
                            <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                                <img
                                    src="assets/images/user-4.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Goria Coast
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      2 min
                    </span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                    Mobile Apps UI Designer is require..
                                </h6>
                            </div>

                            <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3">
                                <img
                                    src="assets/images/user-7.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Surfiya Zakir
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      1 min
                    </span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                    Mobile Apps UI Designer is require..
                                </h6>
                            </div>
                            <div className="card bg-transparent-card w-100 border-0 pl-5">
                                <img
                                    src="assets/images/user-6.png"
                                    alt="user"
                                    className="w40 position-absolute left-0"
                                />
                                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                                    Victor Exrixon
                                    <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                      30 sec
                    </span>
                                </h5>
                                <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                                    Mobile Apps UI Designer is require..
                                </h6>
                            </div>
                        </div>
                    </Link>
                </li>
                <Darkbutton/>

                <li>
                    <Link to="/message">
                        <i className="feather-message-square font-xl text-current"></i>
                    </Link>
                </li>
                <li>
                    <Link to="#">
                        <span className="dot-count bg-warning"></span>
                        <i className="feather-user font-xl text-current"></i>
                        <div className="menu-dropdown">
                            <h4 className="fw-700 font-xs mb-4">Admin</h4>
                            <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3" onClick={()=> router.push('/default-user-profile')}>
                                <i className="feather-user font-xl text-current w40 position-absolute left-0"></i>
                                <h5 className="font-xsss text-grey-900 mb-1 mt-2 fw-700 d-block">
                                    My Profile
                                </h5>
                            </div>
                            <div className="card bg-transparent-card w-100 border-0 pl-5 mb-3" onClick={_handleLogout}>
                                <i className="feather-log-out font-xl text-current w40 position-absolute left-0"></i>
                                <h5 className="font-xsss text-grey-900 mb-1 mt-2 fw-700 d-block">
                                    Logout
                                </h5>
                            </div>
                        </div>
                    </Link>
                </li>
                <li>
            <span onClick={toggleActive} className="menu-search-icon">
              <i className="feather-search text-grey-900 font-lg"></i>
            </span>
                </li>
            </ul>

            <nav className={`navigation scroll-bar ${navClass}`}>
                <div className="container pl-0 pr-0">
                    <div className="nav-content">
                        <div className="nav-top">
                            <Link to="/">
                                {/*<i className="feather-slack text-success display1-size mr-3 ml-3"></i>*/}
                                <span
                                    className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xl ml-3 logo-text mb-0">
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
                        {role === "admin" ?
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
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/admin-data-kelas"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-user mr-3"></i>
                                            <span>Data Kelas</span>
                                        </NavLink>
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
                                            to="/admin-data-pelajaran"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-book mr-3"></i>
                                            <span>Data Pelajaran</span>
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
                                </ul>
                            </> : null
                        }

                        {role === "guru" ?
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
                                            to="/guru-data-materi"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-book mr-3"></i>
                                            <span>Data Materi</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-data-tugas"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>Data Tugas</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-jadwal-pelajaran"
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
                                            to="/guru-penilaian"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>Penilaian</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/guru-kompetensi"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-clipboard mr-3"></i>
                                            <span>Kompetensi</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </> : null
                        }
                        {role === "siswa" ?
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
                                            to="/siswa-kelas-materi"
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
                                            to="/siswa-jadwal-pelajaran"
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
                                            to="/siswa-tugas-dan-nilai"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-book mr-3"></i>
                                            <span>Tugas dan Nilai</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            activeClassName="active"
                                            to="/siswa-erapot"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-file-text mr-3"></i>
                                            <span>E-Rapot</span>
                                        </NavLink>
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
                            </> : null
                        }
                        {role === "orangtua" ?
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
                                            to="/orangtua-data-anak"
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
                                            to="/orangtua-data-anak"
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
                                            to="/orangtua-data-anak"
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
                                            to="/orangtua-data-anak"
                                            data-tab="archived"
                                            className="nav-content-bttn open-font"
                                        >
                                            <i className="feather-user mr-3"></i>
                                            <span>Konsultasi</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </> : null
                        }
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

export default Appheader;
