import http from "../http-common";

class studentDataService {
  getAll() {
    return http.get("/students");
  }

  getAllFiltered(queryString) {
    console.log(queryString)
    return http.get("/students?" + queryString)
  }

  get(id) {
    return http.get(`/students/${id}`);
  }

  create(data) {
    return http.post("/students", data);
  }

  update(id, data) {
    return http.patch(`/students/${id}`, data);
  }

  delete(id) {
    return http.delete(`/students/${id}`);
  }

  deleteAll() {
    return http.delete(`/students`);
  }
}

export default new studentDataService();