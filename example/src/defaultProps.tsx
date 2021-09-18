import React from "react";
import { defaultProps } from "react-funland";

interface MyInputProps extends  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  mode: 'string' | 'number'
}

function MyInput({ mode }: MyInputProps) {
  return <input />;
}

const WithClass = defaultProps(MyInput, { className: 'test-class' });

const NumberInput = defaultProps(MyInput, { mode: 'number' });

export default function () {
  return (
    <>
      <NumberInput />
      <WithClass mode="number" />
    </>
  )
}
