/* eslint-disable*/

import React from 'react';
import RichTextComponent from './RichTextComponent';

const RichTextWithDiscription = (props) => {
    const { className, editMode, data, onChange, discriptionClass } = props;
 
  return (
    <div className={className}>
        {editMode ? 
            <RichTextComponent data={data ? data : ''} onChange={onChange} />
        : 
            <div className={`rich-text-data ${discriptionClass}`} dangerouslySetInnerHTML={{__html: data}}></div> 
        }
    </div>
  );
};

export default RichTextWithDiscription;
