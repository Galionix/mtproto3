// editable list:
// this component is used to display a list of items that can be edited
// it can add, remove, and edit items and also uses buttons to move items up and down
// it uses the TextInput component for each item

import { useState } from "react";
import { TextInput } from "../Input/TextInput";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlinePlus,
} from "react-icons/ai";
import { RenderMessage } from "../RenderMessage";
import s from "./EditableList.module.css";

export const EditableList = ({
  items,
  onChange,
  onAdd,
  onRemove,
  onMove,
  onEdit,
  onClearError,
  onError,
  ...props
}) => {
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [error, setError] = useState("");

  const handleAdd = () => {
    if (newItem === "") {
      setError("Cannot add empty item!");
      return;
    }

    if (items.includes(newItem)) {
      setError("Cannot add duplicate item!");
      return;
    }

    onAdd(newItem);
    setNewItem("");
    setError("");
  };

  const handleEdit = () => {
    if (editItem === "") {
      setError("Cannot edit to empty item!");
      return;
    }

    if (items.includes(editItem)) {
      setError("Cannot edit to duplicate item!");
      return;
    }

    onEdit(editIndex, editItem);
    setEditItem("");
    setEditIndex(-1);
    setError("");
  };

  return (
    <div className={s.container}>
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <TextInput
              label={index === 0 ? props.label : ""}
              value={item}
              onChange={(e) => {
                setEditItem(e);
                setEditIndex(index);
              }}
            />
            <div>
              <AiOutlineArrowUp
                // className={s.arrow}
                onClick={() => onMove(index, index - 1)}
              />
              <AiOutlineArrowDown
                // className={s.arrow}
                onClick={() => onMove(index, index + 1)}
              />
              <AiOutlineEdit
                // className={s.arrow}
                onClick={() => {
                  setEditItem(item);
                  setEditIndex(index);
                }}
              />
              <AiOutlineDelete
                // className={s.arrow}
                onClick={() => onRemove(index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <TextInput
          label={items.length === 0 ? props.label : ""}
          value={newItem}
          onChange={(e) => setNewItem(e)}
        />
        <AiOutlinePlus onClick={handleAdd} />
      </div>
      <div>
        <TextInput
          label={items.length === 0 ? props.label : ""}
          value={editItem}
          onChange={(e) => setEditItem(e)}
        />
        <AiOutlineEdit onClick={handleEdit} />
      </div>
    </div>
  );
};
