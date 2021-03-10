import React, { forwardRef, useRef, useEffect } from 'react';
import classnames from 'classnames';

import getStyle from '../utils/getStyle.js';
import formatCamelCase from '../utils/formatCamelCase.js';
import useFocusState from '../utils/useFoursState';

const PLACEHOLDER = '--placeholder--';

const FormSelect = forwardRef((props) => {
  const {
    id = `select-${Date.now()}-${Math.ceil(Math.random() * 1000)}`,
    className,
    ref,
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
  const classList = [{ 'select-disabled' : disabled }];
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
    <div ref={ref} className={classnames('btb-react-form', 'form-input', className, classList)} style={getStyle(styleObj, ['btb-react-form', 'form-input', (disabled) ? 'form-disabled' : '', (focusState.value) ? 'form-focused' : ''])}>
      <div className="input_outer" style={getStyle(styleObj, ['input_outer'])}>
        {prependNode ? <div className="outer_item item-prepend" style={getStyle(styleObj, ['outer_item', 'item-prepend'])}>{prependNode}</div> : []}
        <div className="outer_inner" style={getStyle(styleObj, ['outer_inner'])}>
          {beforeNode ? <div className="inner_item item-before" style={getStyle(styleObj, ['inner_item', 'item-before'])}>{prependNode}</div> : []}
          <select
            ref={refSelect}
            id={id}
            className="inner_item item-select"
            style={getStyle(styleObj, ['inner_item', 'item-select'])}
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