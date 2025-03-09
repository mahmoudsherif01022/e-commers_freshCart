import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-blank-layouts',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './blank-layouts.component.html',
  styleUrl: './blank-layouts.component.scss',
})
export class BlankLayoutsComponent {}
