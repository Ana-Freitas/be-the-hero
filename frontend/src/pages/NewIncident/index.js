import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {
    const incident = useLocation();
    const history = useHistory();
    const ong_id = localStorage.getItem('ongId');
    const novo = incident.state ? true : false;

    const [title, setTitle] = useState(incident.state ? incident.state.incident.title : '');
    const [description, setDescription] = useState(incident.state ? incident.state.incident.description : '');
    const [value, setValue] = useState(incident.state ? incident.state.incident.value : '');


    async function handlePutNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            if (novo) {
                const id = incident.state.incident.id;
                await api.put(`incidents/${id}`, data, {
                    headers: {
                        Authorization: ong_id,
                    }
                });

            } else {
                await api.post('incidents', data, {
                    headers: {
                        Authorization: ong_id,
                    }
                });
            }

            history.push('/profile');
        } catch (err) {
            alert(`Erro ao ${novo ? 'atualizar' : 'cadastrar'}, tente novamente!`);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="logo" />
                    <h1> {novo ? 'Atualizar caso' : 'Cadastrar novo caso'}</h1>
                    <p>{novo ? 'Sempre mantenha seu caso atualizado, pois pode comprometer a legitimidade e ética da ONG.' :
                        'Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG'}</p>
                    <Link className="back-Link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                   Voltar para Home
            </Link>
                </section>
                <form onSubmit={handlePutNewIncident}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso" />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"></textarea>
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais" />
                    <button className="button" type="submit">{novo ? 'Atualizar' : 'Cadastrar'}</button>
                </form>
            </div>
        </div>)
}