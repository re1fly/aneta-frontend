import React, { Fragment, useEffect, useRef, useState } from "react";
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
    Modal
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
import pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { useDispatch, useSelector } from "react-redux";
import { searchGlobal } from "../../redux/Action";
import { FormAdminSiswa } from "../../components/form/AdminSiswa";
import { DataFormSiswaCreate } from "../../components/form/AdminSiswaCreate";
import Swal from "sweetalert2";
import { dateNow } from "../../components/misc/date";
import { FilterAcademic } from "../../components/FilterAcademic";
import {
    create_siswa,
    global_data_join_where,
    global_join_sub_where_get, global_update,
    siswa_export,
    siswa_import,
    update_siswa,
    url_by_institute
} from "../../api/reference";

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
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();
    const searchRedux = useSelector((state) => state.search);
    const DataSearch = searchRedux.DataSearch;

    useEffect(() => {
        setRefreshState(false)
        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
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
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    }
                }
            )
            .then(function (response) {
                const siswa = JSON.parse(response.data.variables[3].value);
                setGetSiswa(siswa.data.data);
                // console.log(siswa.data.data);
                const pagination = siswa.data.links;
                setBtnPagination(pagination);
            });

        axios.post(url_by_institute, {
            "processDefinitionId": global_data_join_where,
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
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const academics = JSON.parse(response.data.variables[3].value);
            setAcademicYears(academics.data.data);
        })


        axios
            .post(
                url_by_institute,
                {
                    "processDefinitionId": global_join_sub_where_get,
                    "returnVariables": true,
                    "variables": [
                        {
                            "name": "global_join_where_sub",
                            "type": "json",
                            "value": {
                                "tbl_induk": "x_academic_class",
                                "select": [
                                    "x_academic_class.id",
                                    "r_class_type.class_type as class",
                                    "x_academic_class.sub_class"
                                ],
                                "paginate": false,
                                "join": [
                                    {
                                        "tbl_join": "r_class_type",
                                        "refkey": "id",
                                        "tbl_join2": "x_academic_class",
                                        "foregenkey": "class"
                                    }
                                ],
                                "where": [
                                    {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "academic_year_id",
                                        "tbl_value": academic,
                                        "operator": "="
                                    }, {
                                        "tbl_coloumn": "x_academic_class",
                                        "tbl_field": "deleted_at",
                                        "tbl_value": "",
                                        "operator": "="
                                    }
                                ],
                                "order_coloumn": "x_academic_class.id",
                                "order_by": "asc"
                            }
                        },
                        {
                            "name": "page",
                            "type": "string",
                            "value": "1"
                        }
                    ]
                }

                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const dataClass = JSON.parse(response.data.variables[3].value);
                setDataClass(dataClass.data);
            })
    }, [academic, paramsPage, refreshState, isViewSiswa]);

    useEffect(() => {
        if (DataSearch != "") {
            setGetSiswa(DataSearch?.data?.data);
            setBtnPagination(DataSearch?.data?.links);
        }
    }, [DataSearch]);

    const _exportDataExcel = () => {
        axios.post(url_by_institute, {
            "processDefinitionId": siswa_export,
            "returnVariables": true,
            "variables": [
                {
                    "name": "data",
                    "type": "json",
                    "value": {

                        "academic_year_id": academic
                    }
                }
            ]
        }).then(response => {
            const resData = JSON.parse(response.data.variables[2].value)
            const dataExcel = resData.data
            const byteCharacters = atob(dataExcel);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'DataSiswa.xlsx'); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }

    const convertBase64 = (uploaded) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploaded);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const _changeExcelFormat = async (e) => {
        let uploaded = e.target.files[0];
        const base64 = await convertBase64(uploaded);
        const getLinkUrl = base64.split(',')[1]

        axios.post(url_by_institute,
            {
                "processDefinitionId": siswa_import,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "file_base64": getLinkUrl,
                            "file_type": "xlsx"

                        }
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const resData = JSON.parse(response.data.variables[2].value)
            const resCode = resData.data
            if (resCode == "success") {
                setRefreshState(true);
                notification.success({
                    message: "Sukses",
                    description: 'Data Siswa berhasil di Import',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan data siswa, mohon cek kembali file excel anda.',
                    placement: 'top'
                })
            }
        })

    }

    const _changeExcelFormatNew = async (e) => {
        let uploaded = e.target.files[0];
        const base64 = await convertBase64(uploaded);
        const getLinkUrl = base64.split(',')[1]

        axios.post(url_by_institute,
            {
                "processDefinitionId": siswa_import,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "data",
                        "type": "json",
                        "value": {
                            "file_base64": getLinkUrl,
                            "file_type": "xlsx",
                            "type": "clear",
                            "institute_id": institute

                        }
                    }
                ]
            }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
            }
        }
        ).then(function (response) {
            const resData = JSON.parse(response.data.variables[2].value)
            const resCode = resData.data
            if (resCode == "success") {
                setRefreshState(true);
                notification.success({
                    message: "Sukses",
                    description: 'Data Siswa berhasil di Import',
                    placement: 'top'
                })
            } else {
                notification.error({
                    message: "Error",
                    description: 'Gagal menambahkan data siswa, mohon cek kembali file excel anda.',
                    placement: 'top'
                })
            }
        })

    }

    const _modalImportNew = () => {
        Modal.warning({
            title: 'Jika anda memilih fitur ini, maka semua data guru akan di replace dengan data excel yang anda impor.',
            width: '800px',
            content: (
                <div>
                    {/*<p>Klik Button dibawah ini untuk mengimpor data :</p>*/}
                    <label id='label_import_new' htmlFor="file_excel_kelas_baru"
                        className="bg-dark border-0 text-center text-white ant-btn-round mr-4 mt-3"
                        style={{ padding: '4px 16px', cursor: 'pointer' }}>
                        Upload File Disini
                    </label>
                    <input
                        onChange={_changeExcelFormatNew}
                        name="new_excel_initiator"
                        className="w100"
                        type="file"
                        id="file_excel_kelas_baru"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        style={{ display: "none" }}
                    />
                </div>
            ),
            okText: 'Batal',
            okType: 'danger'
        });

    }

    const onChange = ({ fileList: newFileList }) => {
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

    const _onSelectMenu = ({ key }) => {
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
                <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
            </>
        );
    };

    const _onSearch = (value) => {
        const processDef =
            "globaljoinsubwhereget:2:ffda1ab3-2cc0-11ed-aacc-9a44706f3589";
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
                            <Tag style={{ borderRadius: "15px" }} color={color} key={status}>
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
                    <EyeOutlined style={{ color: "black" }} onClick={() => viewDetailSiswa(record)} />
                    <EditOutlined style={{ color: "blue" }} onClick={() => viewEditSiswa(record)} />
                    <DeleteOutlined
                        style={{ color: "red" }}
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
                                <EllipsisOutlined />
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
                scroll={{ x: 400 }}
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
                            <Button className="mr-4" style={{ backgroundColor: '#00a629', color: 'white' }}
                                shape="round" size='middle'
                                onClick={() => _exportDataExcel()}>
                                Export Data
                            </Button>
                            <label for="file_excel_kelas"
                                className="bg-dark border-0 text-center text-white ant-btn-round mr-4"
                                style={{ padding: '4px 16px', cursor: 'pointer' }}>
                                Import Data
                            </label>
                            <input
                                onChange={_changeExcelFormat}
                                name="excel_initiator"
                                className="w100"
                                type="file"
                                id="file_excel_kelas"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                style={{ display: "none" }}
                            />
                            <Button className="mr-4" style={{ backgroundColor: '#5e7082', color: 'white' }}
                                shape="round" size='middle'
                                onClick={_modalImportNew}>
                                Import Data Baru
                            </Button>
                            <FilterAcademic
                                academicNow={academic}
                                id="filter_academic_data_siswa"
                                getYear={(e) => {
                                    const { options, selectedIndex } = e.target;
                                    const year = (options[selectedIndex].text)
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
                                )} />
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
                                style={{ width: "80%" }}
                            />
                            {grid == false ? (
                                <a>
                                    <AppstoreOutlined
                                        style={{ fontSize: "2em", lineHeight: 1 }}
                                        onClick={() => setGrid(true)}
                                    />
                                </a>
                            ) : (
                                <a>
                                    <MenuOutlined
                                        style={{ fontSize: "2em", lineHeight: 1 }}
                                        onClick={() => setGrid(false)}
                                    />
                                </a>
                            )}
                        </div>
                        {/*</div>*/}
                    </div>
                </Card>

                {grid ? <CardDataSiswa /> : <TableDataSiswa />}
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
                url_by_institute, {
                "processDefinitionId": create_siswa,
                "returnVariables": true,
                "variables": [
                    {
                        "name": "siswa",
                        "type": "json",
                        "value": {
                            "status_siswa": 1,
                            "institute_id": institute,
                            "image_siswa": data.image_siswa,
                            "image_type_siswa": "jpg",
                            "academic_year_id": academicYear,
                            "nisn_siswa": data.nisn_siswa,
                            "nipd_siswa": data.nipd_siswa,
                            "nama_siswa": data.nama_siswa,
                            "kewarganegaraan_siswa": data.kewarganegaraan_siswa,
                            "jk_siswa": data.jk_siswa,
                            "nik_siswa": data.nik_siswa,
                            "agama_siswa": data.agama_siswa,
                            "tempatlahir_siswa": data.tempatlahir_siswa,
                            "tanggallahir_siswa": data.tanggallahir_siswa,
                            "noakta_siswa": data.noakta_siswa,
                            "noanak_siswa": data.noanak_siswa,
                            "jumlahsaudara_siswa": data.jumlahsaudara_siswa,
                            "jarakrumah_siswa": data.jarakrumah_siswa,
                            "lintang_siswa": data.lintang_siswa,
                            "bujur_siswa": data.bujur_siswa,
                            "tinggi_siswa": data.tinggi_siswa,
                            "berat_siswa": data.berat_siswa,
                            "lingkarkepala_siswa": data.lingkarkepala_siswa,
                            "email_siswa": data.email_siswa,
                            "hp_siswa": data.hp_siswa,
                            "provinsi_siswa": data.provinsi_siswa,
                            "kota_siswa": data.kota_siswa,
                            "kecamatan_siswa": data.kecamatan_siswa,
                            "kelurahan_siswa": data.kelurahan_siswa,
                            "dusun_siswa": data.dusun_siswa,
                            "rt_siswa": data.rt_siswa,
                            "rw_siswa": data.rw_siswa,
                            "kodepos_siswa": data.kodepos_siswa,
                            "alamat_siswa": data.alamat_siswa,
                            "jenistinggal_siswa": data.jenistinggal_siswa,
                            "transportasi_siswa": data.transportasi_siswa,
                            "skhun_siswa": data.skhun_siswa,
                            "kps_siswa": data.kps_siswa,
                            "nokps_siswa": data.nokps_siswa,
                            "idclass_siswa": data.idclass_siswa,
                            "nopersertaun_siswa": data.nopersertaun_siswa,
                            "noseriijazah_siswa": data.noseriijazah_siswa,
                            "kip_siswa": data.kip_siswa,
                            "nokip_siswa": data.nokip_siswa,
                            "namakip_siswa": data.namakip_siswa,
                            "nokks_siswa": data.nokks_siswa,
                            "sekolahasal_siswa": data.sekolahasal_siswa,
                            "kebutuhankhusus_siswa": data.kebutuhankhusus_siswa,
                            "nama_ayah": data.nama_ayah,
                            "nik_ayah": data.nik_ayah,
                            "pekerjaan_ayah": data.pekerjaan_ayah,
                            "penghasilan_ayah": data.penghasilan_ayah,
                            "tempatlahir_ayah": data.tempatlahir_ayah,
                            "tahunlahir_ayah": data.tahunlahir_ayah,
                            "email_ayah": data.email_ayah,
                            "hp_ayah": data.hp_ayah,
                            "provinsi_ayah": data.provinsi_ayah,
                            "kota_ayah": data.kota_ayah,
                            "kecamatan_ayah": data.kecamatan_ayah,
                            "kelurahan_ayah": data.kelurahan_ayah,
                            "alamat_ayah": data.alamat_ayah,
                            "nama_ibu": data.nama_ibu,
                            "nik_ibu": data.nik_ibu,
                            "pekerjaan_ibu": data.pekerjaan_ibu,
                            "penghasilan_ibu": data.penghasilan_ibu,
                            "tempatlahir_ibu": data.tempatlahir_ibu,
                            "tahunlahir_ibu": data.tahunlahir_ibu,
                            "email_ibu": data.email_ibu,
                            "hp_ibu": data.hp_ibu,
                            "provinsi_ibu": data.provinsi_ibu,
                            "kota_ibu": data.kota_ibu,
                            "kecamatan_ibu": data.kecamatan_ibu,
                            "kelurahan_ibu": data.kelurahan_ibu,
                            "alamat_ibu": data.alamat_ibu,
                            "nama_wali": data.nama_wali,
                            "nik_wali": data.nik_wali,
                            "pekerjaan_wali": data.pekerjaan_wali,
                            "penghasilan_wali": data.penghasilan_wali,
                            "tempatlahir_wali": data.tempatlahir_wali,
                            "tahunlahir_wali": data.tahunlahir_wali,
                            "email_wali": data.email_wali,
                            "hp_wali": data.hp_wali,
                            "provinsi_wali": data.provinsi_wali,
                            "kota_wali": data.kota_wali,
                            "kecamatan_wali": data.kecamatan_wali,
                            "kelurahan_wali": data.kelurahan_wali,
                            "alamat_wali": data.alamat_wali
                        }
                    }
                ]
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
                    },
                }
            )
            .then(function (response) {
                const res = JSON.parse(response.data.variables[2].value)
                const messageError = res.errors
                if (res.status == 200) {
                    setIsViewSiswa(true);
                    notification.success({
                        message: "Sukses",
                        description: "Siswa berhasil ditambahkan.",
                        placement: "top",
                    });
                } else if (res.code == 422) {
                    setErrorMessage(messageError)
                    errorMessage.map(text => {
                        notification.error({
                            message: "Error",
                            description: text.message,
                            placement: "top",
                        });
                    })
                }
            })
            .catch((error) => {
                notification.error({
                    message: "Error",
                    description: "Email Telah di gunakan / form email orang tua wali dan siswa sama, silahkan gunakan email lain.",
                    placement: "top",
                });
            });
    };

    const editSiswa = (e) => {
        e.preventDefault();
        const data = {};
        for (const el of e.target.elements) {
            if (el.name !== "") data[el.name] = el.value;
        }
        axios.post(url_by_institute, {
            "processDefinitionId": update_siswa,
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
                "Authorization": "Basic YWRtaW46TWFuYWczciE="
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
                axios.post(url_by_institute, {
                    "processDefinitionId": global_update,
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
                        "Authorization": "Basic YWRtaW46TWFuYWczciE="
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
                location={"create"}
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
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {/*{isViewSiswa ? <ViewSiswa /> : <DataFormSiswa />}*/}
                    {isViewSiswa ?
                        <ViewSiswa /> :
                        isViewCreate ?
                            <FormCreate /> :
                            isViewEdit ?
                                <FormEdit /> :
                                isViewDetail ?
                                    <FormDetail /> :
                                    <ViewSiswa />
                    }
                    <Adminfooter />
                </div>
            </div>
        </Fragment>
    );
}

export default DataSiswaAdmin;
