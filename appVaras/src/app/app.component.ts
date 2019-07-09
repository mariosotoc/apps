import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './servicios.service';
// import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
  navigate: any;
  token: any;
  colorVar: any;
  items: any;
  itemh: any;
  itemn: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public global: AppService,
    private navCtrl: NavController,
    private router: Router,
    private location: Location
    // private fcm: FCM
  ) {
    this.initializeApp();
    // this.sideMenu();
    this.global.getTokens().subscribe(res => {
      if (res.codigo === '0') {
        this.global.getCategorias(res.datos.tk)
          .then(data => {
            let menus = JSON.stringify(data["datos"]);
            let menu = JSON.parse(menus);
            this.items = [];
            this.items.push({ id: "0", nombre: 'Login', color: '', icono: '', url: '/login/login', children: [] });
            // tslint:disable-next-line:forin
            for (let k in menu) {
              // console.log(menu[k].id + ' :: ' + menu[k].nombre);
              let hijos = JSON.stringify(menu[k].children);
              let hijo = JSON.parse(hijos);
              this.itemh = [];
              if (Object.keys(hijo).length > 0) {
                // tslint:disable-next-line:forin
                for (let s in hijo) {
                  // console.log(' ==> ' + hijo[s].id + ' :: ' + hijo[s].nombre);
                  let nietos = JSON.stringify(hijo[s].children);
                  let nieto = JSON.parse(nietos);
                  this.itemn = [];
                  if (Object.keys(nieto).length > 0) {
                    // tslint:disable-next-line:forin
                    for (let n in nieto) {
                      this.itemn.push({ id: nieto[n].id, nombre: nieto[n].nombre, url: nieto[n].url, color: nieto[n].color, icono: nieto[n].logo, children: [] });
                      // console.log(' ====> ' + nieto[n].id + ' :: ' + nieto[n].nombre);
                    }
                  }
                  if (this.itemn.length > 0) {
                    this.itemh.push({ id: hijo[s].id, nombre: hijo[s].nombre, color: hijo[s].color, icono: hijo[s].logo, children: this.itemn });
                  } else {
                    this.itemh.push({ id: hijo[s].id, nombre: hijo[s].nombre, color: hijo[s].color, icono: hijo[s].logo, url: hijo[s].url, children: [] });
                  }
                }
              }
              if (this.itemh.length > 0) {
                this.items.push({ id: menu[k].id, nombre: menu[k].nombre, color: menu[k].color, icono: menu[k].logo, children: this.itemh });
              } else {
                this.items.push({ id: menu[k].id, nombre: menu[k].nombre, color: menu[k].color, icono: menu[k].logo, url: menu[k].url, children: [] });
              }
            }
            // this.navigate = JSON.parse(JSON.stringify(this.items));
            this.navigate = this.items;
            // console.log(JSON.parse(JSON.stringify(this.items)));
          });
      }
    });
  }

  //[routerLink]="p.url"
  //[ngStyle]="{'background-color': p.color}"
  navigateForward(urls: string) {
    if (urls === '/login/login') {
      console.log(urls);
      this.router.navigate(['/tabs/tab2'], { state: { updateInfos: true } });
    } else {
      this.global.video3.url3 = urls;
      if (this.router.url === '/tabs/tab3') {
        this.CambiarContenido('/tabs/tab3');
      } else {
        this.router.navigate(['/tabs/tab3'], { state: { updateInfos: true } });
      }
    }
  }

  async CambiarContenido(urls: string) {
    this.location.replaceState(urls);
    await this.router.navigate([urls, { "refresh": (new Date).getTime() }]);
    this.location.replaceState(urls);
  }

  initializeApp() {
    if (this.global.video3.url3.length === 0) {
      this.global.video3.url3 = '';
    }
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.fcm.getToken().then(token => {
      //   console.log(token);
      // });
      // this.fcm.onNotification().subscribe(data => {
      //   if (data.wasTapped) {
      //     console.log('Received in background');
      //   } else {
      //     console.log('Received in foreground');
      //   }
      // });
      // this.fcm.onTokenRefresh().subscribe(token => {
      //   console.log(token);
      // });
    });
  }

  // sideMenu() {
  //   this.navigate =
  //     [
  //       {
  //         id: '1',
  //         nombre: 'Home',
  //         url: '/tabs',
  //         icono: 'home'
  //       },
  //       {
  //         id: '2',
  //         nombre: 'Login',
  //         url: '/login',
  //         icono: 'contacts'
  //       },
  //       {
  //         id: '3',
  //         nombre: 'Categorias',
  //         icono: 'home',
  //         children: [{
  //           id: '31',
  //           nombre: 'Home',
  //           url: '/tabs/tab3',
  //           icono: 'home'
  //         }, {
  //           id: '32',
  //           nombre: 'Otros',
  //           url: '/tabs/tab3',
  //           icono: 'home',
  //           children: [{
  //             id: '321',
  //             nombre: 'Home',
  //             url: '/tabs/tab3',
  //             icono: 'home'
  //           }]
  //         }
  //         ]
  //       },
  //     ];
  // }
}
