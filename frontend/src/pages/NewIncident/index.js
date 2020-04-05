import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function NewIncident() {

    const history = useHistory();
    const ong_id = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ong_id,
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar, tente novamente!');
        }
    }

    return (<div className="new-incident-container">
        <div className="content">

            <section>
                <img src={logoImg} alt="logo" />
                <h1>Cadastrar novo caso</h1>
                <p >Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                <Link className="back-Link" to="/profile">
                    <FiArrowLeft size={16} color="E02041" />
                   Voltar para Home
            </Link>
            </section>
            <form onSubmit={handleNewIncident}>
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
                <button className="button" type="submit">Cadastrar</button>
            </form>
        </div>
    </div>)
}