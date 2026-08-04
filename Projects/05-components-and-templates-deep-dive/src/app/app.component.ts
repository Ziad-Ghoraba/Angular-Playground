import { Component, OnInit } from '@angular/core';
import {HeaderComponent } from "./header/header.component";
import { ServerStatusComponent } from "./dashboard/server-status/server-status.component";
import { TrafficComponent } from "./dashboard/traffic/traffic.component";
import { TicketsComponent } from "./dashboard/tickets/tickets.component";
import { DashboardItemComponent } from "./dashboard/dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, ServerStatusComponent, TrafficComponent, TicketsComponent, DashboardItemComponent],
})
export class AppComponent implements OnInit {
  currentStatus: 'online' | 'offline' | 'maintenance' = 'online';

  ngOnInit() {
    setInterval(() => {
      const rnd = Math.random(); // 0- 0.9999999999999999
      if (rnd < 0.33) {
        this.currentStatus = 'online';
      } else if (rnd < 0.66) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'maintenance';
      }
    }, 5000);
  }
}
