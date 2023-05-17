import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  EVENT_BROKER_SERVICE_NAME,
  EventBrokerServiceClient,
  ProduceEventResponse,
} from '../../proto/event-broker.pb';
import { EmitterOptions } from './interfaces/emitter-options';
import { EMITTER_OPTIONS_TOKEN } from './emitter.module-definition';

@Injectable()
export class EmitterService implements OnModuleInit {
  private svc: EventBrokerServiceClient;

  constructor(
    @Inject(EVENT_BROKER_SERVICE_NAME)
    private readonly eventBrokerClient: ClientGrpc,
    @Inject(EMITTER_OPTIONS_TOKEN)
    private readonly options: EmitterOptions,
  ) {}

  public onModuleInit(): void {
    this.svc = this.eventBrokerClient.getService<EventBrokerServiceClient>(
      EVENT_BROKER_SERVICE_NAME,
    );
  }

  public async emit<D>(
    event: string,
    rawData: D,
  ): Promise<ProduceEventResponse> {
    const data = JSON.stringify(rawData);

    return firstValueFrom(
      this.svc.produceEvent({
        data,
        event,
        producerName: this.options.serviceName,
      }),
    );
  }
}
