import { LoginPage } from './../login/login.page';
import { Tab3Page } from './../tab3/tab3.page';
import { Tab2Page } from './../tab2/tab2.page';
import { Tab1Page } from './../tab1/tab1.page';
import { Component, NgModule } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AppService } from '../servicios.service';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  id: any;
  appMenuItems: Array<MenuItem>;

  constructor(public api: AppService, public navCtrl: NavController, public alertController: AlertController) {

    this.appMenuItems = [
      { title: 'Home', component: Tab1Page, icon: 'home' },
      { title: 'Login', component: LoginPage, icon: 'people' },
      { title: 'Ingles', component: Tab3Page, icon: 'star' },
      { title: 'Español', component: Tab2Page, icon: 'checkmark-circle' },
    ];
  }

  openPage(page) {
    this.navCtrl.navigateRoot(page.component);
  }

  tab1() {
    this.navCtrl.back();
  }

  // async tab1() {
  //   const alert = await this.alertController.create({
  //     header: 'Alert',
  //     subHeader: 'Subtitle',
  //     message: 'This is an alert message.',
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  //   this.navCtrl.back();
  // }

}
