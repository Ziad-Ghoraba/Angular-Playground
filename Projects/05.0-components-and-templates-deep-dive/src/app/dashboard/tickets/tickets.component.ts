import { Component, signal } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { Ticket } from './ticket/ticket.model';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets = signal<Ticket[]>([]);

  addTicket(ticketData: { title: string; request: string }) {
    const ticket: Ticket = { id: Math.random().toString(36),
      title: ticketData.title,
      request: ticketData.request,
      status: 'open' };
    this.tickets.update(tickets => [...tickets, ticket]);
  }

  onTicketCompleted(ticketId: string) {
    this.tickets.update(tickets => tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: 'closed' } : ticket
    ));
    console.log('Ticket completed:', ticketId);
  }
}
