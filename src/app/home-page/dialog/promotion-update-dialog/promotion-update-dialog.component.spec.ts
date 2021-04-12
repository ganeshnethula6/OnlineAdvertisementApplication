import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionUpdateDialogComponent } from './promotion-update-dialog.component';

describe('PromotionUpdateDialogComponent', () => {
  let component: PromotionUpdateDialogComponent;
  let fixture: ComponentFixture<PromotionUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
