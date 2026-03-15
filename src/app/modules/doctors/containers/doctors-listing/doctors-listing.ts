import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Doctor } from '../../../../core/contracts/doctor.contracts';
import { DoctorCardComponent } from '../../components/doctor-card/doctor-card';
import { LoadingComponent } from '../../../../shared/components/loading/loading';

@Component({
  selector: 'app-doctors-listing',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    DoctorCardComponent,
    LoadingComponent,
  ],
  templateUrl: './doctors-listing.html',
  styleUrl: './doctors-listing.scss',
})
export class DoctorsListingComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() doctors: Doctor[] = [];
  @Input() totalCount: number = 0;
  @Input() isLoading: boolean = false;
  @Input() isInitialLoading: boolean = true;
  @Input() hasMore: boolean = false;
  @Input() searchControl!: FormControl;

  @Output() scrolled = new EventEmitter<void>();

  @ViewChild('scrollAnchor') scrollAnchor!: ElementRef;

  private observer?: IntersectionObserver;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading'] && !this.isLoading && this.hasMore) {
      if (this.observer && this.scrollAnchor) {
        this.observer.unobserve(this.scrollAnchor.nativeElement);
        setTimeout(() => {
          if (this.scrollAnchor) {
            this.observer!.observe(this.scrollAnchor.nativeElement);
          }
        }, 50);
      }
    }
  }

  ngAfterViewInit() {
    this.setupInfiniteScroll();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupInfiniteScroll() {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !this.isLoading && this.hasMore) {
        this.scrolled.emit();
      }
    }, options);

    if (this.scrollAnchor) {
      this.observer.observe(this.scrollAnchor.nativeElement);
    }
  }
}
