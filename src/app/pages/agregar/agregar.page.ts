import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor(
    private _desos : DeseosService,
    private _route: ActivatedRoute
  ){ 
    //otra forma de obtener el id de la url
    const id = this._route.snapshot.paramMap.get('id');
    this.lista = this._desos.obteberLista(id);
    console.log(this.lista);
  }

  ngOnInit() {

  }

  agregarItem(){
    if(this.nombreItem.length===0){
      return 0;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this._desos.guardarStorage();

  }

  cambioCheck(item:ListaItem){
    //console.log(item);
    //lista de items pasa saber si esta terminada
    const pendientes = this.lista.items
      .filter(itemData => !itemData.completado)
      .length;
    console.log(pendientes);
    if(pendientes===0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }else{
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }

    this._desos.guardarStorage();
    console.log(this._desos.listas);
  }

  borrar(i:number){
    this.lista.items.splice(i, 1);
    this._desos.guardarStorage();
  }

}
