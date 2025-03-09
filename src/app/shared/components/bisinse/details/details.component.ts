import {
  Component,
  inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../core/services/prodcuts/products.service';
import { IProduct } from '../../../interfaces/IProduct/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [CarouselModule, TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productsService = inject(ProductsService);

  datailsProudct: WritableSignal<IProduct | null> = signal(null);

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
    autoplayTimeout: 5000,
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
    this._activatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        let idProduct = p.get('id');

        // Api
        this._productsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.datailsProudct.set(res.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
}
