import { ArticleModel, ArticleRaw } from '@/app/core/models/article.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdapterArticlesService {
  public transformArticles(articles: ArticleRaw[]): ArticleModel[] {
    return articles.map(article => this.transformArticle(article));
  }

  public transformArticle(article: ArticleRaw): ArticleModel {
    return {
      url: article.url,
      title: article.title,
      description: article.description,
      image: article.cover_image ?? article.social_image ?? '',
      user: article.user.name,
      user_image: article.user.profile_image,
      tag_list: article.tag_list,
      language: article.language,
      reading_time_minutes: article.reading_time_minutes,
      published_at: article.published_at,
      last_comment_at: article.last_comment_at,
      positive_reactions_count: article.positive_reactions_count,
      public_reactions_count: article.public_reactions_count,
      comments_count: article.comments_count,
      created_at: article.created_at,
    };
  }
}
