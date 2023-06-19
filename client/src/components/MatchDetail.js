import React, {useState} from "react";
import matches from "../assets/matches";
import styles from "../styles/Username.module.css";


const MatchDetail = ({ exportJsonString }) => {
  const [teamSelection, setTeamSelection] = useState(
    matches.map(() => ({ team1: false, team2: false }))
    );
    const jsObj={teamSelection};
    const jsonString = JSON.stringify(jsObj.teamSelection);
    console.log(jsonString);
    exportJsonString(jsonString);
    // eslint-disable-next-line
    const [formData, setFormData] = useState(jsonString);
    // eslint-disable-next-line
    const handleFormChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
    
    const handleTeamClick = (matchIndex, teamIndex) => {
    setTeamSelection(prevState => {
      const newState = prevState.map((match, index) => {
        if (index === matchIndex) {
          // Toggle the selected team's state
          return {
            team1: teamIndex === 0 ? !match.team1 : false,
            team2: teamIndex === 1 ? !match.team2 : false
          };
        }
        return match;
      });
      return newState;
    });
  };

  return (
  <>
    <div>
      {matches.map((match, index) => (
        <div key={match.id} className={styles.matchBlock}>
          <h3 className={styles.matchNumber}>Match Number: {match.id}</h3>
          <div className={styles.teamBlock}>
            <p className={styles.team}>{match.team1}</p>
            <p className={styles.vs}>vs</p>
            <p className={styles.team}>{match.team2}</p>
          </div>

          <div className={styles.timing}>
            <p className={styles.time}>Start Time: {match.timing.start}</p>
            <p className={styles.time}>End Time: {match.timing.end}</p>
          </div>
          <div className={styles.predict}>
            <p className={styles.predictText}>Predict Winner:</p>
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.teamButton} ${
                  teamSelection[index].team1 ? styles.selected : ""
                }`}
                onClick={() => handleTeamClick(index, 0)}
              >
                {match.team1}
              </button>
              <button
                className={`${styles.teamButton} ${
                  teamSelection[index].team2 ? styles.selected : ""
                }`}
                onClick={() => handleTeamClick(index, 1)}
              >
                {match.team2}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default MatchDetail;
