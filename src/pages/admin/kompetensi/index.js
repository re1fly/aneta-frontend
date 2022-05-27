import React, { Fragment, useState } from "react"
import { 
    Menu, 
    Card, 
    Row, 
    Col, 
    Button, 
    Dropdown, 
    message, 
    Select, 
    Tag, 
    Space, 
    notification, 
    Table,
    Input,
    PageHeader
} from "antd";
import {
    DownOutlined, 
    AppstoreOutlined, 
    MenuOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    EllipsisOutlined 
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";

import { Link } from 'react-router-dom';

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';

export default function KompetensiAdmin() {
    const [grid, setGrid] = useState(false)
    const [isViewKompetensi, setIsViewKompetensi] = useState(true);

    const { TextArea } = Input;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    const _onSelectMenu = ({key}) => {
        message.info(`Click on item ${key}`);
    };
  
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

    const _Account = (
        <Menu onClick={_onSelectMenu}>
            <Menu.Item key="1">Ubah</Menu.Item>
            <Menu.Item key="2">Hapus</Menu.Item>
        </Menu>
    );

    const _onSearch = value => console.log(value);

    const { Option } = Select;

    function onSearch(val) {
        console.log('search:', val);
    }

    function onChangeTable(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    const TabelKompetensi = () => {
        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
                defaultSortOrder: 'ascend',
                responsive: ['sm'],
                // sorter: (a, b) => a.nis - b.nis,
            },
            {
                title: 'Kompetensi',
                dataIndex: 'namaKompetensi',
                filters: [
                    {
                        text: 'Pengetahuan 1',
                        value: 'Pengetahuan 1',
                    },
                    {
                        text: 'Pengetahuan 2',
                        value: 'Pengetahuan 2',
                    },
                    {
                        text: 'Submenu',
                        value: 'Submenu',
                        children: [
                            {
                                text: 'Green',
                                value: 'Green',
                            },
                            {
                                text: 'Red',
                                value: 'Red',
                            },
                        ],
                    },
                ],
                // specify the condition of filtering result
                // here is that finding the name started with `value`
                onFilter: (value, record) => record.namaKompetensi.indexOf(value) === 0,
                // sorter: (a, b) => a.namaKompetensi.length - b.namaKompetensi.length,
                sortDirections: ['descend'],
            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
                defaultSortOrder: 'descend',
                // sorter: (a, b) => a.semester - b.semester,
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
                defaultSortOrder: 'descend',
                // sorter: (a, b) => a.semester - b.semester,
            },
            {
                title: 'Kode',
                dataIndex: 'kode',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Kompetensi Dasar',
                dataIndex: 'kompetensiDasar',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
                defaultSortOrder: 'descend',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                responsive: ['sm'],
                render: status => (
                    <>
                        {status.map(status => {
                            let color = status.length > 5 ? 'red' : 'green';
                            return (
                                <Tag style={{borderRadius: '15px'}} color={color} key={status}>
                                    {status.toUpperCase()}
                                </Tag>

                            );
                        })}
                    </>
                ),
                filters: [
                    {
                        text: 'Aktif',
                        value: 'aktif',
                    },
                    {
                        text: 'Nonaktif',
                        value: 'nonAktif',
                    },
                ],
                onFilter: (value, record) => record.status.indexOf(value) === 0,
            },
            {
                title: 'Aksi',
                key: 'action',
                responsive: ['sm'],
                render: (text, record) => (
                    <Space size="middle">
                        <EditOutlined style={{color: "blue"}} onClick={() => notification.open({
                            message: 'Edit',
                            description:
                                'Edit user bernama ' + record.namaSiswa,
                            duration: 2

                        })}/>
                        <DeleteOutlined style={{color: 'red'}} onClick={() => notification.open({
                            message: 'Delete',
                            description:
                                'Hapus user bernama ' + record.namaSiswa,
                            duration: 2
                        })}/>
                    </Space>
                ),
            },
        ];

        const data = [
            {
                no: '001',
                namaKompetensi: 'Pengetahuan 1',
                kelas: '1',
                semester: 'II',
                kode: '3.1',
                kompetensiDasar: 'Mengenal Vocal Konsonan Pada Teks Sederhana',
                keterangan: 'Dapat Mengetahui Huruf Vocal',
                status: ['aktif'],
            },
            {
                no: '002',
                namaKompetensi: 'Pengetahuan 1',
                kelas: '1',
                semester: 'II',
                kode: '3.1',
                kompetensiDasar: 'Mengenal Vocal Konsonan Pada Teks Sederhana',
                keterangan: 'Dapat Mengetahui Huruf Vocal',
                status: ['aktif'],
            },
            {
                no: '003',
                namaKompetensi: 'Pengetahuan 2',
                kelas: '1',
                semester: 'II',
                kode: '3.2',
                kompetensiDasar: 'Mengenal Vocal Konsonan Pada Teks Sederhana',
                keterangan: 'Dapat Mengetahui Huruf Vocal',
                status: ['aktif'],
            },
            {
                no: '004',
                namaKompetensi: 'Pengetahuan 2',
                kelas: '1',
                semester: 'II',
                kode: '3.2',
                kompetensiDasar: 'Mengenal Vocal Konsonan Pada Teks Sederhana',
                keterangan: 'Dapat Mengetahui Huruf Vocal',
                status: ['nonAktif'],
            },
        ];

        return(
            <Table className=""
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={{position: ['bottomCenter']}}
                    rowClassName="bg-greylight text-grey-900"
                    scroll={{x:400}}/>
        );
    };

    const CardDataKompetensi = () => {
        const channelList = [
            {
                imageUrl: 'user.png',
                title: 'Pengetahuan 1',
                tag1: 'Kelas 1',
                tag2: 'Semester II'
            },
            {
                imageUrl: 'user.png',
                title: 'Pengetahuan 2',
                tag1: 'kelas 1',
                tag2: 'Semester II'
            },
            {
                imageUrl: 'user.png',
                title: 'Pengetahuan 3',
                tag1: 'kelas 1',
                tag2: 'Semester II'
            },
            {
                imageUrl: 'user.png',
                title: 'Pengetahuan 1',
                tag1: 'Kelas 1',
                tag2: 'Semester II'
            },
            {
                imageUrl: 'user.png',
                title: 'Pengetahuan 2',
                tag1: 'kelas 1',
                tag2: 'Semester II'
            },
            {
                imageUrl: 'user.png',
                title: 'Pengetahuan 3',
                tag1: 'kelas 1',
                tag2: 'Semester II'
            },
        ];
    
        return(
            <div className="row px-3">
                {channelList.map((value, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                        <div className="card mb-4 d-block w-100 shadow-xss rounded-lg p-xxl-5 p-4 border-0 text-center">
                            <span className="badge badge-success rounded-xl position-absolute px-2 py-1 left-0 ml-4 top-0 mt-3">
                                Aktif
                            </span>
                            <Dropdown className='position-absolute right-0 mr-4 top-0 mt-3'
                                    overlay={_Account}>
                                <EllipsisOutlined/>
                            </Dropdown>
                            <a
                            href=""
                            className="btn-round-xxxl rounded-lg bg-lightblue ml-auto mr-auto mt-4"
                            >
                                <img
                                    src={`assets/images/${value.imageUrl}`}
                                    alt="icon"
                                    className="p-1 w-100"
                                />
                            </a>
                            <h4 className="fw-700 font-xs mt-4">{value.title}</h4>
                            <div className="clearfix"></div>
                            {value.tag1 ? (
                                <span
                                className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-success d-inline-block text-success mb-1 mr-1">
                                {value.tag1}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag2 ? (
                                <span
                                className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 bg-lightblue d-inline-block text-grey-800 mb-1 mr-1">
                                {value.tag2}
                                </span>
                            ) : (
                                ''
                            )}
                            {value.tag3 ? (
                                <span
                                className="font-xsssss fw-700 pl-3 pr-3 lh-32 text-uppercase rounded-xxl ls-2 alert-info d-inline-block text-info mb-1">
                                {value.tag3}
                                </span>
                            ) : (
                                ''
                            )}
                            <div className="clearfix"></div>
                            <div className="mt-4 mx-auto">
                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kode</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: 3.1</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Kompetensi Dasar</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: Mengenal Vocal</p>
                                    </div>
                                </div>

                                <div className="row ml-3">
                                    <div className="col-6">
                                        <p className="font-xssss float-left lh-1">Keterangan</p>
                                    </div>
                                    <div className="">
                                        <p className="font-xssss float-left lh-1">: Mengetahui Huruf</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const ViewKompetensi = () => {
        return (
            <div className="container px-3 py-4">
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader
                        className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                        onBack={() => window.history.back()}
                        title="Data Kompetensi"
                        />
                        <Card className="w-full shadow-md py-0 mb-4">
                            <Row>
                                <Col span={12}>
                                    <Button onClick={() => setIsViewKompetensi(false)} className="mr-2 bg-current" type="primary" shape="round" size='middle'>
                                    Tambah Data
                                    </Button>
                                <Dropdown overlay={_filterMenu}>
                                    <a className="ant-dropdown-link mr-2 font-bold" onClick={e => e.preventDefault()}>
                                        Filter by <DownOutlined/>
                                    </a>
                                </Dropdown>
                                <Dropdown overlay={_sortMenu}>
                                    <a className="ant-dropdown-link font-bold" onClick={e => e.preventDefault()}>
                                        Sort by <DownOutlined/>
                                    </a>
                                </Dropdown>
                                </Col>
                                <Col span={12}>
                                <div className="float-right">
                                    <Search className="mr-6" placeholder="Cari kata kunci" allowClear
                                            onSearch={_onSearch} style={{width: 250, lineHeight: '20px'}}/>
                                    {grid == false ? 
                                    <a>
                                    <AppstoreOutlined style={{fontSize: '30px'}}
                                                        onClick={() => setGrid(true)}/>
                                    </a> :
                                    <a>
                                    <MenuOutlined style={{fontSize: '30px'}}
                                                    onClick={() => setGrid(false)}/>
                                    </a>}
                                </div>
                                </Col>
                            </Row>
                        </Card>
                        <div className="py-2">
                            <div className="flex">
                                <div className="form-group w-full">
                                    <Card className="shadow-md my-6">
                                        <Row>
                                            <Select style={{ width: '100%' }}
                                                    showSearch
                                                    placeholder="Pilih Mata Pelajaran ...."
                                                    optionFilterProp="children"
                                                    onChange={onChange}
                                                    onSearch={onSearch}
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            >
                                                <Option value="matematika">Matematika</Option>
                                                <Option value="bahasaIndonesia">Bahasa Indonesia</Option>
                                                <Option value="ilmuPengetahuanAlam">Ilmu Pengetahuan Alam</Option>
                                            </Select>
                                        </Row>
                                    </Card>
                                </div>
                            </div>
                        </div>
                        {grid ? <CardDataKompetensi/> : <TabelKompetensi/>} 
                    </div>
                </div>
            </div>
        );
    };

    const TambahKompetensi = () => {
        let [count, setCount] = useState(0);

        const increment = () => {
            setCount((prevCount) => prevCount + 1);
        };

        const decrement = () => {
            setCount((prevCount) => prevCount - 1);
        };

        const columns = [
            {
                title: 'No',
                dataIndex: 'no',
            },
            {
                title: 'Mata Pelajaran',
                dataIndex: 'mataPelajaran',
            },
            {
                title: 'Kelas',
                dataIndex: 'kelas',
            },
            {
                title: 'Semester',
                dataIndex: 'semester',
            },
            {
                title: 'Kode',
                dataIndex: 'kode',
            },
            {
                title: 'Kompetensi',
                dataIndex: 'kompetensi',
            },
            {
                title: 'Kompetensi Dasar',
                dataIndex: 'kompetensiDasar',
            },
            {
                title: 'Keterangan',
                dataIndex: 'keterangan',
            },
        ];
    
        const data = [
            {
                no: '1',
                mataPelajaran: 
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Pilih Mata Pelajaran ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="matematika">Matematika</Option>
                        <Option value="bahasaIndonesia">Bahasa Indonesia</Option>
                        <Option value="ilmuPengetahuanAlam">Ilmu Pengetahuan Alam</Option>
                    </Select>,
                kelas:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Kelas ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                        <Option value="III">III</Option>
                        <Option value="IV">IV</Option>
                        <Option value="V">V</Option>
                        <Option value="VI">VI</Option>
                    </Select>,
                semester:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Semester ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                    </Select>,
                kode:
                    <Input placeholder=""/>,
                kompetensi:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Pilih Jenis Kompetensi ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Kompetensi I">Kompetensi I</Option>
                        <Option value="Kompetensi II">Kompetensi II</Option>
                    </Select>,
                kompetensiDasar:
                    <TextArea rows={3}/>,
                keterangan:
                    <TextArea rows={3}/>,
            },
            {
                no: '2',
                mataPelajaran: 
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Pilih Mata Pelajaran ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="matematika">Matematika</Option>
                        <Option value="bahasaIndonesia">Bahasa Indonesia</Option>
                        <Option value="ilmuPengetahuanAlam">Ilmu Pengetahuan Alam</Option>
                    </Select>,
                kelas:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Kelas ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                        <Option value="III">III</Option>
                        <Option value="IV">IV</Option>
                        <Option value="V">V</Option>
                        <Option value="VI">VI</Option>
                    </Select>,
                semester:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Semester ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                    </Select>,
                kode:
                    <Input placeholder=""/>,
                kompetensi:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Pilih Jenis Kompetensi ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Kompetensi I">Kompetensi I</Option>
                        <Option value="Kompetensi II">Kompetensi II</Option>
                    </Select>,
                kompetensiDasar:
                    <TextArea rows={3} style={{ width: '100%' }}/>,
                keterangan:
                    <TextArea rows={3}/>,
            },
            {
                no: '3',
                mataPelajaran: 
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Pilih Mata Pelajaran ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="matematika">Matematika</Option>
                        <Option value="bahasaIndonesia">Bahasa Indonesia</Option>
                        <Option value="ilmuPengetahuanAlam">Ilmu Pengetahuan Alam</Option>
                    </Select>,
                kelas:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Kelas ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                        <Option value="III">III</Option>
                        <Option value="IV">IV</Option>
                        <Option value="V">V</Option>
                        <Option value="VI">VI</Option>
                    </Select>,
                semester:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Semester ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="I">I</Option>
                        <Option value="II">II</Option>
                    </Select>,
                kode:
                    <Input placeholder=""/>,
                kompetensi:
                    <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder="Pilih Jenis Kompetensi ..."
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="Kompetensi I">Kompetensi I</Option>
                        <Option value="Kompetensi II">Kompetensi II</Option>
                    </Select>,
                kompetensiDasar:
                    <TextArea rows={3}/>,
                keterangan:
                    <TextArea rows={3}/>,
            },
        ];

        return (
            <div className="container px-3 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="flex-wrap pr-4 pl-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg mb-4">
                      <i onClick={() => setIsViewKompetensi(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                      <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                        Data Kelas
                      </h4>
                    </div>
                    <div className='d-flex mb-3 justify-content-end g-1s'>
                        <h5 className='pt-2'>Tambah Baris</h5>
                        <Button className='ml-2' onClick={decrement} shape="circle">-</Button>
                        <h4 className='mt-2 ml-2'>{count}</h4>
                        <Button className='ml-2' onClick={increment} shape="circle">+</Button>
                    </div>
                  </div>
                  <Table className="mx-4 py-8"
                    columns={columns}
                    dataSource={data}
                    onChange={onChangeTable}
                    pagination={false}
                    rowClassName="bg-greylight text-grey-900"/>
                </div>
              </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="main-wrapper">
                <Navheader />
                <div className="main-content">
                    <Appheader />
                    {isViewKompetensi ? <ViewKompetensi/> : <TambahKompetensi/>}
                    <Adminfooter/>
                </div>
            </div>
        </Fragment>
    );
};