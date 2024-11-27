import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StableDetailsComponent } from '../../../../stable-details.component';

describe('StableDetailsComponent', () => {
  let component: StableDetailsComponent;
  let fixture: ComponentFixture<StableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StableDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
