import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [
        NavbarComponent,
        FooterComponent,
        RouterModule,
        RouterOutlet,
    ]
})
export class MainComponent {}
