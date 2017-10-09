import { Component } from '@angular/core'

import { MatDialogRef } from '@angular/material'

import { Carriera } from '../model/all'

@Component({
    selector: 'create-carriera-dialog',
    templateUrl: 'createcarriera.dialog.html',
    styles: [
        `
        .to_left{
          display: block;
          float: left;
        }
        
        .to_right{
          display: block;
          float: right;
        }
        `
    ]
})
export class CreateCarrieraDialog{
    private model: Carriera = new Carriera({id: -1, studente: false, professione: ''});

    constructor(private _diagref: MatDialogRef<CreateCarrieraDialog>){

    }

    commitCarriera(form: any){
        if(!form.invalid){
            this._diagref.close(this.model);
        }
    }
}