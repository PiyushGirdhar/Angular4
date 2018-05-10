import { TaskService } from './../service/task.service';
import { Component } from '@angular/core';
import { Task } from '../shared/task';
import { Owner } from '../shared/owner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Initialising variables
  p: number = 1;
  tasks: Task[];
  owners: Owner[];

  constructor(
    private taskService: TaskService
  ) {
    this.getTasks();
    this.getOwners();
  }

  // Get commentary/task
  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.json();
    });
  }

  // Get owners
  getOwners() {
    this.taskService.getOwners().subscribe(data => {
      this.owners = data.json();
    });
  }

  // Update Owner
  updateTask(task) {
    if(task.owner == "") {
      alert('Cannot be empty');
    } else {
      this.taskService.updateTask(task).subscribe(data => {
        this.getTasks();

      });
    }
  }

}
