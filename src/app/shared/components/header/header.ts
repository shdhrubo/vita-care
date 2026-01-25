import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, AsyncPipe, DOCUMENT } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, MatIconModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  public auth = inject(AuthService);
  private doc = inject(DOCUMENT);

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

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

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
