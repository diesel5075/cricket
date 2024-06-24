import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "../Score/Score.css";
import Button from "../Button/Button";
import axios from "axios";

const Score = () => {
  const [team1Runs, setTeam1Runs] = useState(0);
  const [team1Wickets, setTeam1Wickets] = useState(0);
  const [team10Wickets, setTeam10Wickets] = useState(0);
  const [team1Overs, setTeam1Overs] = useState(0);
  const [team1SpecialScore, setTeam1SpecialScore] = useState(0);

  const [team1Count, setTeam1Count] = useState(0);//ball

  const [team2Runs, setTeam2Runs] = useState(0);
  const [team2Wickets, setTeam2Wickets] = useState(0);
  const [team20Wickets, setTeam20Wickets] = useState(0);
  const [team2Overs, setTeam2Overs] = useState(0);
  const [team2SpecialScore, setTeam2SpecialScore] = useState(0);
  const [team2Count, setTeam2Count] = useState(0);
  //
  const [inputValue, setInputValue] = useState("");

  console.log(inputValue);
  const [displayedValue, setDisplayedValue] = useState(0); // over
  const [winner, setWinner] = useState(null);

  // Ball
  useEffect(() => {
    if (team1Count > 0 && team1Count % 6 === 0) {
      setTeam1SpecialScore(team1SpecialScore + 1);
      setTeam1Count(0);
    }
    if (team2Count > 0 && team2Count % 6 === 0) {
      setTeam2SpecialScore(team2SpecialScore + 1);
      setTeam2Count(0);
    }
  }, [team1Count, team2Count]);

  const handleAction = (action, team) => {
    if (action === "wicket") {
      if (team === 1) {
        setTeam1Wickets((prevWickets) => {
          const newWickets = prevWickets + 1;
          if (newWickets === 11) {
            alert("10 wickets have been taken!");
            setTeam1Wickets(0);
          }
          return newWickets;
        });
        setTeam1Count(team1Count + 1);
      } else if (team === 2) {
        setTeam2Wickets((prevWickets) => {
          const newWickets = prevWickets + 1;
          if (newWickets === 11) {
            alert("10 wickets have been taken!");
            setTeam2Wickets(0);
          }
          return newWickets;
        });
        setTeam2Count(team2Count + 1);
      }
    }
  };

  const updateScore = (action, team) => {
    if (team === 1) {
      if (action === "run" && inputValue > team1SpecialScore) {
        setTeam1Runs(team1Runs + 1);
        setTeam1Count(team1Count + 1);
      } else if (action === "wicket" && inputValue > team1SpecialScore) {
        handleAction("wicket", 1);
      }  else if (action === "noball" && inputValue > team1SpecialScore) {
        setTeam1Runs(team1Runs + 1);
      } else if (action === "six" && inputValue > team1SpecialScore) {
        setTeam1Runs(team1Runs + 6);
        setTeam1Count(team1Count + 1);
      } else if (action === "four" && inputValue > team1SpecialScore) {
        setTeam1Runs(team1Runs + 4);
        setTeam1Count(team1Count + 1);
      } else if (action === "two" && inputValue > team1SpecialScore) {
        setTeam1Runs(team1Runs + 2);
        setTeam1Count(team1Count + 1);
      }else if (action === "zero"  && inputValue > team1SpecialScore) {
        setTeam10Wickets(team10Wickets + 1);
        setTeam1Count(team1Count + 1);
      } 
      else{
        alert("inning is over");
      }
    } else if (team === 2) {
      if (action === "run" && inputValue > team2SpecialScore) {
        setTeam2Runs(team2Runs + 1);
        setTeam2Count(team2Count + 1);
      } else if (action === "wicket" && inputValue > team2SpecialScore) {
        handleAction("wicket", 2);
      } else if (action === "zero" && inputValue > team2SpecialScore) {
        setTeam20Wickets(team20Wickets + 1);
        setTeam2Count(team2Count + 1);
      } else if (action === "noball" && inputValue > team2SpecialScore) {
        setTeam2Runs(team2Runs + 1);
      } else if (action === "six" && inputValue > team2SpecialScore) {
        setTeam2Runs(team2Runs + 6);
        setTeam2Count(team2Count + 1);
      } else if (action === "four" && inputValue > team2SpecialScore) {
        setTeam2Runs(team2Runs + 4);
        setTeam2Count(team2Count + 1);
      } else if (action === "two" && inputValue > team2SpecialScore) {
        setTeam2Runs(team2Runs + 2);
        setTeam2Count(team2Count + 1);
      }

      else{
        alert("inning is over");
      }
    }
  };

  const updateDisplayedValue = () => {
    setDisplayedValue(inputValue);
  }
// tie
  const handleWinner = () => {
    if (team1Runs > team2Runs) {
      setWinner("team1");
    } else if (team2Runs > team1Runs) {
      setWinner("team2");
    } else {
      setWinner("tie");
    }
  };

  const slideInAnimation = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
    config: { duration: 500 },
  });

  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [matchTitle, setMatchTitle] = useState("");
  const [matchTitle2, setMatchTitle2] = useState("");

  const handleEnterClick = () => {
    const team1Value = team1.trim();
    const team2Value = team2.trim();
    if (team1Value !== "" && team2Value !== "") {
      if (team1Value !== team2Value) {
        const title = `${team1Value} `;
        const title2 = ` ${team2Value}`;
        setMatchTitle(title);
        setMatchTitle2(title2);
      } else {
        alert("Team 1 and Team 2 cannot have the same value.");
      }
    } else {
      alert("Please enter values for both teams.");
    }
  };
  ////
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/db.json"); // Adjust path as needed
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div className="backimg">

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="team">
              Team 1
              <input className=""
                type="text" 
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
              />
              Team 2
              <input 
                type="text"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
              />
              <div className="score">
                <button onClick={handleEnterClick}>Enter</button>
              </div>
            </div>
          </div>
        </div>

        <div className="team-name">
          <h1>
            <i>{matchTitle}</i>
            <h1>VS</h1>
            <i>{matchTitle2}</i>
          </h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="team">
              Over
              <input
                type="number"
                placeholder="00"
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="score">
                <Button onClick={updateDisplayedValue} name="enter over" />
              </div>
            </div>
          </div>
          <div className="col-lg-12 ">
            <div className="team">
              <h2>{matchTitle}</h2>
              <h3>
                {team1Runs}/{team1Wickets}
              </h3>
              <h4>
                Over: {displayedValue} / {team1SpecialScore}.{team1Count}{" "}
              </h4>

              <div className="score">
                <Button onClick={() => updateScore("zero", 1)} name={"Dot"} />
                <Button onClick={() => updateScore("run", 1)} name={"1"} />
                <Button onClick={() => updateScore("two", 1)} name={"2"} />
                <Button onClick={() => updateScore("four", 1)} name={"4"} />
                <Button onClick={() => updateScore("six", 1)} name={"6"} />
                <Button
                  onClick={() => updateScore("noball", 1)}
                  name={"No Ball"}
                />
                <Button
                  onClick={() => updateScore("wicket", 1)}
                  name={"Wicket"}
                  background={"red"}
                />
               
              </div>
            </div>
            <div className="team">
              <h2>{matchTitle2}</h2>
              <h3>
                {team2Runs}/{team2Wickets}
              </h3>
              <h4>
                Over: {displayedValue} / {team2SpecialScore}.{team2Count}{" "}
              </h4>
              <div className="score">
                <Button onClick={() => updateScore("zero", 2)} name={"Dot"} />
                <Button onClick={() => updateScore("run", 2)} name={"1"} />
                <Button onClick={() => updateScore("two", 2)} name={"2"} />
                <Button onClick={() => updateScore("four", 2)} name={"4"} />
                <Button onClick={() => updateScore("six", 2)} name={"6"} />
                <Button
                  onClick={() => updateScore("noball", 2)}
                  name={"No Ball"}
                />
                <Button
                  onClick={() => updateScore("wicket", 2)}
                  name={"Wicket"}
                  background={"red"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="data-box">
        <h4>Data Summary</h4>
        <div className="team-data">
          <h5>{matchTitle}</h5>
          <p>Total Runs: {team1Runs}</p>
          <p>Total Wickets: {team1Wickets}</p>
          <p>
            Overs: {team1SpecialScore}. {team1Overs}
          </p>
        </div>
        <div className="team-data">
          <h5>{matchTitle2}</h5>
          <p>Total Runs: {team2Runs}</p>
          <p>Total Wickets: {team2Wickets}</p>
          <p>
            Overs: {team2SpecialScore}.{team2Overs}
          </p>
        </div>
        <Button onClick={handleWinner} name="Check Winner" />
      </div>
      {winner && (
        <div className="">
          <animated.div
            className="winner-overlay container-fluid"
            style={slideInAnimation}
          >
            <div className="winner-message">
              {winner === "team1" && <p> {matchTitle} is the winner!</p>}
              {winner === "team2" && <p>{matchTitle2} is the winner!</p>}
              {winner === "tie" && <p>It's a tie!</p>}
            </div>
          </animated.div>
        </div>
      )}
    </div>
    </>
  );
};

export default Score;
//my
