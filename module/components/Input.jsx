import React, { forwardRef } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';
import useFocusState from '../utils/useFoursState';

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
    ...inputProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const focusState = useFocusState();
  const classList = [{ 'input-disabled' : disabled }, {'input-focused' : focusState.value}];

  const _focus = () => {
    focusState.update(true);
  };
  const _blur = () => {
    focusState.update(false);
  };

  return (
    <div ref={ref} className={classnames('btb-react-form', 'form-input', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-input', (disabled) ? 'input-disabled' : '', (focusState.value) ? 'input-focused' : ''])}>
      <div className="input_outer" style={getStyle(styleObj, ['input_outer'])}>
        {prependNode ? <div className="outer_item item-prepend" style={getStyle(styleObj, ['outer_item', 'item-prepend'])}>{prependNode}</div> : []}
        <div className="outer_item item-inner" style={getStyle(styleObj, ['outer_item', 'item-inner'])}>
          {beforeNode ? <div className="inner_item item-before" style={getStyle(styleObj, ['inner_item', 'item-before'])}>{beforeNode}</div> : []}
          <input
            type={type}
            autoComplete={autoComplete}
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