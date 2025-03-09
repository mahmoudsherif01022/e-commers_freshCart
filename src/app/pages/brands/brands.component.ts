import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Ibrands } from '../../shared/interfaces/Ibrands/ibrands';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [NgIf, TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly brandService = inject(BrandService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly _BrandService = inject(BrandService);
  brandid: any;
  brandsdetails: Ibrands = {} as Ibrands;
  brands: Ibrands[] = [];
  isModalOpen: boolean = false;
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      console.log('Flowbite loaded', flowbite);
    });
    this.getallDatabrand();

    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.brandid = res.get('id');
        if (this.brandid) {
          this._BrandService.getSpecificBrand(this.brandid).subscribe({
            next: (res) => {
              console.log(res);
              this.brandsdetails = res.data;
            },
            error: (err) => {
              console.error('Error fetching brand details:', err);
            },
          });
        }
      },
    });
  }
  getallDatabrand(): void {
    this._BrandService.getAllBrand().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openModal(brand: Ibrands): void {
    this.brandsdetails = brand;
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
}
