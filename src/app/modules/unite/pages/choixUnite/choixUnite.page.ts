import { Component , OnInit, OnDestroy} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';

// We use the gql tag to parse our query string into a query document
export const QueryUnites = gql`
query unites{
  unites{
    id
    libunt
  }
}
`;


interface UnitesItem {
  id: string;
  libunt: string;
}
@Component({
  selector: 'app-choix-unite',
  templateUrl: 'choixUnite.component.html',
  styleUrls: ['./choixUnite.component.scss']

})

export class PageChoixUniteComponent implements OnInit, OnDestroy {
  loading: boolean;
  unitesItem: UnitesItem[] = [];

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: QueryUnites
    })
      .valueChanges

      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.unitesItem = data.unites ;
      });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
