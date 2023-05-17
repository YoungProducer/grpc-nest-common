import { Module } from '@nestjs/common';
import { EmitterService } from './emitter.service';
import { EmitterModuleClass } from './emitter.module-definition';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  EVENT_BROKER_PACKAGE_NAME,
  EVENT_BROKER_SERVICE_NAME,
} from '../../proto/event-broker.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_BROKER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50052',
          package: EVENT_BROKER_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/event-broker.proto',
        },
      },
    ]),
  ],
  providers: [EmitterService],
  exports: [EmitterService],
})
export class EmitterModule extends EmitterModuleClass {}
