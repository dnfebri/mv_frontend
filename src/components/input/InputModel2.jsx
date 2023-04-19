import React, { useState } from 'react'

function InputModel2(props) {

  const [isValue, setIsValue] = useState(false);

  function inputLoad(el) {
    let input = el.target;
    console.log(el)
    if (input.value) {
      // label.classList.add('is-input');
      setIsValue(true);
    } 
  }

  function inputForm(el) {
    setIsValue(true);
  }

  function outInput(el) {
    let input = el.target;
    let label = el.target.labels[0].firstChild;
    if (!input.value) {
      setIsValue(false);
    } 
  }

  return (
    <div className="pt-4 my-2">
      <label className="relative">
        <span className={`absolute -top-0.5 right-full left-2 ${!isValue && ''} transition-all duration-300 ${(isValue) && '-top-8 scale-75 opacity-100'}`}>{props.label}</span>
        <input type={props.type} name={props.name} id={props.id} value={props.value} onChange={props.onChange} className={`w-full bg-transparent outline-none focus:ring-0 text-black focus:border-black ${isValue && 'border-black'} h-10 px-2 group-focus:bg-black`} onLoad={inputLoad} onFocus={inputForm} onBlur={outInput} />
      </label> 
    </div>
  )
}

export default InputModel2