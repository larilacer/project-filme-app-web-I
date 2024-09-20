import { Component, OnInit } from '@angular/core';
import { FilmeService, Filme } from './filme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filmes: Filme[] = [];
  novoFilme: Filme = { nome: '', genero: '', ano: 0, avaliacao: 0 };
  filmeParaEditar: Filme | null = null;
  mensagem: string = '';

  constructor(private filmeService: FilmeService) {}

  ngOnInit() {
    this.carregarFilmes();
  }

  carregarFilmes() {
    this.filmeService.getFilmes().subscribe(data => {
      this.filmes = data;
    });
  }

  adicionarFilme() {
    this.filmeService.addFilme(this.novoFilme).subscribe(() => {
      this.carregarFilmes();
      this.novoFilme = { nome: '', genero: '', ano: 0, avaliacao: 0 };
      this.mensagem = 'Filme adicionado com sucesso!';
      setTimeout(() => this.mensagem = '', 3000);
    });
  }

  selecionarFilme(filme: Filme) {
    this.filmeParaEditar = { ...filme };
  }

  atualizarFilme() {
    if (this.filmeParaEditar) {
      this.filmeService.updateFilme(this.filmeParaEditar.id!, this.filmeParaEditar).subscribe(() => {
        this.carregarFilmes();
        this.filmeParaEditar = null;
        this.mensagem = 'Filme atualizado com sucesso!';
        setTimeout(() => this.mensagem = '', 3000);
      });
    }
  }

  deletarFilme(id: number) {
    this.filmeService.deleteFilme(id).subscribe(() => {
      this.carregarFilmes();
      this.mensagem = 'Filme deletado com sucesso!';
      setTimeout(() => this.mensagem = '', 3000);
    });
  }
}
