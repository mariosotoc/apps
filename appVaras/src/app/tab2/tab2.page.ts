import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  video: any = {
    url: 'https://puertovaras.likemeturismo.cl/ingresar/?visual-conf=hide-header'
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
