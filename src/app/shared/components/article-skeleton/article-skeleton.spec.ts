import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSkeleton } from './article-skeleton';

describe('ArticleSkeleton', () => {
  let component: ArticleSkeleton;
  let fixture: ComponentFixture<ArticleSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
