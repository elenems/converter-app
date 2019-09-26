import React from "react";
import { shallow, mount } from "enzyme";
import Chart from "./Chart";

describe("Chart", () => {
  beforeAll(() => {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'myChart');
    document.body.appendChild(canvas);
  });
  
  afterAll(() => {
    const canvas = document.getElementById('myChart');
    if (canvas) {
      document.body.removeChild(canvas);
    }
  });

  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Chart />).debug();
    expect(component).toMatchSnapshot();
  });

  it("mounts component", () => {
    const wrapper = shallow(<Chart />);
    const call = jest.spyOn(wrapper.instance(), "componentDidMount");
    wrapper.instance().componentDidMount();
    expect(call).toHaveBeenCalled();
  });

  it("updates component", () => {
    const wrapper = shallow(<Chart historyRates={{}} />);
    const nextProps = {};
    const call = jest.spyOn(wrapper.instance(), "shouldComponentUpdate");
    wrapper.instance().shouldComponentUpdate(nextProps);
    expect(call).toHaveBeenCalled();
  });

  it("not update on same props", () => {
    const props = {
      historyRates: {}
    };
    const wrapper = shallow(<Chart {...props} />);
    const call = jest.spyOn(wrapper.instance(), "shouldComponentUpdate");
    const result = wrapper.instance().shouldComponentUpdate(props);
    expect(call).toHaveReturnedWith(false);
  });

  it("components updates", () => {
    const props = { historyRates: [] };
    const nextProps = {historyRates: [1]}
    const wrapper = mount(<Chart {...props} />, {attachTo: document.getElementById('myChart')});
    const fn = jest.spyOn(wrapper.instance(),'componentDidUpdate');
    wrapper.setProps(nextProps);
    expect(fn).toHaveBeenCalled()
  });
});
