import http from "../http-common";

class lessonDataService {
  getAll() {
    return http.get("/lessons");
  }

  getOne(level, lesson_number) {
    return http.get(`/lessons?level=${level}&lesson_number=${lesson_number}`)
  }

  get(id) {
    return http.get(`/lessons/${id}`);
  }

  create(data) {
    return http.post("/lessons", data);
  }

  update(id, data) {
    return http.put(`/lessons/${id}`, data);
  }

  delete(id) {
    return http.delete(`/lessons/${id}`);
  }

  deleteAll() {
    return http.delete(`/lessons`);
  }
}

export default new lessonDataService();