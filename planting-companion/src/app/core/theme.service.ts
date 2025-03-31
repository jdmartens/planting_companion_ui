// theme.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private renderer: Renderer2;
  private availableThemes = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' }, 
    { id: 'coffee', name: 'Coffee' },
    { id: 'bumblebee', name: 'Bumblebee' }
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

  getThemes(): {id: string, name: string}[] {
    return this.availableThemes;
  }

  // getCurrentTheme(): string {
  //   console.log('current theme:', this.currentTheme);
  //   return this.currentTheme;
  // }

  getCurrentTheme(): string {
    return this.availableThemes.find(t => t.id === this.currentTheme)?.name || 'Light';
  }

  setTheme(theme: string): void {
    console.log('setting theme:', theme);
    // if (!this.availableThemes.includes(theme)) return;
    if (!this.availableThemes.some(t => t.name === theme)) return;
    const theTheme = theme.toLowerCase();
    console.log('setting theme!:', theme, theTheme);

    this.currentTheme = theTheme;
    this.renderer.setAttribute(document.documentElement, 'data-theme', theTheme);
    localStorage.setItem('theme', theTheme);
    
    // Update daisyUI color scheme class
    this.availableThemes.forEach(t => 
      this.renderer.removeClass(document.documentElement, t.name.toLowerCase())
    );
    this.renderer.addClass(document.documentElement, theTheme);
  }

  private getSystemTheme(): string {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  }
}
