import App from "../App";
import React from "react";
import { shallow } from "enzyme";

it("Renders App", () => {
  const wrapper = shallow(<App />).debug();
  expect(wrapper).toMatchSnapshot();
});
