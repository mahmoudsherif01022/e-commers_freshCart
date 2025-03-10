import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _ordersService = inject(OrdersService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _router = inject(Router);

  checkOutForm!: FormGroup;
  cartId: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm(): void {
    this.checkOutForm = this._formBuilder.group({
      details: [null, [Validators.required]],
      phone: [
        null,
        [Validators.pattern(/^01[0125][0-9]{8}$/), Validators.required],
      ],
      city: [null, [Validators.required]],
    });
  }

  getCartId(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartId.set(param.get('id')!);
      },
    });

    // console.log(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  submitOnlineForm(): void {
    this.cartId;
    this._ordersService
      .onlinePayment(this.checkOutForm.value, this.cartId())
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  submitCashForm(): void {
    this.cartId;
    this._ordersService
      .cashPayment(this.checkOutForm.value, this.cartId())
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            this._toastrService.success(res.status, 'Fresh Cart');
            setTimeout(() => {
              this._router.navigate(['/allorders']);
            }, 500);
            this._router.navigate(['/allorders']);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
