import { afterNextRender, afterRender, AfterViewInit, Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
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
export class NewTicketComponent implements OnInit, AfterViewInit {

  private form = viewChild<ElementRef<HTMLFormElement>>('form');

  constructor() {
    afterRender(() => {
      console.log('After Render');
    });

    afterNextRender(() => {
      console.log('After Next Render');
    });
  }

  ngOnInit() {
    console.log('Form:', this.form()!.nativeElement);
  }

  ngAfterViewInit() {
    console.log('Form initialized');
    console.log('Form:', this.form()!.nativeElement);
  }

  submitTicket(title: string, request: string) {
    console.log('Ticket submitted');
    console.log('Title:', title);
    console.log('Request:', request);

    this.form()?.nativeElement.reset();
  }
}
