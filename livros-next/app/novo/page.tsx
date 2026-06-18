'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ControleLivros } from '../../controle/ControleLivros';
import { ControleEditora } from '../../controle/ControleEditora';
import { Livro } from '../../model/Livro';

export default function NovoLivro() {

  const router = useRouter();

  const controleLivros =
    new ControleLivros();

  const controleEditora =
    new ControleEditora();

  const [titulo, setTitulo] =
    useState('');

  const [resumo, setResumo] =
    useState('');

  const [autores, setAutores] =
    useState('');

  const [codEditora, setCodEditora] =
    useState(1);

  const incluir = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    const livro = new Livro(
      '',
      Number(codEditora),
      titulo,
      resumo,
      autores
        .split('\n')
        .filter(a => a.trim() !== '')
    );

    await controleLivros.incluir(
      livro
    );

    router.push('/');
  };

  return (

    <main className="container mt-4">

      <h1>Dados do Livro</h1>

      <form onSubmit={incluir}>

        <div className="mb-3">

          <label className="form-label">
            Título
          </label>

          <input
            className="form-control"
            value={titulo}
            onChange={(e) =>
              setTitulo(e.target.value)
            }
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Resumo
          </label>

          <textarea
            className="form-control"
            rows={4}
            value={resumo}
            onChange={(e) =>
              setResumo(e.target.value)
            }
          />

        </div>

        <div className="mb-3">

          <label className="form-label">
            Editora
          </label>

          <select
            className="form-select"
            value={codEditora}
            onChange={(e) =>
              setCodEditora(
                Number(e.target.value)
              )
            }
          >

            {controleEditora
              .getEditoras()
              .map((editora) => (

                <option
                  key={editora.codEditora}
                  value={editora.codEditora}
                >
                  {editora.nome}
                </option>

              ))}

          </select>

        </div>

        <div className="mb-3">

          <label className="form-label">
            Autores (1 por linha)
          </label>

          <textarea
            className="form-control"
            rows={4}
            value={autores}
            onChange={(e) =>
              setAutores(e.target.value)
            }
          />

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Salvar Dados
        </button>

      </form>

    </main>

  );

}