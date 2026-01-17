import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class Header {
  private elementRef = inject(ElementRef);
  isMenuOpen = false;
  openDropdown: string | null = null;

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

  toggleDropdown(label: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.openDropdown = this.openDropdown === label ? null : label;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.openDropdown = null;
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.openDropdown = null;
  }
}
