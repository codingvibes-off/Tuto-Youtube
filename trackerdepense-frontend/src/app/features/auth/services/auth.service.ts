import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = '/api/auth';

  constructor(private http: HttpClient) {}

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
}
