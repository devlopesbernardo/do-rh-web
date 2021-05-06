import React from 'react';
import axios from 'axios';
import { view } from '@risingstack/react-easy-state';
import planData from '../planData';
import Link from 'next/link';

const Meetings = view(() => {
  const [disabled, setDisabled] = React.useState(true);
  const [planos, setPlanos] = React.useState([]);
  const [comments, setComments] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState();
  const [isSelectedFile, setIsSelected] = React.useState(false);

  console.log(comments);
  const uploadHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  React.useEffect(() => {
    const queryPlans = async () => {
      try {
        const plans = await axios({
          url: 'https://back.appdorh.com/plan/listar-pendentes',
          method: 'GET',
        });
        let resultado = plans.data;
        setPlanos(resultado.rows);
        console.log(planos);
      } catch (e) {
        console.log(e);
      }
    };
    queryPlans();
  }, []);

  const openModalData = (plano) => {
    planData.selectedPlan = {};
    planData.selectedPlan = plano;
    console.log(planData.selectedPlan);
    setDisabled(!disabled);
  };

  const disableModal = () => {
    planData.selectedPlan = {};
    setDisabled(!disabled);
  };
  const sendFile = async ({ id }) => {
    let formData = new FormData();
    if (isSelectedFile) {
      formData.append('file', {
        name: selectedFile.name,
        size: selectedFile.size,
        uri: selectedFile.uri,
        type: 'file/pdf',
      });
    }
    formData.append('plan_id', id);
    formData.append('comment', comments);
    await axios({
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      url: 'https://back.appdorh.com/admin/responder',
      body: formData,
    });
  };
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
                <Link href="/calendar">
                  <a>Agenda</a>
                </Link>
              </li>
              <li className="btn-menu active">
                <Link href="/meetings">
                  <a>Reuniões</a>
                </Link>
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
              {planos.map((p) => {
                return (
                  <tr onClick={() => openModalData(p)}>
                    <td>#{p.idd}</td>
                    <td>{p.full_name}</td>
                    <td>{p.created_at}</td>
                    <td>{p.plan_status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </span>
      <span
        className={`black-layer ${disabled ? 'disabled' : ''}`}
        onClick={() => disableModal()}
      />
      <div className={`painel ${disabled ? 'disabled' : ''}`}>
        <section className="base">
          <header>
            <h2 className="name">{planData.selectedPlan.full_name}</h2>
            <p>
              Identificador: #{planData.selectedPlan.idd}
              <br />
              {planData.selectedPlan.created_at}
            </p>
            <h3>Serviço solicitado: {planData.selectedPlan.plan_name}</h3>
            <img
              src="/assets/img/icon-closer.png"
              alt="Ícone de fechar"
              onClick={() => disableModal()}
            />
          </header>
          <section className="cliente-informations">
            <h3>Informações do cliente</h3>
            <textarea
              name
              id
              className="text-area"
              disabled
              defaultValue={planData.selectedPlan.user_comments}
            />
          </section>
          <section className="client-attach">
            <h3>Informações do cliente</h3>
            <div className="--scrollable">
              <div className="input-file">
                <img
                  src="/assets/img/icon-document.png"
                  alt="Ícone de documento"
                />
                <p
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `${planData.selectedPlan.user_url}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
<<<<<<< HEAD
                  {planData.selectedPlan.user_url &&
                    planData.selectedPlan.user_url
                      .split('https://rh.codandosonhos.com:9000/my-bucket/')
                      .join('-')
                      .split('-')}
=======
                  {planData.selectedPlan.file_name &&
                    planData.selectedPlan.file_name.split('.pdf', 1) + '.pdf'}
>>>>>>> 4f8f1ce1cd9cc9fa7b60274ae26bd81ca553d343
                </p>
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
            <textarea
              name
              id
              className="text-area"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </section>
          <section className="consultant-attach">
            <h3>Anexos do consultor</h3>
            <div className="--scrollable">
              <div className="input-file">
                <img
                  src="/assets/img/icon-document.png"
                  alt="Ícone de documento"
                />
                <p>Faça upload de um arquivo</p>
              </div>
            </div>
            <div className="input-file">
              <input
                type="file"
                name="file"
                onChange={uploadHandler}
                className="input-file"
              />
            </div>
            <div
              className="btn-action"
              onClick={() => sendFile(planData.selectedPlan.idd)}
            >
              <img src="/assets/img/icon-checked.png" alt="Ícone de upload" />
<<<<<<< HEAD
              <p>Enviar dados!</p>
=======
              <p>Enviar</p>
>>>>>>> 4f8f1ce1cd9cc9fa7b60274ae26bd81ca553d343
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
});
export default Meetings;
