import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdapterArticlesService } from '../adapter-articles/adapter-articles';
import { map } from 'rxjs/operators';
import { ArticleModel, ArticleRaw } from '@/app/core/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
    private readonly http = inject(HttpClient);
    private readonly _adapterArticles = inject(AdapterArticlesService);

    public getArticles(page: number): Observable<ArticleModel[]> {
        return this.http.get<ArticleRaw[]>(`https://devtospanishback.vercel.app/api/postspanish/${page}`).pipe(
            map((articles) => this._adapterArticles.transformArticles(articles))
        );
    }
}
