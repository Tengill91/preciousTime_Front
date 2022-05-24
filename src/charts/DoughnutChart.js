import React, { useState } from "react";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "../components/componentCss/DoughnutChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Popup from "../components/Popup";
import CrudService from "../services/CrudService";
import AuthService from "../services/auth.service";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [allLabelsList, setAllLabelsList] = useState([]);
  const [allAnswersList, setAllAnswersList] = useState([]);
  const [clickedLabel, setClickedLabel] = useState("");
  const currentUser = AuthService.getCurrentUser();

  const [familyTime, setFamilyTime] = useState(1);
  const [workTime, setWorkTime] = useState(1);
  const [learningTime, setLearningTime] = useState(1);
  const [hobbyTime, setHobbyTime] = useState(1);
  const [funTime, setFunTime] = useState(1);
  const [physicalActivityTime, setPhysicalActivityTime] = useState(1);

  useEffect(() => {
    CrudService.getAllLabels().then(
      (response) => {
        setAllLabelsList(response.data);
      },
      (error) => {
        const _questions =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setAllLabelsList(_questions);
      }
    );
  }, []);

  useEffect(() => {
    CrudService.getAllAnswers().then(
      (response) => {
        setAllAnswersList(response.data);
      },
      (error) => {
        const _answers =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setAllAnswersList(_answers);
      }
    );
  }, []);

  useEffect(() => {
    function sortTimeToLabels() {
      let allFamilyTime = 0;
      let allWorkTime = 0;
      let allLearningTime = 0;
      let allHobbyTime = 0;
      let allFunTime = 0;
      let allPhysicalActivityTime = 0;
      console.log("hello lets sort!");
      allAnswersList.map((answerApi) => {
        switch (String(answerApi.label)) {
          case "Family":
            allFamilyTime = allFamilyTime + answerApi.time;
            break;
          case "Work":
            allWorkTime = allWorkTime + answerApi.time;
            break;
          case "Learning":
            allLearningTime = allLearningTime + answerApi.time;
            break;
          case "Hobby":
            allHobbyTime = allHobbyTime + answerApi.time;
            break;
          case "Fun":
            allFunTime = allFunTime + answerApi.time;
            break;
          case "Physical activity":
            allPhysicalActivityTime = allPhysicalActivityTime + answerApi.time;
            break;

          default:
            console.log("cant find label for adding time " + answerApi.label);
            break;
        }
        return "";
      });

      console.log("Family time: " + allFamilyTime);
      if (allFamilyTime > 0) {
        setFamilyTime(familyTime + allFamilyTime);
      }
      if (allWorkTime > 0) {
        setWorkTime(allWorkTime);
      }
      if (allLearningTime > 0) {
        setLearningTime(allLearningTime);
      }
      if (allHobbyTime > 0) {
        setHobbyTime(allHobbyTime);
      }
      if (allFunTime > 0) {
        setFunTime(allFunTime);
      }
      if (allPhysicalActivityTime > 0) {
        setPhysicalActivityTime(allPhysicalActivityTime);
      }
    }
    sortTimeToLabels();
  }, [allAnswersList]);

  // "Family", "Work", "Learning", "Hobby", "Fun", "Physical activity"
  const doughnutData = {
    labels: allLabelsList.map((objekt) => objekt.label),
    datasets: [
      {
        label: "# of Votes",
        //data: [12, 19, 3, 5, 2, 3],
        data: [
          familyTime,
          workTime,
          learningTime,
          hobbyTime,
          funTime,
          physicalActivityTime,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="doughnutPage">
      <div className="fade-in-text">
        <h1 className="headerText">How will you spend your time today?</h1>
        {console.log(allAnswersList)}
      </div>
      <div className="doughnut">
        <Doughnut
          data={doughnutData}
          options={{
            onClick: function (evt, element) {
              if (element.length > 0) {
                // eleement är den man trycker på
                //console.log(element, element[0].index);
                // you can also get dataset of your selected element
                //console.log(doughnutData.datasets[element[0].datasetIndex]);

                //console.log(doughnutData.labels[element[0].index]);
                //console.log(doughnutData.datasets[element[0].index].data[element[0].index]);

                setClickedLabel(doughnutData.labels[element[0].index]);
                setButtonPopup(true);
              }
            },
          }}
        />
        {/* skapar props variabler tex "trigger" och "setTrigger" och skickar dom med props till Popup.js */}
        {console.log(clickedLabel)}
        <Popup
          trigger={buttonPopup}
          setTrigger={setButtonPopup}
          clickedLabel={clickedLabel}
        ></Popup>
      </div>
    </div>
  );
}

export default DoughnutChart;
