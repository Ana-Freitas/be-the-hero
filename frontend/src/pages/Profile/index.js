import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { FaPencilAlt } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';

import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            console.log(`Ong: ${ongId} `);
            alert('Erro ao delete, tente novamente');
        }
    }

    async function handlePutIncident(incident) {
        history.push(`/incidents`, { incident });
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    function handleToConfig() {
        history.push('/config');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logo" />
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new"> Cadastrar novo caso </Link>
                <button onClick={handleToConfig} type="button">
                    <GoGear size={30} color="#E02041" />
                </button>
                <button onClick={handleLogout} type="button">
                    <FiPower size={30} color="#E02041" />
                </button>
            </header>
            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong> Caso:</strong>
                        <p> {incident.title}</p>
                        <strong> DESCRIÇÃO </strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <button onClick={() => handlePutIncident(incident)} type="button">
                            <FaPencilAlt size={20} color="#a8a8b3" />
                        </button>
                    </li>))}
            </ul>
        </div>
    )
}