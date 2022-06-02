import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Upload, message, PageHeader} from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Navheader from '../../../components/Navheader';
import Appheader from '../../../components/Appheader';
import Adminfooter from '../../../components/Adminfooter';

export default function TugasiSiswa() {
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
      console.log(info.file, info.fileList);
      }
      if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  
  return (
    <Fragment>
      <div id="main-wrapper">
        <Navheader/>
        <div className="main-content">
          <Appheader/>
            <div className="container px-3 py-4">
              <div className="row">
                <div className="col-lg-12">
                    <div className="flex-wrap">
                      <PageHeader
                        className="mb-3 site-page-header card bg-lightblue text-grey-900 fw-700 "
                        onBack={() => window.history.back()}
                        title="TM01 - Tematik 1 - Tugas Harian"
                      />
                        <Link
                            to="/siswa-kelas-materi"
                            className="card w-50 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                            Materi
                        </Link>
                        <Link
                            to="/siswa-kelas-tugas"
                            className="border-1 w-50 bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                        >
                            Tugas Harian
                        </Link>
                        <h4 className="mt-5 mb-4 strong text-lg">1.1 Buatlah gambar yang berkenaan dengan materi sebelumnya. Lalu upload tugas anda dibawah sini.</h4>
                        <Dragger {...props} style={{height:"80%"}} className="mt-12">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Ukuran file tidak boleh melebihi 20MB dan berformat PDF, JPG, PNG, DOCS
                            </p>
                        </Dragger>
                        <div className='items-center mt-3'>
                            <Link
                                to="/account-information"
                                className="bg-current ml-2 mb-2 text-center text-white font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                >
                                Selanjutnya
                            </Link>
                            <Link
                                to="/account-information"
                                className="border-0 ml-2 bg-lightblue text-center text-blue font-xsss fw-600 p-3 w175 rounded-lg d-inline-block"
                                >
                                Kembali
                            </Link>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <Adminfooter />
          </div>
      </div>
    </Fragment>
  );
};