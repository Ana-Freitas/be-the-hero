import React, { useState } from 'react';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';


import api from '../../services/api';
import './style.css';
import logoImg from '../../assets/logo.svg';



export default function Register() {
    const history = useHistory();
    const ongs = useLocation();
    const params = useParams();
    const atualizar = ongs.state ? true : false;
    const ong = atualizar ? ongs.state.ong : '';

    const [name, setName] = useState(atualizar ? ong.name : '');
    const [email, setEmail] = useState(atualizar ? ong.email : '');
    const [whatsapp, setWhatsapp] = useState(atualizar ? ong.whatsapp : '');
    const [city, setCity] = useState(atualizar ? ong.city : '');
    const [uf, setUf] = useState(atualizar ? ong.uf : '');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }
        try {

            if (atualizar) {
                const id = ong.id;
                const response = await api.put(`ongs/${id}`, data, {
                    headers: {
                        Authorization: params.id
                    }
                });
                localStorage.setItem('ongName', response.data.name);
                history.push('/profile');
            } else {
                const response = await api.post('ongs', data);
                alert(`Seu id de acesso: ${response.data.id}`);
                history.push('/');
            }
        } catch (err) {
            alert(`Erro ${atualizar ? 'ao atualizar' : 'no cadastro'
                }, tente novamente!`);
        }
    }

    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>{atualizar ? 'Atualizar' : 'Cadastro'}</h1>
                    <p >{atualizar ? 'Atualize seus dados' :
                        'Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.'}</p>
                    <Link className="back-Link" to={atualizar ? '/profile' : '/'}>
                        <FiArrowLeft size={16} color="#E02041" />
                        {atualizar ? 'Voltar' : 'Não tenho cadastro'}
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit"> {atualizar ? 'Atualizar' : 'Cadastrar'}</button>
                </form>
            </div>
        </div>
    )
}