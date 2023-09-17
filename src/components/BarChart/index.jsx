import { CategoryScale, LinearScale, Chart, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PropTypes from "prop-types";
import hexToRgba from 'hex-to-rgba';
import colorData from '../../assets/data/colorCountries'

Chart.register(CategoryScale, LinearScale, BarElement,ChartDataLabels);

const RaceBarChart = ({ data }) => {
  console.log(data, "chart");
  const chartData = {
    labels: data.map((item) => item?.name),

    datasets: [
      {
        label: "Race Progress",
        backgroundColor: data.map((item) =>  hexToRgba(colorData[item?.name],'0.25')),
        borderColor: data.map((item) =>  hexToRgba(colorData[item?.name],'1')),
        borderWidth: 1,
        data: data.map((item) => item?.cases),
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        max: Math.max(...data.map((item) => item.cases)) + 100000, // Adjust the maximum value as needed
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "black", // Customize the font color
        font: {
          size: 15, // Customize the font size
        },
        anchor: "end", // Customize the label position (start, center, end, or auto)
        align: "start", // Customize the label alignment (start, center, end, or auto)
        formatter: (value) => `${value} (cases)`
      },
    },
  };

  return (
    <div style={{ margin: "20px", width: "90%" }} className="race-bar-chart">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
RaceBarChart.propTypes = {
  data: PropTypes.array,
};

export default RaceBarChart;
