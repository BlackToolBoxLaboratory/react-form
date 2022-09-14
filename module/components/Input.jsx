import React, { forwardRef, useState } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormInput = forwardRef((props, ref) => {
  const {
    className,

    prependNode,
    appendNode,
    beforeNode,
    afterNode,
    type = 'text',
    autoComplete = 'off',

    disabled,
    readOnly,
    ...inputProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const [focusState, updateFocusState] = useState(false);

  const _focus = () => {
    updateFocusState(true);
  };
  const _blur = () => {
    updateFocusState(false);
  };

  return (
    <div ref={ref} 
      className={classnames('btb-react-form', 'form-input', className, [{ 'input-disabled' : disabled, 'input-readonly' : readOnly, 'input-focused' : focusState}])} 
      style={getStyle(styleObj, ['btb-react-form', 'form-input', (disabled) ? 'input-disabled' : '', (focusState) ? 'input-focused' : ''])}
    >
      <div className="input_outer" style={getStyle(styleObj, ['input_outer'])}>
        {prependNode ? <div className="outer_item item-prepend" style={getStyle(styleObj, ['outer_item', 'item-prepend'])}>{prependNode}</div> : []}
        <div className="outer_item item-inner" style={getStyle(styleObj, ['outer_item', 'item-inner'])}>
          {beforeNode ? <div className="inner_item item-before" style={getStyle(styleObj, ['inner_item', 'item-before'])}>{beforeNode}</div> : []}
          <input
            type={type}
            autoComplete={autoComplete}
            readOnly={readOnly}
            disabled={disabled}
            className="inner_item item-input"
            style={getStyle(styleObj, ['inner_item', 'item-input'])}
            {...inputProps}
            onFocus={_focus}
            onBlur={_blur}
          />
          {afterNode ? <div className="inner_item item-after" style={getStyle(styleObj, ['inner_item', 'item-after'])}>{afterNode}</div> : []}
        </div>
        {appendNode ? <div className="outer_item item-append" style={getStyle(styleObj, ['outer_item', 'item-append'])}>{appendNode}</div> : []}
      </div>
    </div>
  );
});

export default FormInput;