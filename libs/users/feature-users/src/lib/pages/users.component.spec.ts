import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersUsersFeatureComponent } from './users.component';

describe('UsersUsersFeatureComponent', () => {
  let component: UsersUsersFeatureComponent;
  let fixture: ComponentFixture<UsersUsersFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUsersFeatureComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUsersFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
