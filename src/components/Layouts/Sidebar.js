import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

class Sidebar extends Component {
  state = {
    sideBarList: [
      {
        id: 1,
        title: "Orders",
        img: "images/icons/orders@3x.png",
        route:'/orders'
      },
      {
        id: 2,
        title: "Activity",
        img: "images/icons/activity@3x.png",
        route:'/activity'
      },
      {
        id: 3,
        title: "Customers",
        img: "images/icons/user-2@3x.png",
        route:'/users'
      },
    ],
    activeType:localStorage.getItem("activityType")?localStorage.getItem("activityType"):1
  };

  changeSection(section){
    this.setState({activeType:section.id})
    localStorage.setItem("activityType",section.id)
    this.props.history.push(section.route)
  }


  render() {
    const { sideBarList,activeType } = this.state;
    return (
      <nav className="sidebar">
        <ul className="mt-5">
          {sideBarList &&
            sideBarList.map((list, index) => {
              return (
                <li className={+activeType===list.id?'active':''} index={index} onClick={this.changeSection.bind(this,list)}>
                  <img alt={list.title} src={list.img} className="icon-size"></img>
                  {list.title}
                </li>
              );
            })}
        </ul>
      </nav>
    );
  }
}

export default withRouter(Sidebar);
