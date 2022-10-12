import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
//
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const ToolTipPositions = () => (
  <div className="example-warper" id="keepinside">
    {array.map((v, k) => (
      <Popup
        key={k}
        trigger={<button className="button"> button </button>}
        keepTooltipInside="#keepinside"
        on="hover"
      >
        <Card title="Right Top" />
      </Popup>
    ))}
  </div>
);

const Card = ({ title }) => (
  <div className="card">
    <div className="header">{title} position </div>
    <div className="content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit autem
      sapiente labore architecto exercitationem optio quod dolor cupiditate
    </div>
  </div>
);

export default ToolTipPositions;
