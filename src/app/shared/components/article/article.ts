import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ArticleModel } from '@/app/core/models/article.model';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChipComponent } from '@/app/shared/components/chip/chip';

@Component({
  selector: 'app-article',
  imports: [DatePipe, ChipComponent, NgOptimizedImage],
  templateUrl: './article.html',
  styleUrl: './article.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
    public articleData = input.required<ArticleModel>();
}
