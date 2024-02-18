import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  faLock = faLock;
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log("reset");
  }

  get email() {
    return this.resetForm.controls['email'];
  }
}