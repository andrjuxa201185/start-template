import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectStyles.scss';
import {FaChevronDown} from 'react-icons/fa';
import {IoIosCheckboxOutline} from 'react-icons/io';
import {MdCheckBoxOutlineBlank} from 'react-icons/md';
import {Input} from "../index";

class SelectView extends React.Component {

  state = {
    isOpen: false,
    items: [],
  };

  nodeRef = React.createRef();

  handlerClose = () => {
    this.setState({isOpen: false});
  };

  handlerOpen = e => {
    e.stopPropagation();
    this.setState({isOpen: !this.state.isOpen});
  };

  componentDidMount() {
    const {list, checkedList} = this.props;
    document.addEventListener('mousedown', this.handleClickOutside);
    this.setState({
      items: list.map(item => ({item, checked: checkedList?.includes(item)})),
    });
  }

  componentDidUpdate(prevProps) {
    const {list, checkedList} = this.props;
    if (prevProps.list.length !== list.length) {
      this.setState({
        items: list.map(item => ({item, checked: checkedList?.includes(item)})),
      });
    }
    if (checkedList && (checkedList.length !== prevProps.checkedList.length)) {
      this.setState({
        items: list.map(item => ({item, checked: checkedList?.includes(item)})),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.nodeRef.current && !this.nodeRef.current.contains(event.target)) {
      this.handlerClose();
    }
  };

  onChange = val => {
    const {multiselect, onSelect} = this.props;

    if (!multiselect) {
      onSelect(val);
      this.handlerClose();
      return;
    }

    const newList = this.state.items.map(({item, checked}) => {
      if (val === item) return ({item, checked: !checked});
      return {item, checked};
    });

    onSelect(newList.filter(({checked}) => checked).map(({item}) => item));

    this.setState({
      val,
      items: newList,
    });
  };

  render() {
    const {multiselect, classWrapper = '', Icon, classItem = '', className = '', value, placeholder = '', error = ''} = this.props;
    const {isOpen, items} = this.state;

    return (
      <div
        className={`${styles.select} ${classWrapper}`}
        ref={this.nodeRef}
      >

        <div onClick={this.handlerOpen}>
          <Input
            placeholder={placeholder}
            disabled
            value={value}
            error={error}
            className={className}
            Icon={Icon}
          />
        </div>
        <FaChevronDown onClick={this.handlerOpen}
                       className={styles.selectArrow}/>
        {isOpen &&
        <ul className={styles.selectList}>
          {items.map(({item, checked}, i) => (
            <li
              key={i}
              className={`${styles.selectListItem}
              ${classItem}
              ${multiselect ? styles.selectListItemMult : ''}
              `}
              onClick={() => this.onChange(item.key || item)}
            >
              {item.value || item}
              {multiselect &&
              <>
                {checked
                  ? <IoIosCheckboxOutline className={styles.multiselectIcon}/>
                  : <MdCheckBoxOutlineBlank className={styles.multiselectIcon}/>
                }
              </>
              }
            </li>
          ))}
        </ul>
        }
      </div>
    );
  }
}

SelectView.propTypes = {
  onSelect: PropTypes.func.isRequired,
  list: PropTypes.array.isRequired,
  checkedList: PropTypes.array,
  children: PropTypes.object,
  multiselect: PropTypes.bool,
  classWrapper: PropTypes.string,
  classItem: PropTypes.string,
  Icon: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SelectView;
