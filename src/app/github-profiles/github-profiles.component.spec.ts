import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubProfilesComponent } from './github-profiles.component';

describe('GithubProfilesComponent', () => {
  let component: GithubProfilesComponent;
  let fixture: ComponentFixture<GithubProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GithubProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
