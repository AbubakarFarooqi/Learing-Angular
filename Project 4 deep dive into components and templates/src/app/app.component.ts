import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { ServerStatusComponent } from "./dashbord/server-status/server-status.component";
import { TrafficComponent } from "./dashbord/traffic/traffic.component";
import { TicketsComponent } from "./dashbord/tickets/tickets.component";
import { DashbordItemComponent } from "./dashbord/dashbord-item/dashbord-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, 
    ServerStatusComponent,
     TrafficComponent,
      TicketsComponent,
       DashbordItemComponent],
})
export class AppComponent {
  
}
