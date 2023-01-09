import React, {Fragment, useState, useCallback, useEffect} from 'react';
import Header from '../components/Header';
import Footertwo from '../components/Footertwo';
import Slider from 'react-slick';
// import ParticlesBg from 'particles-bg';
// import ImageViewer from "react-simple-image-viewer";


const blogList = [
    {
        imageUrl: 'blog-01.jpg',
        title: 'Aenean  Dieting Strategies That Almost Always Backfire',
        meta: 'Lifestyle',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold. We are digital agency.',
    },
    {
        imageUrl: 'blog-02.jpg',
        title: 'The doner is a Turkish creation of meat, often lamb.',
        meta: 'Food',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold. We are digital agency.',
    },
    {
        imageUrl: 'blog-03.jpg',
        title: 'The only nutrition program follow & supremely effective',
        meta: 'Lifestyle',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold. We are digital agency.',
    },
];
const brandList = [
    {bimg: 'b-1.png'},
    {bimg: 'b-1.png'},
    {bimg: 'b-1.png'},
    {bimg: 'b-1.png'},
    {bimg: 'b-1.png'},
    {bimg: 'b-1.png'},
];
const feedbackList = [
    {
        imageUrl: 'testimoni-03.jpg',
        name: 'Goria Coast',
        status: 'Digital Marketing Executive',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold.',
    },
    {
        imageUrl: 'testimoni-01.jpg',
        name: 'Thomas Smith',
        status: 'Digital Marketing Executive',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold.',
    },
    {
        imageUrl: 'testimoni-02.jpg',
        name: 'Hurin Seary',
        status: 'Digital Marketing Executive',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold.',
    },
    {
        imageUrl: 'testimoni-03.jpg',
        name: 'Goria Coast',
        status: 'Digital Marketing Executive',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold.',
    },
    {
        imageUrl: 'testimoni-01.jpg',
        name: 'Thomas Smith',
        status: 'Digital Marketing Executive',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold.',
    },
    {
        imageUrl: 'testimoni-02.jpg',
        name: 'Hurin Seary',
        status: 'Digital Marketing Executive',
        des: 'Human coronaviruses are common and are typically associated with mild illnesses, similar to the common cold.',
    },
];

function Homefour() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const data = [
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum1"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum2"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum3"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum4"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum5"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum6"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum7"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum8"
        },
        {
            thumb: "https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg",
            title: "Lorem Ipsum9"
        }
    ];

    const images = data.map(obj => obj.thumb.replace("-small", "-large"));

    const openImageViewer = useCallback(index => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const brandsettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        centerMode: false,
        variableWidth: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    const feedbacksettings = {
        arrows: true,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: false,
        variableWidth: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Fragment>
            <Header/>

            <div className="banner-wrapper bg-lightblue-after">
                <div className="container">
                    {/* <ParticlesBg className="" type="circle" bg={{zIndex: 0, width:"100%", position:"absolute", top:0}} /> */}
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center pt-lg--10 pt-7">
                            <h2 className="fw-700 text-grey-900 display4-size display4-xs-size lh-1 mb-3 aos-init aos-animate">
                                Aplikasi Learning and School Management System
                            </h2>
                            <a
                                href="/register"
                                className="btn border-0 bg-current text-uppercase mt-4 mb-5 mb-4 p-3 text-white fw-700 ls-3 rounded-lg d-inline-block font-xssss btn-light mt-3 w200 aos-init aos-animate"
                            >
                                Daftar Sekarang
                            </a>
                        </div>
                        <div className="col-lg-12">
                            <img
                                src="https://img.freepik.com/free-photo/close-up-student-reading-book_23-2148888822.jpg?t=st=1653954403~exp=1653955003~hmac=2322869823d98c923558c462eea894cc758ecab845a861ba24f0725bf2d1f467"
                                alt="banner"
                                className="img-fluid pt-0 w-100 aos-init aos-animate"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="brand-wrapper pt-5 pb-lg--5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <Slider {...brandsettings}>
                                {brandList.map((value, index) => (
                                    <div key={index} className="text-center">
                                        <img
                                            src={`assets/images/${value.bimg}`}
                                            alt="avater"
                                            className="w100 ml-auto mr-auto"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper pt-5 pt-lg--7">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="page-title style1 col-xl-6 col-lg-8 col-md-10 text-center mb-3">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xl ls-2 alert-success d-inline-block text-success mr-1">
                  Benefits
                </span>
                            <h2 className="text-grey-900 fw-700 font-xxl pb-3 mb-0 mt-3 d-block lh-3">
                                Mengapa memilih <br/> ANETA ?
                            </h2>
                            <p className="fw-300 font-xsss lh-28 text-grey-600">
                                Cara teknologi membantu dunia Pendidikan lebih baik dan berinovasi
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-4 p-3 text-center arrow-right">
                <span className="btn-round-xxxl alert-primary text-primary display1-size open-font fw-900">
                  1
                </span>
                            <h2 className="fw-700 font-xss text-grey-900 mt-4">MENINGKATKAN AKREDITASI SEKOLAH</h2>
                            <p className="fw-500 font-xssss lh-24 text-grey-600 mb-0">
                                Sekolah yang menggunakan aplikasi Learning Management System (LMS) dan system lainnya
                                akan lebih ter-manage
                                dengan baik yang dapat meningkatkan mutu sekolah
                            </p>
                        </div>
                        <div className="col-lg-4 p-3 text-center arrow-right">
                <span className="btn-round-xxxl alert-danger text-danger display1-size open-font fw-900">
                  2
                </span>
                            <h2 className="fw-700 font-xss text-grey-900 mt-4">KEMUDAHAN PENGELOLAAN INTERNAL</h2>
                            <p className="fw-500 font-xssss lh-24 text-grey-600 mb-0">
                                Memudahkan pengelolaan proses bisnis di sekolah, mulai dari penyederhanaan proses hingga
                                monitoring aktivitas
                            </p>
                        </div>
                        <div className="col-lg-4 p-3 text-center arrow-right">
                <span className="btn-round-xxxl alert-success text-success display1-size open-font fw-900">
                  3
                </span>
                            <h2 className="fw-700 font-xss text-grey-900 mt-4">CENTRALIZED & INTEGRATED PLATFORM</h2>
                            <p className="fw-500 font-xssss lh-24 text-grey-600 mb-0">
                                Semua data yang dibutuhkan tersedia dalam I platform yang mudah untuk diintegrasikan
                                dengan system lainnya
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*<div className="feature-wrapper layer-after pt-lg--7 pt-5">*/}
            {/*  <div className="container">*/}
            {/*    <div className="row">*/}
            {/*      <div className="col-lg-7">*/}
            {/*        <img*/}
            {/*          src="https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178626.jpg?t=st=1653954403~exp=1653955003~hmac=31e5e4881e9551a34c3cdc4269f4c55dad3f7e0e1372f9d97e0ece969a9d27eb"*/}
            {/*          alt="banner"*/}
            {/*          className="w-100 img-fluid aos-init aos-animate"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div className="col-lg-4 offset-lg-1">*/}
            {/*        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1">*/}
            {/*          Our feature*/}
            {/*        </span>*/}
            {/*        <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">*/}
            {/*          Personalized Dashboard and Full CMS*/}
            {/*        </h2>*/}
            {/*        <p className="fw-400 font-xsss lh-28 text-grey-500 aos-init aos-animate">*/}
            {/*          Display current, pass, and future course along with task due.*/}
            {/*        </p>*/}
            {/*        <h4 className="font-xssss fw-600 text-grey-500 mb-3 aos-init aos-animate">*/}
            {/*          <i className="ti-check font-xssss mr-2 btn-round-xs alert-success text-success"></i>*/}
            {/*          Unlimited views For anyone validating*/}
            {/*        </h4>*/}
            {/*        <h4 className="font-xssss fw-600 text-grey-500 mb-3 aos-init aos-animate">*/}
            {/*          <i className="ti-check font-xssss mr-2 btn-round-xs alert-success text-success"></i>*/}
            {/*          We enjoy building experiences.*/}
            {/*        </h4>*/}
            {/*        <a*/}
            {/*          href=""*/}
            {/*          className="btn border-0 bg-primary p-3 text-white fw-600 rounded-lg d-inline-block font-xssss btn-light mt-3 w150 aos-init aos-animate"*/}
            {/*        >*/}
            {/*          Learn More*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/*<div className="feature-wrapper layer-after pt-lg--7 pt-5">*/}
            {/*  <div className="container">*/}
            {/*    <div className="row">*/}
            {/*      <div className="col-lg-7 order-lg-2 offset-lg-1">*/}
            {/*        <img*/}
            {/*          src="https://img.freepik.com/free-photo/virtual-classroom-study-space_23-2149178640.jpg"*/}
            {/*          alt="banner"*/}
            {/*          className="w-100 aos-init aos-animate"*/}
            {/*        />*/}
            {/*      </div>*/}

            {/*      <div className="col-lg-4 order-lg-1 pt-lg--5">*/}
            {/*        <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-danger d-inline-block text-danger mr-1">*/}
            {/*          Our feature*/}
            {/*        </span>*/}
            {/*        <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">*/}
            {/*          Fitur Aneta #2*/}
            {/*        </h2>*/}
            {/*        <p className="fw-400 font-xsss lh-28 text-grey-500 aos-init aos-animate">*/}
            {/*          orem ipsum dolor sit amet, consectetur adipisicing elit, sed*/}
            {/*          do eiusmod tempor incididunt ut labore et dol ad minim veniam,*/}
            {/*          quis nostrud exercitation*/}
            {/*        </p>*/}
            {/*        <h4 className="font-xssss fw-600 text-grey-500 mb-3 aos-init aos-animate">*/}
            {/*          <i className="ti-check font-xssss mr-2 btn-round-xs alert-danger text-danger"></i>*/}
            {/*          Unlimited views For anyone validating*/}
            {/*        </h4>*/}
            {/*        <h4 className="font-xssss fw-600 text-grey-500 mb-3 aos-init aos-animate">*/}
            {/*          <i className="ti-check font-xssss mr-2 btn-round-xs alert-danger text-danger"></i>*/}
            {/*          We enjoy building experiences.*/}
            {/*        </h4>*/}
            {/*        <a*/}
            {/*          href=""*/}
            {/*          className="btn border-0 bg-primary p-3 text-white fw-600 rounded-lg d-inline-block font-xssss btn-light mt-3 w150 aos-init aos-animate"*/}
            {/*        >*/}
            {/*          Learn More*/}
            {/*        </a>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <img
                                src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1102&q=80"
                                alt="banner"
                                className="w-100 img-fluid aos-init aos-animate"
                            />
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Personalized Dashboard and Full CMS
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Display current, pass, and future course along with task due.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 order-lg-2 offset-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                alt="banner"
                                className="w-100 aos-init aos-animate"
                            />
                        </div>

                        <div className="col-lg-4 order-lg-1 pt-lg--5">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-danger d-inline-block text-danger mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Collaborative tools and activities
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Work and learn together in forums, wikis, glossaries, database activities and much.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <img
                                src="https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsZW5kYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt="banner"
                                className="w-100 img-fluid aos-init aos-animate"
                            />
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                All-in-one calendar
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Calendar tools help to keep track your academic, course deadlines, personal events, etc.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 order-lg-2 offset-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1464865885825-be7cd16fad8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjF8fGZpbGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt="banner"
                                className="w-100 aos-init aos-animate"
                            />
                        </div>

                        <div className="col-lg-4 order-lg-1 pt-lg--5">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-danger d-inline-block text-danger mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Convenient file management
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Drag and drop files from cloud storage services including MS OneDrive, Dropbox, and
                                Google Drive.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <img
                                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bm90aWZpY2F0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="banner"
                                className="w-100 img-fluid aos-init aos-animate"
                            />
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Notifications
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Users can receive automatic alerts on new assignments and deadlines, forum posts and
                                also send private messages to one another.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 order-lg-2 offset-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWN0aXZpdHklMjBwcm9ncmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="banner"
                                className="w-100 aos-init aos-animate"
                            />
                        </div>

                        <div className="col-lg-4 order-lg-1 pt-lg--5">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-danger d-inline-block text-danger mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Track progress
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Educators and learners can track progress and completion with an array of options for
                                tracking individual activities or resources and at course level.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <img
                                src="https://images.unsplash.com/photo-1642543492563-173752101d4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHRleHQlMjBlZGl0b3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                                alt="banner"
                                className="w-100 img-fluid aos-init aos-animate"
                            />
                        </div>
                        <div className="col-lg-4 offset-lg-1">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Simple and intuitive text editor
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Format text and conveniently add media and images with an editor that works across all
                                web browsers and devices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="feature-wrapper layer-after pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 order-lg-2 offset-lg-1">
                            <img
                                src="https://images.unsplash.com/photo-1588058365815-c96ac30ee30f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG1vYmlsZSUyMGFuZCUyMGxhcHRvcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                alt="banner"
                                className="w-100 aos-init aos-animate"
                            />
                        </div>

                        <div className="col-lg-4 order-lg-1 pt-lg--5">
                <span
                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 mt-4 text-uppercase rounded-xl ls-2 alert-danger d-inline-block text-danger mr-1">
                  Our feature
                </span>
                            <h2 className="text-grey-900 fw-700 display1-size pb-3 mb-0 mt-3 d-block lh-3 aos-init aos-animate">
                                Flexible Design and Mobile Device Support
                            </h2>
                            <p className="fw-400 font-xsss lh-28 text-grey-600 aos-init aos-animate">
                                Designed to be responsive and accessible, the interface is flexible to customizing on
                                both
                                desktop and mobile devices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className="blog-page bg-white pt-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="page-title style1 col-xl-6 col-lg-8 col-md-10 text-center mb-5">
                <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1">
                  Blog
                </span>
                <h2 className="text-grey-900 fw-700 font-xxl pb-3 mb-0 mt-3 d-block lh-3">
                  Dont Miss Out Our Story
                </h2>
                <p className="fw-300 font-xssss lh-28 text-grey-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dol ad minim veniam,
                  quis nostrud exercitation
                </p>
              </div>
            </div>
            <div className="row">
              {blogList.map((value, index) => (
                <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                  <article className="post-article p-0 border-0 shadow-xss rounded-lg overflow-hidden aos-init aos-animate">
                    <Link to="/blog-single">
                      <img
                        src={`assets/images/${value.imageUrl}`}
                        alt="blog"
                        className="w-100"
                      />
                    </Link>
                    <div className="post-content p-4">
                      <h6 className="font-xsss text-success fw-600 float-left">
                        {value.meta}
                      </h6>
                      <h6 className="font-xssss text-grey-500 fw-600 ml-3 float-left">
                        <i className="ti-time mr-2"></i> 24 May 2020
                      </h6>
                      <h6 className="font-xssss text-grey-500 fw-600 ml-3 float-left">
                        <i className="ti-user mr-2"></i> Jack Robin
                      </h6>
                      <div className="clearfix"></div>
                      <h2 className="post-title mt-2 mb-2 pr-3">
                        <Link
                          to="/blog-single"
                          className="lh-30 font-sm mont-font text-grey-800 fw-700"
                        >
                          {value.title}
                        </Link>
                      </h2>
                      <p className="font-xsss fw-400 text-grey-500 lh-26 mt-0 mb-2 pr-3">
                        {value.des}
                      </p>
                      <Link
                        to="/blog-single"
                        className="rounded-xl text-white bg-current w125 p-2 lh-32 font-xsss text-center fw-500 d-inline-block mb-0 mt-2"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div> */}

            {/* <div id="portfolio" className="text-center">
          <div className="container">
            <div className="section-title">
              <span className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xl ls-2 alert-warning d-inline-block text-warning mr-1 mb-3">
                Gallery
              </span>
              <h2 className="text-grey-900 fw-700 font-xxl pb-3 mb-0 mt-3 d-block lh-3">
                Let's See Our Activity
              </h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed dapibus leonec.</p>
            </div>
            <div className="row">
              {data.map(({ title, thumb }, index) => (
                <div key={index} onClick={() => openImageViewer(index)} className="col-sm-6 col-md-4 col-lg-4">
                  <div className="portfolio-item cursor-pointer">
                    <div className="hover-bg">
                      <div className="hover-text">
                        <h4>{title}</h4>
                      </div>
                      <img src={thumb} className="img-responsive" alt="Project Title" />{" "}
                    </div>
                  </div>
                </div>
              ))}

              {isViewerOpen && (
                <ImageViewer
                  src={images}
                  backgroundStyle={{ zIndex: 99999 }}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                />
              )}
            </div>
          </div>
        </div> */}

            <div className="feedback-wrapper pt-lg--7 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 text-left pb-0">
                            <h2 className="text-grey-800 fw-700 font-xl lh-2">
                                Apa Kata Mereka Tentang Aneta ?
                            </h2>
                        </div>

                        <div className="col-lg-12 p-0">
                            <Slider {...feedbacksettings}>
                                {feedbackList.map((value, index) => (
                                    <div key={index} className="text-center py-4 px-3">
                                        <div className="card w-100 p-5 text-left border-0 shadow-xss rounded-lg">
                                            <div className="card-body pl-0 pt-0">
                                                <img
                                                    src={`assets/images/${value.imageUrl}`}
                                                    alt="user"
                                                    className="w45 float-left mr-3 rounded-circle"
                                                />
                                                <h4 className="text-grey-900 fw-700 font-xsss mt-0 pt-1">
                                                    {value.name}
                                                </h4>
                                                <h5 className="font-xssss fw-500 mb-1 text-grey-500">
                                                    {value.status}
                                                </h5>
                                            </div>
                                            <p className="font-xsss fw-400 text-grey-500 lh-28 mt-0 mb-0 ">
                                                {value.des}
                                            </p>
                                            <div className="star d-block w-100 text-right mt-4 mb-0">
                                                <img
                                                    src="assets/images/star.png"
                                                    alt="star"
                                                    className="w15 mr-1 float-left mr-2"
                                                />
                                                <img
                                                    src="assets/images/star.png"
                                                    alt="star"
                                                    className="w15 mr-1 float-left mr-2"
                                                />
                                                <img
                                                    src="assets/images/star.png"
                                                    alt="star"
                                                    className="w15 mr-1 float-left mr-2"
                                                />
                                                <img
                                                    src="assets/images/star.png"
                                                    alt="star"
                                                    className="w15 mr-1 float-left mr-2"
                                                />
                                                <img
                                                    src="assets/images/star.png"
                                                    alt="star"
                                                    className="w15 mr-1 float-left mr-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pt-lg--5 pb-lg--5 mb-3">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-8">
                        <h1 className="text-gray-800 strong font-xxl my-2">Coba Gratis Sekarang?</h1>
                        <p className="text-gray-700 font-xxl py-2 mb-2">Daftar atau Hubungi Kami .</p>
                    </div>
                    <div className="col-lg-6 text-center col-md-8">
                        <button className='bg-black font-xs px-5 py-2 text-white rounded-lg mx-1 mb-2'>Daftar Sekarang
                        </button>
                        <button className='bg-white font-xs px-5 py-2 text-black rounded-lg mx-1'>Kontak Kami</button>
                    </div>
                </div>
            </div>
            <Footertwo/>
        </Fragment>
    );
}

export default Homefour;
