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
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    DashboardComponent,
    FilterPipe,
    ReplacePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})

export class AppModule { }
