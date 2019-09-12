import { Injectable } from '@angular/core';
import { Article } from 'src/app/shared/models/model';

@Injectable()
export class DescriptionArticleService {
  private article: Article;

  getArticle(): Article {
    return this.article;
  }

  setArticle(article: Article) {
    this.article = article;
  }
}
