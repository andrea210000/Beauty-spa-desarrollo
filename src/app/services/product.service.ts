import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  catalogo = [
    { id: 1, name: 'Crema Hidratante', price: 25500, size: '50ml', image: '/assets/images/cream.jpg', category: 'piel' },
    { id: 2, name: 'Exfoliante Suave', price: 20700, size: '40ml', image: '/assets/images/exfoliant.jpg', category: 'piel' }, 
    { id: 3, name: 'Aceite Corporal Nutritivo', price: 35800, size: '10ml', image: '/assets/images/oil.jpg', category: 'piel' },
    { id: 4, name: 'Serúm Rejuvenecedor', price: 45000, size: '20ml', image: '/assets/images/serum.jpg', category: 'piel' }, 
    { id: 5, name: 'Tónico Facial', price: 18900, size: '100ml', image: '/assets/images/facial-toner.jpg', category: 'piel' }, 
    { id: 6, name: 'Gel de Ducha', price: 28900, size: '300ml', image: '/assets/images/shower-gel.jpg', category: 'piel' }, 
    { id: 7, name: 'Crema de Manos Reparadora', price: 15000, size: '100ml', image: '/assets/images/crema-manos.jpeg', category: 'piel'}, 
    { id: 8, name: 'Manteca Corporal', price: 38000, size: '200ml', image: '/assets/images/manteca-corporal.jpeg' , category: 'piel'}, 
    { id: 9, name: 'Mascarilla Capilar', price: 30000, size: '200ml', image: '/assets/images/hair-mask.jpg', category: 'cabello'}, 
    { id: 10, name: 'Aceite Esencial Capilar', price: 13000, size: '20ml', image: '/assets/images/aceite-capilar.jpg', category: 'cabello' }, 
    { id: 11, name: 'Serúm Rejuvenecedor Capilar', price: 24000, size: '150ml', image: '/assets/images/serum-capilar.jpg', category: 'cabello' }, 
    { id: 12, name: 'Aceite Natural para Puntas', price: 25000, size: '100ml', image: '/assets/images/mascarilla-capilar.jpg', category: 'cabello' }, 
    { id: 13, name: 'Crema Hidratante Multiuso', price: 33000, size: '300ml', image: '/assets/images/crema-multi.jpg' , category: 'belleza'}, 
    { id: 14, name: 'Aceite Corporal Aromático', price: 50000, size: '100ml', image: '/assets/images/aceite-corpo.jpg', category: 'belleza' }, 
    { id: 15, name: 'Tónico Facial Refrescante', price: 25000, size: '130ml', image: '/assets/images/tonico-facial.jpg', category: 'belleza' }, 
    { id: 16, name: 'Serúm Iluminador', price: 80000, size: '30ml', image: '/assets/images/serum-ilum.jpg', category: 'belleza' },
  ];

  getProductos () {
    return this.catalogo;
  };
  
  getProductosPorCategoria(categoria: string) {
  return this.catalogo.filter(p => p.category === categoria);
}
  
}
