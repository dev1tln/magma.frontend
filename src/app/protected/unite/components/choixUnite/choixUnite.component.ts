import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith, filter, first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { CACHE_UNITES } from 'src/app/shared/graphql/queries';
import { Router } from '@angular/router';
import { InventaireService } from 'src/app/shared/services/inventaires.service';

@Component({
  selector: 'app-choix-unite',
  templateUrl: 'choixUnite.component.html',
  styleUrls: ['./choixUnite.component.scss']
})

export class ChoixUniteComponent implements OnInit {
  uniteFormGroup: FormGroup;
  detentionFormGroup: FormGroup;

  uniteForm: FormGroup = this.formBuilder.group({
    uniteGroup: ''
  });

  // ma liste d'unité disponible
  uniteGroups: any[];
  // l'auto-complete
  uniteGroupOptions: Observable<any[]>;
  detentionGroupOptions: Observable<any[]>;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private inventaire: InventaireService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // On recupere les unites de l'user
    this.uniteGroups = this.apollo.getClient().readQuery<any>({
      query: CACHE_UNITES,
    })
      .utilisateur.unites;
    // Init les formulaires
    this.uniteFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.detentionFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // Souscription du form à l'autocomplete
    this.uniteGroupOptions = this.uniteFormGroup.get('firstCtrl')
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.detentionGroupOptions = this.uniteFormGroup.get('firstCtrl')
      .valueChanges.pipe(
        map(value => value.detentions)
      );
  }

  // auto-complete methode
  private _filter(value) {
    let filterValue = value.libunt;
    if (typeof value === 'string') { filterValue = value.toLowerCase(); }
    return this.uniteGroups.filter(unite => unite.libunt.toLowerCase().includes(filterValue));
  }

  // methode affichage objet Unite en string
  displayUnite(value): string {
    if (value) {
      return value.libunt;
    }
  }

  displayDetention(value): string {
    if (value) {
      return value.lib;
    }
  }

  onSubmit() {
    this.inventaire.initInventaire(this.detentionFormGroup.get('secondCtrl').value.id)
      .pipe(first()).subscribe(data => {
        if (data !== null) {
          this.router.navigateByUrl('/inventaire');
        }
      });
  }
}
