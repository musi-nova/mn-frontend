import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to imports
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  formData = {
    name: '',
    title: '',
    email: '',
    message: ''
  };

  sendEmail() {
    const serviceID = 'service_jw2ueaq';
    const templateID = 'template_6xsrb8h';
    const userID = 'LUAEvB-3M6E1uXFBo';

    emailjs.send(serviceID, templateID, this.formData, userID)
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        alert('Your message has been sent!');
      })
      .catch((error) => {
        console.error('Failed to send email.', error);
        alert('Failed to send your message. Please try again later.');
      });
  }
}