import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Livro } from '../livro';

import {
  ControleLivrosService
} from '../controle-livros.service';

import {
  ControleEditoraService
} from '../controle-editora.service';

@Component({
  selector: 'app-livro-dados',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './livro-dados.component.html',
  styleUrl: './livro-dados.component.css'
})
export class LivroDadosComponent {

  titulo = '';

  resumo = '';

  autores = '';

  codEditora = 1;

  editoras: any[] = [];

  constructor(
    private router: Router,
    private controleLivros:
      ControleLivrosService,
    private controleEditora:
      ControleEditoraService
  ) {

    this.editoras =
      this.controleEditora
        .getEditoras();
  }

  incluir() {

    const livro = new Livro(
      '',
      this.codEditora,
      this.titulo,
      this.resumo,
      this.autores
        .split(',')
        .map(a => a.trim())
    );

    this.controleLivros
      .incluir(livro)
      .then(() => {

        this.router
          .navigateByUrl(
            '/lista'
          );

      });
  }
}