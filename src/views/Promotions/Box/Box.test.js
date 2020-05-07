import React from "react";
import Box from "./Box";
import Skeleton from "@material-ui/lab/Skeleton";

import { mount } from "enzyme";

const validProps = {
    title: 'title',
    number: 1,
    color: 'green',
    active: true
}

const mountBox = (props = validProps) => {
    return mount(<Box title={props.title} number={props.number} color={props.color} active={props.active}/>);
};

describe("Box component", () => {

  it("should render correctly with props", () => {
    const wrapper = mountBox();
    const box = wrapper.find("Box").length;
    expect(box).toBeTruthy();
    wrapper.unmount();
  });

  it("should render skeleton component with no props passed", () => {
    const wrapper = mount(<Box title="title" color="green" active={true} number={null}/>);
    const skeleton = wrapper.find(Skeleton).length;
    expect(skeleton).toBeTruthy();
    wrapper.unmount();
  });

  it("props validation", () => {
    const wrapper = mount(<Box title="title" color="green" active={true} number={1} />);
    expect(wrapper.props().color).toBe('green');
    expect(wrapper.props().title).toBe('title');
    expect(wrapper.props().active).toBe(true);
    expect(wrapper.props().number).toBe(1);
  });
});
