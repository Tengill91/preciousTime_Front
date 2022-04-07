import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 2,
    },
  ],
};
function DoughnutChart() {
  const [placeholder, setPlaceholder] = React.useState("");

  const string = "Where do you whant to spend your time today?",
    index = React.useRef(0);

  React.useEffect(() => {
    function tick() {
      setPlaceholder((prev) => prev + string[index.current]);
      index.current++;
    }
    if (index.current < string.length) {
      let addChar = setInterval(tick, 20);
      return () => clearInterval(addChar);
    }
  }, [placeholder]);

  return (
    <div className="doughnut">
      <div className="fade-in-text">
        <h1>How will you spend your time today?</h1>
      </div>
      <div style={{ width: "500px" }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
}

export default DoughnutChart;
