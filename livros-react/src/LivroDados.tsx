import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Livro } from './model/Livro';

import { ControleLivros }
from './controle/ControleLivros';

import { ControleEditora }
from './controle/ControleEditora';

export default function LivroDados() {

  const navigate = useNavigate();

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

  const incluir = () => {

    const livro = new Livro(
      '',
      codEditora,
      titulo,
      resumo,
      autores
        .split('\n')
        .filter(a => a !== '')
    );

    controleLivros
      .incluir(livro)
      .then(() => {

        navigate('/');

      });
  };

  return (

    <div>

      <h1>Novo Livro</h1>

      <div>

        <label>Título</label>

        <br />

        <input
          value={titulo}
          onChange={(e) =>
            setTitulo(
              e.target.value
            )
          }
        />

      </div>

      <br />

      <div>

        <label>Resumo</label>

        <br />

        <textarea
          value={resumo}
          onChange={(e) =>
            setResumo(
              e.target.value
            )
          }
        />

      </div>

      <br />

      <div>

        <label>Autores</label>

        <br />

        <textarea
          value={autores}
          onChange={(e) =>
            setAutores(
              e.target.value
            )
          }
        />

      </div>

      <br />

      <div>

        <label>Editora</label>

        <br />

        <select
          value={codEditora}
          onChange={(e) =>
            setCodEditora(
              Number(
                e.target.value
              )
            )
          }
        >

          {controleEditora
            .getEditoras()
            .map(editora => (

              <option
                key={
                  editora.codEditora
                }
                value={
                  editora.codEditora
                }
              >
                {editora.nome}
              </option>

            ))}

        </select>

      </div>

      <br />

      <button
        onClick={incluir}
      >
        Salvar
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          navigate('/')
        }
      >
        Voltar
      </button>

    </div>
  );
}