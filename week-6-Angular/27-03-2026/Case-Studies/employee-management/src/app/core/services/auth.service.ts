import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isloggedIn = false;

  login(username:string, password:string) {
    if (username === 'admin' && password === 'admin') {
      this.isloggedIn = true;
      localStorage.setItem('token', 'dummy-token');
      return true;
    }
    return false;
  }

  logout() {
    this.isloggedIn = false;
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
