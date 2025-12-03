export class TicketStatusChangedEvent {
  constructor(
    public readonly ticketId: string,
    public readonly newStatus: string,
  ) {}
}
