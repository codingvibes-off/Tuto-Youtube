import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: string;
  name: string;
  description?: string;
}

export interface SuccessResponse {
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly API_URL = '/api/categories';

  constructor(private http: HttpClient) {}

  /** CREATE — crée une nouvelle catégorie */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.API_URL, category);
  }

  /** READ — récupère une catégorie par ID */
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.API_URL}/${id}`);
  }

  /** READ ALL — liste toutes les catégories */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.API_URL);
  }

  /** UPDATE — met à jour une catégorie */
  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.API_URL}/${id}`, category);
  }

  /** DELETE — supprime une catégorie */
  deleteCategory(id: string): Observable<SuccessResponse> {
    return this.http.delete<SuccessResponse>(`${this.API_URL}/${id}`);
  }
}
