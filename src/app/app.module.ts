import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { DepartmentFormComponent } from './home/departments/department-form/department-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseFormComponent } from './home/course-form/course-form.component';
import { TeacherFormComponent } from './home/teacher-form/teacher-form.component';
import { ConfirmationDialog, CourseAssignToTeacherComponent } from './home/course-assign-to-teacher/course-assign-to-teacher.component';
import { RegisteredStudentDialog, StudentRegistrationComponent } from './home/student-registration/student-registration.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CourseStatisticsComponent } from './home/course-statistics/course-statistics.component';
import { StudentEnrollOrPublishResultComponent } from './home/student-enroll-or-publish-result/student-enroll-or-publish-result.component';
import { ViewResultComponent } from './home/view-result/view-result.component';
import { AllocateClassroomsComponent } from './home/allocate-classrooms/allocate-classrooms.component';
import { ViewClassScheduleComponent } from './home/view-class-schedule/view-class-schedule.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ConfirmUnassignDialog, UnassignAllCoursesComponent } from './home/unassign-all-courses/unassign-all-courses.component';
import { ConfirmUnallocateDialog, UnallocateAllClassroomsComponent } from './home/unallocate-all-classrooms/unallocate-all-classrooms.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { AddRolesComponent } from './home/account/add-roles/add-roles.component';
import { UserFormComponent } from './home/account/user-form/user-form.component';
import { UsersComponent } from './home/account/users/users.component';
import { MenusComponent } from './menu/menus/menus.component';
import { MenuFormComponent } from './menu/menu-form/menu-form.component';
import { MenuWiseRolePermissionComponent } from './menu/menu-wise-role-permission/menu-wise-role-permission.component';
import { LoginComponent } from './home/account/login/login.component';
import { WelcomeComponent } from './home/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DepartmentsComponent,
    DepartmentFormComponent,
    CourseFormComponent,
    TeacherFormComponent,
    CourseAssignToTeacherComponent,
    ConfirmationDialog,
    CourseStatisticsComponent,
    StudentRegistrationComponent,
    StudentEnrollOrPublishResultComponent,
    ViewResultComponent,
    AllocateClassroomsComponent,
    ViewClassScheduleComponent,
    LoadingComponent,
    RegisteredStudentDialog,
    UnassignAllCoursesComponent,
    UnallocateAllClassroomsComponent,
    ConfirmUnassignDialog,
    ConfirmUnallocateDialog,
    AddRolesComponent,
    UserFormComponent,
    UsersComponent,
    MenusComponent,
    MenuFormComponent,
    MenuWiseRolePermissionComponent,
    LoginComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 10000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
