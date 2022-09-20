import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoreContentComponent } from './lore-content.component';

describe('LoreContentComponent', () => {
  let component: LoreContentComponent;
  let fixture: ComponentFixture<LoreContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoreContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
