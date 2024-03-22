import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  page: string = 'game'

  constructor(private router: Router) {}
  
  navigate(title: string) {
    this.router.navigateByUrl('/' + title);
  }

  changePage(page: string) {
    this.page = page;
    this.navigate(page)
  }

}
