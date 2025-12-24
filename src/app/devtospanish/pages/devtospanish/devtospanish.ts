import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { HeaderComponent } from '@/app/shared/components/header/header';
import { ArticlesService } from '../../services/articles/articles';
import { rxResource } from '@angular/core/rxjs-interop';
import { ArticleComponent } from '@/app/shared/components/article/article';
import { HeroComponent } from '../../components/hero/hero';
import { ActionsComponent } from '../../components/actions/actions';
import { ArticleModel } from '@/app/core/models/article.model';
import { FooterComponent } from '@/app/shared/components/footer/footer';


@Component({
  selector: 'app-devtospanish',
  imports: [HeaderComponent, ArticleComponent, HeroComponent, ActionsComponent, FooterComponent],
  templateUrl: './devtospanish.html',
  styleUrl: './devtospanish.css',
})
export class DevtospanishComponent {
    private readonly _articles = inject(ArticlesService);
    public page = signal(1);
    public $allArticles = signal<ArticleModel[]>([]);

    public resourceArticles = rxResource({
        params: () => ({ page: this.page() }),
        stream: ({ params }) => this._articles.getArticles(params.page),
    })

    constructor() {
        effect(() => {
            this.$allArticles.update(prev => [...prev, ...(this.resourceArticles.value() ?? [])]);
        });
    }

    public loadMoreArticles() {
        this.page.update(page => page + 1);
    }
}
