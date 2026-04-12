import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'https://localhost:7072/api/home';
  
  constructor(private http: HttpClient) { }

  getWelcomeMessage(): Observable<string>{
    return this.http.get(this.apiUrl, {
      responseType: 'text',
    withCredentials: true
  });
  }
}
