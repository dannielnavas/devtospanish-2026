import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '@/app/shared/components/header/header';
import { FooterComponent } from '@/app/shared/components/footer/footer';

@Component({
  selector: 'app-about',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {

}
