import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-smart-url',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './create-smart-url.component.html',
  styleUrl: './create-smart-url.component.scss'
})
export class CreateSmartUrlComponent {
  businessId: string = '';
  adAccountId: string = '';
  pixelId: string = '';
  playlistId: string = '';
  smartUrl: string = '';

  onSubmit(form: any) {
    const { businessId, adAccountId, pixelId, playlistId } = form.value;
    this.smartUrl = `https://mn-api.jms.rocks/spotify/playlist/${playlistId}/smart-url?business_id=${businessId}&ad_account_id=${adAccountId}&pixel_id=${pixelId}`;
  }

}