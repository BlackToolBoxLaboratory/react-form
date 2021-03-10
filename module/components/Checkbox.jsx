import React, { forwardRef } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormCheckbox = forwardRef((props) => {
  const {
    id = `checkbox-${Date.now()}-${Math.ceil(Math.random() * 1000)}`,
    className,
    ref,
    children,

    disabled,
    ...checkboxProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const classList = [{ 'checkbox-disabled' : disabled }];

  return (
    <div ref={ref} className={classnames('btb-react-form', 'form-checkbox', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-checkbox', (disabled) ? 'form-disabled' : ''])}>
      <input id={id} className="checkbox_input" {...checkboxProps} type="checkbox" />
      {children ? (
        <label className="checkbox_context" htmlFor={id}>
          {children}
        </label>
      ) : (
        []
      )}
    </div>
  );
});

export default FormCheckbox;
