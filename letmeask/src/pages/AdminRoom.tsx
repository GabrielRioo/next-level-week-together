import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { useParams } from "react-router-dom";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
//   const { user } = useAuth();
  
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask logo" />
          <div>
              <RoomCode code={roomId} />
              <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        

        {/* {JSON.stringify(questions)} */}
        <div className="question-list">
          {/* Map() -Similar ao foreach porem permite retornar algo de dentro dele */}
          {questions.map((question) => {
            return (
              <Question 
                key={question.id}
                content={question.content} 
                author={question.author} 
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}