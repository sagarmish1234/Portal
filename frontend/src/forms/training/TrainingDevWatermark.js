import "../../css/devwatermark.css";

const TrainingDevWatermark = function (props) {
  return (
  
    <div className="watermark">
      <p>Developed by : {props.name}</p>
    </div>
  );
};

export default TrainingDevWatermark;
