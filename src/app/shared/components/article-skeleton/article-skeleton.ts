import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-article-skeleton',
  imports: [],
  templateUrl: './article-skeleton.html',
  styleUrl: './article-skeleton.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSkeletonComponent {
    public count = input<number>(6);

    public Array = Array;
}
