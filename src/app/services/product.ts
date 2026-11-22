import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Product {
  private host = 'http://localhost:8083';

  constructor(private http: HttpClient) {}

  // Récupérer tous les produits
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.host}/products`);
  }

  // Supprimer un produit
  deleteProduct(p: any): Observable<any> {
    return this.http.delete(`${this.host}/products/${p.id}`);
  }

  // Ajouter un produit
  addProduct(p: any): Observable<any> {
    return this.http.post(`${this.host}/products`, p);
  }

  // Modifier le statut d'un produit
  updateProduct(p: any): Observable<any> {
    return this.http.patch(`${this.host}/products/${p.id}`, { selected: !p.selected });
  }
}
