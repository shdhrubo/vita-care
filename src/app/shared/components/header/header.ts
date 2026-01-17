import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  isMenuOpen = false;

  navLinks = [
    { label: 'Home', path: '/' },
    {
      label: 'Services',
      path: '/services',
      children: [
        { label: 'General Consultation', path: '/services/consultation' },
        { label: 'Lab Test', path: '/services/lab-test' },
        { label: 'Ambulance', path: '/services/ambulance' },
      ],
    },
    { label: 'Doctors', path: '/doctors' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
