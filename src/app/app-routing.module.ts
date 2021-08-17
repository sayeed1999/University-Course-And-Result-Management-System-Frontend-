import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentFormComponent } from './home/departments/department-form/department-form.component';
import { DepartmentsComponent } from './home/departments/departments.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'departments/department-form', component: DepartmentFormComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
