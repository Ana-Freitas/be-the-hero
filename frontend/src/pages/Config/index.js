import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './style.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Configuration() {
    const history = useHistory();
    const ong_id = localStorage.getItem('ongId');
    const [open, setOpen] = useState(false);


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

    async function deleteOng(id) {
        try {
            await api.delete('ongs', {
                headers: {
                    Authorization: id
                }
            })

            localStorage.clear()
            history.push('/');
        } catch (ex) {
            alert("Não foi possívelrealizar a exclusão, tente novamente!")
        }
    }

    function openModal() {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

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
                    <button className="button" type="button" onClick={openModal}>EXCLUIR CONTA</button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Excluir Conta?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Tem certeja que deseja excluir sua conta permanentemente?
                         </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => deleteOng(ong_id)} color="primary">
                                Sim
                            </Button>
                            <Button onClick={(handleClose)} color="primary" autoFocus>
                                Não
                            </Button>
                        </DialogActions>
                    </Dialog>
                </section>
            </div>
        </div>)
}