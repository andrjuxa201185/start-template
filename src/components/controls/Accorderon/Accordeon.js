import React from 'react';
import PropTypes from 'prop-types';
import styles from './Accordeon.scss';

class Accordeon extends React.Component {
  state = {
    isOpen: false,
  };

  componentDidMount() {
    const {isOpen} = this.props;

    this.setState({isOpen});
  }

  componentDidUpdate(prevProps) {
    const {isOpen} = this.props;
    if (isOpen !== prevProps.isOpen) {
      this.setState({isOpen});
    }
  }

  handleOpen = () => {
    const {isControlled, onSelect} = this.props;
    onSelect();
    if (isControlled) return;
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  ;

  render() {
    const {Icon, title, children, classHeader = '', classBody = '', classWrapper = '', classIcon = '', isControlled} = this.props;
    const {isOpen} = this.state;

    return (
      <div className={`${styles.ac} ${classWrapper}`}>

        <div
          onClick={this.handleOpen}
          className={`${styles.acHeader} ${classHeader}`}
        >
          {title}
          {!isControlled &&
          <div>
            {Icon
              ? <Icon
                className={`${styles.acIcon} ${classIcon} ${isOpen ? styles.acIconOpen : ''}`}
              />
              : isOpen
                ? <span className={styles.acText}>Close</span>
                : <span className={styles.acText}>Change</span>
            }
          </div>
          }
        </div>

        {isOpen &&
        <div className={`${styles.acBody} ${classBody}`}>
          {children}
        </div>
        }
      </div>
    );
  }
}

Accordeon.propTypes = {
  onSelect: PropTypes.func,
  classHeader: PropTypes.string,
  classBody: PropTypes.string,
  classWrapper: PropTypes.string,
  title: PropTypes.string,
  classIcon: PropTypes.string,
  Icon: PropTypes.func,
  isOpen: PropTypes.bool,
  isControlled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Accordeon.defaultProps = {
  title: '',
  onSelect: _ => _,
};

export default Accordeon;
