import React, { forwardRef, useState } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormTextarea = forwardRef((props, ref) => {
  const {
    className,
    showCounter,

    disabled,
    readOnly,
    ...textareaProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const [focusState, updateFocusState] = useState(false);
  const [value, updateValue] = useState('');

  const _change = (value) => {
    updateValue(value.target.value);
    if (textareaProps.onChange) {
      textareaProps.onChange(); 
    }
  };
  const _focus = () => {
    updateFocusState(true);
  };
  const _blur = () => {
    updateFocusState(false);
  };
  return (
    <div ref={ref} 
      className={classnames('btb-react-form', 'form-textarea', className, [{ 'textarea-disabled' : disabled, 'textarea-readonly' : readOnly, 'textarea-focused' : focusState }])} 
      style={getStyle(styleObj, ['btb-react-form', 'form-focused', (disabled) ? 'textarea-disabled' : '', (focusState) ? 'textarea-focused' : ''])}
    >
      <textarea className="textarea_input"
        style={getStyle(styleObj, ['textarea_input'])} disabled={disabled} {...textareaProps} onChange={_change} onFocus={_focus} onBlur={_blur} />
      {
        showCounter?
          (
            <div className='textarea_counter' style={getStyle(styleObj, ['textarea_counter'])}>{(props.maxLength) ? `${value.length} / ${props.maxLength}` : `${value.length}`}</div>
          ) : []
      }
    </div>
  );
});

export default FormTextarea;
