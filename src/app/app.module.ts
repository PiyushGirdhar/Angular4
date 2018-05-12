/* Internal Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* External Modules */
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import {Select2Component} from 'angular-select2-component';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { ReplacePipe } from './pipes/replace.pipe';

// Services
import { TaskService } from './service/task.service';

/* Components */
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MidComponent } from './mid/mid.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterPipe,
    ReplacePipe,
    MidComponent,
    Select2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
