import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedContentComponent } from './breed-content.component';

describe('BreedContentComponent', () => {
  let component: BreedContentComponent;
  let fixture: ComponentFixture<BreedContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreedContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
