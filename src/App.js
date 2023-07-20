import { Row, Col, Container, Button } from "react-bootstrap";
import {
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
  BsFillPlayFill,
} from "react-icons/bs";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer, useRef, useEffect } from "react";



function reducer(state, action) {
  switch (action.type) {
    case "breakIncrement": {
      if (state.type === "Break") {
        if (state.breakLength < 60) {
          return {
            ...state,
            breakLength: state.breakLength + 1,
            timer: `${state.breakLength + 1}:00`,
            seconds: (state.breakLength + 1) * 60,
          };
        } else {
          return {
            ...state,
          };
        }
      } else {
        if (state.breakLength < 60) {
          return {
            ...state,
            breakLength: state.breakLength + 1,
          };
        } else {
          return {
            ...state,
          };
        }
      }
    }

    case "breakDecrement": {
      if (state.type === "Break") {
        if (state.breakLength > 1) {
          let minutes = state.breakLength - 1;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          return {
            ...state,
            breakLength: state.breakLength - 1,
            timer: `${minutes}:00`,
            seconds: minutes * 60,
          };
        } else {
          return {
            ...state,
          };
        }
      } else {
        if (state.breakLength > 1) {
          return {
            ...state,
            breakLength: state.breakLength - 1,
          };
        } else {
          return {
            ...state,
          };
        }
      }
    }

    case "sessionIncrement": {
      if (state.type === "Session") {
        if (state.sessionLength < 60) {
          return {
            ...state,
            sessionLength: state.sessionLength + 1,
            timer: `${state.sessionLength + 1}:00`,
            seconds: (state.sessionLength + 1) * 60,
          };
        } else {
          return {
            ...state,
          };
        }
      } else {
        if (state.sessionLength < 60) {
          return {
            ...state,
            sessionLength: state.sessionLength + 1,
          };
        } else {
          return {
            ...state,
          };
        }
      }
    }

    case "sessionDecrement": {
      if (state.type === "Session") {
        if (state.sessionLength > 1) {
          let minutes = state.sessionLength - 1;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          return {
            ...state,
            sessionLength: state.sessionLength - 1,
            timer: `${minutes}:00`,
            seconds: minutes * 60,
          };
        } else {
          return {
            ...state,
          };
        }
      } else {
        if (state.sessionLength > 1) {
          return {
            ...state,
            sessionLength: state.sessionLength - 1,
          };
        } else {
          return {
            ...state,
          };
        }
      }
    }

    case "countDown": {
      if (state.seconds > 0) {
        let newSeconds = state.seconds - 1;
        let minutes = Math.floor(newSeconds / 60);
        let lastSeconds = newSeconds % 60;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        lastSeconds = lastSeconds < 10 ? "0" + lastSeconds : lastSeconds;
        return {
          ...state,
          timer: `${minutes}:${lastSeconds}`,
          seconds: newSeconds,
        };
      } else {
        if (state.type === "Session") {
          let newMinutes =
            state.breakLength < 10
              ? "0" + state.breakLength
              : state.breakLength;
          
          return {
            ...state,
            timer: `${newMinutes}:00`,
            seconds: state.breakLength * 60,
            type: "Break",
          };
        } else {
          let newMinutes =
            state.sessionLength < 10
              ? "0" + state.sessionLength
              : state.sessionLength;
          
          return {
            ...state,
            timer: `${newMinutes}:00`,
            seconds: state.sessionLength * 60,
            type: "Session",
          };
        }
      }
    }

    case "reset": {
      return {
        ...initialState,
      };
    }

    default:
      return Error("Unknown action: " + action.type);
  }
}

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  timer: "25:00",
  seconds: 1500,
  type: "Session",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refe = useRef(null);
  
  useEffect(()=>{
    if (state.seconds === 0) {
      document.getElementById("beep").play()
    }
  }, [state.seconds])
  
  function breakIncrement() {
    if (!refe.current) {
      dispatch({
        type: "breakIncrement",
      });
      console.log(state.timer);
    }
  }

  function breakDecrement() {
    if (!refe.current) {
      dispatch({
        type: "breakDecrement",
      });
      console.log(state.timer);
    }
  }

  function sessionIncrement() {
    if (!refe.current) {
      dispatch({
        type: "sessionIncrement",
      });
      console.log(state.timer);
    }
  }

  function sessionDecrement() {
    if (!refe.current) {
      dispatch({
        type: "sessionDecrement",
      });
      console.log(state.timer);
    }
  }

  function startStop() {
    if (!refe.current) {
      refe.current = setInterval(() => {
        dispatch({ type: "countDown" });
        
      }, 1000);
    } else {
      clearInterval(refe.current);
      refe.current = null;
    }
  }

  function reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    clearInterval(refe.current);
    refe.current = null;
    dispatch({
      type: "reset",
    });
  }

  return (
    <div className="App">
      <div className="App-header">
        <Container>
          <audio
            id="beep"
            src="https://bigsoundbank.com/UPLOAD/mp3/0086.mp3"
          ></audio>
          <header> 25 + 5 Clock</header>
          <Row>
            <Col id="break-label">Break Length</Col>
            <Col id="session-label">Session Length</Col>
          </Row>
          <Row>
            <Col id="break-label">
              <Button id="break-decrement" onClick={breakDecrement}>
                <BsFillArrowDownSquareFill />
              </Button>
              <p id="break-length">{state.breakLength}</p>
              <Button id="break-increment" onClick={breakIncrement}>
                <BsFillArrowUpSquareFill />
              </Button>
            </Col>
            <Col id="session-label">
              <Button id="session-decrement" onClick={sessionDecrement}>
                <BsFillArrowDownSquareFill />
              </Button>
              <p id="session-length">{state.sessionLength}</p>
              <Button id="session-increment" onClick={sessionIncrement}>
                <BsFillArrowUpSquareFill />
              </Button>
            </Col>
          </Row>

          <Row>
            <p id="timer-label">{state.type}</p>
          </Row>
          <Row>
            <p id="time-left">{state.timer}</p>
          </Row>
          <Row>
            <Col>
              <Button id="start_stop" onClick={startStop}>
                <BsFillPlayFill />
                <AiOutlinePauseCircle />
              </Button>
            </Col>
            <Col>
              <Button id="reset" onClick={reset}>
                <BiRefresh />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
