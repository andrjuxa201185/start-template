import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement(({value, classItem}) => <li
  className={classItem}>{value}</li>);

const SortableList = SortableContainer(({items, classList, classItem}) => {
  return (
    <ul className={classList}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value}
                      classItem={classItem}/>
      ))}
    </ul>
  );
});

class DragAndDrop extends React.Component {

  onSortItems = ({newIndex, oldIndex}) => {
    document.body.style.cursor = '';
    const {onDrop, items} = this.props;
    const newItems = arrayMove(items, oldIndex, newIndex);

    onDrop(newIndex, oldIndex, newItems);
  };

  onSortStart = () => {
    document.body.style.cursor = 'move';
  };

  render() {
    const {classItem, classList, items} = this.props;

    return <SortableList
      distance={3}
      useWindowAsScrollContainer={true}
      // pressDelay={200}
      axis={'xy'}
      classItem={classItem}
      classList={classList}
      items={items}
      onSortEnd={this.onSortItems}
      onSortStart={this.onSortStart}
    />;
  }
}

DragAndDrop.propTypes = {
  onDrop: PropTypes.func.isRequired,
  items: PropTypes.array,
  classItem: PropTypes.string,
  classList: PropTypes.string,
};

DragAndDrop.defaultProps = {};

export default DragAndDrop;
