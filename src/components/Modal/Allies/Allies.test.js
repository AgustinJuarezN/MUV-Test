import React from "react";
import Allies from "./Allies";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ToastsStore } from 'react-toasts';
import reducer from "./../../../reducers";
import { mount  } from "enzyme";

const initialState =  { 
    ally: {
        allies: [
            {
                "businessName" : "Cervepar",
                "contact" : "Juan",
                "phone" : "2341235662",
                "ruc" : "1212121212",
                "address" : "Pepe 123 Esq Juan",
                "mail" : [
                    "hi@Cervepar.com", "bye@Cervepar.com"
                ],
                "percentage" : 30
            }
        ]
    }
}

const mockStore = createStore(reducer, initialState);
const mountAllies = () => mount(
    <Provider store={mockStore}>
        <Allies />
    </Provider>
);

describe("Allies component", () => {

    it("should render correctly with mock store", () => {
        const wrapper = mountAllies();
        const allies = wrapper.find("Allies").length;
        expect(allies).toBeTruthy();
        wrapper.unmount();
      });

    it("create ally", () => {
        const wrapper = mountAllies();
        const toastSpy = jest.spyOn(ToastsStore, 'success');

        const addAlly = wrapper.find('.addAlly');
        addAlly.simulate('click');

        const businessName = wrapper.find('input[name="businessName"]');
        const contact = wrapper.find('input[name="contact"]');
        const phone = wrapper.find('input[name="phone"]');
        const ruc = wrapper.find('input[name="ruc"]');
        const address = wrapper.find('input[name="address"]');
        const email = wrapper.find('.input');

        businessName.simulate('change', { target: { value: 'Test' } });
        contact.simulate('change', { target: { value: '12121221' } });
        phone.simulate('change', { target: { value: '12212121' } });
        ruc.simulate('change', { target: { value: '121212121' } });
        address.simulate('change', { target: { value: 'test1' } });
        email.simulate('change', { target: { value: 'Test@hotmail.com' } });

        email.simulate('keypress', {key: 'Enter'});

        addAlly.simulate('click');

        setTimeout(() => {
            expect(toastSpy).toHaveBeenCalledTimes(1);
            wrapper.unmount();
        });
    })
});