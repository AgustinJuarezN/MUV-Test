import React from "react";
import FilterByDate from "./FilterByDate";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./../../reducers";
import { mount  } from "enzyme";
import {
    KeyboardDatePicker
  } from "@material-ui/pickers";

const initialState =  { 
    promotions: {
        all: null,
        filtered: null
    },
    filtered: false
}

const mockStore = createStore(reducer, initialState);
const mountFilter = () => mount(
    <Provider store={mockStore}>
        <FilterByDate />
    </Provider>
);

describe("FilterByDate component", () => {

  it("should render correctly with mock store", () => {
    const wrapper = mountFilter();
    const filter = wrapper.find("FilterByDate").length;
    expect(filter).toBeTruthy();
    wrapper.unmount();
  });

  it("inputs length == 2", () => {
    const wrapper = mountFilter();
    const input = wrapper.find(KeyboardDatePicker).length;
    expect(input).toBe(2);
    wrapper.unmount();
  });

});