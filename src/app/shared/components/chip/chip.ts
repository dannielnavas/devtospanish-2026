import { Component, computed, input } from '@angular/core';

const CHIP_COLORS = {
    Featured: 'bg-cyan-500',
    Hot: 'bg-green-500',
    New: 'bg-purple-500',
    Default: 'bg-gray-500',
};

@Component({
  selector: 'app-chip',
  imports: [],
  templateUrl: './chip.html',
  styleUrl: './chip.css',
})
export class ChipComponent {
    public label = input.required<string>();

    public $color = computed<string>(() => {
        return CHIP_COLORS[this.label() as keyof typeof CHIP_COLORS] || CHIP_COLORS.Default;
    });
}
