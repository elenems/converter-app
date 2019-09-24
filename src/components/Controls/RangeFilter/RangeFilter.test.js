import React from "react";
import { shallow } from "enzyme";
import RangeFilter from "./RangeFilter";

describe("RangeFilter", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<RangeFilter />).debug();
    expect(component).toMatchSnapshot();
  });

  it("changes date range", () => {
    const wrapper = shallow(<RangeFilter historyChange={() => {}} />);
    expect(
      wrapper
        .find("PickerWithState")
        .at(0)
        .simulate("change")
    );
  });
});
