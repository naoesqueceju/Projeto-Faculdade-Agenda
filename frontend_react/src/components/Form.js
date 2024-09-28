import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;
const Label = styled.label``;
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;
const Form = ({ getUsuarios, onEdit, setOnEdit }) => {
  const ref = useRef();
  useEffect(() => {
    if (onEdit) {
      const usuario = ref.current;
      usuario.nome.value = onEdit.nome;
      usuario.email.value = onEdit.email;
      usuario.telefone.value = onEdit.telefone; // Adicionando telefone
    }
  }, [onEdit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = ref.current;
    if (!usuario.nome.value || !usuario.email.value || !usuario.telefone.value || !usuario.senha.value) {
      return toast.warn("Preencha todos os campos");
    }
    if (onEdit) {
      await axios
        .put("http://localhost:8800/usuarios/" + onEdit.codigo, { // Mudando para codigo
          nome: usuario.nome.value,
          email: usuario.email.value,
          telefone: usuario.telefone.value, // Enviando telefone
          senha: usuario.senha.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/usuarios", {
          nome: usuario.nome.value,
          email: usuario.email.value,
          telefone: usuario.telefone.value, // Enviando telefone
          senha: usuario.senha.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    usuario.nome.value = "";
    usuario.email.value = "";
    usuario.telefone.value = ""; // Limpando telefone
    usuario.senha.value = "";
    setOnEdit(null);
    getUsuarios();
  };
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label> {/* Adicionando campo telefone */}
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label>Senha</Label>
        <Input name="senha" type="password" />
      </InputArea>
      <Button type="submit">Gravar</Button>
    </FormContainer>
  );
};
export default Form;
