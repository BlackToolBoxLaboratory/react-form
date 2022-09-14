import React, { forwardRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const FormRadio = forwardRef((props, ref) => {
  const {
    id,
    className,
    children,
    formValue,
    size,
    color,

    inline,
    disabled,
    readonly,
    ...radioProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const [radioId, updateRadioId] = useState();
  const [checked, updateChecked] = useState(false);

  const _click = () => {
    if (radioProps.onClick) {
      radioProps.onClick(props.value);
    }
  };

  useEffect(() => {
    if (formValue) {
      updateChecked(formValue === props.value);
    }
  }, [formValue]);
  useEffect(() => {
    updateChecked(props.checked);
  }, [props.checked]);
  useEffect(() => {
    updateRadioId(id || `checkbox-${Date.now()}-${Math.ceil(Math.random() * 1000)}`);
  }, [id]);
  return (
    <div ref={ref} 
      className={classnames('btb-react-form', 'form-radio', className, [{ 'radio-disabled' : disabled, 'radio-readonly' : readonly, 'radio-inline' : inline, 'radio-checked' : checked }])} 
      style={getStyle(styleObj, ['btb-react-form', 'form-radio', (disabled) ? 'radio-disabled' : '', (inline) ? 'radio-inline' : '', (checked) ? 'radio-checked' : ''])}
    >
      <input id={radioId} className="radio_input" style={getStyle(styleObj, ['radio_input'])} disabled={disabled} {...radioProps} type="radio" checked={checked} onClick={_click}/>
      <label className="radio_item" style={{ width : size || '1rem', height : size || '1rem', color : checked ? color || 'black' : '', ...getStyle(styleObj, ['checkbox_item']) }} htmlFor={radioId}>
        <div className="item_button" style={{ color : color || 'black', ...getStyle(styleObj, ['item_button'])}}/>
      </label>
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
