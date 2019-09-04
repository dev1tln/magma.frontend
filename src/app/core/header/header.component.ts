import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private location: Location) { }

  @Input() title: string;

  ngOnInit(): void { }

  retourPagePrecedente() {
    this.location.back();
    console.log()
  }
}
