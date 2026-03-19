import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { AuthSyncService } from './core/services/auth-sync.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private authSync = inject(AuthSyncService);
  protected readonly title = signal('vita-care');

  ngOnInit() {
    this.authSync.syncUserOnLogin();
  }
}
