import { Component, Input } from '@angular/core';
import { TaskService } from './../service/task.service';
import { Frequency } from './../shared/frequency';
import { Task } from './../shared/task';
import { Owner } from '../shared/owner';
import { Fund } from '../shared/fund';
import { ToastrService } from 'ngx-toastr';
// For Reactive forms
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Initialising variables
  p: number = 1;
  tasks: Array<Task>;
  owners: Array<Owner>;
  frequency: Array<Frequency>;
  fundName: Array<Fund>;
  taskData: any;
  constData: any;
  form: any;
  editData: Array<Task>;
  showEdit: boolean = false;
  processing: boolean = false;
  showComment: boolean = false;
  showCreate: boolean = false;
  hideGrid: boolean = false;
  sortToggle: boolean = false;
  @Input() searchText: string;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.getTasks();
    this.getOwners();
  }

  // Function to create new task form
  createNewTaskForm() {
    // Create form with formbuilder
    this.form = this.formBuilder.group({
      fundName: [''],
      owner: [''],
      frequency: ['']
    })
  }

  // Disable new task form
  disableFormewTaskForm() {
    // Disable fields
    this.form.get('owner').disable(); 
    this.form.get('frequency').disable();
    this.form.get('fundName').disable(); 
  }

  // Get commentary/task
  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.json();
    });
  }

  // Delete Task
  deleteTask(id) {
    // Check to confirm if the user wants to delete the record
    if(confirm('Are you sure, you want to delete this record?')) {
      this.taskService.deleteTask(id).subscribe(data => {
        this.toastr.success('Record was successfully deleted!');
        this.getTasks();
      });
    }
  }

  // Update Task
  updateTaskSubmit(editData) {
    // Check if the comment is visible then only add the comment and change the status to completed
    if(this.showComment) {
        this.constData = {
          id: editData.id,
          owner: editData.owner,
          frequency: editData.frequency,
          fundName: editData.fundName,
          comment: editData.comment,
          status: 'Completed'
        };
    } else {
      this.constData = {
        id: editData.id,
        owner: editData.owner,
        frequency: editData.frequency,
        fundName: editData.fundName
      };
    }
    // Update Records by calling the service
    this.taskService.updateTaskSubmit(this.constData).subscribe(data => {
      this.toastr.success('Records were successfully updated!');
      setTimeout(() => {
        this.showEdit = false;
        this.hideGrid = false;
        this.getTasks();
      }, 2000);
    });
  }

  // Create Task
  onTaskSubmit() {
    this.disableFormewTaskForm(); // Lock the form
    // Get the task details
    const task = {
      owner: this.form.get('owner').value,
      frequency: this.form.get('frequency').value,
      fundName: this.form.get('fundName').value,
      comment: "",
      status: "Pending"
    };
    // Call the service to create the task
    this.taskService.createTask(task).subscribe(data => {
      this.toastr.success('Task was successfully created!');
      // Show updated
      setTimeout(() => {
        this.showCreate = false;
        this.showEdit = false;
        this.hideGrid = false;
        this.getTasks();
      }, 2000);
    });
  }

  // Get owners
  getOwners() {
    this.taskService.getOwners().subscribe(data => {
      const ownersList = data.json();
      const ownerSelectList = [];
      for (const ownerObj of ownersList) {
        const optionObj = {
          id : ownerObj.id,
          text: ownerObj.name
        };
        ownerSelectList.push(optionObj);
      }
      this.owners = ownerSelectList;
    });
  }

  // Update Owner
  updateTask(event, task) {
    console.log('event, task', event, task);
    this.taskService.updateTask(task).subscribe(data => {
      this.toastr.success('Record was successfully updated!');
    });
  }

  // Get Frequencies
  getFrequencies() {
    this.taskService.getFrequencies().subscribe(data => {
      this.frequency = data.json();
    });
  }

  // Get Fund Names
  getFundNames() {
    this.taskService.getFundNames().subscribe(data => {
      this.fundName = data.json();
    });
  }

  // Open Edit section
  openEdit(data) {
      // Check if the comment is visible then set the processing to false else true
      if(this.showComment) {
        this.processing = false;
      } else {
        this.processing = true;
      }
      // Show Edit section
      this.hideGrid = true;
      this.showEdit = true;
      // Get the data from the api
      this.editData = data;
      // Get the records from the api
      this.getFrequencies();
      this.getFundNames();
  }

  // Open Create section
  openCreate() {
    this.showEdit = false;
    this.hideGrid = true;
    this.showCreate = true;
    // Get the records from the api
    this.getFrequencies();
    this.getFundNames();  
    // Create Task form using formbuilder
    this.createNewTaskForm();
  }

  // Go Back
  goBack() {
    this.toastr.error('Record was not updated!');
    // Show grid and hide other sections
    setTimeout(() => {
      this.showEdit = false;
      this.showCreate = false;
      this.showComment = false;
      this.hideGrid = false;
    }, 2000);
  }

  // Check comment processing status
  isComment() {
    this.showComment = true;
    this.processing = false;
  }

  // Check Comment's processing status
  updatePending(comment) {
    // Check if the comment is empty then set the processing to false else true
    if(comment == "") {
      this.processing = false;
    } else {
      this.processing = true;
    }
  }

  // Toggle data
  toggleData(): void {
    this.sortToggle = !this.sortToggle;
    this.tasks = this.sortList(this.tasks, 'id', this.sortToggle);

  }
    
  sortList(list, sortKey, sortInDecending): Array<any> {
    list.sort((a, b) => {
      return sortInDecending ? (b[sortKey] - a[sortKey]) : (a[sortKey] -b[sortKey]);
     });
     return list;
  }

}
