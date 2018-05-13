import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { OnInit } from '@angular/core';
import { endpoints } from './../shared/constants/endpoints';

@Injectable()
export class TaskService implements OnInit {

  options: any;
  baseUrl: string = endpoints.server_url;

  constructor(
    private http: Http
  ) { }

  // Headers configuration options
  createHeaders() {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json' // Format set to JSON
      })
    });
  }

  // Get Tasks
  getTasks() {
    return this.http.get(`${this.baseUrl}` + endpoints.task, this.options);
  }

  // Create Task
  createTask(data) {
    return this.http.post(`${this.baseUrl}` + endpoints.task, data, this.options);
  }

  // Delete Task
  deleteTask(id) {
    return this.http.delete(`${this.baseUrl}` + endpoints.task + '/' + id, this.options);
  }

  // Update Task
  updateTaskSubmit(data) {
    return this.http.patch(`${this.baseUrl}` + endpoints.task + '/' + data.id, data, this.options);
  }

  // Get TaskById
  getTaskById(id) {
    return this.http.get(`${this.baseUrl}` + endpoints.task + '/' + id, this.options);
  }

  // Get Owners
  getOwners() {
    return this.http.get(`${this.baseUrl}` + endpoints.owner, this.options);
  }

  // Update Owners
  updateTask(data) {
    return this.http.patch(`${this.baseUrl}` + endpoints.task + '/' + data.id, data, this.options);
  }

  // Get Frequency
  getFrequencies() {
    return this.http.get(`${this.baseUrl}` + endpoints.frequency, this.options);
  }

  // Get Fund
  getFundNames() {
    return this.http.get(`${this.baseUrl}` + endpoints.fund, this.options);
  }

  ngOnInit() {
    this.createHeaders();
  }

}
