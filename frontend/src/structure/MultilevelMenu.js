import React from "react";
import { Link } from "react-router-dom";
import "./MultilevelMenu.css";
import AuthService from "../services/auth.service";

const MultilevelMenu = ({ data, currentUser }) => {
  const renderMenuItems = (data, isParentVisible) => {
    let currentRoles = AuthService.getCurrentUserRoles();
    // console.log(currentRoles);
    return data.map((item, index) =>
      (currentUser && item.needLogin) ||
      (!currentUser && !item.needLogin) ||
      isParentVisible ? (
        item?.children &&
        item?.children.length &&
        (!item.role || currentRoles.indexOf(item.role) > -1) ? (
          <li key={getRandomKey(901, 1900)}>
            {/*console.log(item.role + ":" + item.name)*/}
            <Link to={"#"} key={getRandomKey(2901, 3900)}>
              {item.name}
            </Link>
            <ul key={getRandomKey(1901, 2900)}>
              {renderMenuItems(item.children, true)}
            </ul>
          </li>
        ) : !item.role || currentRoles.indexOf(item.role) > -1 ? (
          <li key={getRandomKey(2901, 3900)}>
            {/*console.log(item.role + ":" + item.name)*/}
            <Link to={item.url} key={getRandomKey(2901, 3900)}>
              {item.name}{" "}
            </Link>
          </li>
        ) : (
          <></>
        )
      ) : (
        <></>
      )
    );
  };

  const getRandomKey = (min, max) => {
    return min + Math.random() * (max - min);
  };

  return (
    data && (
      <div className="multilevelMenu">
        <ul key={getRandomKey(1, 900)} className="main-navigation">
          {renderMenuItems(data, false)}
        </ul>
      </div>
    )
  );
};
export default MultilevelMenu;
