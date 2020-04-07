import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./SideBarStyles.scss";

const SideBarView = ({navItems}) => {

  return (
    <aside className={styles.sidebar}>
      {navItems.map((item, i) => {
        return (
          <NavLink
            key={i}
            to={item.linkTo}
            activeClassName={styles.itemActive}
            className={styles.item}
          >
            <span>{item.text}</span>
          </NavLink>
        );
      })}

      <div>
        <a href='#'>Contact Us</a>
        <a href='#'>Help</a>
        <a href='#'>Sign Out</a>
      </div>
    </aside>
  );
};

SideBarView.propTypes = {
  navItems: PropTypes.array,
};

export default SideBarView;
