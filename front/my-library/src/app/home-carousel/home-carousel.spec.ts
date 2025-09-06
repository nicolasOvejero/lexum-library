import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarousel } from './home-carousel';

describe('HomeCarousel', () => {
  let component: HomeCarousel;
  let fixture: ComponentFixture<HomeCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
