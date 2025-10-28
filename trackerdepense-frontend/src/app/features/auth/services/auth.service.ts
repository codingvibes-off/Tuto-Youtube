import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../users/models/user.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { ResponseEntity } from '../../../core/models/responseEntity.model';
import { AuthResponse } from '../../../core/models/AuthResponse.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:8080/';
  private logoutTimer: any;
  private readonly TOKEN_KEY = 'token';
  private readonly INACTIVITY_TIME = 30 * 60 * 1000;

  constructor(private http: HttpClient, private router: Router) {
    this.setupActivityListeners();
    const token = this.getToken();
    if (token) this.resetLogoutTimer();
  }
  /**
   * Vérifie si un token d'authentification existe dans le stockage local.
   * @returns true si un token est présent, false sinon.
   */
  registredToken(token:string): string {
      if (!token) {
        throw new Error("Token cannot be empty");
      }
    localStorage.setItem(this.TOKEN_KEY, token);
    this.resetLogoutTimer();
    console.log("Token enregistré et minuteur activé:", token);
    return token;
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    clearTimeout(this.logoutTimer);
    this.router.navigate(['/login']);
    console.warn('⏰ Token supprimé après 30 min d’inactivité');
  }
   private resetLogoutTimer() {
    if (this.logoutTimer) clearTimeout(this.logoutTimer);
    this.logoutTimer = setTimeout(() => this.logout(), this.INACTIVITY_TIME);
  }

  private setupActivityListeners() {
    const reset = () => this.resetLogoutTimer();
    ['click', 'mousemove', 'keydown'].forEach(event =>
      window.addEventListener(event, reset)
    );
  }
  /**
   * Vérifie si un token d'authentification existe dans le stockage local.
   * @returns true si un token est présent, false sinon.
   */
  hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // retourne true si non null/non vide
  }
    /**
   * Récupère le token d'authentification depuis le stockage local.
   * @returns le token si présent, sinon null.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }
   /**
   * Récupère un utilisateur par son email depuis le backend
   * @param email adresse email de l'utilisateur
   * @returns un Observable contenant les données utilisateur
   */
  getUserByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL}?email=${email}`);
  }

  registerUser(userDTO: User) {
    return this.http.post(API_ENDPOINTS.USER.REGISTER, userDTO);
  }
  loginUser(userDTO: User) {
    return this.http.post<AuthResponse>(API_ENDPOINTS.USER.LOGIN, userDTO);
  }
  updateUser(id: number, userDTO: User) {
    return this.http.put(`${API_ENDPOINTS.USER.UPDATE}/${id}`, userDTO);
  }
  sendOtpCode(otpCode: number, email: String): Observable<ResponseEntity> {
    return this.http.post<ResponseEntity>(API_ENDPOINTS.USER.SEND_OTP, { code : otpCode , useremail: email});
  } 

}
