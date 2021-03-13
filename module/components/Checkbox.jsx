import React, { forwardRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormCheckbox = forwardRef((props, ref) => {
  const {
    id,
    className,
    children,

    inline,
    disabled,
    ...checkboxProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const classList = [{ 'checkbox-disabled' : disabled, 'checkbox-inline' : inline }];
  const [checkboxId, updateCheckboxId] = useState();

  useEffect(() => {
    updateCheckboxId(id || `checkbox-${Date.now()}-${Math.ceil(Math.random() * 1000)}`);
  }, [id]);
  return (
    <div ref={ref} className={classnames('btb-react-form', 'form-checkbox', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-checkbox', (disabled) ? 'checkbox-disabled' : '', (inline) ? 'checkbox-inline' : ''])}>
      <input id={checkboxId} className="checkbox_input" disabled={disabled} {...checkboxProps} type="checkbox" />
      {children ? (
        <label className="checkbox_label" htmlFor={checkboxId}>
          {children}
        </label>
      ) : (
        []
      )}
    </div>
  );
});

export default FormCheckbox;
