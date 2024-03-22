import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedMessageComponent } from './saved-message.component';

describe('SavedMessageComponent', () => {
  let component: SavedMessageComponent;
  let fixture: ComponentFixture<SavedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
