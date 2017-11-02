import { Component, OnInit } from '@angular/core'

import { MatDialogRef } from '@angular/material'

import { SociService } from '../soci/main.service'
import { MembroDirettivo, Socio } from '../model'

import { PATTERN_PASSWORD, PATTERN_USER } from '../common'

@Component({
    selector: 'aggiunta-direttivo',
    templateUrl: './aggiunta.component.html',
    styleUrls: ['./aggiunta.component.css', '../common/style.css']
})
export class AggiuntaDirettivoComponent implements OnInit {

    // fix: only import doesn't show in view, must define local variable
    public PATTERN_PASSWORD = PATTERN_PASSWORD;
    public PATTERN_USER = PATTERN_USER;

    allSoci: Socio[];

    socio: Socio = null
    user: string;
    password: string;

    loaded: boolean = false;

    constructor(private _diagref: MatDialogRef<AggiuntaDirettivoComponent>,
        private _socisrv: SociService) {

    }

    ngOnInit() {
        this._socisrv.getSoci().first().subscribe(
            (s: Socio[]) => {
                this.allSoci = s.sort((a: Socio, b: Socio) => { 
                    return (a.nome + ' ' + a.cognome).localeCompare(b.nome + ' ' + b.cognome)
                })
                this.loaded = true;
            }
        )
    }

    addMembro(form) {
        if (!form.invalid) {
            let toReturn: MembroDirettivo = new MembroDirettivo(this.socio);
            toReturn.user = this.user;
            toReturn.password = this.password;
            this._diagref.close(toReturn);
        }
        return false;
    }
}