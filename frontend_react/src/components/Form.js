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
const Form = ({ getAgendas, onEdit, setOnEdit }) => {
  const ref = useRef();
  useEffect(() => {
    if (onEdit) {
      const agenda = ref.current;
      agenda.nome.value = onEdit.nome;
      agenda.endereco.value = onEdit.endereco;
      agenda.telefone.value = onEdit.telefone;
      agenda.email.value = onEdit.email;
    }
  }, [onEdit]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const agenda = ref.current;
    if (
      !agenda.nome.value ||
      !agenda.endereco.value ||
      !agenda.telefone.value ||
      !agenda.email.value
    ) {
      return toast.warn("Preencha todos os campos");
    }
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.codigo, {
          nome: agenda.nome.value,
          endereco: agenda.endereco.value,
          telefone: agenda.telefone.value,
          email: agenda.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: agenda.nome.value,
          endereco: agenda.endereco.value,
          telefone: agenda.telefone.value,
          email: agenda.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    agenda.nome.value = "";
    agenda.endereco.value = "";
    agenda.telefone.value = "";
    agenda.email.value = "";
    setOnEdit(null);
    getAgendas();
  };
  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label> Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label> Endereco</Label>
        <Input name="endereco" />
      </InputArea>
      <InputArea>
        <Label> Telefone</Label>
        <Input name="telefone" />
      </InputArea>
      <InputArea>
        <Label> E_mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <Button type="submit">GRAVAR</Button>
    </FormContainer>
  );
};
export default Form;

