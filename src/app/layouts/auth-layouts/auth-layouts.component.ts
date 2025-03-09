import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-auth-layouts',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './auth-layouts.component.html',
  styleUrl: './auth-layouts.component.scss',
})
export class AuthLayoutsComponent {}
