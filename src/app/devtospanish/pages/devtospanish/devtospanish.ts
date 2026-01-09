import { Component, computed, effect, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '@/app/shared/components/header/header';
import { ArticlesService } from '../../services/articles/articles';
import { rxResource } from '@angular/core/rxjs-interop';
import { ArticleComponent } from '@/app/shared/components/article/article';
import { HeroComponent } from '../../components/hero/hero';
import { ActionsComponent } from '../../components/actions/actions';
import { ArticleModel } from '@/app/core/models/article.model';
import { FooterComponent } from '@/app/shared/components/footer/footer';
import { ArticleSkeletonComponent } from '@/app/shared/components/article-skeleton/article-skeleton';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-devtospanish',
  imports: [HeaderComponent, ArticleComponent, HeroComponent, ActionsComponent, FooterComponent, ArticleSkeletonComponent],
  templateUrl: './devtospanish.html',
  styleUrl: './devtospanish.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevtospanishComponent {
    private readonly _articles = inject(ArticlesService);
    public page = signal(1);
    public $allArticles = signal<ArticleModel[]>([]);
    public searchQuery = signal<string>('');
    public selectedFilter = signal<string>('recentes');
    public hasMoreArticles = signal(true);
    public error = signal<string | null>(null);

    public resourceArticles = rxResource({
        params: () => ({ page: this.page() }),
        stream: ({ params }) => this._articles.getArticles(params.page).pipe(
            catchError((err) => {
                const errorMessage = err instanceof Error ? err.message : 'Error al cargar los artículos. Por favor, intenta de nuevo.';
                this.error.set(errorMessage);
                console.error('Error loading articles:', err);
                return of([]);
            })
        ),
    })

    public $filteredArticles = computed(() => {
        let articles = this.$allArticles();
        const query = this.searchQuery().toLowerCase();
        const filter = this.selectedFilter();

        if (query) {
            articles = articles.filter(article =>
                article.title.toLowerCase().includes(query) ||
                article.description.toLowerCase().includes(query) ||
                article.tag_list.some(tag => tag.toLowerCase().includes(query))
            );
        }

        switch (filter) {
            case 'trending':
                return [...articles].sort((a, b) => b.positive_reactions_count - a.positive_reactions_count);
            case 'mas-leidos':
                return [...articles].sort((a, b) => b.public_reactions_count - a.public_reactions_count);
            case 'tutoriales':
                return articles.filter(article =>
                    article.tag_list.some(tag =>
                        ['tutorial', 'tutoriales', 'guía', 'guide'].includes(tag.toLowerCase())
                    )
                );
            default:
                return articles;
        }
    });

    constructor() {
        effect(() => {
            const newArticles = this.resourceArticles.value() ?? [];
            if (newArticles.length === 0) {
                this.hasMoreArticles.set(false);
            } else {
                // Evitar duplicados usando Set con URL como clave única
                const existingUrls = new Set(this.$allArticles().map(a => a.url));
                const uniqueNewArticles = newArticles.filter(article => !existingUrls.has(article.url));
                if (uniqueNewArticles.length > 0) {
                    this.$allArticles.update(prev => [...prev, ...uniqueNewArticles]);
                } else {
                    this.hasMoreArticles.set(false);
                }
            }
        });
    }

    public loadMoreArticles(): void {
        this.page.update(page => page + 1);
    }

    public onSearchChange(query: string): void {
        this.searchQuery.set(query);
    }

    public onFilterChange(filter: string): void {
        this.selectedFilter.set(filter);
        // Scroll suave al inicio de la lista cuando cambia el filtro
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
