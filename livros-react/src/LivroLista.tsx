import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ControleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';
import { Livro } from './model/Livro';

export default function LivroLista() {

  const [livros, setLivros] = useState<Livro[]>([]);

  const controleLivros = new ControleLivros();
  const controleEditora = new ControleEditora();

  useEffect(() => {

    controleLivros
      .obterLivros()
      .then(resultado => {
        setLivros(resultado);
      });

  }, []);

  const excluir = (codigo: string) => {

    controleLivros
      .excluir(codigo)
      .then(() => {

        controleLivros
          .obterLivros()
          .then(resultado => {
            setLivros(resultado);
          });

      });
  };

  return (
    <div>

      <h1>Catálogo de Livros</h1>

      <Link to="/novo">
        Novo Livro
      </Link>

      <br />
      <br />

      <table border={1}>

        <thead>

          <tr>
            <th>Título</th>
            <th>Editora</th>
            <th>Autores</th>
            <th>Ações</th>
          </tr>

        </thead>

        <tbody>

          {livros.map((livro, index) => (

            <tr key={index}>

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

    </div>
  );
}