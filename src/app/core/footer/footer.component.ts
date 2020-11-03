import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  links = [
    { nom: 'Inventaires', icon: 'edit' },
    { nom: 'Mouvements', icon: 'swap_horiz' },
    { nom: 'Restitutions', icon: 'local_printshop', link:'/inventaire/restitution'},
    { nom: 'création QRcode', icon: 'qr_code',link:'/inventaire/creationarticle' }
  ];
  activeLink = this.links[0];
}
