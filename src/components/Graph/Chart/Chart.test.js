import React from "react";
import { shallow, mount } from "enzyme";
import Chart from "./Chart";
describe("Chart", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Chart />).debug();
    expect(component).toMatchSnapshot();
  });

  it("updates when history rate differs", () => {
    const component = mount(<Chart />);
  });
});
