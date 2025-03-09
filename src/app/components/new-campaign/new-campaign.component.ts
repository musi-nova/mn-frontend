import { Component } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-new-campaign',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './new-campaign.component.html',
  styleUrl: './new-campaign.component.scss'
})
export class NewCampaignComponent {

}
