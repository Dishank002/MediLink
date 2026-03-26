import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:5022/api/home';
  
  constructor(private http: HttpClient) { }

  getWelcomeMessage(): Observable<string>{
    return this.http.get(this.apiUrl, {responseType: 'text'});
  }
}
