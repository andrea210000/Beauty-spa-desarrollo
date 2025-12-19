import { Component, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";



@Component({
  selector: 'app-home-component',
  imports: [A11yModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  track = viewChild<ElementRef<HTMLDivElement>>('track');

  currentTranslate = 0;

  ngAfterViewInit() {
    this.cloneSlides();
    this.startCarousel();
  }

  cloneSlides() {
    const trackEl = this.track()?.nativeElement;
    if (!trackEl) return;

    const slides = Array.from(trackEl.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      trackEl.appendChild(clone);
    });
  }

  startCarousel() {
    
    const trackEl = this.track()?.nativeElement;
    if (!trackEl) return;
    const slideWidth = trackEl.firstElementChild?.clientWidth || 0;
    const gap = window.innerWidth * 0.015;

    setInterval(() => {
      this.currentTranslate -= (slideWidth + gap) / 20; // velocidad

      if (Math.abs(this.currentTranslate) >= trackEl.scrollWidth / 2) {
        this.currentTranslate = 0; // reinicia
      }
      trackEl.style.transform = `translateX(${this.currentTranslate}px)`;
    }, 50);

  }

}
