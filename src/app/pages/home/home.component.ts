import { WishListService } from './../../core/services/wishList/wish-list.service';
import { TermtextPipe } from './../../core/pipes/termtext/termtext.pipe';
import { SalePipe } from './../../core/pipes/sale/sale.pipe';
import { IProduct } from './../../shared/interfaces/IProduct/iproduct';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/prodcuts/products.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/ICategories/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    SalePipe,
    TermtextPipe,
    SearchPipe,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);

  products: WritableSignal<IProduct[]> = signal([]);

  categories: WritableSignal<ICategories[]> = signal([]);
  wishList: string[] = [];

  nameSearch: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    items: 1,

    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: true,
    navSpeed: 400,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }

  getProductsData(): void {
    this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getCategoriesData(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this._toastrService.success(res.message, 'Fresh Cart');
          this._CartService.cartNumber.set(res.numOfCartItems);
          console.log(this._CartService.cartNumber());
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }

  addToWishlist(id: string): void {
    this.wishListService.addProductWishList(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        this._toastrService.success(res.message, 'success', {
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
        this._toastrService.success(res.message, 'success', {
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
