import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup; // Define um FormGroup para o formulário

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  submitForm() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.httpClient.post<any>(environment.BASE_URL + '/v1/auth/login/', formData)
        .toPromise()
        .then(response => {
          localStorage.setItem('access_token', response.access_token);
          this.router.navigate(['/home'])
                  
        })
        .catch(async (error) => {
          const toast = await this.toastController.create({
            message: 'Erro ao fazer login.',
            duration: 1500,
            position: 'top',
            color: 'warning' 
          });
          await toast.present();
        });
    }
  }
}
