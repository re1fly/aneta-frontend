import { Fragment, useState } from "react";
import { Link } from 'react-router-dom';
import { Card, DatePicker, Input, PageHeader, Select, Button } from "antd";

import Appheader from "../../components/Appheader";
import Navheader from "../../components/Navheader"
import Adminfooter from "../../components/Adminfooter";

function TahunAkademikAdmin() {
    const [isViewTahunAkademik, setIsViewTahunAkademik] = useState(true);

    const dateFormat = 'DD-MM-YYYY';
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const { Option } = Select;

    const ViewTahunAkademik = () => {
        return(
            <div className="container px-3 py-4">
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <PageHeader
                            className="site-page-header card bg-lightblue text-grey-900 fw-700 "
                            onBack={() => window.history.back()}
                            title="Tahun Akademik"
                        />
                        {/* <Card className="card bg-lightblue border-0 mb-2 mt-4 text-grey-900">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 my-2">
                                    <Button className="mr-4" type="primary" shape="round" size='middle'
                                            onClick={() => setIsViewTahunAkademik(false)}>
                                        Tambah Data
                                    </Button>
                                </div>
                            </div>
                        </Card> */}
                    </div>
                </div>
                <form className="px-3 py-4" action="#">
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                    Tahun Akademik
                                </label>
                                <Input
                                    disabled={true}
                                    defaultValue="2022"
                                    name="tahun_akademik"
                                    type="number"
                                    className="text-black form-control"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                    Semester
                                </label>
                                <Input
                                    disabled={true}
                                    defaultValue="I"
                                    className="text-black form-control"
                                    name="semester"
                                    placeholder="Pilih Tahun Akademik"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-3">
                            <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                    Periode Awal
                                </label>
                                <Input
                                     disabled={true}
                                     defaultValue="06-06-2020"
                                     name="tahun_akademik"
                                     type="text"
                                     className="text-black form-control"
                                />
                            </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                    Periode Akhir
                                </label>
                                <Input
                                    disabled={true}
                                    type="text"
                                    className="text-black form-control"
                                    defaultValue="06-06-2023"
                                    name="periode_akhir"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 mb-3">
                            <div className="form-group">
                                <label className="mont-font fw-600 font-xsss">
                                    Status
                                </label>
                                <Input
                                    disabled={true}
                                    type="text"
                                    className="text-black form-control"
                                    defaultValue="Aktif"
                                    name="status"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <button
                                className="bg-lightblue text-center text-blue border-none font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                onClick={() => setIsViewTahunAkademik(false)}>
                                Tambah Data
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };

    const TambahTahunAkademik = () => {
        return (
          <div className="container px-3 py-4">
            <div className="row">
              <div className="col-lg-12">
                <div className="middle-wrap">
                  <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-lg">
                      <i onClick={() => setIsViewTahunAkademik(true)} className="cursor-pointer d-inline-block mt-2 ti-arrow-left font-sm text-white"></i>
                      <h4 className="font-xs text-white fw-600 ml-4 mb-0 mt-2">
                        Tambah Data Tahun Akademik
                      </h4>
                    </div>
                    <div className="card-body p-lg-5 p-4 w-100 border-0 ">
                      <form action="#">
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Nama Sekolah
                            </label>
                            <input
                                defaultValue="SD Bahagia"
                                name="nama_sekolah"
                                type="text"
                                className="form-control"
                            />
                            </div>
                          </div>
    
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Tahun Akademik
                            </label>
                            <DatePicker
                                className="form-control"
                                picker="year"
                                placeholder="Pilih Tahun Akademik"
                                name="tahun_akademik"
                            />
                            </div>
                          </div>
                        </div>
    
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Semester
                            </label>
                            <input
                                type="text"
                                defaultValue="I"
                                name="semster"
                                className="form-control"
                                maxLength={2}
                            />
                            </div>
                          </div>
    
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Periode Awal
                            </label>
                            <DatePicker
                                className="form-control"
                                format={dateFormat}
                                placeholder="Pilih Periode Awal"
                                name="periode_awal"
                            />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Periode Akhir
                            </label>
                            <DatePicker
                                className="form-control"
                                format={dateFormat}
                                placeholder="Pilih Periode Akhir"
                                name="periode_akhir"
                            />
                            </div>
                          </div>
    
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Status
                            </label>
                            <select className="form-control" defaultValue="Pilih Status" onChange={handleChange}>
                                <option className="form-control" value="aktif">Aktif</option>
                                <option className="form-control" value="nonaktif">Nonaktif</option>
                            </select>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Jumlah Murid
                            </label>
                            <input
                                type="number"
                                defaultValue="300"
                                name="jumlah murid"
                                className="form-control"
                            />
                            </div>
                          </div>
    
                          <div className="col-lg-6 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Jumlah Guru
                            </label>
                            <input
                                type="number"
                                defaultValue="20"
                                name="jumlah guru"
                                className="form-control"
                            />
                            </div>
                          </div>
                        </div>
    
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                                Jumlah Staff
                            </label>
                            <input
                                type="number"
                                defaultValue="30"
                                name="jumlah staff"
                                className="form-control"
                            />
                            </div>
                          </div>
    
                          <div className="col-lg-12">
                            <Link
                              to="/account-information"
                              className="bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                            >
                              Save
                            </Link>
                            <Link
                              to="/account-information"
                              className="ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                            >
                              Batal
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
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
                    {isViewTahunAkademik ? <ViewTahunAkademik /> : <TambahTahunAkademik /> }
                    {/*

                    
                                
                                
                                
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div> */}
                        <Adminfooter />
                </div>
            </div>
        </Fragment>
    )
}

export default TahunAkademikAdmin;