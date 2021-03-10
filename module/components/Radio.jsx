import React, { forwardRef } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormRadio = forwardRef((props) => {
  const {
    id = `radio-${Date.now()}-${Math.ceil(Math.random() * 1000)}`,
    className,
    ref,
    children,

    disabled,
    ...radioProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const classList = [{ 'radio-disabled' : disabled }];

  return (
    <div ref={ref} className={classnames('btb-react-form', 'form-radio', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-radio', (disabled) ? 'form-disabled' : ''])}>
      <input id={id} className="radio_input" {...radioProps} type="radio" />
      {children ? (
        <label className="radio_context" htmlFor={id}>
          {children}
        </label>
      ) : (
        []
      )}
    </div>
  );
});

export default FormRadio;
