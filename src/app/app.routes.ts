import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';
import { Books } from './components/books/books';
import { CreateBooks } from './components/create-books/create-books';
import { Quotes } from './components/quotes/quotes';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch:'full'
  },
   {
    path:'login',
    component:Login
  },
  {
    path:'',
    component:Layout,
    children: [
      {
        path: 'books',
        component: Books,
        canActivate: [authGuard] 
      },
      {
        path: 'create-books',
        component: CreateBooks,
        canActivate: [authGuard] 
      },
      {
        path: 'quotes',
        component: Quotes
      }
    ]
  }
];
