import React, {useRef, useState} from "react";
import AvatarEditor from 'react-avatar-editor';
import PropTypes from "prop-types";
import {Button, InputSlider} from '../';
import {FaRedo} from 'react-icons/fa';
import styles from './AvatarEditorStyles.scss';

const AvatarEditorContainer = ({url, onSave}) => {
  const editor = useRef(null);
  const [scale, setScale] = useState(1);
  const [deg, setDeg] = useState(0);

  const polifilToBlob = () => {
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
          let canvas = this;
          setTimeout(function () {
            let binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
              len = binStr.length,
              arr = new Uint8Array(len);

            for (let i = 0; i < len; i++) {
              arr[i] = binStr.charCodeAt(i);
            }

            callback(new Blob([arr], {type: type || 'image/png'}));
          });
        },
      });
    }
  };

  const handleSave = () => {
    polifilToBlob();
    if (editor) {
      editor.current.getImageScaledToCanvas().toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        onSave(blob, url);
        // URL.revokeObjectURL(url);
      }, 'image/png');
    }
  };

  return (
    <div className={styles.container}>
      <AvatarEditor
        ref={editor}
        image={url}
        width={260}
        height={260}
        border={50}
        scale={scale}
        rotate={deg}
        borderRadius={260}
        className={styles.canvas}
      />
      <div className={styles.sliderWrapper}>
        <InputSlider
          defaultValue={scale}
          min={0.5}
          max={2}
          step={0.1}
          onChange={value => setScale(value)}
          className={styles.slider}
        />
      </div>

      <div className={styles.btnWrapper}>
        <Button className={styles.btn} onClick={handleSave} title='SAVE PHOTO'
                size='md'/>
      </div>
      {/*<div className={styles.changeWrapper}>*/}
      {/*<span className={styles.change}>Change Photo</span>*/}
      {/*</div>*/}
      <div className={styles.rotateBtn} onClick={() => setDeg(deg + 90)}>
        <FaRedo
          className={styles.rotateIco}
        />
      </div>
    </div>
  );
};

AvatarEditorContainer.propTypes = {
  // url: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default AvatarEditorContainer;
