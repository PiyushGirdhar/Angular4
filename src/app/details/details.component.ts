import { Task } from './../shared/task';
import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from './../service/task.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  // Initialising variables
  taskData: Task[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { 
    this.getTaskDataById();
  }

  getTaskDataById() {
    this.taskService.getTaskById(this.route.snapshot.paramMap.get('id')).subscribe(data => {
      this.taskData = data.json();
      console.log(this.taskData);
    });
  }

}
