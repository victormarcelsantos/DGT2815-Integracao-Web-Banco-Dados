import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ControleEditoraService {

  editoras = [
    {
      codEditora: 1,
      nome: "Alta Books"
    },
    {
      codEditora: 2,
      nome: "Pearson"
    },
    {
      codEditora: 3,
      nome: "Addison Wesley"
    }
  ];

  getEditoras() {
    return this.editoras;
  }

  getNomeEditora(codEditora: number): string {

    const editora =
      this.editoras.find(
        e => e.codEditora === codEditora
      );

    return editora ? editora.nome : "";
  }
}