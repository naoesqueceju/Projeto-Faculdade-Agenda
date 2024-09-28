import { db } from "../db.js";

export const getUsuarios = (_, res) => {
  const q = "SELECT * FROM tb_usuario ORDER BY nome";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addUsuario = (req, res) => {
  const q = "INSERT INTO tb_usuario (nome, email, telefone, senha) VALUES(?)";
  const values = [req.body.nome, req.body.email, req.body.telefone, req.body.senha];
  
  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário criado com sucesso");
  });
};

export const updateUsuario = (req, res) => {
  const q = "UPDATE tb_usuario SET nome = ?, email = ?, telefone = ?, senha = ? WHERE codigo = ?"; 
  const values = [req.body.nome, req.body.email, req.body.telefone, req.body.senha]; 
  
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário atualizado com sucesso");
  });
};

export const deleteUsuario = (req, res) => {
  const q = "DELETE FROM tb_usuario WHERE codigo = ?"; 
  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Usuário deletado com sucesso");
  });
};
