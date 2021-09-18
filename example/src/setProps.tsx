import {setProps} from "react-funland";
import React from "react";

interface MyInputProps extends  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  mode: 'string' | 'number'
}

function MyInput({ mode }: MyInputProps) {
  return <input />;
}

const NumberInput = setProps(MyInput, { mode: 'number' });

const WithClass = setProps(NumberInput, { className: 'test-class' });

export default function () {
  return (
    <>
      <NumberInput />
      <WithClass />
    </>
  )
}
