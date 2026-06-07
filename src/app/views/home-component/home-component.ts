import { Component, ElementRef,  ViewChildren, AfterViewInit, QueryList, } from '@angular/core';
import { Router } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home-component',
  imports: [A11yModule, CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router) { }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  productosDestacados = [
    { nombre: 'Crema Hidratante', imagen: '/assets/images/cream.jpg', descripcion: 'Hidratación profunda para una piel radiante.' },
    { nombre: 'Exfoliante Suave', imagen: '/assets/images/exfoliant.jpg', descripcion: 'Elimina células y renueva tu piel.' },
    { nombre: 'Aceite Corporal Nutritivo', imagen: '/assets/images/oil.jpg', descripcion: 'Nutrición intensa para un cuerpo y piel suave.' },
    { nombre: 'Mascarilla Capilar', imagen: '/assets/images/hair-mask.jpg', descripcion: 'Restaura el brillo y la suavidad de tu cabello.' },
    { nombre: 'Sérum Rejuvenecedor', imagen: '/assets/images/serum.jpg', descripcion: 'Revitaliza tu piel y devuelve su luminosidad natural.' },
    { nombre: 'Tónico Facial', imagen: '/assets/images/facial-toner.jpg', descripcion: 'Tonifica tu piel y mantiene su frescura todo el día.' },
    { nombre: 'Gel de Ducha', imagen: '/assets/images/shower-gel.jpg', descripcion: 'Limpia suavemente y relaja tus sentidos.' },
    { nombre: 'Aceite Esencial', imagen: '/assets/images/essential-oil.jpg', descripcion: 'Calma la mente y equilibra tus emociones.' },
    { nombre: 'Bálsamo Labial Natural', imagen: '/assets/images/lip-balm.jpg', descripcion: 'Hidrata y protege tus labios al instante.' },
    { nombre: 'Crema de Manos', imagen: '/assets/images/hand-cream.jpg', descripcion: 'Suaviza y repara la piel seca de tus manos.' },
    { nombre: 'Aceite Esencial Capilar', imagen: '/assets/images/aceite-capilar.jpg', descripcion: 'Nutre el cabello en profundidad y evita la sequedad.' },
    { nombre: 'Sérum Rejuvenecedor Capilar', imagen: '/assets/images/serum-capilar.jpg', descripcion: 'Repara y fortalece el cabello dañado.' },
    { nombre: 'Aceite Natural para Puntas', imagen: '/assets/images/mascarilla-capilar.jpg', descripcion: 'Hidrata las puntas y evita las puntas abiertas.' },
    { nombre: 'Crema Hidratante Multiuso', imagen: '/assets/images/crema-multi.jpg', descripcion: 'Hidratación versátil para cuerpo y rostro.' },
    { nombre: 'Aceite Corporal Aromático', imagen: '/assets/images/aceite-corpo.jpg', descripcion: 'Aromaterapia relajante para el cuerpo.' },
    { nombre: 'Tónico Facial Refrescante', imagen: '/assets/images/tonico-facial.jpg', descripcion: 'Refresca y tonifica la piel del rostro.' },
    { nombre: 'Sérum Iluminador', imagen: '/assets/images/serum-ilum.jpg', descripcion: 'Ilumina y unifica el tono de tu piel.' },
  ];
  

  @ViewChildren('track') track!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('videosa') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  currentTranslate = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.cloneSlides();
      this.startCarousel();
      this.videos.forEach(video => {
        video.nativeElement.muted = true;
        video.nativeElement.play().catch(() => {});
      });
    });
  }

  
  cloneSlides() {
    const trackEl = this.track.first?.nativeElement;
    if (!trackEl) return;

    const slides = Array.from(trackEl.children);
    slides.forEach(slide => {
      const clone = (slide as Element).cloneNode(true);
      trackEl.appendChild(clone);
    });
  }

  startCarousel() {
    const trackEl = this.track.first?.nativeElement;
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
