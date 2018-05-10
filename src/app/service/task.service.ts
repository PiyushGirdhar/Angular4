import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';

@Injectable()
export class TaskService {

  options: any;
  baseUrl: string = "http://localhost:3000/";

  constructor(
    private http: Http
  ) { }

  createHeaders() {
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json' // Format set to JSON
      })
    });
  }

  // Get Tasks
  getTasks() {
    return this.http.get(this.baseUrl + 'tasks', this.options);
  }

  // Get TaskById
  getTaskById(id) {
    return this.http.get(this.baseUrl + 'tasks/' + id, this.options);
  }

  // Get Owners
  getOwners() {
    return this.http.get(this.baseUrl + 'owners', this.options);
  }

  // Update Owners
  updateTask(data) {
    return this.http.patch(this.baseUrl + 'tasks/' + data.id, data, this.options);
  }

}
