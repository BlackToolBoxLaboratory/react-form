import React, { forwardRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormRadio = forwardRef((props, ref) => {
  const {
    id,
    className,
    children,

    inline,
    disabled,
    ...radioProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const classList = [{ 'radio-disabled' : disabled, 'radio-inline' : inline }];
  const [radioId, updateRadioId] = useState();

  useEffect(() => {
    updateRadioId(id || `checkbox-${Date.now()}-${Math.ceil(Math.random() * 1000)}`);
  }, [id]);
  return (
    <div ref={ref} className={classnames('btb-react-form', 'form-radio', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-radio', (disabled) ? 'radio-disabled' : '', (inline) ? 'radio-inline' : ''])}>
      <input id={radioId} className="radio_input" disabled={disabled} {...radioProps} type="radio" />
      {children ? (
        <label className="radio_label" style={getStyle(styleObj, ['radio_label'])} htmlFor={radioId}>
          {children}
        </label>
      ) : (
        []
      )}
    </div>
  );
});

export default FormRadio;
