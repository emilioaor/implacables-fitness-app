import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberClassesComponent } from './member-classes.component';

describe('MemberClassesComponent', () => {
  let component: MemberClassesComponent;
  let fixture: ComponentFixture<MemberClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberClassesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
