import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Filme {
  id?: number;
  nome: string;
  genero: string;
  ano: number;
  avaliacao: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private apiUrl = 'http://localhost:3000/filmes';

  constructor(private http: HttpClient) {}

  // Pegar lista de filmes (GET)
  getFilmes(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiUrl);
  }

  // Adicionar um novo filme (POST)
  addFilme(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(this.apiUrl, filme);
  }

  // Atualizar um filme existente (PUT)
  updateFilme(id: number, filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(`${this.apiUrl}/${id}`, filme);
  }

  // Deletar um filme (DELETE)
  deleteFilme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
