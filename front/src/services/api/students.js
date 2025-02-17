import axiosClient from '@/plugins/axios.plugin';

export default {
  get(params) {
    return axiosClient.default().get('/students', { params });
  },
  getStudentById(id) {
    return axiosClient.default().get(`/students/${id}`);
  },
  getStudentBySearch(id) {
    return axiosClient.default().get(`/searchs/${id}`);
  },
  post(body) {
    return axiosClient.default().post('/students', body);
  },
  patch(id, body) {
    return axiosClient.default().patch(`/students/${id}`, body);
  },
  delete(id) {
    return axiosClient.default().delete(`/students/${id}`);
  }
};