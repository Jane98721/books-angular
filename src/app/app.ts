import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App { 
  
  ngOnInit(){
  const savedTheme = localStorage.getItem("data-bs-theme") || 'light';
  document.documentElement.setAttribute("data-bs-theme", savedTheme)
  }

  toggle(){
    const currentTheme =  document.documentElement.getAttribute('data-bs-theme') || 'light';
    
    const next = currentTheme === 'dark' ? 'light':'dark';

    document.documentElement.setAttribute('data-bs-theme',next)

    localStorage.setItem('theme', next)

    
  }

  protected readonly title = signal('projekt');
}


  


