import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { ButtonComponent } from "../../../shared/button/button.component";
import { ControlComponent } from "../../../shared/control/control.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  private form = viewChild<ElementRef<HTMLFormElement>>('form');

  submitTicket(title: string, request: string) {
    console.log('Ticket submitted');
    console.log('Title:', title);
    console.log('Request:', request);

    this.form()?.nativeElement.reset();
  }
}
