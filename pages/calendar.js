import axios from 'axios';
import { view } from '@risingstack/react-easy-state';
import planData from '../planData';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Modal } from 'react-modal-overlay';
import Link from 'next/link';

import 'react-modal-overlay/dist/index.css';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import React from 'react';

export default function CalendarPage() {
  const [events, setEvents] = React.useState();
  const [resposta, setResposta] = React.useState([]);
  const [appear, setAppear] = React.useState(false);
  const [option, setOption] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const localizer = momentLocalizer(moment);
  //

  let minTime = new Date();
  minTime.setHours(8, 0);

  let maxTime = new Date();
  maxTime.setHours(20, 0);
  //
  function modifierArray(array) {
    let novaArray = [];
    let counter = 0;
    array.map((i) => {
      novaArray.push({
        start: moment(new Date(i.hour)).add(3, 'hours').toDate(),
        end: moment(new Date(i.hour)).add(4, 'hour').toDate(),
        title: i.title,
        plan_id: i.plan_id,
        user_id: i.user_id,
      });
      counter++;
    });

    console.log('nova', novaArray);
    if (counter === array.length) {
      setAppear(true);
      setEvents(novaArray);
      return novaArray;
    }
    //
  }

  async function userDetails(user_id, plan_id) {
    try {
      const user = await axios({
        url: 'https://back.appdorh.com/admin/buscar-user-marcacao',
        data: { id: user_id, plan_id: plan_id },
        method: 'POST',
      });

      const data = await user.data;
      console.log(data);
      setUserData(data);
    } catch (e) {
      console.log(e);
    }
    //
  }
  async function callApi() {
    try {
      const api = await axios({
        url: 'https://back.appdorh.com/listar-datas',
        method: 'GET',
      });
      const dados = await api.data;
      setResposta(dados);
      console.log(resposta);

      modifierArray(resposta);
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() => {
    callApi();
  }, []);
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
              <li className="btn-menu active">
                <Link href="/calendar">
                  <a>Agenda</a>
                </Link>
              </li>
              <li className="btn-menu sub">
                <a
                  onClick={() => {
                    setAppear(false), callApi();
                  }}
                >
                  Atualizar o calendário
                </a>
              </li>
              <li className="btn-menu">
                <Link href="/meetings">
                  <a>Reuniões</a>
                </Link>
              </li>

              {/* <li className="btn-menu">
                <a href="./meetings.html" className="active">
                  Em aberto
                </a>
              </li>
              <li className="btn-menu">
                <a href="./meetings-closed.html">Concluídas</a>
              </li> */}
            </ul>
          </nav>
          <div className="fix-bottom">
            <p>Usuário</p>
            <div className="btn-menu">Sair</div>
          </div>
        </aside>
        <section className="area">
          {appear ? (
            <Calendar
              localizer={localizer}
              step={60}
              min={minTime}
              max={maxTime}
              culture={'pt-BR'}
              timeslots={1}
              defaultDate={new Date()}
              defaultView="week"
              onSelectEvent={(event) => {
                userDetails(event.user_id, event.plan_id);
                setOption(true); //
              }}
              events={events}
              style={{ height: '85vh' }}
              //
            />
          ) : (
            'Loading'
            //
          )}
          {userData[0] ? (
            <Modal show={option} closeModal={() => setOption(false)}>
              Esse evento foi marcado por: {userData[0].full_name}
              <br />O número dele é: {userData[0].phone}
              <br />E ele possui o e-mail: {userData[0].email}
            </Modal>
          ) : (
            //
            ''
          )}
        </section>
      </span>
    </div>
  );
}
