import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { map } from 'rxjs/operators';
import { Mensaje } from '../interfaces/mensaje.interface'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor( private afs: AngularFirestore ) { }


  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
                                                                            .limit(30) );
    
    return this.itemsCollection.valueChanges()
                              .pipe( map( (mensajes: Mensaje[]) => {
                                  console.log( mensajes );

                                  this.chats = [];

                                  for ( let mensaje of mensajes ){
                                    this.chats.unshift( mensaje );
                                  }
                                  //return opcional
                                  return this.chats;
                                //  this.chats = mensajes;
                                } ) );

  }

  agregarMensaje( texto: string ) {

    // TODO falta el UID del usuario
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add( mensaje )
  }
  
}
