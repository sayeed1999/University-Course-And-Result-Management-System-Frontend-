import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeButtonComponent } from './shared/home-button/home-button.component';
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { DepartmentFormComponent } from './home/departments/department-form/department-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseFormComponent } from './home/course-form/course-form.component';
import { TeacherFormComponent } from './home/teacher-form/teacher-form.component';
import { CourseAssignToTeacherComponent } from './home/course-assign-to-teacher/course-assign-to-teacher.component';
import { CourseStatisticsComponent } from './home/course-statistics/course-statistics.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeButtonComponent,
    HomeComponent,
    DepartmentsComponent,
    DepartmentFormComponent,
    CourseFormComponent,
    TeacherFormComponent,
    CourseAssignToTeacherComponent,
    CourseStatisticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
