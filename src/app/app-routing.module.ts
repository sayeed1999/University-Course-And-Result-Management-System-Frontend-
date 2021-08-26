import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAssignToTeacherComponent } from './home/course-assign-to-teacher/course-assign-to-teacher.component';
import { CourseFormComponent } from './home/course-form/course-form.component';
import { CourseStatisticsComponent } from './home/course-statistics/course-statistics.component';
import { DepartmentFormComponent } from './home/departments/department-form/department-form.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { StudentEnrollOrPublishResultComponent } from './home/student-enroll-or-publish-result/student-enroll-or-publish-result.component';
import { StudentRegistrationComponent } from './home/student-registration/student-registration.component';
import { TeacherFormComponent } from './home/teacher-form/teacher-form.component';
import { ViewResultComponent } from './home/view-result/view-result.component';
import { AllocateClassroomsComponent } from './home/allocate-classrooms/allocate-classrooms.component';
import { ViewClassScheduleComponent } from './home/view-class-schedule/view-class-schedule.component';
import { ResultSheetGenerationComponent } from './home/view-result/result-sheet-generation/result-sheet-generation.component';
import { UnassignAllCoursesComponent } from './home/unassign-all-courses/unassign-all-courses.component';
import { UnallocateAllClassroomsComponent } from './home/unallocate-all-classrooms/unallocate-all-classrooms.component';
import { AddRolesComponent } from './home/account/add-roles/add-roles.component';
import { UserFormComponent } from './home/account/user-form/user-form.component';
import { UsersComponent } from './home/account/users/users.component';
import { MenusComponent } from './menu/menus/menus.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';


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
  { path: 'account', children: [
    { path: 'add-roles', component: AddRolesComponent },
    { path: 'create-user', component: UserFormComponent, data: { kind: 'create' } },
    { path: ':email/update', component: UserFormComponent, data: { kind: 'update' } },
    { path: 'list', component: UsersComponent },
  ]},
  { path: 'menu', children: [
    { path: 'create-menu', component: MenuFormComponent, data: { kind: 'create' } },
    { path: ':id/update', component: MenuFormComponent, data: { kind: 'update' } },
    { path: 'list', component: MenusComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
