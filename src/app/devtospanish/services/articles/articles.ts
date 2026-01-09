import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AdapterArticlesService } from '../adapter-articles/adapter-articles';
import { map, catchError } from 'rxjs/operators';
import { ArticleModel, ArticleRaw } from '@/app/core/models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
    private readonly http = inject(HttpClient);
    private readonly _adapterArticles = inject(AdapterArticlesService);

    public getArticles(page: number): Observable<ArticleModel[]> {
        return this.http.get<ArticleRaw[]>(`https://devtospanishback.vercel.app/api/postspanish/${page}`).pipe(
            map((articles) => {
                if (!Array.isArray(articles)) {
                    throw new Error('Formato de respuesta inválido: se esperaba un array');
                }
                return this._adapterArticles.transformArticles(articles);
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'Error desconocido al cargar los artículos';

                if (error.error instanceof ErrorEvent) {
                    // Error del lado del cliente
                    errorMessage = `Error de conexión: ${error.error.message}`;
                } else {
                    // Error del lado del servidor
                    switch (error.status) {
                        case 0:
                            errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
                            break;
                        case 404:
                            errorMessage = 'No se encontraron más artículos.';
                            break;
                        case 500:
                            errorMessage = 'Error del servidor. Por favor, intenta más tarde.';
                            break;
                        case 503:
                            errorMessage = 'Servicio temporalmente no disponible. Por favor, intenta más tarde.';
                            break;
                        default:
                            errorMessage = `Error ${error.status}: ${error.message || 'Error al cargar los artículos'}`;
                    }
                }

                console.error('Error loading articles:', error);
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}
