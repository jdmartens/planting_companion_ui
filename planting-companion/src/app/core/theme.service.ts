// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private availableThemes = ['light', 'dark', 'coffee', 'bumblebee'
  ];
  private currentTheme = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || this.getSystemTheme();
    this.setTheme(savedTheme);
  }

  getThemes(): string[] {
    return this.availableThemes;
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string): void {
    console.log('setting theme:', theme);
    if (!this.availableThemes.includes(theme)) return;

    this.currentTheme = theme;
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update daisyUI color scheme class
    this.availableThemes.forEach(t => 
      this.renderer.removeClass(document.documentElement, t)
    );
    this.renderer.addClass(document.documentElement, theme);
  }

  private getSystemTheme(): string {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }
}
