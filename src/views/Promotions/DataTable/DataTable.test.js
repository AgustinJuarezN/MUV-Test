import React from "react";
import EnhancedTable from "./DataTable";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from "./../../../reducers";
import { mount  } from "enzyme";
import EnhancedTableTopPagination from "./TableTopPagination/TableTopPagination";
import EnhancedTableBottomPagination from "./TableBottomPagination/TableBottomPagination";
import EnhancedTableHead from "./TableHead/TableHead";

const initialState =  { 
    promotions: {
        all: null,
        filtered: null
    },
    filtered: false
}

const mockStore = createStore(reducer, initialState);
const mountTable = () => mount(
    <Provider store={mockStore}>
        <EnhancedTable />
    </Provider>
);

describe("EnhancedTable component", () => {

  it("should render correctly with mock store", () => {
    const wrapper = mountTable();
    const table = wrapper.find("EnhancedTable").length;
    expect(table).toBeTruthy();
    wrapper.unmount();
  });

  it("EnhancedTableTopPagination mounted", () => {
    const wrapper = mountTable();
    const topNavigation = wrapper.find(EnhancedTableTopPagination).length;
    expect(topNavigation).toBeTruthy();
    wrapper.unmount();
  });

  it("EnhancedTableHead mounted", () => {
    const wrapper = mountTable();
    const tableHead= wrapper.find(EnhancedTableHead).length;
    expect(tableHead).toBeTruthy();
    wrapper.unmount();
  });

  it("EnhancedTableBottomPagination mounted", () => {
    const wrapper = mountTable();
    const bottomPagination = wrapper.find(EnhancedTableBottomPagination).length;
    expect(bottomPagination).toBeTruthy();
    wrapper.unmount();
  });

});
