import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomePageContainer } from '../../containers/home-page-container/home-page-container';

@Component({
  selector: 'app-home-page',
  imports: [HomePageContainer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
