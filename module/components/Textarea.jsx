import React, { forwardRef } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';
import useFocusState from '../utils/useFoursState';

const FormTextarea = forwardRef((props) => {
  const {
    id = `textarea-${Date.now()}-${Math.ceil(Math.random() * 1000)}`,
    className,
    ref,

    disabled,
    ...textareaProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const focusState = useFocusState();
  const classList = [{ 'textarea-disabled' : disabled }, { 'textarea-focused' : focusState.value }];

  const _focus = () => {
    focusState.update(true);
  };
  const _blur = () => {
    focusState.update(false);
  };

  return (
    <div ref={ref} className={classnames('btb-react-form', 'form-textarea', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-focused', (disabled) ? 'form-disabled' : '', (focusState.value) ? 'form-disabled' : ''])}>
      <textarea id={id} disabled={disabled} className="form-textarea"
        style={getStyle(styleObj, ['form-textarea'])} {...textareaProps} onFocus={_focus}
        onBlur={_blur} />
    </div>
  );
});

export default FormTextarea;
