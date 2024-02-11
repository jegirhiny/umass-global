import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function() {
  render(
    <Card
      caption="Test caption"
      src="test.jpg"
      currNum={1}
      totalNum={2}
    />
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <Card
      caption="Test caption"
      src="test.jpg"
      currNum={1}
      totalNum={2}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});