/* eslint-disable*/

import React, { useEffect, useState } from 'react';
import RichTextEditor from 'react-rte';
import './style.less'

const RichTextComponent = (props) => {
  const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: 'Normal', style: 'unstyled' },
      { label: 'Heading Large', style: 'header-one' },
      { label: 'Heading Medium', style: 'header-two' },
      { label: 'Heading Small', style: 'header-three' },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' },
    ],
  };
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());
  const dataValue = RichTextEditor.createValueFromString(props.data, 'html');
  useEffect(() => {
    if (value.toString('html') !== dataValue.toString('html')) {
      setValue(dataValue);
    }
  }, [dataValue, value]);
  const onChangeRichText = (value) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString('html'));
    }
  };
  return (
    <div className={props.className}>
      <RichTextEditor
        toolbarConfig={toolbarConfig}
        value={value}
        onChange={onChangeRichText}
      />
    </div>
  );
};
export default RichTextComponent;
