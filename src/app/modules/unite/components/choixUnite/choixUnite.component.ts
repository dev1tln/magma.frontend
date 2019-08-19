import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Unite } from 'src/app/shared/models/model';


@Component({
  selector: 'app-choix-unite',
  templateUrl: 'choixUnite.component.html',
  styleUrls: ['./choixUnite.component.scss']

})

export class ChoixUniteComponent implements OnInit {
  uniteFormGroup: FormGroup;
  secteurFormGroup: FormGroup;
  uniteForm: FormGroup = this.formBuilder.group({
    uniteGroup: ''
  });

  // ma liste d'unité disponible
  uniteGroups: Unite[];
  // l'auto-complete
  uniteGroupOptions: Observable<Unite[]>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uniteFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secteurFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.uniteGroupOptions = this.uniteForm
      .get('uniteGroup')
      .valueChanges.pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  // auto-complete methode
  private _filterGroup(value: string): Unite[] {
    if (value) {
      return this.uniteGroups.filter(group => (
        group.libunt.toLowerCase().indexOf(value.toLowerCase()) === 0
      ));
    }
    return this.uniteGroups;
  }

  // methode affichage objet Unite en string
  displayUnite(unite: Unite): string | undefined {
    return unite ? unite.libunt : undefined;
  }
}
