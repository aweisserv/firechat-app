import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {

  mensaje: string="";

  constructor( public cs: ChatService ) { 

    this.cs.cargarMensajes()
            .subscribe();

  }

  enviarMensaje() {
    console.log(this.mensaje);

    if( this.mensaje.length === 0){
      return;
    }

    this.cs.agregarMensaje( this.mensaje )
            .then( ()=> this.mensaje = '' )
            .catch( (err) => console.error('Error al enviar', err ) );
  }

}
