import React from "react";
import { shallow, mount } from "enzyme";
import { currencies } from "../../../data/currencies";
import Select from "../Select";
import Enzyme from "enzyme";

describe("Select", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Select values={currencies} />).debug();
    expect(component).toMatchSnapshot();
  });

  it("sets label width", () => {
    let wrapper;
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation(init => [init, setState]);

    beforeEach(() => {
      wrapper = Enzyme.shallow(<Select />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
    expect(wrapper.name()).toBe(1);
  });
});
