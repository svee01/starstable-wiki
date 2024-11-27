import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StableOverviewComponent } from './stable-overview.component';

describe('StableOverviewComponent', () => {
  let component: StableOverviewComponent;
  let fixture: ComponentFixture<StableOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StableOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StableOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
