import axiosClient from '@/plugins/axios.plugin';

export default {
  get(student) {
    return axiosClient.default().get('/students', { params: { student } });
  },
  getStudentById(id) {
    return axiosClient.default().get(`/students/edit/${id}`);
  },
  post(body) {
    return axiosClient.default().post('/students/edit', body);
  },
  patch(id, body) {
    return axiosClient.default().patch(`/students/edit/${id}`, body);
  },
  delete(id) {
    return axiosClient.default().delete(`/students/edit/${id}`);
  }
};