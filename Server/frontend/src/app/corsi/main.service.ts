import { Injectable } from '@angular/core'

import { HttpClient } from '@angular/common/http'

import { CdL } from '../model/all'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

const REST_ENDPOINT: string = "https://www.studentingegneria.it/socisi/backend/cdl.php"

@Injectable()
export class CorsiService{

    _obs = new Subject<CdL[]>();

    constructor(private http: HttpClient){

    }

    private updateSub(value){
        let temp : CdL[] = [];
        value.forEach(
            (old) => {temp.push(new CdL(old));}
        )
        this._obs.next(temp);
    }
    
    getCorsi(): Observable<CdL[]>{
        this.http.get<CdL[]>(REST_ENDPOINT).subscribe(
            (value) => {this.updateSub(value)}
        )
        return this._obs;
    }

    addCorso(nome: string){
        this.http.post<CdL[]>(REST_ENDPOINT, {'nome': nome}).subscribe(
            (value) => { this.updateSub(value) }
        );
    }

    deleteCorso(corso: CdL){
        this.http.delete<CdL[]>(REST_ENDPOINT+'/'+corso.id).subscribe(
            (value) => { this.updateSub(value) }
        );
    }

    updateCorso(newCorso: CdL){
        this.http.post<CdL[]>(REST_ENDPOINT, newCorso).subscribe(
            (value) => { this.updateSub(value) }
        );
    }
}