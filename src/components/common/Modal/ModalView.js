import React from "react";
import Modal from 'react-modal';
import PropTypes from "prop-types";
import styles from './ModalStyles.scss';
import {MdClose} from 'react-icons/md';
Modal.setAppElement('#root');

const ModalView = ({title, isOpen, children, closeModal, customStyles}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        style={customStyles}
      >
        <MdClose onClick={closeModal} className={styles.closeBtn}/>
        {title &&
        <h2 className={styles.header}>{title}</h2>
        }
        {children}
      </Modal>
    </>
  );
};

ModalView.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  customStyles: PropTypes.object,
};

ModalView.defaultProps = {
  customStyles: {
    content: {
      width: '100%',
      maxWidth: '460px',
      borderRadius: 0,
      border: 'none',
      padding: 0,
      overflow: 'visible',
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 999,
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

export default ModalView;
