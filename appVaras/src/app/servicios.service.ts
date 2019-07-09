import { promise } from 'protractor';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    resultado: Observable<any>;
    public myGlobalUrl: string;
    public video3: any = {
        url3: ''
    };
    url = 'https://puertovaras.likemeturismo.cl/COMUNICADO/rest/services.php';
    postDataT = '{"funcion":"ValidaEntidad","parametros":{"usuarioentidad":"ptovarasuser","clave":"Pt0V4r4sws2016","entidad":"1"}}';

    constructor(private http: HttpClient) {
    }

    getToken() {
        return new Promise(resolve => {
            this.http.post(this.url, this.postDataT).subscribe(data => {
                resolve(data);
            },
                err => {
                    console.log(err.message);
                });
        });
    }

    getTokens(): Observable<any> {
        return this.http.post(this.url, this.postDataT).pipe(
            map(results => results)
        );
    }

    getLogin(usuario: string, claves: string, tken: string) {
        // tslint:disable-next-line:max-line-length
        let postDataId = '{"funcion":"LoginUsr","parametros":{"mail":"';
        postDataId += usuario + '","pass":"' + claves + '","entidad":"1",';
        postDataId += '"tk":"' + tken + '"}}';
        return new Promise(resolve => {
            this.http.post(this.url, postDataId).subscribe(data => {
                resolve(data);
            },
                err => {
                    console.log(err.message);
                });
        });
    }

    getCategorias(tken: string) {
        let postDataId = '{"funcion":"GetCategys","parametros":{"entidad":"1",';
        postDataId += '"tk":"' + tken + '"}}';
        return new Promise(resolve => {
            this.http.post(this.url, postDataId).subscribe(data => {
                resolve(data);
            },
                err => {
                    console.log(err.message);
                });
        });
    }

}
