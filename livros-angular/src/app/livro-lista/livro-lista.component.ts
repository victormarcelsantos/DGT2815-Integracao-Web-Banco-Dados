import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Livro } from '../livro';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';

@Component({
  selector: 'app-livro-lista',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './livro-lista.component.html',
  styleUrl: './livro-lista.component.css'
})
export class LivroListaComponent implements OnInit {

  livros: Livro[] = [];

  constructor(
    private controleLivros: ControleLivrosService,
    private controleEditora: ControleEditoraService
  ) {}

  ngOnInit(): void {

    this.controleLivros
      .obterLivros()
      .then(resultado => {

        this.livros = resultado;
      });
  }

  obterNomeEditora(
    codEditora: number
  ): string {

    return this.controleEditora
      .getNomeEditora(codEditora);
  }

  excluir(
    codigo: string
  ): void {

    this.controleLivros
      .excluir(codigo)
      .then(() => {

        this.controleLivros
          .obterLivros()
          .then(resultado => {

            this.livros = resultado;
          });

      });
  }

}