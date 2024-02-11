import { render } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function() {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="Test Carousel"
    />
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="Test Carousel"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});