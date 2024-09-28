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
`;
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
`;
const Grid = ({ usuarios, setUsuarios, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };
  const handleDelete = async (codigo) => {
    await axios
      .delete("http://localhost:8800/usuarios/" + codigo)
      .then(({ data }) => {
        const newArray = usuarios.filter((usuario) => usuario.codigo !== codigo); 
        setUsuarios(newArray);
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
          <Th>Email</Th>
          <Th>Telefone</Th> {}
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {usuarios.map((item, i) => (
          <Tr key={i}>
            <Td width="25%">{item.nome}</Td>
            <Td width="25%">{item.email}</Td>
            <Td width="25%">{item.telefone}</Td> {}
            <Td alignCenter width="10%">
              <FaEdit onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="10%">
              <FaTrash onClick={() => handleDelete(item.codigo)} /> {}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
export default Grid;
