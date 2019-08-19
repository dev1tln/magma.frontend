import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class PageAuthComponent implements OnInit {
  checkoutForm: FormGroup;
  hide = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      identifiant: ['', [Validators.required, Validators.maxLength(60)]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() { return this.checkoutForm.controls; }

  onSubmit(data) {
    if (this.checkoutForm.dirty && this.checkoutForm.valid) {
      this.auth.login(data.identifiant, data.password);
    }
  }

}
