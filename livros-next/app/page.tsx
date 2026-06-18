'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ControleLivros } from '../controle/ControleLivros';
import { ControleEditora } from '../controle/ControleEditora';
import { Livro } from '../model/Livro';

export default function Home() {

  const [livros, setLivros] = useState<Livro[]>([]);

  const controleLivros =
    new ControleLivros();

  const controleEditora =
    new ControleEditora();

  useEffect(() => {

    carregarLivros();

  }, []);

  const carregarLivros = () => {

    controleLivros
      .obterLivros()
      .then(resultado => {
        setLivros(resultado);
      });

  };

  const excluir = async (
    codigo: string
  ) => {

    await controleLivros.excluir(
      codigo
    );

    carregarLivros();

  };

  return (

    <main className="container mt-4">

      <h1>Catálogo de Livros</h1>

      <div className="mb-3">

        <Link
          href="/novo"
          className="btn btn-primary"
        >
          Novo Livro
        </Link>

      </div>

      <table className="table table-striped table-hover">

        <thead className="table-dark">

          <tr>
            <th>Título</th>
            <th>Editora</th>
            <th>Autores</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          {livros.map((livro) => (

            <tr key={livro.codigo}>

              <td>{livro.titulo}</td>

              <td>
                {controleEditora.getNomeEditora(
                  livro.codEditora
                )}
              </td>

              <td>
                {livro.autores.join(', ')}
              </td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    excluir(livro.codigo)
                  }
                >
                  Excluir
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </main>

  );

}