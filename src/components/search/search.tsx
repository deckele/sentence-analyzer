import React, { FC } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import classnames from "classnames";
import "./search.scss";

interface SearchProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}
export const Search: FC<SearchProps> = ({ value, onChange }) => {
  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    onChange(value);
  }
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  function handleDeleteInput() {
    onChange("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <span className="input-with-icon">
        <FaSearch className="icon" onClick={() => handleSubmit} />
        <input type="text" onChange={handleSearchChange} value={value} />
        <IoMdClose className={classnames("icon", {hidden: !value})} onClick={handleDeleteInput} />
      </span>
    </form>
  );
};
