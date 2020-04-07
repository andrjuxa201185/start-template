import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import styles from './ModalStyles.scss';
import {hideAlert} from '../../../store/alert/alertActions';
import Button from "../../controls/Button/ButtonView";
import ModalView from './ModalView';

class AlertView extends PureComponent {
  componentDidMount() {
    window.addEventListener('keypress', this._handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this._handleKeyDown);
  }

  _handleKeyDown = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      this.props.hideAlert(e);
    }
  };

  alertStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '460px',
      borderRadius: 0,
      border: 'none',
      padding: 0,
      overflow: 'visible',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 9999,
    },
  };

  render() {
    const {isOpen, title, msg, hideAlert} = this.props;
    return (
      <ModalView
        title={title}
        isOpen={isOpen}
        closeModal={hideAlert}
        customStyles={this.alertStyles}
      >
        <div className=''>
          {msg &&
          <div className={styles.textWrapper}>
            <p className={styles.text}>{msg}</p>
          </div>
          }
          <div className={styles.buttons}>
            <Button
              onClick={hideAlert}
              title={'OK'}
              size={'md'}
              className={styles.button}
            />
          </div>
        </div>

      </ModalView>
    );
  }
}

AlertView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  msg: PropTypes.string,
  hideAlert: PropTypes.func.isRequired,
};

const mapStateToProps = ({alert: {isOpen, title, msg}}) => ({
  isOpen, title, msg,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideAlert,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AlertView);
