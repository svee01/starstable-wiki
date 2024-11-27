import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorseOverviewComponent } from '../../../../horse-overview.component';

describe('HorseOverviewComponent', () => {
  let component: HorseOverviewComponent;
  let fixture: ComponentFixture<HorseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorseOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
