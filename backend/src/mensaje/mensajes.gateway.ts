import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MensajeService } from './mensaje.service';
import { CrearMensajeDto } from './dto/crear_mensaje.dto';
@WebSocketGateway({
  cors: {
    origin: [
      'https://fs-nextjs-nest-js.vercel.app/',
      'https://fs-nextjs-nest-js.vercel.app',
      'http://localhost:3000',
      'http://localhost:3001',
    ], //cambiar por el que corresponda o por el .env
    credentials: true,
  },
})
export class MensajesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly mensajeService: MensajeService) {}

  @SubscribeMessage('enviar_mensaje')
  async enviarMensaje(
    @MessageBody() crearMensajeDto: CrearMensajeDto,
    @ConnectedSocket() client: Socket,
  ) {
    const mensaje =
      await this.mensajeService.crearMensajeService(crearMensajeDto);
    const receptor = this.server
      .to(crearMensajeDto.idReceptor)
      .emit('mensaje', mensaje);
    client.emit('mensaje', mensaje);
    console.log('backend mensaje de enviarMensaje: ', receptor);

    return mensaje;
  }

  // Usuario entra a su "room"
  @SubscribeMessage('join')
  handleJoin(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.join(userId);
    console.log('backend mensaje de handleJoin: ', userId);

    client.emit('joined', { room: userId });
  }

  // Evento para obtener historial de mensajes de un chat
  @SubscribeMessage('obtener_mensajes')
  async obtenerMensajes(
    @MessageBody() data: { idEmisor: string; idReceptor: string },
    @ConnectedSocket() client: Socket,
  ) {
    const mensajes = await this.mensajeService.conseguirMensajeService(
      data.idEmisor,
      data.idReceptor,
    );

    client.emit('historial_mensajes', mensajes);

    return mensajes;
  }
}
