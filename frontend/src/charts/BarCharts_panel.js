import React from "react";
//import BarChart from "react-bar-chart";
import { Bar } from "react-chartjs-2";


const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const InterviewsDriveData = [
    { text: "Jan", value: 200 },
    { text: "Feb", value: 400 },
    { text: "Mar", value: 500 },
    { text: "Apr", value: 300 },
    { text: "May", value: 700 },
    { text: "Jun", value: 800 },
    { text: "Jul", value: 1000},
    { text: "Aug", value: 400 },
    { text: "Sep", value: 350 },
    { text: "Oct", value: 600 },
    { text: "Nov", value: 400 },
    { text: "Dec", value: 350 }
  ];
  
class InterViewDriveData extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 450
    };
  }

  componentDidMount() {
    window.onresize = () => {
      this.setState({ width: this.refs.root.offsetWidth });
    };
  }

  handleBarClick = (element, id) => {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  };

  render() {
    return (
      <div ref="root">
        <div style={{ width: "40%" }}>
         
          <Bar
            ylabel="Total Interviews"
            width={this.state.width}
            height={500}
            margin={margin}
            data={InterviewsDriveData}
            onBarClick={this.handleBarClick}
          />
        </div>
      </div>
    );
  }
}
export default InterViewDriveData;
