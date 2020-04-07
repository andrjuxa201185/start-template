import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from 'prop-types';
import styles from './ShareIconStyles.scss';
import {DOMAIN_APP_URI} from "../../../service/apiConstants";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';

import {
  FaSms,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaRegEnvelope,
} from "react-icons/fa";
import {MdPrint} from 'react-icons/md';

const ShareIcon = ({
                     type,
                     pageStringId,
                     pageId,
                     shareUrl,
                     color = '',
                     onClick,
                     bgColor = '',
                     className = '',
                     classIcon = '',
                   }) => {
  const url = pageStringId
    ? DOMAIN_APP_URI + '/' + pageStringId
    : DOMAIN_APP_URI + '/' + pageId;

  switch (type) {
    case 'Facebook':
      return (
        <FacebookShareButton
          url={shareUrl || url}
          className={`${styles.iconWrapper} ${className}`}
          style={{backgroundColor: bgColor}}
        >
          <FaFacebookF
            className={`${styles.icon} ${classIcon}`}
            style={{color: color}}
          />
        </FacebookShareButton>
      );
    case 'Twitter':
      return (
        <TwitterShareButton
          url={shareUrl || url}
          className={`${styles.iconWrapper} ${className}`}
          style={{backgroundColor: bgColor}}>
          <FaTwitter
            className={`${styles.icon} ${classIcon}`}
            style={{color: color}}
          />
        </TwitterShareButton>
      );
    case 'Linkedin':
      return (
        <LinkedinShareButton
          url={shareUrl || url}
          className={`${styles.iconWrapper} ${className}`}
          style={{backgroundColor: bgColor}}
        >
          <FaLinkedinIn
            className={`${styles.icon} ${classIcon}`}
            style={{color: color}}
          />
        </LinkedinShareButton>
      );

    case 'Email':
      return (
        <div
          className={`${styles.iconWrapper} ${className}`}
          style={{backgroundColor: bgColor}}
          onClick={onClick}
        >
          <FaRegEnvelope
            className={`${styles.icon} ${classIcon}`}
            style={{color: color}}
          />
        </div>
      );

    case 'Sms':
      return (
        <div
          className={`${styles.iconWrapper} ${className}`}
          style={{backgroundColor: bgColor}}
          onClick={onClick}
        >
          <FaSms
            className={`${styles.icon} ${classIcon}`}
            style={{color: color}}
          />
        </div>
      );

    case 'Print':
      return (
        <div
          className={`${styles.iconWrapper} ${className}`}
          style={{backgroundColor: bgColor}}
          onClick={onClick}
        >
          <MdPrint
            className={`${styles.icon} ${classIcon}`}
            style={{color: color}}
          />
        </div>
      );
  }
};

ShareIcon.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  shareUrl: PropTypes.string,
  bgColor: PropTypes.string,
  className: PropTypes.string,
  classIcon: PropTypes.string,
  pageStringId: PropTypes.string,
  pageId: PropTypes.number,
};

ShareIcon.defaultProps = {
  onClick: _ => _,
};

const mapStateToProps = ({tributePage}) => ({
  pageId: tributePage.data?.tribute.id,
  pageStringId: tributePage.data?.tribute.string_id,
});

export default connect(mapStateToProps)(ShareIcon);
