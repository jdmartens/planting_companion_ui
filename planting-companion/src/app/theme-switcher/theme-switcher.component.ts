import { Component } from '@angular/core';
import { ThemeService } from '../core/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule], 
  templateUrl: './theme-switcher.component.html'
  
})
export class ThemeSwitcherComponent {
  constructor(public themeService: ThemeService) {}

  onThemeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target?.value) {
      this.themeService.setTheme(target.value);
    }
  }
}
