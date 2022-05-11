import React, { useState } from "react";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "../components/componentCss/DoughnutChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Popup from "../components/Popup";
import CrudService from "../services/CrudService";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [allLabelsList, setAllLabelsList] = useState([]);
  const [clickedLabel, setClickedLabel] = useState("");

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

  // "Family", "Work", "Learning", "Hobby", "Fun", "Physical activity"
  const doughnutData = {
    labels: allLabelsList.map((objekt) => objekt.label),
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
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
    <div className="doughnut">
      <div className="fade-in-text">
        <h1>How will you spend your time today?</h1>
      </div>
      <div style={{ width: "100%" }}>
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
        > 
        </Popup>
      </div>
    </div>
  );
}

export default DoughnutChart;
