import React from "react";

interface ButtonProps {
  text: string;
  green?: boolean;
  styleButton?: string;
  styleSpan?: string;
  other?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}
export const Button = ({
  text,
  green,
  styleButton,
  styleSpan,
  ...other
}: ButtonProps) => {
  return (
    <>
      {green ? (
        <button
          className={`border-1 border-black bg-[#145B46] rounded-2xl ${styleButton}`}
          type="submit"
          {...other}
        >
          <span
            className={`font-inter text-center text-white p-3 ${styleSpan}`}
          >
            {text}
          </span>
        </button>
      ) : (
        <button
          className={`border-1 border-black rounded-2xl ${styleButton}`}
          type="submit"
          {...other}
        >
          <span className={`font-inter text-center p-3 ${styleSpan}`}>
            {text}
          </span>
        </button>
      )}
    </>
  );
};
