import { Injectable, signal } from '@angular/core';
import { ServiceCategory } from '../contracts/service.contracts';

@Injectable({
  providedIn: 'root',
})
export class CareService {
  private readonly categories = signal<ServiceCategory[]>([
    {
      Id: 'consultation',
      Title: 'General Consultation',
      Description: 'Professional medical advice and primary care from our expert specialists.',
      Path: '/services/consultation',
      Icon: 'platform_solid:stethoscope',
      Color: 'primary',
      Features: [
        { Id: 'f1', Title: 'Expert Diagnosis', Description: 'Comprehensive patient assessment and expert medical advice.', Icon: 'platform_solid:stethoscope' },
        { Id: 'f2', Title: 'Personalized Care', Description: 'Individualized treatment plans tailored specifically to your needs.', Icon: 'platform_solid:user' },
        { Id: 'f3', Title: 'Preventative Screenings', Description: 'Regular health checks to identify and prevent potential issues.', Icon: 'platform_solid:shield-check' },
        { Id: 'f4', Title: 'Follow-up Support', Description: 'Continuous care and monitoring to ensure your recovery.', Icon: 'platform_solid:calendar' }
      ]
    },
    {
      Id: 'lab-test',
      Title: 'Lab Test',
      Description: 'State-of-the-art diagnostic testing with rapid, accurate results.',
      Path: '/services/lab-test',
      Icon: 'platform_solid:activity',
      Color: 'amber',
      Features: [
        { Id: 'f1', Title: 'Rapid Diagnostics', Description: 'Advanced machinery ensuring quick turnaround times for your peace of mind.', Icon: 'platform_solid:lightning' },
        { Id: 'f2', Title: 'Certified Analysts', Description: 'All tests handled strictly by board-certified biomedical scientists.', Icon: 'platform_solid:shield-check' },
        { Id: 'f3', Title: 'Digital Reporting', Description: 'Secure online access to your results as soon as they are ready.', Icon: 'platform_solid:document-text' },
        { Id: 'f4', Title: 'Home Sample Collection', Description: 'Convenient sample collection right from the comfort of your home.', Icon: 'platform_solid:truck' }
      ]
    },
    {
      Id: 'ambulance',
      Title: 'Ambulance',
      Description: '24/7 emergency response and rapid transport services.',
      Path: '/services/ambulance',
      Icon: 'platform_solid:ambulance',
      Color: 'rose',
      Features: [
        { Id: 'f1', Title: '24/7 Availability', Description: 'Round-the-clock emergency transport whenever you need it most.', Icon: 'platform_solid:clock' },
        { Id: 'f2', Title: 'Advanced Life Support', Description: 'Equipped with state-of-the-art life-saving medical equipment.', Icon: 'platform_solid:shield-check' },
        { Id: 'f3', Title: 'Trained Paramedics', Description: 'Highly skilled professionals providing immediate en-route critical care.', Icon: 'platform_solid:user-group' },
        { Id: 'f4', Title: 'Rapid Response', Description: 'GPS-tracked navigation to ensure the fastest possible arrival times.', Icon: 'platform_solid:lightning' }
      ]
    },
  ]);

  getCategories() {
    return this.categories;
  }
}
