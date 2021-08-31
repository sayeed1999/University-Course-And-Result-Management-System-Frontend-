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
import { MenuWiseRolePermissionComponent } from './menu/menu-wise-role-permission/menu-wise-role-permission.component';
import { LoginComponent } from './home/account/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { SignedInGuard } from './auth/signed-in.guard';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PermitGuard } from './auth/permit.guard';


const routes: Routes = [
  
  { path: 'configuration', canActivate: [AuthGuard], children: [
    { path: 'course-form', component: CourseFormComponent, canActivate: [PermitGuard] },
    { path: 'teacher-form', component: TeacherFormComponent, canActivate: [PermitGuard] },  
    { path: 'view-departments', component: DepartmentsComponent, canActivate: [PermitGuard] },
    { path: 'student-registration', component: StudentRegistrationComponent, canActivate: [PermitGuard] },
    { path: 'department-form', component: DepartmentFormComponent, canActivate: [PermitGuard] },
  ] },

  { path: 'university-management', canActivate: [AuthGuard], children: [
    { path: 'course-assign-to-teacher', component: CourseAssignToTeacherComponent, canActivate: [PermitGuard] },
    { path: 'view-course-statistics', component: CourseStatisticsComponent, canActivate: [PermitGuard] },  
    { path: 'allocate-classroom', component: AllocateClassroomsComponent, canActivate: [PermitGuard] },
    { path: 'view-class-schedule', component: ViewClassScheduleComponent, canActivate: [PermitGuard] },
    { path: 'enroll-student-in-course', component: StudentEnrollOrPublishResultComponent, data: { kind: 'enroll' }, canActivate: [PermitGuard] },
    { path: 'save-result', component: StudentEnrollOrPublishResultComponent, data: { kind: 'publish' }, canActivate: [PermitGuard] },
    { path: 'view-result/result-sheet-generation', component: ResultSheetGenerationComponent, canActivate: [PermitGuard] },
    { path: 'view-result', component: ViewResultComponent, canActivate: [PermitGuard] },
    { path: 'unassign-courses', component: UnassignAllCoursesComponent, canActivate: [PermitGuard] },
    { path: 'unallocate-classrooms', component: UnallocateAllClassroomsComponent, canActivate: [PermitGuard] },  
  ] },

  { path: 'user-and-role-management', children: [
    { path: 'role-wise-menu-permission', component: MenuWiseRolePermissionComponent, canActivate: [AuthGuard, PermitGuard] },
    { path: 'menu-list', component: MenusComponent, canActivate: [AuthGuard, PermitGuard] },
    { path: 'menu-form', component: MenuFormComponent, data: { kind: 'create' }, canActivate: [AuthGuard, PermitGuard] },
    { path: 'menu/:id/update', component: MenuFormComponent, data: { kind: 'update' }, canActivate: [AuthGuard, PermitGuard] },
    { path: 'account', children: [
      { path: 'role-form', component: AddRolesComponent, canActivate: [AuthGuard, PermitGuard] },
      { path: 'login', component: LoginComponent, canActivate: [SignedInGuard] },
      { path: 'register-user', component: UserFormComponent, data: { kind: 'create' }, canActivate: [SignedInGuard] },
      { path: ':email/update', component: UserFormComponent, data: { kind: 'update' }, canActivate: [AuthGuard, PermitGuard] },
      { path: 'user-list', component: UsersComponent, canActivate: [AuthGuard, PermitGuard] },
    ]}
  ] },
  { path: '', component: WelcomeComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
