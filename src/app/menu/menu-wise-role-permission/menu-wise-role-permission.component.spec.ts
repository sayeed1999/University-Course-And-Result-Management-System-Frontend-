import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWiseRolePermissionComponent } from './menu-wise-role-permission.component';

describe('MenuWiseRolePermissionComponent', () => {
  let component: MenuWiseRolePermissionComponent;
  let fixture: ComponentFixture<MenuWiseRolePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWiseRolePermissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWiseRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
