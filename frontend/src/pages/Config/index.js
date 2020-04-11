import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Configuration() {
    const history = useHistory();
    const ong_id = localStorage.getItem('ongId');



    async function handlePutOng(id) {
        const ongId = localStorage.getItem('ongId');

        try {
            const response = await api.get(`ongs/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            if (response.status === 200) {
                const ong = response.data;
                console.log("ONG: ", ong)
                history.push(`/register/${id}`, { ong });
            }

        } catch (error) {
            console.log(error)
            alert('Não encontrado ou não autorizado!, tente novamente');
            history.push('/profile');
        }


    }

    return (
        <div className="config-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Configurações</h1>
                    <p>Na tela de configuração você pode alterar os seus dados e também excluir sua conta.
                    OBS.: Sua conta será excluída permanentemente bem como os casos vinculados à ela.</p>
                    <Link className="back-Link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para Home
                    </Link>
                </section>

                <section>
                    <button className="button" type="button" onClick={() => handlePutOng(ong_id)}>ATUALIZAR DADOS</button>
                    <button className="button" type="button">EXCLUIR CONTA</button>
                </section>
            </div>
        </div>)
}