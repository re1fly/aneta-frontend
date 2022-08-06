import React, {Fragment, useEffect, useRef, useState} from "react";
import Adminfooter from "../../components/Adminfooter";
import Navheader from "../../components/Navheader";
import Appheader from "../../components/Appheader";
import {
    Dropdown,
    Menu,
    PageHeader,
    message,
    Card,
    Row,
    Col,
    Button,
    Tag,
    Space,
    notification,
    Table,
    Divider,
    Tooltip,
    DatePicker,
} from "antd";
import {
    AppstoreOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    EllipsisOutlined, EyeOutlined,
    MenuOutlined,
    PlusOutlined,
    SearchOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import ImgCrop from "antd-img-crop";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import {BASE_URL} from "../../api/Url";
import pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import {useDispatch, useSelector} from "react-redux";
import {searchGlobal} from "../../redux/Action";
import {FormAdminSiswa} from "../../components/form/AdminSiswa";
import {DataFormSiswaCreate} from "../../components/form/AdminSiswaCreate";
import Swal from "sweetalert2";
import {dateNow} from "../../components/misc/date";
import {FilterAcademic} from "../../components/FilterAcademic";

function DataSiswaAdmin() {
    const [grid, setGrid] = useState(false);
    const [isViewSiswa, setIsViewSiswa] = useState(true);
    const [fileList, setFileList] = useState([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);
    const [getSiswa, setGetSiswa] = useState([]);
    const [refreshState, setRefreshState] = useState(false);
    const [btnPagination, setBtnPagination] = useState([]);
    const [paramsPage, setParamsPage] = useState("1");
    const [dataClass, setDataClass] = useState();
    const [kelasSiswa, setKelasSiswa] = useState([]);
    const academicYear = localStorage.getItem("academic_year");
    const [academic, setAcademic] = useState(academicYear);
    const [academicYears, setAcademicYears] = useState([]);
    const institute = localStorage.getItem("institute");
    const [isViewEdit, setIsViewEdit] = useState(false);
    const [isViewCreate, setIsViewCreate] = useState(false);
    const [isViewDetail, setIsViewDetail] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    console.log(selectedUser)

    const [dataProvinsi, setDataProvinsi] = useState();
    const [dataKota, setDataKota] = useState();
    const [dataKecamatan, setDataKecamatan] = useState();
    const [dataKelurahan, setDataKelurahan] = useState();

    const dispatch = useDispatch();
    const searchRedux = useSelector((state) => state.search);
    const DataSearch = searchRedux.DataSearch;

    useEffect(() => {
        setRefreshState(false)
        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_students",
                                "select": [
                                    "x_academic_students.*",
                                    "x_academic_year.*",
                                    "users.*",
                                    "x_academic_class.*",
                                    "m_user_profile.*",
                                    "r_city.city",
                                    "r_state.state",
                                    "r_district.district",
                                    "r_sub_district.sub_district",
                                    "x_academic_students.id as id_siswa"
                                ],
                                "paginate": 10,
                                "join": [
                                    {
                                        "tbl_join": "x_academic_year",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_students",
                                        "foregenkey": "academic_year_id"
                                    },
                                    {
                                        "tbl_join": "users",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_students",
                                        "foregenkey": "user_id"
                                    },
                                    {
                                        "tbl_join": "x_academic_class",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_students",
                                        "foregenkey": "class_id"
                                    },
                                    {
                                        "tbl_join": "m_user_profile",
                                        "refkey": "user_id",
                                        "tbl_join2": "x_academic_students",
                                        "foregenkey": "user_id"
                                    },
                                    {
                                        "tbl_join": "r_district",
                                        "refkey": "id",
                                        "tbl_join2": "m_user_profile",
                                        "foregenkey": "district_id"
                                    },
                                    {
                                        "tbl_join": "r_state",
                                        "refkey": "id",
                                        "tbl_join2": "m_user_profile",
                                        "foregenkey": "state_id"
                                    },
                                    {
                                        "tbl_join": "r_sub_district",
                                        "refkey": "id",
                                        "tbl_join2": "m_user_profile",
                                        "foregenkey": "sub_discrict_id"
                                    },
                                    {
                                        "tbl_join": "r_city",
                                        "refkey": "id",
                                        "tbl_join2": "m_user_profile",
                                        "foregenkey": "city_id"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_students",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    },
                                    {
                                        "tbl_coloumn": "x_academic_students",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    },
                                    {
                                        "tbl_coloumn": "x_academic_class", // => update dari syamsul
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_academic_students.updated_at",
                                "order_by": "desc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": paramsPage
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                const siswa = JSON.parse(response.data.variables[3].value);
                setGetSiswa(siswa.data.data);

                const pagination = siswa.data.links;
                setBtnPagination(pagination);
            });

        axios.post(BASE_URL, {
                "processDefinitionId": 'getdatajoinwhere:2:d2aed4a7-dff4-11ec-a658-66fc627bf211',
                "returnVariables": true,
                "variables": [
                    {
                        "name": "global_join_where",
                        "type": "json",
                        "value": {
                            "tbl_induk": "x_academic_year",
                            "select": [
                                "x_academic_year.id as id_academic",
                                "x_academic_year.academic_year",
                                "m_institutes.id", "x_academic_year.semester"
                            ],
                            "paginate": 1000,
                            "join": [
                                {
                                    "tbl_join": "m_institutes",
                                    "foregenkey": "institute_id",
                                    "refkey": "id"
                                }
                            ],
                            "where": [
                                {
                                    "tbl_coloumn": "x_academic_year",
                                    "tbl_field": "institute_id",
                                    "tbl_value": institute,
                                    "operator": "="
                                }
                            ],
                            "order_coloumn": "x_academic_year.academic_year",
                            "order_by": "asc"
                        }
                    },
                    {
                        "name": "page",
                        "type": "string",
                        "value": "1"
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const academics = JSON.parse(response.data.variables[3].value);
            setAcademicYears(academics.data.data);
        })


        axios
            .post(
                BASE_URL,
                {
                    "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_get_where",
                            "type": "json",
                            "value": {
                                "tbl_name": "x_academic_class",
                                "pagination": false,
                                "total_result": 2,
                                "order_coloumn": "x_academic_class.class",
                                "order_by": "asc",
                                "data": [
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    },
                                    {
                                        "kondisi": "where",
                                        "tbl_coloumn": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "tbl_coloumn": [
                                    "*"
                                ]
                            }
                        }
                    ]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                const dataClass = JSON.parse(response.data.variables[2].value);
                setDataClass(dataClass);
            })
    }, [academic, paramsPage, refreshState, isViewSiswa]);

    useEffect(() => {
        if (DataSearch != "") {
            setGetSiswa(DataSearch?.data?.data);
            setBtnPagination(DataSearch?.data?.links);
        }
    }, [DataSearch]);

    // useEffect(()=> {
    //     axios.post(BASE_URL, {
    //             "processDefinitionId": "getwherenojoin:2:8b42da08-dfed-11ec-a2ad-3a00788faff5",
    //             "returnVariables": true,
    //             "variables": [
    //                 {
    //                     "name": "global_get_where",
    //                     "type": "json",
    //                     "value": {
    //                         "tbl_name": "x_academic_class",
    //                         "pagination": false,
    //                         "total_result": 2,
    //                         "order_coloumn": "x_academic_class.class",
    //                         "order_by": "asc",
    //                         "data": [
    //                             {
    //                                 "kondisi": "where",
    //                                 "tbl_coloumn": "academic_year_id",
    //                                 "tbl_value": academic,
    //                                 "operator": "="
    //                             }
    //                         ],
    //                         "tbl_coloumn": [
    //                             "*"
    //                         ]
    //                     }
    //                 }
    //             ]
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         }
    //     ).then(function (response) {
    //         const resClass = response.data.variables[2].value;
    //         setDataClass(resClass)
    //     });
    // }, [academic])


    const onChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const _onSelectMenu = ({key}) => {
        message.info(`Click on item ${key}`);
    };

    const _account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Delete</Menu.Item>
        </Menu>
    );

    const _filterMenu = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">1st filter</Menu.Item>
            <Menu.Item key="2">2nd filter</Menu.Item>
            <Menu.Item key="3">3rd filter</Menu.Item>
        </Menu>
    );

    const _sortMenu = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">1st sort</Menu.Item>
            <Menu.Item key="2">2nd sort</Menu.Item>
            <Menu.Item key="3">3rd sort</Menu.Item>
        </Menu>
    );

    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results);
    };

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result);
    };

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item);
    };

    const handleOnFocus = () => {
        console.log("Focused");
    };

    const formatResult = (item) => {
        return (
            <>
                <span style={{display: "block", textAlign: "left"}}>{item.name}</span>
            </>
        );
    };

    const _onSearch = (value) => {
        const processDef =
            "globaljoinsubwhereget:1:f0387a49-eaeb-11ec-9ea6-c6ec5d98c2df";
        const variableSearch = {
            "name": "global_join_where_sub",
            "type": "json",
            "value": {
                "tbl_induk": "x_academic_students",
                "paginate": 1000,
                "select": [
                    "x_academic_students.*",
                    "x_academic_year.*",
                    "users.*",
                    "x_academic_class.*",
                    "m_user_profile.*",
                    "r_city.city",
                    "r_state.state",
                    "r_district.district",
                    "r_sub_district.sub_district",
                    "x_academic_students.id as id_siswa"
                ],
                "join": [
                    {
                        "tbl_join": "x_academic_year",
                        "refkey": "id",
                        "tbl_join2": "x_academic_students",
                        "foregenkey": "academic_year_id"
                    },
                    {
                        "tbl_join": "users",
                        "refkey": "id",
                        "tbl_join2": "x_academic_students",
                        "foregenkey": "user_id"
                    },
                    {
                        "tbl_join": "x_academic_class",
                        "refkey": "id",
                        "tbl_join2": "x_academic_students",
                        "foregenkey": "class_id"
                    },
                    {
                        "tbl_join": "m_user_profile",
                        "refkey": "user_id",
                        "tbl_join2": "x_academic_students",
                        "foregenkey": "user_id"
                    },
                    {
                        "tbl_join": "r_district",
                        "refkey": "id",
                        "tbl_join2": "m_user_profile",
                        "foregenkey": "district_id"
                    },
                    {
                        "tbl_join": "r_state",
                        "refkey": "id",
                        "tbl_join2": "m_user_profile",
                        "foregenkey": "state_id"
                    },
                    {
                        "tbl_join": "r_sub_district",
                        "refkey": "id",
                        "tbl_join2": "m_user_profile",
                        "foregenkey": "sub_discrict_id"
                    },
                    {
                        "tbl_join": "r_city",
                        "refkey": "id",
                        "tbl_join2": "m_user_profile",
                        "foregenkey": "city_id"
                    }
                ],
                "kondisi": [
                    {
                        "keterangan": "where",
                        "kolom": "x_academic_students.academic_year_id",
                        "value": academic
                    },
                    {
                        "keterangan": "deleted_at",
                        "kolom": "x_academic_students.deleted_at"
                    }
                ],
                "where": [
                    {
                        "tbl_coloumn": "m_user_profile",
                        "tbl_field": "nisn",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "users",
                        "tbl_field": "name",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "m_user_profile",
                        "tbl_field": "date_of_birth",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    },
                    {
                        "tbl_coloumn": "users",
                        "tbl_field": "email",
                        "tbl_value": value,
                        "operator": "ILIKE"
                    }
                ],
                "order_coloumn": "users.name",
                "order_by": "asc"
            }
        }
        dispatch(searchGlobal(value, paramsPage, processDef, variableSearch));
    };

    const columns = [
        {
            title: "no",
            dataIndex: "no",
        },
        {
            title: "NISN",
            dataIndex: "nis",
        },
        {
            title: "Name",
            dataIndex: "namaSiswa",
            filters: [
                {
                    text: "Agung",
                    value: "Agung",
                },
                {
                    text: "Budi",
                    value: "Budi",
                },
                {
                    text: "Ms. Libby Bernhard DDS",
                    value: "Ms. Libby Bernhard DDS",
                },
                {
                    text: "samsul",
                    value: "samsul",
                },
                {
                    text: "Shyann Kirlin Sr",
                    value: "Shyann Kirlin Sr",
                },
            ],
            onFilter: (value, record) => record.namaSiswa.indexOf(value) === 0,
            // sorter: (a, b) => a.namaSiswa.length - b.namaSiswa.length,
            sortDirection: ["descend"],
        },
        {
            title: "Tanggal Lahir",
            dataIndex: "tanggalLahir",
            responsive: ["sm"],
            // sorter: (a, b) => a.tanggalLahir - b.tanggalLahir,
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <>
                    {status.map((status) => {
                        let color = status.length > 5 ? "red" : "green";
                        return (
                            <Tag style={{borderRadius: "15px"}} color={color} key={status}>
                                {status ? "Aktif" : "Nonaktif"}
                            </Tag>
                        );
                    })}
                </>
            ),
            filters: [
                {
                    text: "Aktif",
                    value: "aktif",
                },
                {
                    text: "Nonaktif",
                    value: "nonAktif",
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: "Aksi",
            key: "action",
            responsive: ["sm"],
            render: (text, record) => (
                <Space size="middle">
                    <EyeOutlined style={{color: "black"}} onClick={() => viewDetailSiswa(record)}/>
                    <EditOutlined style={{color: "blue"}} onClick={() => viewEditSiswa(record)}/>
                    <DeleteOutlined
                        style={{color: "red"}}
                        onClick={() => deleteSiswa(record)}
                    />
                </Space>
            ),
        },
    ];

    const channelList = getSiswa.map((siswa, index) => {
        // const dataBirth = siswa.date_of_birth;
        // const [year, month, day] = dataBirth.split("-");
        // const birthDate = `${day}-${month}-${year}`;

        return {
            no: index + 1,
            id: siswa.id_siswa,
            user_id: siswa.user_id,
            id_profile: siswa.id,
            nis: siswa.nisn,
            imageUrl: "user.png",
            namaSiswa: siswa.name,
            tanggalLahir: siswa.date_of_birth,
            tempatLahir: siswa.place_of_birth,
            email: siswa.email,
            kelas: siswa.class,
            sub_kelas: siswa.sub_class,
            idKelas: siswa.class_id,
            noHp: siswa.mobile_phone,
            tag1: "",
            tag2: siswa.class,
            tag3: "",
            provinsi: siswa.state,
            idProvinsi: siswa.state_id,
            kota: siswa.city,
            idKota: siswa.city_id,
            kec: siswa.district,
            idKec: siswa.district_id,
            kel: siswa.sub_district,
            idKel: siswa.sub_discrict_id,
            alamat: siswa.address,
            status: [JSON.stringify(siswa.student_status_id)],
        };
    });

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }


    const CardDataSiswa = () => (
        <div className="middle-sidebar-left mt-3">
            <div className="row">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-md rounded-lg p-4 border-0 text-center">
              <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                Aktif
              </span>
                            <Dropdown
                                className="position-absolute right-0 mr-4 top-0 mt-3"
                                overlay={_Account}
                            >
                                <EllipsisOutlined/>
                            </Dropdown>

                            <a
                                href="/default-channel"
                                className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
                            <h4 className="fw-700 font-xs mt-3 mb-3">{value.namaSiswa}</h4>
                            <div className="clearfix"></div>
                            {value.tag1 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                  {value.tag1}
                </span>
                            ) : (
                                ""
                            )}
                            {value.tag2 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                  {value.tag2}
                </span>
                            ) : (
                                ""
                            )}
                            {value.tag3 ? (
                                <span
                                    className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                  {value.tag3}
                </span>
                            ) : (
                                ""
                            )}
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-3">
                                        <p className="font-xssss float-left lh-1">NISN</p>
                                    </div>
                                    <div className="col-9">
                                        <p className="font-xssss float-left lh-1">: {value.nis}</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-3">
                                        <p className="font-xssss float-left lh-1">TTL</p>
                                    </div>
                                    <div className="col-9">
                                        <p className="font-xssss float-left lh-1">
                                            : {value.tempatLahir}, {value.tanggalLahir}
                                        </p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-3">
                                        <p className="font-xssssa float-left lh-1">Email</p>
                                    </div>
                                    <div className="col-9">
                                        <p className="font-xssss float-left lh-1">
                                            :{" "}
                                            {value.email.length > 20
                                                ? value.email.substring(0, 20) + "..."
                                                : value.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const TableDataSiswa = () => (
        <>
            <Table
                className="mt-4"
                columns={columns}
                dataSource={channelList}
                onChange={onChangeTable}
                pagination={false}
                rowClassName="bg-greylight text-grey-900"
                scroll={{x: 400}}
            />
            <div className="text-center mt-4">
                {btnPagination.map((dataBtn) => {
                    const labelBtn = dataBtn.label;
                    const label = labelBtn
                        .replace(/(&laquo\;)/g, "")
                        .replace(/(&raquo\;)/g, "");
                    let linkUrl = dataBtn.url;

                    if (linkUrl != null) {
                        linkUrl = linkUrl.substr(linkUrl.indexOf("=") + 1);
                    }

                    return (
                        <Button
                            className="btn btn-primary mr-2 font-xssss fw-600"
                            disabled={linkUrl == null ? true : false}
                            onClick={() => {
                                setParamsPage(linkUrl);
                            }}
                        >
                            {label}
                        </Button>
                    );
                })}
            </div>
        </>
    );

    const ViewSiswa = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Data Siswa"
                        />
                    </div>
                </div>
                {/* <Card className="card bg-lightblue border-0 text-grey-900"> */}
                <Card className="card bg-lightblue border-0 mb-4 text-grey-900">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 my-2">
                            <Button
                                className="mr-4"
                                type="primary"
                                shape="round"
                                size="middle"
                                onClick={viewCreateSiswa}
                            >
                                Tambah Data
                            </Button>
                            <FilterAcademic
                                academicNow={academic}
                                id="filter_academic_data_siswa"
                                getYear={(e) => {
                                const {  options, selectedIndex } = e.target;
                                const year =(options[selectedIndex].text)
                                setAcademic(e.target.value)
                                notification.info({
                                    message: "Tahun Akademik",
                                    description: 'Memilih Data Akademik tahun ' + year,
                                    placement: 'top'
                                })
                            }}
                                            selectYear={academicYears.map((data) => {
                                                    return (
                                                        <>
                                                            <option value={data.id_academic}>
                                                                {data.academic_year} Semester {data.semester}
                                                            </option>
                                                        </>
                                                    )
                                                }
                                            )}/>
                            {/* <Dropdown overlay={_filterMenu}>
                                <a className="ant-dropdown-link mr-4 font-bold"
                                   onClick={e => e.preventDefault()}>
                                    Filter by <DownOutlined/>
                                </a>
                            </Dropdown>
                            <Dropdown overlay={_sortMenu}>
                                <a
                                    className="ant-dropdown-link font-bold"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Sort by <DownOutlined />
                                </a>
                            </Dropdown> */}
                        </div>
                        <div className="col-lg-4 col-md-6 my-2">
                            {/*<div className="float-right">*/}
                            <Search
                                className="mr-3"
                                placeholder="Cari kata kunci"
                                allowClear
                                onSearch={_onSearch}
                                style={{width: "80%"}}
                            />
                            {grid == false ? (
                                <a>
                                    <AppstoreOutlined
                                        style={{fontSize: "2em", lineHeight: 1}}
                                        onClick={() => setGrid(true)}
                                    />
                                </a>
                            ) : (
                                <a>
                                    <MenuOutlined
                                        style={{fontSize: "2em", lineHeight: 1}}
                                        onClick={() => setGrid(false)}
                                    />
                                </a>
                            )}
                        </div>
                        {/*</div>*/}
                    </div>
                </Card>

                {grid ? <CardDataSiswa/> : <TableDataSiswa/>}
            </div>
        );
    };


    const viewCreateSiswa = () => {
        setIsViewCreate(true)
        setIsViewSiswa(false)
        setIsViewEdit(false)
        setIsViewDetail(false)
    }

    const viewEditSiswa = (record) => {
        console.log(record)
        setSelectedUser(record)
        setIsViewEdit(true)
        setIsViewCreate(false)
        setIsViewSiswa(false)
        setIsViewDetail(false)
    }

    const viewDetailSiswa = (record) => {
        setSelectedUser(record)
        setIsViewCreate(false)
        setIsViewSiswa(false)
        setIsViewEdit(false)
        setIsViewDetail(true)
    }

    const createSiswa = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }

        axios
            .post(
                BASE_URL,
                {
                    processDefinitionId: "82732e05-fe5e-11ec-ac5e-66fc627bf211",
                    returnVariables: true,
                    variables: [
                        {
                            name: "validasi",
                            type: "json",
                            value: {
                                data: {
                                    user_email: "required",
                                    user_name: "required",
                                    user_role_id: "required",
                                    user_email_verified_at: "required",
                                    user_password: "required",
                                    user_institute: "required",
                                    user_nisn: "required|unique:m_user_profile,nisn",
                                    user_place_of_birth: "required",
                                    user_date_of_birth: "required",
                                    user_mobile_phone: "required",
                                    user_state_id: "required",
                                    user_city_id: "required",
                                    user_district_id: "required",
                                    user_sub_discrict_id: "required",
                                    user_address: "required",
                                    user_image: "required",
                                    user_image_type: "required",
                                    user_academic_year_id: "required",
                                    user_register_date: "required",
                                    user_class_id: "required",
                                    ortuakun_name: "required",
                                    ortuakun_email: "required",
                                    ortuakun_user_role_id: "required",
                                    ortuakun_email_verified_at: "required",
                                    ortuakun_password: "required",
                                    ortu_name: "required",
                                    ortu_year_of_birth: "required",
                                    ortu_graduate_id: "required",
                                    ortu_profession: "required",
                                    ortu_income_range_id: "required",
                                    ortu_nik: "required",
                                    ortu_r_state: "required",
                                    ortu_r_city: "required",
                                    ortu_r_district: "required",
                                    ortu_r_sub_district: "required",
                                    ortu_address: "required",
                                },
                                user_email: data.email_siswa,
                                user_name: data.nama_siswa,
                                user_role_id: 3,
                                user_email_verified_at: dateNow,
                                user_password:
                                    "$2a$12$4Qy.9BLBPpRlwl2eboY3xeTAld8ukLjfmc2s6gH6PfmFFQb4WcCW6",
                                user_nisn: data.nisn_siswa,
                                user_place_of_birth: data.tempatlahir_siswa,
                                user_date_of_birth: data.tanggallahir_siswa,
                                user_mobile_phone: data.hp_siswa,
                                user_state_id: data.provinsi_siswa,
                                user_city_id: data.kota_siswa,
                                user_district_id: data.kecamatan_siswa,
                                user_sub_discrict_id: data.kelurahan_siswa,
                                user_address: data.alamat_siswa,
                                user_image:
                                    "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",
                                user_image_type: "png",
                                user_academic_year_id: academic,
                                user_register_date: dateNow,
                                user_class_id: data.idclass_siswa,
                                user_institute: institute,
                                ortuakun_name: data.nama_ortu,
                                ortuakun_email: data.email_ortu,
                                ortuakun_user_role_id: 4,
                                ortuakun_email_verified_at: dateNow,
                                ortuakun_password:
                                    "$2a$12$4Qy.9BLBPpRlwl2eboY3xeTAld8ukLjfmc2s6gH6PfmFFQb4WcCW6",
                                ortu_name: data.nama_ortu,
                                ortu_year_of_birth: data.tahunlahir_ortu,
                                ortu_graduate_id: "1",
                                ortu_profession: data.profesi_ortu,
                                ortu_income_range_id: data.penghasilan_ortu,
                                ortu_nik: data.nik_ortu,
                                ortu_r_state: data.provinsi_ortu,
                                ortu_r_city: data.kota_ortu,
                                ortu_r_district: data.kecamatan_ortu,
                                ortu_r_sub_district: data.kelurahan_ortu,
                                ortu_address: data.alamat_ortu,
                            },
                        },
                        {
                            name: "user_email",
                            type: "string",
                            value: data.email_siswa,
                        },
                        {
                            name: "ortu_email",
                            type: "string",
                            value: data.email_ortu,
                        },
                        {
                            name: "users",
                            type: "json",
                            value: {
                                tbl_name: "usersModel",
                                tbl_coloumn: {
                                    name: data.nama_siswa,
                                    email: data.email_siswa,
                                    user_role_id: 3,
                                    email_verified_at: dateNow,
                                    password:
                                        "$2a$12$4Qy.9BLBPpRlwl2eboY3xeTAld8ukLjfmc2s6gH6PfmFFQb4WcCW6",
                                    institute_id: institute,
                                },
                            },
                        },
                        {
                            name: "m_profile",
                            type: "json",
                            value: {
                                tbl_name: "m_user_profile",
                                tbl_coloumn: {
                                    nisn: data.nisn_siswa,
                                    place_of_birth: data.tempatlahir_siswa,
                                    date_of_birth: data.tanggallahir_siswa,
                                    mobile_phone: data.hp_siswa,
                                    state_id: data.provinsi_siswa,
                                    city_id: data.kota_siswa,
                                    district_id: data.kecamatan_siswa,
                                    sub_discrict_id: data.kelurahan_siswa,
                                    address: data.alamat_siswa,
                                },
                            },
                        },
                        {
                            name: "upload_image",
                            type: "json",
                            value: {
                                image:
                                    "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",
                                image_type: "png",
                                nama_folder: "image_siswa",
                            },
                        },
                        {
                            name: "x_academic_student",
                            type: "json",
                            value: {
                                tbl_name: "x_academic_students",
                                tbl_coloumn: {
                                    academic_year_id: academic,
                                    register_date: dateNow,
                                    class_id: data.idclass_siswa,
                                },
                            },
                        },
                        {
                            name: "ortu_akun",
                            type: "json",
                            value: {
                                tbl_name: "usersModel",
                                tbl_coloumn: {
                                    name: data.nama_ortu,
                                    email: data.email_ortu,
                                    user_role_id: 4,
                                    email_verified_at: dateNow,
                                    institute_id: institute,
                                    password:
                                        "$2a$12$4Qy.9BLBPpRlwl2eboY3xeTAld8ukLjfmc2s6gH6PfmFFQb4WcCW6",
                                },
                            },
                        },
                        {
                            name: "orangtua",
                            type: "json",
                            value: {
                                tbl_name: "m_user_parents",
                                tbl_coloumn: {
                                    name: data.nama_ortu,
                                    year_of_birth: data.tahunlahir_ortu,
                                    graduate_id: 4,
                                    profession: data.profesi_ortu,
                                    income_range_id: data.penghasilan_ortu,
                                    nik: data.nik_ortu,
                                    r_state: data.provinsi_ortu,
                                    r_city: data.kota_ortu,
                                    r_district: data.kecamatan_ortu,
                                    r_sub_district: data.kelurahan_ortu,
                                    address: data.ortu_address,
                                },
                            },
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(function (response) {
                if (response.data.variables[11].value == 200) {
                    if (
                        response.data.variables[13].value == 404 &&
                        response.data.variables[15].value == 404
                    ) {
                        setIsViewSiswa(true);
                        notification.success({
                            message: "Sukses",
                            description: "Siswa berhasil ditambahkan.",
                            placement: "top",
                        });
                    } else if (response.data.variables[15].value == 200) {
                        notification.error({
                            message: "Error",
                            description:
                                "Email Orang Tua sudah terdaftar, mohon masukkan email lain.",
                            placement: "top",
                        });
                    } else if (response.data.variables[13].value == 200) {
                        notification.error({
                            message: "Error",
                            description:
                                "Email Siswa sudah terdaftar, mohon masukkan email lain.",
                            placement: "top",
                        });
                    } else {
                        notification.error({
                            message: "Error",
                            description: "Email sudah terdaftar, mohon masukkan email lain.",
                            placement: "top",
                        });
                    }
                } else {
                    notification.error({
                        message: "Error",
                        description: "Pastikan NISN belum pernah dibuat dan semua field telah di isi",
                        placement: "top",
                    });
                }
            })
            .catch((error) => {
                alert("Email Telah di gunakan, silahkan gunakan email lain.");
            });
    };

    const editSiswa = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios.post(BASE_URL, {
                "processDefinitionId": "updatesiswa:5:d14ae5af-ec53-11ec-a658-66fc627bf211",
                "returnVariables": true,
                "variables": [
                    {
                        "name": "validasi",
                        "type": "json",
                        "value": {
                            "data": {
                                "user_name": "required",
                                "user_nisn": "required",
                                "user_place_of_birth": "required",
                                "user_date_of_birth": "required",
                                "user_mobile_phone": "required",
                                "user_state_id": "required",
                                "user_city_id": "required",
                                "user_district_id": "required",
                                "user_sub_discrict_id": "required",
                                "user_address": "required",
                                "user_class_id": "required",
                                "id_user": "required",
                                "id_user_profile": "required",
                                "id_siswa": "required"
                            },
                            "user_name": data.nama_siswa,
                            "user_nisn": data.nisn_siswa,
                            "user_place_of_birth": data.tempatlahir_siswa,
                            "user_date_of_birth": data.tanggallahir_siswa,
                            "user_mobile_phone": data.hp_siswa,
                            "user_state_id": data.provinsi_siswa,
                            "user_city_id": data.kota_siswa,
                            "user_district_id": data.kecamatan_siswa,
                            "user_sub_discrict_id": data.kelurahan_siswa,
                            "user_address": data.alamat_siswa,
                            "user_class_id": data.idclass_siswa,
                            "id_user": selectedUser.user_id,
                            "id_user_profile": selectedUser.id_profile,
                            "id_siswa": selectedUser.id
                        }
                    },
                    {
                        "name": "users",
                        "type": "json",
                        "value": {
                            "tbl_name": "usersModel",
                            "id": selectedUser.user_id,
                            "tbl_coloumn": {
                                "name": data.nama_siswa
                            }
                        }
                    },
                    {
                        "name": "m_user_profile",
                        "type": "json",
                        "value": {
                            "tbl_name": "m_user_profile",
                            "id": selectedUser.id_profile,
                            "tbl_coloumn": {
                                "nisn": data.nisn_siswa,
                                "place_of_birth": data.tempatlahir_siswa,
                                "date_of_birth": data.tanggallahir_siswa,
                                "mobile_phone": data.hp_siswa,
                                "state_id": data.provinsi_siswa,
                                "city_id": data.kota_siswa,
                                "district_id": data.kecamatan_siswa,
                                "sub_discrict_id": data.kelurahan_siswa,
                                "address": data.alamat_siswa
                            }
                        }
                    },
                    {
                        "name": "m_student",
                        "type": "json",
                        "value": {
                            "tbl_name": "x_academic_students",
                            "id": selectedUser.id,
                            "tbl_coloumn": {
                                "class_id": data.idclass_siswa,
                            }
                        }
                    }
                ]
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then(function (response) {
            const resCode = JSON.parse(response.data.variables[5].value)
            if (resCode == 200) {
                setIsViewEdit(false)
                setIsViewSiswa(true)
                notification.success({
                    message: "Sukses",
                    description: 'Data siswa berhasil di update',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal update siswa, mohon kontak admin.',
                    placement: 'top'
                })
            }
        }).catch(error => {
            alert(error)
        });
    }

    const deleteSiswa = (record) => {
        Swal.fire({
            title: 'Apakah anda yakin menghapus data?',
            text: "Anda tidak dapat mengembalikan data yang sudah terhapus",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Batalkan',
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(BASE_URL, {
                        "processDefinitionId": "GlobalUpdateRecord:2:d08b0e52-d595-11ec-a2ad-3a00788faff5",
                        "returnVariables": true,
                        "variables": [
                            {
                                "name": "global_updatedata",
                                "type": "json",
                                "value": {
                                    "tbl_name": "x_academic_studentsModel",
                                    "id": record.id,
                                    "tbl_coloumn": {
                                        "deleted_at": dateNow
                                    }
                                }
                            }
                        ]
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                ).then(function (response) {
                    setRefreshState(true);
                    Swal.fire(
                        'Data telah terhapus!',
                        'Menghapus data siswa bernama ' + record.namaSiswa,
                        'success'
                    )
                })
            }
        })
    }

    const FormCreate = () => {
        return (
            <DataFormSiswaCreate
                setView={() => setIsViewSiswa(true)}
                title="Tambah Siswa & Orang Tua"
                submit={createSiswa}
                selectKelas={dataClass.map((data) => {
                    return (
                        <option value={data.id}>{data.class} - {data.sub_class}</option>
                    )
                })}
                isDisabled={false}
                disabledEmail={false}
                provSiswa="ACEH"
                idProvSiswa="11"
                kotaSiswa="KABUPATEN SIMEULUE"
                idKotaSiswa="1101"
                kecSiswa="TEUPAH SELATAN"
                idKecSiswa="1101010"
                kelurahanSiswa="LATIUNG"
                idKelurahanSiswa="1101010001"
            />
        )
    }

    const FormEdit = () => {
        return (
            <FormAdminSiswa
                setView={() => setIsViewSiswa(true)}
                title="Edit Siswa"
                submit={editSiswa}
                isDisabled={false}
                nisnSiswa={selectedUser.nis}
                namaSiswa={selectedUser.namaSiswa}
                selectKelas={dataClass.map((data) => (
                    <option value={data.id}>{data.class} - {data.sub_class}</option>
                ))}
                idKelas={selectedUser.idKelas}
                namaKelas={`${selectedUser.kelas} - ${selectedUser.sub_kelas}`}
                tempatLahirSiswa={selectedUser.tempatLahir}
                tanggalLahirSiswa={selectedUser.tanggalLahir}
                emailSiswa={selectedUser.email}
                hpSiswa={selectedUser.noHp}
                provSiswa={selectedUser.provinsi}
                idProvSiswa={selectedUser.idProvinsi}
                kotaSiswa={selectedUser.kota}
                idKotaSiswa={selectedUser.idKota}
                kecSiswa={selectedUser.kec}
                idKecSiswa={selectedUser.idKec}
                kelurahanSiswa={selectedUser.kel}
                idKelurahanSiswa={selectedUser.idKel}
                alamatSiswa={selectedUser.alamat}
                disabledEmail={true}

            />
        )
    }

    const FormDetail = () => {
        return (
            <FormAdminSiswa
                setView={() => setIsViewSiswa(true)}
                title="View Siswa"
                nisnSiswa={selectedUser.nis}
                namaSiswa={selectedUser.namaSiswa}
                selectKelas={dataClass.map((data) => (
                    <option value={data.id}>{data.class} - {data.sub_class}</option>
                ))}
                idKelas={selectedUser.idKelas}
                namaKelas={`${selectedUser.kelas} - ${selectedUser.sub_kelas}`}
                tempatLahirSiswa={selectedUser.tempatLahir}
                tanggalLahirSiswa={selectedUser.tanggalLahir}
                emailSiswa={selectedUser.email}
                hpSiswa={selectedUser.noHp}
                provSiswa={selectedUser.provinsi}
                idProvSiswa={selectedUser.idProvinsi}
                kotaSiswa={selectedUser.kota}
                idKotaSiswa={selectedUser.idKota}
                kecSiswa={selectedUser.kec}
                idKecSiswa={selectedUser.idKec}
                kelurahanSiswa={selectedUser.kel}
                idKelurahanSiswa={selectedUser.idKel}
                alamatSiswa={selectedUser.alamat}
                isDisabled={true}
                disabledEmail={true}
            />
        )
    }


    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader/>
                <div className="main-content">
                    <Appheader/>
                    {/*{isViewSiswa ? <ViewSiswa /> : <DataFormSiswa />}*/}
                    {isViewSiswa ?
                        <ViewSiswa/> :
                        isViewCreate ?
                            <FormCreate/> :
                            isViewEdit ?
                                <FormEdit/> :
                                isViewDetail ?
                                    <FormDetail/> :
                                    <ViewSiswa/>
                    }
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
}

export default DataSiswaAdmin;
