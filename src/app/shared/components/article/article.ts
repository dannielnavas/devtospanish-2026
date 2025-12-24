import { Component, input } from '@angular/core';
import { ArticleModel } from '@/app/core/models/article.model';
import { DatePipe } from '@angular/common';
import { ChipComponent } from '@/app/shared/components/chip/chip';

@Component({
  selector: 'app-article',
  imports: [DatePipe, ChipComponent],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class ArticleComponent {
    public articleData = input.required<ArticleModel>();
}
