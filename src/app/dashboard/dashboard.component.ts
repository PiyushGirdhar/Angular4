import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './../service/task.service';
import { Frequency } from './../shared/models/frequency-model';
import { Task } from './../shared/models/task-model';
import { Owner } from '../shared/models/owner-model';
import { Fund } from '../shared/models/fund-model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from './../shared/utils'
import { statuses } from './../shared/constants/status';
import { formFields } from '../shared/constants/form-fields';
import { messages } from './../shared/constants/messages';
import { endpoints } from '../shared/constants/endpoints';

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
  perPageItem: number = endpoints.perPageItem;
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
  createButton: boolean = true;
  setFrequencyName: string;
  setOwnerName: string;
  setFundName: string;
  totalNumberOfTasks: number;
  editIndex: number;
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
    this.taskForm.get(formFields.owner).disable(); 
    this.taskForm.get(formFields.frequency).disable();
    this.taskForm.get(formFields.fundName).disable(); 
  }

  // Get commentary/task
  getTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.json();
      this.totalNumberOfTasks = data.json().length;
    });
  }

  // Delete Task
  deleteTask(id, index) {
    if(confirm(messages.deleteConfirm)) {
      this.taskService.deleteTask(id).subscribe(data => {
        this.toastr.success(messages.sucess);
        this.sortToggle = true;
        this.tasks.splice((endpoints.perPageItem * (this.p - 1)) + index, 1);
      });
    }
  }

  // Updating form values
  updateFrequencyName(name) {
    this.setFrequencyName = name.text;
  }
  updateOwnerName(name) {
    this.setOwnerName = name.text;
  }
  updateFundName(name) {
    this.setFundName = name.text;
  }

  // Update Task
  updateTaskSubmit(editData) {
    if(this.showComment) {
        this.constData = {
          id: editData.id,
          owner: {
            id: editData.owner.id,
            name: this.setOwnerName ? this.setOwnerName : editData.owner.name,
          },
          frequency: {
            id: editData.frequency.id,
            name: this.setFrequencyName ? this.setFrequencyName : editData.frequency.name,
          },
          fundName: {
            id: editData.fundName.id,
            name: this.setFundName ? this.setFundName : editData.fundName.name,
          },
          comment: editData.comment.trim(),
          status: statuses.completed
        };
    } else {
      this.constData = {
        id: editData.id,
        owner: {
          id: editData.owner.id,
          name: this.setOwnerName ? this.setOwnerName : editData.owner.name,
        },
        frequency: {
          id: editData.frequency.id,
          name: this.setFrequencyName ? this.setFrequencyName : editData.frequency.name,
        },
        fundName: {
          id: editData.fundName.id,
          name: this.setFundName ? this.setFundName : editData.fundName.name,
        }
      };
    }
    this.taskService.updateTaskSubmit(this.constData).subscribe(data => {
      this.toastr.success(messages.sucess);
      this.showEdit = this.hideGrid = this.showComment = false;
      this.getTasks();
    });
  }

  // Create Task 
  onTaskSubmit() {
    this.disableFormewTaskForm(); 
    const task = {
      owner: {
        id: this.taskForm.get(formFields.owner).value,
        name: this.setOwnerName
      },
      frequency: {
        id: this.taskForm.get(formFields.frequency).value,
        name: this.setFrequencyName
      },
      fundName: {
        id: this.taskForm.get(formFields.fundName).value,
        name: this.setFundName
      },
      comment: "",
      status: statuses.pending
    };
    this.taskService.createTask(task).subscribe(data => {
      this.toastr.success(messages.sucess);
      this.showCreate = this.showEdit = this.hideGrid = this.createButton = false;
      this.tasks.splice(this.totalNumberOfTasks, 0, data.json());
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
    const updateOwner = {
      id: task.id,
      owner: {
        id: event.id,
        name: event.text
      }
    };
    this.taskService.updateTask(updateOwner).subscribe(data => {
      this.toastr.success(messages.sucess);
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
  openEdit(data, index) {
      this.processing = this.showComment ? false : true;
      this.hideGrid = this.showEdit = true;
      this.editData = data;
      this.editIndex = index;
      this.getFrequencies();
      this.getFundNames();
  }

  // Open Create section, get the data and create the form
  openCreate() {
    this.showEdit = this.createButton = false;
    this.hideGrid = this.showCreate = true;
    this.getFrequencies();
    this.getFundNames();  
    this.createNewTaskForm();
  }

  // Go Back to grid
  goBack() {
    this.toastr.error(messages.failure);
    this.showEdit = this.showCreate = this.showComment = this.hideGrid = false;
    this.setFrequencyName = this.setFundName = this.setOwnerName =  "";
    this.createButton = true;
    this.getTasks();
  }

  // Check comment processing status
  isComment() {
    this.showComment = true;
    this.processing = false;
  }

  // Check Comment's processing status
  updatePending(comment) {
    this.processing = comment !== "" && comment.trim().length >= 1 ? true : false;
  }

  // Toggle data
  toggleData() {
    this.sortToggle = !this.sortToggle;
    this.tasks = this.util.sortList(this.tasks, 'id', this.sortToggle);
  }

  // OnInit
  ngOnInit() {
    this.getTasks();
    this.getOwners();
  }
}
