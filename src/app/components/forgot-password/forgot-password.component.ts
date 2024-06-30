import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  faLock = faLock;
  ok: 'UNSENT' | 'SUCCESS' | 'ERROR' = 'UNSENT';
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
  }

  get email() {
    return this.resetForm.controls['email'];
  }

  sendRequestForgotPassword() {
    this.auth.forgotPassword(this.email.value).subscribe({
      next: result => {
        this.ok = 'SUCCESS';
      },
      error: error => {
        this.ok = 'ERROR';
      }
    });
  }
  
}