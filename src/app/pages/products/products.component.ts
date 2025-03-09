import { Component, inject } from '@angular/core';
import { ProductsService } from '../../core/services/prodcuts/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WishListService } from '../../core/services/wishList/wish-list.service';
import { IProduct } from '../../shared/interfaces/IProduct/iproduct';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink, TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly toastr = inject(ToastrService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly productsService = inject(ProductsService);

  iteams: string = '';
  products: IProduct[] = [];
  wishList: string[] = [];
  ngOnInit(): void {
    this.getProductData();
  }
  getProductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        //  console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartService.cartNumber.set(res.numOfCartItems);
        this.toastr.success(res.message, 'success', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishlist(id: string): void {
    this.wishListService.addProductWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        this.toastr.success(res.message, 'success', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeFromWishlist(id: string): void {
    this.wishListService.removeProductWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        this.toastr.success(res.message, 'success', {
          closeButton: true,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
