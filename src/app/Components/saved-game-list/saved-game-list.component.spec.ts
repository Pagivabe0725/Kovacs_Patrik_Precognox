import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedGameListComponent } from './saved-game-list.component';

describe('SavedGameListComponent', () => {
  let component: SavedGameListComponent;
  let fixture: ComponentFixture<SavedGameListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SavedGameListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedGameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
