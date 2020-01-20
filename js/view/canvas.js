import { selectors } from "../model/selectors";
import asteroid from "../../imgs/asteroid2.png";
import { state } from "../index";

export const canvas = () => {
  const canvasDimensions = selectors.canvas.getBoundingClientRect();
  const ctx = selectors.canvas.getContext("2d");
  let dpi = window.devicePixelRatio;
  let animationRef;
  let imgs = [];

  const createImgsArr = () => {
    if (imgs.length > 0) imgs.splice(0, imgs.length);
    let count = state.data.element_count;
    let newImg;
    while (count > 0) {
      newImg = new Image();
      imgs.push({
        newImg,
        x: count * Math.random() + 100,
        y: count * Math.random() + 100,
        dx: 2,
        dy: -2
      });
      count--;
    }
  };
  //fix image scaling on canvas
  const fixDpi = () => {
    let style = {
      height() {
        return +getComputedStyle(selectors.canvas)
          .getPropertyValue("height")
          .slice(0, -2);
      },
      width() {
        return +getComputedStyle(selectors.canvas)
          .getPropertyValue("width")
          .slice(0, -2);
      }
    };
    selectors.canvas.setAttribute("width", style.width() * dpi);
    selectors.canvas.setAttribute("height", style.height() * dpi);
  };

  const animate = () => {
    handleSvgDisplay();
    fixDpi();
  };

  const handleSvgDisplay = () => {
    ctx.clearRect(0, 0, selectors.canvas.width, selectors.canvas.height);
    imgs.map((img, i) => {
      if (selectors.canvas.getContext) {
        ctx.drawImage(img.newImg, img.x + i, img.y + i);

        if (img.y + img.dy < canvasDimensions.y) {
          img.dy = -img.dy - i;
        }
        if (img.y + img.dy > canvasDimensions.height) {
          img.dy = -img.dy - i;
        }
        if (img.x + img.dx > canvasDimensions.width) {
          img.dx = -img.dx - i;
        }
        if (img.x + img.dx < canvasDimensions.x) {
          img.dx = -img.dx - i;
        }
        img.x += img.dx + i;
        img.y += img.dy + i;

        img.newImg.src = asteroid;
      }
    });
    animationRef = requestAnimationFrame(handleSvgDisplay);
  };
  const clearElementsFromCanvas = () => {
    //clear the canvas on a search
    ctx.clearRect(0, 0, selectors.canvas.width, selectors.canvas.height);
    cancelAnimationFrame(animationRef);
  };
  return [animate, createImgsArr, clearElementsFromCanvas];
};
