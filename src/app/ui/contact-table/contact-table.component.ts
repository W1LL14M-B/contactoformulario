import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contact-table.component.html',
})
export class ContactTableComponent  {



  data: any[] = [];




  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.data = nav?.extras?.state?.['data'] || [];
  }

 ngOnInit() {
    const nav = history.state;
    this.data = nav.data || [];
  }

    volver() {
    this.router.navigate(['/']); // 👈 ruta del formulario
  }


}
