import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAssignToTeacherComponent } from './home/course-assign-to-teacher/course-assign-to-teacher.component';
import { CourseFormComponent } from './home/course-form/course-form.component';
import { CourseStatisticsComponent } from './home/course-statistics/course-statistics.component';
import { DepartmentFormComponent } from './home/departments/department-form/department-form.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { StudentEnrollOrPublishResultComponent } from './home/student-enroll-or-publish-result/student-enroll-or-publish-result.component';
import { HomeComponent } from './home/home.component';
import { StudentRegistrationComponent } from './home/student-registration/student-registration.component';
import { TeacherFormComponent } from './home/teacher-form/teacher-form.component';
import { ViewResultComponent } from './home/view-result/view-result.component';
import { AllocateClassroomsComponent } from './home/allocate-classrooms/allocate-classrooms.component';
import { ViewClassScheduleComponent } from './home/view-class-schedule/view-class-schedule.component';
import { ResultSheetGenerationComponent } from './home/view-result/result-sheet-generation/result-sheet-generation.component';
import { UnassignAllCoursesComponent } from './home/unassign-all-courses/unassign-all-courses.component';
import { UnallocateAllClassroomsComponent } from './home/unallocate-all-classrooms/unallocate-all-classrooms.component';
import { AddRolesComponent } from './home/account/add-roles/add-roles.component';
import { CreateUserComponent } from './home/account/create-user/create-user.component';
import { UsersComponent } from './home/account/users/users.component';

const routes: Routes = [
  { path: 'departments/department-form', component: DepartmentFormComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'course-form', component: CourseFormComponent },
  { path: 'teacher-form', component: TeacherFormComponent },
  { path: 'course-assign-to-teacher', component: CourseAssignToTeacherComponent },
  { path: 'view-course-statistics', component: CourseStatisticsComponent },
  { path: 'student', children: [
    { path: 'registration', component: StudentRegistrationComponent },
    { path: 'enroll-in-course', component: StudentEnrollOrPublishResultComponent, data: { kind: 'enroll' } },
    { path: 'save-result', component: StudentEnrollOrPublishResultComponent, data: { kind: 'publish' } },
    { path: 'view-result/result-sheet-generation', component: ResultSheetGenerationComponent },
    { path: 'view-result', component: ViewResultComponent },
  ]},
  { path: 'allocate-classrooms', component: AllocateClassroomsComponent },
  { path: 'view-class-schedule', component: ViewClassScheduleComponent },
  { path: 'unassign-all-courses', component: UnassignAllCoursesComponent },
  { path: 'unallocate-all-classrooms', component: UnallocateAllClassroomsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'account', children: [
    { path: 'add-roles', component: AddRolesComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'list', component: UsersComponent },
  ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
