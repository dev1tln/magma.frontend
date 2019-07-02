import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  links = [{ nom: 'Inventaire', icon: 'assignment' }, { nom: 'Referenciel', icon: 'search' }];
  activeLink = this.links[0];

}
