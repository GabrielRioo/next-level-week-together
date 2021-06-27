import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { useTheme } from "../hooks/useTheme";


export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');

  const {theme, toggleTheme} = useTheme();

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    // Buscar todos os dados desta sala em especifico, digitada.
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    // se a sala nao existir, retornar erro.
    if(!roomRef.exists()) {
      alert('Room does not exists.')
      return;
    }

    if(!roomRef.val().endedAt) {
        alert('Room already closed.');
        return;
    }

    // Caso exista, redirecionar para a sala com o codigo
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustracao simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <button onClick={toggleTheme}>Toggle</button>
          <img src={logoImg} alt="Letmeask logo" />

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o codigo da sala" 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
