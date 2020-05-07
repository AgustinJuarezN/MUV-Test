import React from "react";
import SimpleModal from "./Modal";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./../../reducers";
import { mount  } from "enzyme";

const initialState =  { 
    promotions: {
        all: null,
        filtered: null
    },
    filtered: false
}

const mockStore = createStore(reducer, initialState);
const mountModal = () => mount(
    <Provider store={mockStore}>
        <SimpleModal />
    </Provider>
);

describe("Modal component", () => {

  it("should render correctly with mock store", () => {
    const wrapper = mountModal();
    const modal = wrapper.find("SimpleModal").length;
    expect(modal).toBeTruthy();
    wrapper.unmount();
  });

});