import { Component, inject, OnInit } from '@angular/core';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrdersService } from '../../core/services/orders/orders.service';
import { AllOrder } from '../../shared/interfaces/All_Orders/all-order';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe, CurrencyPipe, TranslatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly _authService = inject(AuthService);
  private readonly _orderService = inject(OrdersService);

  AllOrders: AllOrder[] = [];

  ngOnInit(): void {
    this._authService.seveUserData();
    this.getAllOrders();
  }

  getAllOrders() {
    this._orderService.getAllUserOrders(this._authService.userId).subscribe({
      next: (res) => {
        this.AllOrders = res;
        console.log(this.AllOrders);
        this._orderService.ordersNumber.next(res.length);
      },
    });
  }
}
