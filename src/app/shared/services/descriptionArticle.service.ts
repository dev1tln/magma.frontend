import { Injectable } from '@angular/core';
import { Article } from 'src/app/shared/models/model';

@Injectable()
export class DescriptionArticleService {
  private article: any;

  getArticle(): any {
    return this.article;
  }

  setArticle(article: any) {
    this.article = article;
  }
}
