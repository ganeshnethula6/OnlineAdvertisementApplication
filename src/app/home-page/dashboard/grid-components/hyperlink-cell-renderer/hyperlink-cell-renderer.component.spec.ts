import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperlinkCellRendererComponent } from './hyperlink-cell-renderer.component';

describe('HyperlinkCellRendererComponent', () => {
  let component: HyperlinkCellRendererComponent;
  let fixture: ComponentFixture<HyperlinkCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HyperlinkCellRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperlinkCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
