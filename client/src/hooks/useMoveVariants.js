import { useState } from "react";

const useMoveVariants = () => {
  const [variants, setVariants] = useState({});
  const [clickedElement, setClickedElement] = useState(null);

  const variantsClickHandler = ({
    element = null,
    openVariant = {},
    closeVariant = {},
  }) => {
    setClickedElement(element);
    if (!element) {
      setVariants({});
      return;
    }

    const height = element.offsetHeight;
    const width = element.offsetWidth;
    const rect = element.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;
    element.style.opacity = 0;

    setVariants({
      variants: {
        open: {
          top: 0,
          left: "calc(50% - var(--screen-width-1)/2)",
          height: "100%",
          width: "var(--screen-width-1)",
          ...openVariant,
        },
        closed: {
          top: top,
          left: left,
          height,
          width,
          ...closeVariant,
        },
      },
    });
  };

  return { variants, variantsClickHandler, clickedElement };
};

export default useMoveVariants;
