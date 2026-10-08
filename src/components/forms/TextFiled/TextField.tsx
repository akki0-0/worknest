import React from "react";
import style from "./TextField.module.css";
import global from "../Global.module.css";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextField({
  label,
  error,
  id,
  ...inputProps
}: TextFieldProps) {
  return (
    <div className={style.container}>
      <label htmlFor={id} className={global.label}>
        {label}
      </label>
      <input id={id} {...inputProps} className={global.textFieldBox} />
      {error && <p>{error}</p>}
    </div>
  );
}
