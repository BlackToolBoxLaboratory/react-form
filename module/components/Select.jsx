import React, { forwardRef, useRef, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';
import useFocusState from '../utils/useFoursState';

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
  const focusState = useFocusState();
  const classList = [{ 'select-disabled' : disabled }, { 'select-focused' : focusState.value }];
  const refSelect = useRef();

  const _checkValue = () => {
    if (refSelect.current.value === PLACEHOLDER) {
      refSelect.current.classList.add('select-unselect');
    } else {
      refSelect.current.classList.remove('select-unselect');
    }
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
    <div ref={ref} className={classnames('btb-react-form', 'form-select', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-select', (disabled) ? 'select-disabled' : '', (focusState.value) ? 'select-focused' : ''])}>
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