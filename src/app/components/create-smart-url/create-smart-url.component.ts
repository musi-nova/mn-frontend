import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-create-smart-url',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './create-smart-url.component.html',
  styleUrls: ['./create-smart-url.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreateSmartUrlComponent {
  businessId: string = '';
  adAccountId: string = '';
  pixelId: string = '';
  playlistId: string = '';
  smartUrl: string = '';
  showSubscribePopup: boolean = false; // Add this property

  onSubmit(form: any) {
    const { businessId, adAccountId, pixelId, playlistId } = form.value;
    this.smartUrl = `https://mn-api.jms.rocks/spotify/playlist/${playlistId}/smart-url?business_id=${businessId}&ad_account_id=${adAccountId}&pixel_id=${pixelId}`;
  }

  closePopup() {
    this.showSubscribePopup = false;
  }

  openTutorial() {
    window.open('https://www.youtube.com/watch?v=FhHpHJ7dg6o', '_blank');
  }
}