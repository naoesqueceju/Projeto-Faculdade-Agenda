import GlobalSyle from "./style/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import axios from "axios";
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const Title = styled.h2``;
function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const getUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8800/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getUsuarios();
  }, [setUsuarios]);
  return (
    <>
      <Container>
        <Title>Cadastro de Usuários</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsuarios={getUsuarios} />
        <Grid usuarios={usuarios} setUsuarios={setUsuarios} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalSyle />
    </>
  );
}
export default App;
