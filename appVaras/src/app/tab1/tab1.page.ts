import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  video: any = {
    url: 'https://puertovaras.likemeturismo.cl/?visual-conf=hide-header'
  };
  trustedVideoUrl: SafeResourceUrl;
  constructor(public loadingCtrl: LoadingController, private domSanitizer: DomSanitizer) {
  }

  async ionViewWillEnter() {
    this.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video.url);
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });

    loading.present();
  }

  handleIFrameLoadEvent() {
    const loading = this.loadingCtrl.dismiss();
  }
}
