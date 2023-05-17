import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { LISTENER_OPTIONS_TOKEN } from './listener.module-definition';
import {
  EVENT_BROKER_SERVICE_NAME,
  EventBrokerServiceClient,
} from '../../proto/event-broker.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { ListenerOptions } from './interface/listener-options';
import { Observable, map } from 'rxjs';

@Injectable()
export class ListenerService implements OnModuleInit {
  private svc: EventBrokerServiceClient;

  constructor(
    @Inject(LISTENER_OPTIONS_TOKEN)
    private readonly options: ListenerOptions,
    @Inject(EVENT_BROKER_SERVICE_NAME)
    private readonly eventBrokerClient: ClientGrpc,
  ) {}

  public onModuleInit(): void {
    this.svc = this.eventBrokerClient.getService<EventBrokerServiceClient>(
      EVENT_BROKER_SERVICE_NAME,
    );
  }

  public listen<D>(producerName: string, event: string): Observable<D> {
    return this.svc
      .consumeEvent({
        consumerName: this.options.serviceName,
        producerName,
        event,
      })
      .pipe(map(({ data }) => JSON.parse(data) as D));
  }
}
