import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/Icart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, SweetAlert2Module, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);

  cartDetails: WritableSignal<Icart> = signal({} as Icart);

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData(): void {
    this._cartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    Swal.fire({
      title: 'Are you Remove Cart?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._cartService.removeSpecificCartItem(id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.cartDetails.set(res.data);
            this._toastrService.error('Claer Cart', 'Fresh Cart');
            this._cartService.cartNumber.set(res.numOfCartItems);
          },
          error: (err) => {
            console.log(err);
          },
        });

        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your Cart has been deleted.',
        //   icon: 'success',
        // });
      }
    });
  }

  updataCount(id: string, count: number): void {
    console.log(id, count);
    this._cartService.UpdateCartProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearItems(): void {
    Swal.fire({
      title: 'Are you Clear All Cart?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._cartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.cartDetails.set({} as Icart);
              this._toastrService.error('Claer All Cart', 'Fresh Cart');
              this._cartService.cartNumber.set(0);
            }
          },
          error(err) {
            console.log(err);
          },
        });

        // Swal.fire({
        //   title: 'Deleted!',
        //   text: 'Your All Cart has been deleted.',
        //   icon: 'success',
        // });
      }
    });
  }
}
