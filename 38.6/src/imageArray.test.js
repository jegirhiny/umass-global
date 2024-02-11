import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("hides respective arrow on first and last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});