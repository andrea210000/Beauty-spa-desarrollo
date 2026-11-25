import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Servicio, ServicioService } from '../../services/servicio.service';

// Agrupa los servicios por su categoría real de la BD
interface CategoriaServicios {
  nombre: string;
  servicios: Servicio[];
}

@Component({
  selector: 'app-services-component',
  standalone: true,
  imports: [CommonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './services-component.html',
  styleUrl: './services-component.css',
})
export class ServicesComponent implements OnInit {

  private servicioService = inject(ServicioService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  cargando = signal(false);
  categorias = signal<CategoriaServicios[]>([]);

  // La tabla servicio NO tiene campo imagen, así que mapeamos aquí
  // las fotos que ya existen en assets/images por id de servicio.
  private imagenes: Record<number, string> = {
    1: '/assets/images/manicure.jpg',
    2: '/assets/images/nails.jpg',
    3: '/assets/images/pedicure.jpg',
    4: '/assets/images/nails.jpg',
    5: '/assets/images/facial-treatment.jpg',
    6: '/assets/images/facial-treatment.jpg',
    7: '/assets/images/facial-treatment.jpg',
    8: '/assets/images/depilation.jpg',
    9: '/assets/images/massages.jpg',
    10: '/assets/images/coloring-hair.jpg',
    11: '/assets/images/hair-treatment.jpg',
    12: '/assets/images/hair-cut.jpg',
    13: '/assets/images/coloring-hair.jpg',
    14: '/assets/images/hand-cream.jpg',
    15: '/assets/images/exfoliant.jpg',
    16: '/assets/images/exfoliante-corporal.jpeg',
    17: '/assets/images/essential-oil.jpg',
  };

  // Respaldo por categoría si aparece un servicio que no está en el mapa de arriba
  private imagenesPorCategoria: Record<string, string> = {
    'PELUQUERIA': '/assets/images/hair-cut.jpg',
    'MANICURA Y PEDICURA': '/assets/images/manicure.jpg',
    'FACIALES': '/assets/images/facial-treatment.jpg',
    'CORPORALES Y SPA': '/assets/images/massages.jpg',
  };

  // Orden en que se muestran las categorías (los ids de la BD)
  private ordenCategorias = ['PELUQUERIA', 'MANICURA Y PEDICURA', 'FACIALES', 'CORPORALES Y SPA'];

  ngOnInit(): void {
    this.cargando.set(true);

    this.servicioService.obtenerServicios(true).subscribe({
      next: (servicios) => {
        // 1. Agrupar por categoría
        const grupos = new Map<string, Servicio[]>();
        for (const s of servicios) {
          const categoria = s.categoriaNombre ?? 'Otros';
          if (!grupos.has(categoria)) grupos.set(categoria, []);
          grupos.get(categoria)!.push(s);
        }

        // 2. Ordenar según el orden oficial de la BD y descartar categorías vacías
        const categorias: CategoriaServicios[] = this.ordenCategorias
          .filter((nombre) => grupos.has(nombre))
          .map((nombre) => ({ nombre, servicios: grupos.get(nombre)! }));

        this.categorias.set(categorias);
      },
      error: (err) => {
        console.error('Error al cargar servicios', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron cargar los servicios',
          life: 4000,
        });
      },
      complete: () => this.cargando.set(false),
    });
  }

  imagenDe(servicio: Servicio): string {
    return this.imagenes[servicio.idServicios]
      ?? this.imagenesPorCategoria[servicio.categoriaNombre]
      ?? '/assets/images/hair-cut.jpg';
  }

  // Lleva al formulario de citas con el servicio YA marcado (query param)
  agendar(idServicio: number): void {
    this.router.navigate(['/schedule'], { queryParams: { servicio: idServicio } });
  }
}