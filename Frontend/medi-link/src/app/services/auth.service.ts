import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient){}

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.clear();
    }

    getMe(){
        return this.http.get('https://localhost:7072/api/home/me', {
            withCredentials: true
        });
    }
}