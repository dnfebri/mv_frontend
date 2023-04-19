import React, { useEffect, useState } from 'react'

function InputModel1(props) {

  const [isValue, setIsValue] = useState(false);

  function inputLoad(el) {
    let input = el.target;
    let label = el.target.labels[0].firstChild;
    if (input.value) {
      label.classList.add('is-input');
      setIsValue(true);
    } 
  }

  function inputForm(el) {
    let label = el.target.labels[0].firstChild;
    label.classList.add('is-input');
    setIsValue(true);
  }

  function outInput(el) {
    let input = el.target;
    let label = el.target.labels[0].firstChild;
    if (!input.value) {
      label.classList.remove('is-input')
      setIsValue(false);
    } 
  }

  useEffect(() => {
    if (props.value) {
      setIsValue(true);
    }
  },[props.value])

  return (
    <div className="pt-4 my-2">
      <label className="relative">
        <span className={`absolute -top-0.5 right-full left-2 opacity-80 transition-all duration-300 ${isValue && 'is-input'}`}>{props.label}</span>
        <input 
        type={props.type} 
        name={props.name} 
        id={props.id} 
        value={props.value ? props.value : ''} 
        onChange={props.onChange} 
        className={`w-full bg-transparent border-b border-slate-300 outline-none text-black dark:text-neutral-200 focus:border-black dark:focus:border-white ${isValue && 'border-black dark:border-neutral-800'} h-10 px-2 group-focus:bg-black`} 
        onLoad={inputLoad} 
        onFocus={inputForm} 
        onBlur={outInput}
        required={props.required ?? false}
        />
      </label> 
    </div>
  )
}

export default InputModel1