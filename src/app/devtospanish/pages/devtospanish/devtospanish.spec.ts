import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtospanishComponent } from './devtospanish';

describe('DevtospanishComponent', () => {
  let component: DevtospanishComponent;
  let fixture: ComponentFixture<DevtospanishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevtospanishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevtospanishComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
