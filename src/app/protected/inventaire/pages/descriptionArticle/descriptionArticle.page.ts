import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/shared/models/model';
import { DescriptionArticleService } from './descriptionArticle.service';


@Component({
  selector: 'app-page-description-article',
  templateUrl: './descriptionArticle.page.html',
  styleUrls: ['./descriptionArticle.page.scss'],
})
export class DescriptionArticleComponent implements OnInit {
  article: Article;
  constructor(private descriptionArticle: DescriptionArticleService) { }

  ngOnInit(): void {
    this.article = this.descriptionArticle.getArticle();
  }
}
