import { Component, OnInit } from '@angular/core';
import { Product } from '../services/product';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: any[] = [];

  // Nouveau produit
  newProduct: any = {
    name: '',
    price: 0,
    selected: false,
  };

  // Recherche
  searchTerm: string = '';

  constructor(private productService: Product) {}

  ngOnInit(): void {
    this.getProducts();
  }

  // Récupérer les produits
  getProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },

      error: (err) => {
        console.error('Erreur de chargement :', err);
      },
    });
  }

  // Ajouter un produit
  addProduct(): void {
    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        alert('Produit ajouté avec succès !');

        this.newProduct = {
          name: '',
          price: 0,
          quantity:0,
          selected: false,
        };

        this.getProducts();
      },

      error: (err) => {
        console.error('Erreur lors de l’ajout :', err);
      },
    });
  }

  // Supprimer un produit
  handleDelete(p: any): void {
    const conf = confirm('Êtes-vous sûr de vouloir supprimer le produit ' + p.name + ' ?');

    if (conf) {
      this.productService.deleteProduct(p).subscribe({
        next: () => {
          alert('Produit supprimé !');
          this.getProducts();
        },

        error: (err) => {
          console.error('Erreur de suppression :', err);
        },
      });
    }
  }

  // Modifier le statut Selected
  toggleSelection(p: any): void {
    this.productService.updateProduct(p).subscribe({
      next: () => {
        this.getProducts();
      },

      error: (err) => {
        console.error('Erreur de modification :', err);
      },
    });
  }

  // Filtrer les produits
  get filteredProducts(): any[] {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }
}
