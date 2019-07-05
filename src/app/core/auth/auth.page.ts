import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class PageAuthComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkoutForm = new FormGroup({
      identifiant: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(data) {
    if (data.identifiant === 'root' && data.password === 'root') {
      this.router.navigate(['/choixUnite']);
    }
  }


}
