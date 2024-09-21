import GlobalSyle from "./style/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Form from "./components/Form.js";
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
  const [agendas, setAgendas] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const getAgendas = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setAgendas(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAgendas();
  }, [setAgendas]);
  return (
    <>
      <Container>
        <Title>AGENDA FRONT-END: REACT e BACK-END: NODE com MYSQL</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getAgendas={getAgendas} />
        <Grid agendas={agendas} setAgendas={setAgendas} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} />
      <GlobalSyle />{" "}
    </>
  );
}
export default App;
