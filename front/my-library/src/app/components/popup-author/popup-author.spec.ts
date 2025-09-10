import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAuthor } from './popup-author';

describe('PopupAuthor', () => {
  let component: PopupAuthor;
  let fixture: ComponentFixture<PopupAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAuthor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
