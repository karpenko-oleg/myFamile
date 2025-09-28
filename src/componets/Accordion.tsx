import React from 'react';
import { useState, useRef } from "react";
import { IoChevronDownSharp } from "react-icons/io5";


interface AccordionTypes{
  title: String;
  content: String;
}

const Accordion: React.FC<AccordionTypes> = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef<any>(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <h2 className="accordion__title">{props.title}</h2>
        <IoChevronDownSharp className={`${setRotate}`} />
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}`}}
        className="accordion__content"
      >
        <div
          className="accordion__text"
          dangerouslySetInnerHTML={{ __html: props.content }}
        />
      </div>
    </div>
  );
}

export default Accordion;
