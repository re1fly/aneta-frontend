import { notification } from "antd";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { BASE_URL } from "../api/Url";
import {
  get_data_global,
  get_where_no_join,
  url_by_institute,
  global_join_sub_where_get,
  role_guru_get_sub_class,
  role_guru_get_matpel,
  role_guru_get_tanggal_pertemuan,
  jadwal_pelajaran_get_date,
} from "../api/reference";

const institute = localStorage.getItem("institute");
const userId = localStorage.getItem("user_id");
const academic = localStorage.getItem("academic_year");

export const searchGlobal =
  (value, paramsPage, processDef, variablesSearch) => (dispatch) => {
    if (value == "") {
      window.location.reload();
    } else {
      notification.info({
        message: "Search",
        description: "Mencari data : " + value,
        duration: 1,
        icon: <SearchOutlined />,
      });
      axios
        .post(
          BASE_URL,
          {
            processDefinitionId: processDef,
            returnVariables: true,
            variables: [
              variablesSearch,
              {
                name: "page",
                type: "string",
                value: paramsPage,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic YWRtaW46TWFuYWczciE=",
            },
          }
        )
        .then(function (response) {
          const siswa = JSON.parse(response.data.variables[3].value);
          dispatch({ type: "SEARCH_GLOBAL", value: siswa });
        });
    }
  };

export const GetProvinsi = () => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId: get_data_global,
      returnVariables: true,
      variables: [
        {
          name: "global_getdata",
          type: "json",
          value: {
            tbl_name: "r_state",
            tbl_coloumn: ["*"],
            order_coloumn: "state",
            order_by: "asc",
            pagination: false,
            total_result: 2,
          },
        },
      ],
    })
    .then(function (response) {
      const dataProvinsi = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_PROVINSI", value: dataProvinsi?.data });
      // console.log(dataProvinsi);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetCity = (id_provinsi) => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId: get_where_no_join,
      returnVariables: true,
      variables: [
        {
          name: "global_get_where",
          type: "json",
          value: {
            tbl_name: "r_city",
            order_coloumn: "city",
            order_by: "asc",
            pagination: false,
            total_result: 2,
            data: [
              {
                kondisi: "where",
                tbl_coloumn: "state_id",
                tbl_value: id_provinsi,
                operator: "=",
              },
            ],
            tbl_coloumn: ["*"],
          },
        },
      ],
    })
    .then(function (response) {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_CITY", value: data });
      // console.log('city', data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetKecamatan = (id_city) => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId: get_where_no_join,
      returnVariables: true,
      variables: [
        {
          name: "global_get_where",
          type: "json",
          value: {
            tbl_name: "r_district",
            pagination: false,
            order_coloumn: "district",
            order_by: "asc",
            total_result: 2,
            data: [
              {
                kondisi: "where",
                tbl_coloumn: "city_id",
                tbl_value: id_city,
                operator: "=",
              },
            ],
            tbl_coloumn: ["*"],
          },
        },
      ],
    })
    .then(function (response) {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_KECAMATAN", value: data });
      // console.log('Kecamatan', data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetKelurahan = (id_kecamatan) => (dispatch) => {
  axios
    .post(BASE_URL, {
      processDefinitionId: get_where_no_join,
      returnVariables: true,
      variables: [
        {
          name: "global_get_where",
          type: "json",
          value: {
            tbl_name: "r_sub_district",
            order_coloumn: "sub_district",
            order_by: "asc",
            pagination: false,
            total_result: 2,
            data: [
              {
                kondisi: "where",
                tbl_coloumn: "district_id",
                tbl_value: id_kecamatan,
                operator: "=",
              },
            ],
            tbl_coloumn: ["*"],
          },
        },
      ],
    })
    .then(function (response) {
      const data = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_KELURAHAN", value: data });
      // console.log('Kelurahan', data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetTingkatKelas = () => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: global_join_sub_where_get,
      returnVariables: true,
      variables: [
        {
          name: "global_join_where_sub",
          type: "json",
          value: {
            tbl_induk: "r_class_type",
            select: ["r_class_type.id", "r_class_type.class_type"],
            paginate: false,
            join: [
              {
                tbl_join: "m_institutes",
                refkey: "id",
                tbl_join2: "r_class_type",
                foregenkey: "institute_id",
              },
            ],
            where: [
              {
                tbl_coloumn: "r_class_type",
                tbl_field: "institute_id",
                tbl_value: institute,
                operator: "=",
              },
            ],
            order_coloumn: "r_class_type.class_type",
            order_by: "asc",
          },
        },
        {
          name: "page",
          type: "string",
          value: "1",
        },
      ],
    })
    .then(function (response) {
      const dataTingkatKelas = JSON.parse(response?.data?.variables[3]?.value);
      dispatch({ type: "SET_TINGKATCLASS", value: dataTingkatKelas?.data });
      console.log("tingkat", dataTingkatKelas);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetSubKelas =
  (idTingkatKelas, academicYear, user) => (dispatch) => {
    axios
      .post(url_by_institute, {
        processDefinitionId: role_guru_get_sub_class,
        returnVariables: true,
        variables: [
          {
            name: "get_sub_kelas_guru",
            type: "json",
            value: {
              id_tingkat: idTingkatKelas,
              user_id: user,
              academic_year_id: academicYear,
            },
          },
        ],
      })
      .then(function (response) {
        const dataSubKelas = JSON.parse(response?.data?.variables[2]?.value);
        dispatch({ type: "SET_SUBCLASS", value: dataSubKelas?.data });
        console.log("ini", academicYear);
        console.log("subkelas", dataSubKelas);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const GetPelajaran =
  (idTingkatKelas, idSubKelas, academicYear, user) => (dispatch) => {
    axios
      .post(url_by_institute, {
        processDefinitionId: role_guru_get_matpel,
        returnVariables: true,
        variables: [
          {
            name: "update_jadwal_pelajaran",
            type: "json",
            value: {
              user_id: user,
              id_tingkat: idTingkatKelas,
              id_class: idSubKelas,
              academic_year_id: academicYear,
            },
          },
        ],
      })
      .then(function (response) {
        const dataPelajaran = JSON.parse(response?.data?.variables[2]?.value);
        dispatch({ type: "SET_PELAJARAN", value: dataPelajaran?.data });
        console.log("mapel", dataPelajaran);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

export const GetKompetensi = (idPelajaran) => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: global_join_sub_where_get,
      returnVariables: true,
      variables: [
        {
          name: "global_join_where_sub",
          type: "json",
          value: {
            tbl_induk: "x_competence",
            select: [
              "x_competence_detail.id as id_kompetensi",
              "x_competence_detail.competence_desc",
            ],
            paginate: false,
            join: [
              {
                tbl_join: "x_competence_detail",
                refkey: "competence_id",
                tbl_join2: "x_competence",
                foregenkey: "id",
              },
            ],
            where: [
              {
                tbl_coloumn: "x_competence",
                tbl_field: "academic_courses_id",
                tbl_value: idPelajaran,
                operator: "=",
              },
            ],
            order_coloumn: "x_competence_detail.competence_desc",
            order_by: "asc",
          },
        },
        {
          name: "page",
          type: "string",
          value: "1",
        },
      ],
    })
    .then(function (response) {
      const dataKompetensi = JSON.parse(response?.data?.variables[3]?.value);
      dispatch({ type: "SET_KOMPETENSI", value: dataKompetensi?.data });
      console.log("kompetensi", dataKompetensi);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetMateri = () => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: global_join_sub_where_get,
      returnVariables: true,
      variables: [
        {
          name: "global_join_where_sub",
          type: "json",
          value: {
            tbl_induk: "x_academic_subjects_schedule_contents",
            select: [
              "x_academic_subjects_schedule_contents.id",
              "x_academic_subjects_schedule_contents.tittle",
              "r_class_type.class_type",
              "x_academic_class.sub_class",
              "x_academic_subjects_schedule_contents.subjects_master_id",
              "x_academic_subject_master.nama_mata",

            ],
            paginate: false,
            join: [
              // {
              //   tbl_join: "x_academic_subjects_schedule_contents_files",
              //   refkey: "subjects_schedule_contents_id",
              //   tbl_join2: "x_academic_subjects_schedule_contents",
              //   foregenkey: "id",
              // },
              {
                tbl_join: "x_academic_class",
                refkey: "id",
                tbl_join2: "x_academic_subjects_schedule_contents",
                foregenkey: "class_id",
              },
              {
                tbl_join: "r_class_type",
                refkey: "id",
                tbl_join2: "x_academic_class",
                foregenkey: "class",
              },
              {
                tbl_join: "x_academic_subject_master",
                refkey: "id",
                tbl_join2: "x_academic_subjects_schedule_contents",
                foregenkey: "subjects_master_id",
              },
            ],
            where: [
              {
                tbl_coloumn: "x_academic_subjects_schedule_contents",
                tbl_field: "subjects_content_type_id",
                tbl_value: "1",
                operator: "=",
              },
              {
                tbl_coloumn: "x_academic_subjects_schedule_contents",
                tbl_field: "created_by",
                tbl_value: userId,
                operator: "=",
              },
              {
                tbl_coloumn: "x_academic_subjects_schedule_contents",
                tbl_field: "deleted_at",
                tbl_value: "",
                operator: "=",
              },
            ],
            order_coloumn: "x_academic_subjects_schedule_contents.tittle",
            order_by: "asc",
          },
        },
        {
          name: "page",
          type: "string",
          value: "1",
        },
      ],
    })
    .then(function (response) {
      const dataMateri = JSON.parse(response?.data?.variables[3]?.value);
      dispatch({ type: "SET_MATERIPERTEMUAN", value: dataMateri?.data });
      console.log("materi", dataMateri);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetTanggalPertemuan = (idMateri) => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: role_guru_get_tanggal_pertemuan,
      returnVariables: true,
      variables: [
        {
          name: "data",
          type: "json",
          value: {
            id_content: idMateri,
          },
        },
      ],
    })
    .then(function (response) {
      const dataTanggal = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_MATERITANGGAL", value: dataTanggal?.data });
      // console.log(dataTanggal);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetWaktuPertemuan = (idTanggal) => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: global_join_sub_where_get,
      returnVariables: true,
      variables: [
        {
          name: "global_join_where_sub",
          type: "json",
          value: {
            tbl_induk: "x_academic_subjects_schedule_time",
            select: [
              "x_academic_subjects_schedule_time.id",
              "x_academic_subjects_schedule_time.time_start",
              "x_academic_subjects_schedule_time.time_end",
            ],
            paginate: false,
            join: [
              {
                tbl_join: "x_academic_subjects_schedule_date",
                refkey: "id",
                tbl_join2: "x_academic_subjects_schedule_time",
                foregenkey: "id_schedule_date",
              },
            ],
            where: [
              {
                tbl_coloumn: "x_academic_subjects_schedule_time",
                tbl_field: "id_schedule_date",
                tbl_value: idTanggal,
                operator: "=",
              },
            ],
            order_coloumn: "x_academic_subjects_schedule_time.time_start",
            order_by: "asc",
          },
        },
        {
          name: "page",
          type: "string",
          value: "1",
        },
      ],
    })
    .then(function (response) {
      const dataJam = JSON.parse(response?.data?.variables[3]?.value);
      dispatch({ type: "SET_MATERIJAM", value: dataJam?.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetTugas = () => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: global_join_sub_where_get,
      returnVariables: true,
      variables: [
        {
          name: "global_join_where_sub",
          type: "json",
          value: {
            tbl_induk: "x_academic_subjects_schedule_contents",
            select: [
              "x_academic_subjects_schedule_contents.id",
              "x_academic_subjects_schedule_contents.tittle",
              "r_class_type.class_type",
              "x_academic_class.sub_class",
              "x_academic_subjects_schedule_contents.subjects_master_id",
              "x_academic_subject_master.nama_mata",
            ],
            paginate: false,
            join: [
              {
                tbl_join: "x_academic_class",
                refkey: "id",
                tbl_join2: "x_academic_subjects_schedule_contents",
                foregenkey: "class_id",
              },
              {
                tbl_join: "r_class_type",
                refkey: "id",
                tbl_join2: "x_academic_class",
                foregenkey: "class",
              },
              {
                tbl_join: "x_academic_subject_master",
                refkey: "id",
                tbl_join2: "x_academic_subjects_schedule_contents",
                foregenkey: "subjects_master_id",
              },
            ],
            where: [
              {
                tbl_coloumn: "x_academic_subjects_schedule_contents",
                tbl_field: "subjects_content_type_id",
                tbl_value: "2",
                operator: "=",
              },
              {
                tbl_coloumn: "x_academic_subjects_schedule_contents",
                tbl_field: "created_by",
                tbl_value: userId,
                operator: "=",
              },
              {
                tbl_coloumn: "x_academic_subjects_schedule_contents",
                tbl_field: "deleted_at",
                tbl_value: "",
                operator: "=",
              },
            ],
            order_coloumn: "x_academic_subjects_schedule_contents.tittle",
            order_by: "asc",
          }
        },
        {
          name: "page",
          type: "string",
          value: "1",
        },
      ],
    })
    .then(function (response) {
      const dataTugas = JSON.parse(response?.data?.variables[3]?.value);
      dispatch({ type: "SET_TUGASPERTEMUAN", value: dataTugas?.data });
      // console.log(dataMateri);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetTanggalPertemuanTugas = (idMateri) => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: role_guru_get_tanggal_pertemuan,
      returnVariables: true,
      variables: [
        {
          name: "data",
          type: "json",
          value: {
            id_content: idMateri,
          },
        },
      ],
    })
    .then(function (response) {
      const dataTanggal = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_TUGASTANGGAL", value: dataTanggal?.data });
      // console.log(dataTanggal);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetWaktuPertemuanTugas = (idTanggal) => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: global_join_sub_where_get,
      returnVariables: true,
      variables: [
        {
          name: "global_join_where_sub",
          type: "json",
          value: {
            tbl_induk: "x_academic_subjects_schedule_time",
            select: [
              "x_academic_subjects_schedule_time.id",
              "x_academic_subjects_schedule_time.time_start",
              "x_academic_subjects_schedule_time.time_end",
            ],
            paginate: false,
            join: [
              {
                tbl_join: "x_academic_subjects_schedule_date",
                refkey: "id",
                tbl_join2: "x_academic_subjects_schedule_time",
                foregenkey: "id_schedule_date",
              },
            ],
            where: [
              {
                tbl_coloumn: "x_academic_subjects_schedule_time",
                tbl_field: "id_schedule_date",
                tbl_value: idTanggal,
                operator: "=",
              },
            ],
            order_coloumn: "x_academic_subjects_schedule_time.time_start",
            order_by: "asc",
          },
        },
        {
          name: "page",
          type: "string",
          value: "1",
        },
      ],
    })
    .then(function (response) {
      const dataJam = JSON.parse(response?.data?.variables[3]?.value);
      dispatch({ type: "SET_TUGASJAM", value: dataJam?.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const GetIdJam = (idJam) => (dispatch) => {
  dispatch({ type: "SET_IDJAM", value: idJam });
};

export const GetAllDate = (id) => (dispatch) => {
  axios
    .post(url_by_institute, {
      processDefinitionId: jadwal_pelajaran_get_date,
      returnVariables: true,
      variables: [
        {
          name: "data",
          type: "json",
          value: {
            id_schedule: id,
          },
        },
      ],
    })
    .then(function (response) {
      const dataRes = JSON.parse(response?.data?.variables[2]?.value);
      dispatch({ type: "SET_DATETIME", value: dataRes?.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const PathKelasJadwalGuru = (kelas) => (dispatch) => {
  dispatch({ type: "ADD_KELAS", value: kelas });
};
export const PathSubKelasJadwalGuru = (subKelas) => (dispatch) => {
  dispatch({ type: "ADD_SUBKELAS", value: subKelas });
};
export const PathMapelJadwalGuru = (mapel) => (dispatch) => {
  dispatch({ type: "ADD_MAPEL", value: mapel });
};
export const PathTypeJadwalGuru = (tipe) => (dispatch) => {
  dispatch({ type: "ADD_TYPE", value: tipe });
};
export const PathMateriJadwalGuru = (materi) => (dispatch) => {
  dispatch({ type: "ADD_MATERI", value: materi });
};
export const PathPertemuanJadwalGuru = (pertemuan) => (dispatch) => {
  dispatch({ type: "ADD_PERTEMUAN", value: pertemuan });
};

export const TanggalKalenderGuru = (tanggal) => (dispatch) => {
  dispatch({ type: "ADD_TANGGAL", value: tanggal });
};
export const PathKalenderGuru = (allPath) => (dispatch) => {
  dispatch({ type: "ADD_ALLPATHKALENDER", value: allPath });
};

export const PathKelasNilaiGuru = (kelas) => (dispatch) => {
  dispatch({ type: "ADD_NILAIKELAS", value: kelas });
};
export const PathSubKelasNilaiGuru = (subKelas) => (dispatch) => {
  dispatch({ type: "ADD_NILAISUBKELAS", value: subKelas });
};
export const PathMapelNilaiGuru = (mapel) => (dispatch) => {
  dispatch({ type: "ADD_NILAIMAPEL", value: mapel });
};
export const PathTugasNilaiGuru = (tugas) => (dispatch) => {
  dispatch({ type: "ADD_NILAITUGAS", value: tugas });
};
export const PathPertemuanNilaiGuru = (tugas) => (dispatch) => {
  dispatch({ type: "ADD_NILAIPERTEMUAN", value: tugas });
};

export const TanggalKalenderSiswa = (tanggal) => (dispatch) => {
  dispatch({ type: "ADD_TANGGALSISWA", value: tanggal });
};
export const PathKalenderSiswa = (allPath) => (dispatch) => {
  dispatch({ type: "ADD_ALLPATHKALENDERSISWA", value: allPath });
};

export const JadwalPelajaranDetail = (record) => (dispatch) => {
  dispatch({ type: "SET_JADWALPELAJARANDETAIL", value: record });
};
