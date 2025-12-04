import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  currentTheme: 'light' | 'dark' = 'light'

  toggle(){
    this.currentTheme =
    this.currentTheme === 'light' ? 'dark' : 'light'

    document.documentElement.setAttribute('data-bs-theme', this.currentTheme)
   
  }
  protected readonly title = signal('projekt');
}
