"use client";
import React from "react";

interface CustomInputProps {
  label: string;
  name: string;
  type: string;
  id: string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (name:string, value:string) => void;
}

const Input: React.FC<CustomInputProps> = ({
  label,
  name,
  type,
  id,
  placeholder,
  value,
  className,
  onChange
}) => {
  return (
    <div className="form-control">
      <label className="label capitalize" htmlFor="email">
        {label}
      </label>
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>onChange(e.target.name, e.target.value)}
        className={`input input-md input-bordered input-primary w-full max-w-xs ${className}`}
        autoComplete="on"
      />
    </div>
  );
};

export default Input;
