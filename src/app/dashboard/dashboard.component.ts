import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './../service/task.service';
import { Frequency } from './../shared/frequency-model';
import { Task } from './../shared/task-model';
import { Owner } from '../shared/owner-model';
import { Fund } from '../shared/fund-model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from './../shared/utils'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    Utils
  ]
})
export class DashboardComponent implements OnInit {

  // Initialising variables
  p: number = 1;
  tasks: Array<Task>;
  owners: Array<Owner>;
  frequency: Array<Frequency>;
  fundName: Array<Fund>;
  taskData: any;
  constData: any;
  taskForm: any;
  editData: Array<Task>;
  showEdit: boolean = false;
  processing: boolean = false;
  showComment: boolean = false;
  showCreate: boolean = false;
  hideGrid: boolean = false;
  sortToggle: boolean = false;
  setFrequencyName: string;
  @Input() searchText: string;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private util: Utils
  ) {
  }

  // Function to create new task form
  createNewTaskForm() {
    this.taskForm = this.formBuilder.group({
      fundName: [''],
      owner: [''],
      frequency: ['']
    })
  }

  // Disable new task form
  disableFormewTaskForm() {
    this.taskForm.get('owner').disable(); 
    this.taskForm.get('frequency').disable();
    this.taskForm.get('fundName').disable(); 
  }

  // Get commentary/task
  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.json();
    });
  }

  // Delete Task
  deleteTask(id) {
    if(confirm('Are you sure, you want to delete this record?')) {
      this.taskService.deleteTask(id).subscribe(data => {
        this.toastr.success('Record was successfully deleted!');
        this.getTasks();
      });
    }
  }

  updateFrequencyName(name) {
    this.setFrequencyName = name.text;
  }

  // Update Task
  updateTaskSubmit(editData) {
    if(this.showComment) {
        this.constData = {
          id: editData.id,
          owner: editData.owner,
          frequency: {
            id: editData.frequency.id,
            name: this.setFrequencyName,
          },
          fundName: editData.fundName,
          comment: editData.comment,
          status: 'Completed'
        };
    } else {
      this.constData = {
        id: editData.id,
        owner: editData.owner,
        frequency: {
          id: editData.frequency.id,
          name: this.setFrequencyName,
        },
        fundName: editData.fundName
      };
    }
    console.log(this.constData);
    this.taskService.updateTaskSubmit(this.constData).subscribe(data => {
      this.toastr.success('Records were successfully updated!');
      setTimeout(() => {
        this.showEdit = false;
        this.hideGrid = false;
        this.showComment = false;
        this.getTasks();
      }, 500);
    });
  }

  // Create Task 
  onTaskSubmit() {
    this.disableFormewTaskForm(); 
    const task = {
      owner: this.taskForm.get('owner').value,
      frequency: {
        id: this.taskForm.get('frequency').value,
        name: this.setFrequencyName
      },
      fundName: this.taskForm.get('fundName').value,
      comment: "",
      status: "Pending"
    };
    console.log(task);
    this.taskService.createTask(task).subscribe(data => {
      this.toastr.success('Task was successfully created!');
      setTimeout(() => {
        this.showCreate = false;
        this.showEdit = false;
        this.hideGrid = false;
        this.getTasks();
      }, 500);
    });
  }

  // Get owners
  getOwners() {
    this.taskService.getOwners().subscribe(data => {
      const ownersList = data.json();
      this.owners = this.util.sortSelectList(ownersList);
    });
  }

  // Update Owner
  updateTask(event, task) {
    this.taskService.updateTask(task).subscribe(data => {
      this.toastr.success('Record was successfully updated!');
    });
  }

  // Get Frequencies
  getFrequencies() {
    this.taskService.getFrequencies().subscribe(data => {
      const frequencyList = data.json();
      this.frequency = this.util.sortSelectList(frequencyList);
    });
  }

  // Get Fund Names
  getFundNames() {
    this.taskService.getFundNames().subscribe(data => {
      const fundNameList = data.json();
      this.fundName = this.util.sortSelectList(fundNameList);
    });
  }

  // Open Edit section and get the data
  openEdit(data) {
      this.processing = this.showComment ? false : true;
      this.hideGrid = true;
      this.showEdit = true;
      this.editData = data;
      this.getFrequencies();
      this.getFundNames();
  }

  // Open Create section, get the data and create the form
  openCreate() {
    this.showEdit = false;
    this.hideGrid = true;
    this.showCreate = true;
    this.getFrequencies();
    this.getFundNames();  
    this.createNewTaskForm();
  }

  // Go Back to grid
  goBack() {
    this.toastr.error('Record was not updated!');
    setTimeout(() => {
      this.showEdit = false;
      this.showCreate = false;
      this.showComment = false;
      this.hideGrid = false;
    }, 500);
  }

  // Check comment processing status
  isComment() {
    this.showComment = true;
    this.processing = false;
  }

  // Check Comment's processing status
  updatePending(comment) {
    this.processing = comment === "" ? false : true;
  }

  // Toggle data
  toggleData(): void {
    this.sortToggle = !this.sortToggle;
    this.tasks = this.util.sortList(this.tasks, 'id', this.sortToggle);
  }

  ngOnInit() {
    this.getTasks();
    this.getOwners();
  }
}
