import { Component, inject, OnInit } from '@angular/core';

import { RouterLink } from '@angular/router';
import { ICategories } from '../../shared/interfaces/ICategories/icategories';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  categories: ICategories[] = [];
  ngOnInit(): void {
    this.getCategoriesData();
  }
  getCategoriesData() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
