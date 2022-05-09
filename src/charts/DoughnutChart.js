import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import "../components/componentCss/DoughnutChart.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Popup from "../components/Popup";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutData = {
  labels: ["Family", "Work", "Learning", "Art", "Fun", "Orange"],
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

function DoughnutChart() {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div className="doughnut">
      <div className="fade-in-text">
        <h1>How will you spend your time today?</h1>
      </div>
      <div style={{ width: "80%" }}>
        <Doughnut
          data={doughnutData}
          options={{
            onClick: function (evt, element) {
              if (element.length > 0) {
                // eleement är den man trycker på
                console.log(element, element[0].index);
                // you can also get dataset of your selected element
                //console.log(doughnutData.datasets[element[0].datasetIndex]);

                console.log(doughnutData.labels[element[0].index]);
                //console.log(doughnutData.datasets[element[0].index].data[element[0].index]);

                setButtonPopup(true);
              }
            },
          }}
        />
        {/* skapar props variabler tex "trigger" och "setTrigger" och skickar dom med props till Popup.js */}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Hello there</h3>
          <p>This is a button triggered popup</p>
        </Popup>
      </div>
    </div>
  );
}

export default DoughnutChart;
