import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/shared/models/model';
import { DescriptionArticleService } from 'src/app/shared/services/descriptionArticle.service';

@Component({
  selector: 'app-popup-infos',
  templateUrl: './popup-infos.component.html',
  styleUrls: ['./popup-infos.component.scss']
})
export class PopupInfosComponent implements OnInit {

  @Input()
  article: Article;
  constructor(private popupInfos: DescriptionArticleService) { }

  ngOnInit() {
  }

}
