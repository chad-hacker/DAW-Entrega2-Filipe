import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export default function ModalConfirmacaoUsuario({ visible, onHide, dados, onConfirmar }) {
  return (
    <Dialog header="Confirmar dados do usuário" visible={visible} style={{ width: '32rem' }} onHide={onHide}>
      <div className="mt-2">
        <p><strong>CPF:</strong> {dados.cpf}</p>
        <p><strong>Nome:</strong> {dados.nome}</p>
        <p><strong>Email:</strong> {dados.email}</p>
        <p><strong>Cor do tema:</strong> {dados.cor_tema}</p>
      </div>
      <div className="flex justify-content-end gap-2 mt-3">
        <Button label="Voltar" severity="secondary" onClick={onHide} />
        <Button label="Confirmar" onClick={onConfirmar} />
      </div>
    </Dialog>
  );
}
