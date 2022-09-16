import React, { forwardRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormCheckbox = forwardRef((props, ref) => {
  const {
    id,
    className,
    children,
    formValue,
    size,
    color,
    signColor,

    inline,
    disabled,
    ...checkboxProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const [checkboxId, updateCheckboxId] = useState();
  const [checked, updateChecked] = useState();

  const _click = () => {
    if (checkboxProps.onClick) {
      let newFormValue = [];
      if (formValue) {
        newFormValue = newFormValue.concat(formValue);
      }
      if (!newFormValue.includes(props.value) && props.value) {
        newFormValue = newFormValue.concat(props.value);
      } else {
        newFormValue = newFormValue.filter((value) => {
          return value !== props.value;
        });
      }
      checkboxProps.onClick(newFormValue, props.value);
    }
  };

  useEffect(() => {
    if (formValue) {
      updateChecked(formValue.includes(props.value));
    }
  }, [formValue]);
  useEffect(() => {
    updateChecked(props.checked);
  }, [props.checked]);
  useEffect(() => {
    updateCheckboxId(id || `checkbox-${Date.now()}-${Math.ceil(Math.random() * 1000)}`);
  }, [id]);
  return (
    <div ref={ref}
      className={classnames('btb-react-form', 'form-checkbox', className, [{ 'checkbox-disabled' : disabled, 'checkbox-inline' : inline }])}
      style={getStyle(styleObj, ['btb-react-form', 'form-checkbox', (disabled) ? 'checkbox-disabled' : '', (inline) ? 'checkbox-inline' : '' ])}
    >
      <input id={checkboxId} className="checkbox_input" style={getStyle(styleObj, ['checkbox_input'])} disabled={disabled} {...checkboxProps} type="checkbox" checked={checked} onClick={_click}/>
      <label className="checkbox_item" style={{ width : size || '1rem', height : size || '1rem', color : color || 'black', background : 'currentColor', ...getStyle(styleObj, ['checkbox_item']) }} htmlFor={checkboxId}>
        <div className="item_button" style={{ color : signColor || 'white', ...getStyle(styleObj, ['item_button'])}}/>
      </label>
      {children ? (
        <label className="checkbox_label" style={getStyle(styleObj, ['checkbox_label'])} htmlFor={checkboxId}>
          {children}
        </label>
      ) : (
        []
      )}
    </div>
  );
});

export default FormCheckbox;
