import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../servicios.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  trustedVideoUrl: SafeResourceUrl;
  // tslint:disable-next-line:max-line-length
  constructor(public loadingCtrl: LoadingController, private domSanitizer: DomSanitizer, public global: AppService, public navCtrl: NavController) {
  }
  async ionViewWillEnter() {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.global.video3.url3);
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    loading.present();
  }

  handleIFrameLoadEvent() {
    const loading = this.loadingCtrl.dismiss();
  }
}

