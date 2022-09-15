import React, { forwardRef, useRef, useState, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';

const PLACEHOLDER = '--placeholder--';

const FormSelect = forwardRef((props, ref) => {
  const {
    className,
    children,

    prependNode,
    appendNode,
    beforeNode,

    placeholder,
    disabled,
    ...selectProps
  } = props;
  const styleObj = formatCamelCase(props.styleObj || {});
  const [focusState, updateFocusState] = useState(false);
  const refSelect = useRef();

  const _checkValue = () => {
    if (refSelect.current.value === PLACEHOLDER) {
      refSelect.current.classList.add('select-unselect');
    } else {
      refSelect.current.classList.remove('select-unselect');
    }
  };

  const _focus = () => {
    updateFocusState(true);
  };
  const _blur = () => {
    updateFocusState(false);
  };

  useEffect(() => {
    _checkValue();
    refSelect.current.addEventListener('change', _checkValue);
    return () => {
      if (refSelect.current) {
        refSelect.current.removeEventListener('change', _checkValue);
      }
    };
  }, []);
  return (
    <div ref={ref} 
      className={classnames('btb-react-form', 'form-select', className, [{ 'select-disabled' : disabled, 'select-focused' : focusState }])} 
      style={getStyle(styleObj, ['btb-react-form', 'form-select', (disabled) ? 'select-disabled' : '', (focusState) ? 'select-focused' : ''])}
    >
      <div className="select_outer" style={getStyle(styleObj, ['select_outer'])}>
        {prependNode ? <div className="outer_item item-prepend" style={getStyle(styleObj, ['outer_item', 'item-prepend'])}>{prependNode}</div> : []}
        <div className="outer_item item-inner" style={getStyle(styleObj, ['outer_item', 'item-inner'])}>
          {beforeNode ? <div className="inner_item item-before" style={getStyle(styleObj, ['inner_item', 'item-before'])}>{beforeNode}</div> : []}
          <select
            ref={refSelect}
            className="inner_item item-select"
            style={getStyle(styleObj, ['inner_item', 'item-select'])}
            disabled={disabled}
            {...selectProps}
            onFocus={_focus} 
            onBlur={_blur}
          >
            {placeholder ? (
              <option value={PLACEHOLDER} disabled>
                {placeholder}
              </option>
            ) : (
              []
            )}
            {children}
          </select>
        </div>
        {appendNode ? <div className="outer_item item-append" style={getStyle(styleObj, ['outer_item', 'item-append'])}>{appendNode}</div> : []}
      </div>
    </div>
  );
});

export default FormSelect;