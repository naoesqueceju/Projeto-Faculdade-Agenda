import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1000px;
  margin: 20px auto;
  word-break: break-all;
`;
export const Thead = styled.thead``;
export const Tbody = styled.tbody``;
export const Tr = styled.tr``;
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
  @media (max-width: 800px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;
const Grid = ({ agendas, setAgendas, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };
  const handleDelete = async (codigo) => {
    await axios
      .delete("http://localhost:8800/" + codigo)
      .then(({ data }) => {
        const newArray = agendas.filter((agenda) => agenda.codigo !== codigo);
        setAgendas(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Endereco</Th>
          <Th>Telefone</Th>
          <Th>Email</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {agendas.map((item, i) => (
          <Tr key={i}>
            <Td width="22%">{item.nome}</Td>
            <Td width="22%">{item.endereco}</Td>
            <Td width="15%">{item.telefone}</Td>
            <Td width="22%">{item.email}</Td>
            <Td alignCenter width="4%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="4%">
              <FaTrash onClick={() => handleDelete(item.codigo)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
export default Grid;
