import { Component, ElementRef, viewChild, AfterViewInit  } from '@angular/core';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-home-component',
  imports: [A11yModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements AfterViewInit  {
  track = viewChild<ElementRef<HTMLDivElement>>('track');

  currentTranslate = 0;

  ngAfterViewInit(){
    this.cloneSlides();
    this.startCarousel();
  }

  cloneSlides(){
    const trackEl = this.track()?.nativeElement;
    if (!trackEl) return;

    const slides = Array.from(trackEl.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      trackEl.appendChild(clone);
    });
  }

  startCarousel(){
    const trackEl = this.track()?.nativeElement;
    if (!trackEl) return;

    const slideWidth = trackEl.firstElementChild?.clientWidth || 0;
    const gap = window.innerWidth * 0.015; 

    setInterval(() => {
        this.currentTranslate -= 10; 

        if (Math.abs(this.currentTranslate) >= trackEl.scrollWidth / 2) {
        this.currentTranslate = 1; // reinicia
      }
      trackEl.style.transform = `translateX(${this.currentTranslate}px)`;
    }, 50);

  }

}
