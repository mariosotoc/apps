import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  createSuccess = false;
  Credentials = { email: '', clave: '' };
  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  public login() {
    if (this.Credentials.email !== '') {
      console.log('paso');
    } else {
      this.showPopup('Error', 'Falta ingresar email.');
    }
  }

  async showPopup(title, text) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              console.log('ok');
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
