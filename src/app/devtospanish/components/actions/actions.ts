import { Component, input } from '@angular/core';

@Component({
  selector: 'app-actions',
  imports: [],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class ActionsComponent {
    public countArticles = input.required<number>();
}
