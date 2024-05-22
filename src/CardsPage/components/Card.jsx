import { useState } from "react";
import "../styles/Card.css";

export const Card = ({
  name,
  country,
  index,
  copyListCards,
  setCopyListCards,
  dragItem,
  dragOverItem,
}) => {
  const [isDragged, setIsDragged] = useState(false);

  const dragStart = (e, index) => {
    dragItem.current = index;
  };

  const dragEnter = (e, index) => {
    dragOverItem.current = index;
    setIsDragged(true);
  };

  const dragEnd = () => {
    let companies = [...copyListCards];
    const draggedCardContent = companies[dragItem.current];
    const overCardContent = companies[dragOverItem.current];
    companies.splice(dragItem.current, 1);
    companies.splice(dragItem.current, 0, overCardContent);
    companies.splice(dragOverItem.current, 1);
    companies.splice(dragOverItem.current, 0, draggedCardContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setCopyListCards(companies);
    setIsDragged(false);
  };


  return (
    <>
      <li
        className={`card ${isDragged ? "drag-over" : ""}`}
        draggable
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragLeave={() => setIsDragged(false)}
        onDragEnd={dragEnd}
      >
        <strong>Company:</strong>
        <p>{name}</p>
        <strong>Country:</strong>
        <p>{country}</p>
      </li>
    </>
  );
};
