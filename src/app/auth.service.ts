import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
@Injectable({
  providedIn: "any"
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  signUp(signUpData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post("http://localhost:8081/api/auth/sign-up", signUpData, { headers });
  }

  validate(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('authToken')
    })
    return this.http.get("http://localhost:8081/api/p/validate", { headers: headers });
  }

  signIn(signInData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    return this.http.post("http://localhost:8081/api/auth/sign-in", signInData, { headers });
  }

  getInfo(text: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
      "Content-Type": "text/plain"
    })
    return this.http.post(`http://localhost:8081/api/p`, text, {headers});
  }
  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
    })
    return this.http.get(`http://localhost:8081/api/p/user`, { headers });
  }

  getQr(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
    })
    return this.http.get(`http://localhost:8081/api/p/mfaQR`, { headers: headers, responseType: 'blob', observe: "response" });
  }

  is2Fa(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
    })
    return this.http.get(`http://localhost:8081/api/p/ismfa`, { headers: headers });
  }

  otp(pass: String): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.cookieService.get('authToken'),
    })
    return this.http.post(`http://localhost:8081/api/p/mfa`, pass, { headers: headers });
  }
}
