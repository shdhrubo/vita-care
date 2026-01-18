import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BannerSection } from '../../components/banner-section/banner-section';
import { FaqSection } from '../../components/faq-section/faq-section';

@Component({
  selector: 'app-home-page-container',
  imports: [BannerSection, FaqSection],
  templateUrl: './home-page-container.html',
  styleUrl: './home-page-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageContainer {}
