import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';
import { log } from 'console';
import Swal from 'sweetalert2';
import { Icart } from '../../shared/interfaces/Icart/icart';
import { OrdersService } from '../../core/services/orders/orders.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _myTranslateService = inject(MyTranslateService);
  private readonly _translateService = inject(TranslateService);
  private readonly _cartService = inject(CartService);
  private readonly _orderService = inject(OrdersService);
  isLogin = input<boolean>(true);
  countNumder: Signal<number> = computed(() => this._cartService.cartNumber());
  OrdersNumber: number = 0;
  ngOnInit(): void {
    this.changeGetProductsCart();
    this.orderNumber();
  }

  changeGetProductsCart(): void {
    this._cartService.getProductsCart().subscribe({
      next: (res) => {
        this._cartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  logOut(): void {
    Swal.fire({
      title: 'Are you Exit?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Exit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._authService.logOut();
      }
    });
  }

  change(lang: string): void {
    this._myTranslateService.changeLangTranslate(lang);
  }

  currentlang(lang: string): boolean {
    return this._translateService.currentLang === lang;
  }

  orderNumber(): void {
    this._orderService.ordersNumber.subscribe({
      next: (res) => (this.OrdersNumber = res),
    });
  }

  getOrderNumber() {
    this._orderService.getAllUserOrders(this._authService.userId).subscribe({
      next: (res) => {
        this._orderService.ordersNumber.next(res.length);
      },
    });
  }
}
