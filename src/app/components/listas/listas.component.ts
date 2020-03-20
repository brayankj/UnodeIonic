import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList, { static: true}) lista: IonList;
  @Input() terminada = true;
  constructor(
    public _deseos : DeseosService,
    private _router: Router,
    private _alerteCtrl: AlertController
  ){ 

  }

  ngOnInit(){

  }

  listaSelect(lista:Lista){
    console.log(lista);
    if(this.terminada){
      this._router.navigateByUrl('/tabs/tab2/agregar/'+lista.id);
    }else{
      this._router.navigateByUrl('/tabs/tab1/agregar/'+lista.id);
    }
  }

  async EditarLista(lista:Lista){
    console.log(lista);
    const alert = await this._alerteCtrl.create({
      header: 'Editar Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nuevo nombre'
        }
      ],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      },{
        text: 'Actualizar',
        handler : (data) => {
          console.log(data);
          if(data.titulo.length===0){
            return ;
          }
          lista.titulo = data.titulo;
          this._deseos.guardarStorage();
          this.lista.closeSlidingItems();
        }
      }]
    });
    alert.present();
  }

  borrarLista(lista:Lista){
    this._deseos.borrarLista(lista);
  }

}
