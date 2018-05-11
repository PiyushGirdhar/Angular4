/* Internal Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }    from '@angular/forms';

/* External Modules */
import { NgxPaginationModule } from 'ngx-pagination';

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
    MidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})

export class AppModule { }
