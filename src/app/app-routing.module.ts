import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAssignToTeacherComponent } from './home/course-assign-to-teacher/course-assign-to-teacher.component';
import { CourseFormComponent } from './home/course-form/course-form.component';
import { CourseStatisticsComponent } from './home/course-statistics/course-statistics.component';
import { DepartmentFormComponent } from './home/departments/department-form/department-form.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { HomeComponent } from './home/home.component';
import { TeacherFormComponent } from './home/teacher-form/teacher-form.component';

const routes: Routes = [
  { path: 'departments/department-form', component: DepartmentFormComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'course-form', component: CourseFormComponent },
  { path: 'teacher-form', component: TeacherFormComponent },
  { path: 'course-assign-to-teacher', component: CourseAssignToTeacherComponent },
  { path: 'view-course-statistics', component: CourseStatisticsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
