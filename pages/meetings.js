import React from 'react';

export default function Meetings() {
  const [disabled, setDisabled] = React.useState(true);

  const removeDisable = () => {};

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="./css/style.css" />
      <title>Revisões | do RH – Painel</title>
      <span className="container calendar">
        <aside className="control">
          <img
            src="/assets/img/logo.png"
            alt="Logo do aplicativo 'do RH'"
            className="logo"
          />
          <nav>
            <ul>
              <li className="btn-menu">
                <a href="./calendar.html">Agenda</a>
              </li>
              <li className="btn-menu active">
                <a href="./meetings.html">Reuniões</a>
              </li>
              <li className="btn-menu sub">
                <a href="./meetings.html" className="active">
                  Em aberto
                </a>
              </li>
              <li className="btn-menu sub">
                <a href="./meetings-closed.html">Concluídas</a>
              </li>
            </ul>
          </nav>
          <div className="fix-bottom">
            <p>Usuário</p>
            <div className="btn-menu">Sair</div>
          </div>
        </aside>
        <section className="area">
          <header>
            <div>
              <img
                src="/assets/img/icon-revisoes--active.png"
                alt="Ícone de documento"
              />
              <h2>Lista de revisões</h2>
            </div>
            <nav className="change-state">
              <div className="active">
                <img
                  src="/assets/img/icon-em-aberto--active.png"
                  alt="ícone de sino"
                />
              </div>
              <div>
                <img
                  src="/assets/img/icon-concluidas--active.png"
                  alt="ícone de concluído"
                />
              </div>
            </nav>
          </header>
          <table className="calendar-app">
            <tbody>
              <tr>
                <th>Identificador</th>
                <th>Solicitante</th>
                <th>Data de solicitação</th>
                <th>Status</th>
              </tr>
              <tr onClick={() => setDisabled(!disabled)}>
                <td>#4513</td>
                <td>Rogério Andrade</td>
                <td>13:58 02/03/2021</td>
                <td>Aguardando revisão</td>
              </tr>
              <tr>
                <td>#4513</td>
                <td>Rogério Andrade</td>
                <td>13:58 02/03/2021</td>
                <td>Aguardando revisão</td>
              </tr>
            </tbody>
          </table>
        </section>
      </span>
      <span
        className={`black-layer ${disabled ? 'disabled' : ''}`}
        onClick={() => setDisabled(!disabled)}
      />
      <div className={`painel ${disabled ? 'disabled' : ''}`}>
        <section className="base">
          <header>
            <h2 className="name">João Pedro</h2>
            <p>
              Identificador: #0298
              <br />
              12:24 01/03/2021
            </p>
            <h3>Serviço solicitado: Coach</h3>
            <img
              src="/assets/img/icon-closer.png"
              alt="Ícone de fechar"
              onClick={() => setDisabled(!disabled)}
            />
          </header>
          <section className="cliente-informations">
            <h3>Informações do cliente</h3>
            <textarea name id className="text-area" defaultValue={''} />
          </section>
          <section className="client-attach">
            <h3>Informações do cliente</h3>
            <div className="scrollable">
              <div className="input-file">
                <img
                  src="/assets/img/icon-document.png"
                  alt="Ícone de documento"
                />
                <p>J Pedro.docx</p>
              </div>
            </div>
          </section>
          <section className="links">
            <h3>Links</h3>
            <div className="scrollable">
              <div className="link-field">
                <img src="/assets/img/icon-in.png" alt="Ícone do LinkedIn" />
                <p>LinkedIn</p>
              </div>
              <div className="link-field">
                <img src="/assets/img/icon-in.png" alt="Ícone do LinkedIn" />
                <p>LinkedIn</p>
              </div>
              <div className="link-field">
                <img src="/assets/img/icon-in.png" alt="Ícone do LinkedIn" />
                <p>LinkedIn</p>
              </div>
            </div>
          </section>
          <section className="comments">
            <h3>Comentários do consultor</h3>
            <textarea name id className="text-area" defaultValue={''} />
          </section>
          <section className="consultant-attach">
            <h3>Anexos do consultor</h3>
            <div className="scrollable">
              <div className="input-file">
                <img
                  src="/assets/img/icon-document.png"
                  alt="Ícone de documento"
                />
                <p>J Pedro revisado.pdf</p>
              </div>
            </div>
            <div className="input-file">
              <img src="/assets/img/icon-upload.png" alt="Ícone de upload" />
              <p>Enviar arquivos</p>
            </div>
            <div className="btn-action">
              <img src="/assets/img/icon-checked.png" alt="Ícone de upload" />
              <p>Cancelar encontro</p>
            </div>
          </section>
          <section className="cancel">
            <h3>Desmarcar encontro</h3>
            <textarea name id className="text-area" defaultValue={''} />
            <div className="btn-action">
              <img src="/assets/img/icon-cancel.png" alt="Ícone de upload" />
              <p>Cancelar encontro</p>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
