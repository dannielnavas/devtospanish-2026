import { Component, input, ChangeDetectionStrategy, output, signal } from '@angular/core';

@Component({
  selector: 'app-actions',
  imports: [],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
    public countArticles = input.required<number>();
    public searchQuery = signal<string>('');
    public selectedFilter = signal<string>('recentes');
    public searchChange = output<string>();
    public filterChange = output<string>();

    public onSearchChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchQuery.set(value);
        this.searchChange.emit(value);
    }

    public onFilterClick(filter: string): void {
        this.selectedFilter.set(filter);
        this.filterChange.emit(filter);
    }
}
