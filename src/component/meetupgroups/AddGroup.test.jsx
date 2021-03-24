import { fireEvent, waitFor, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AddGroup from "./AddGroup";
import { addGroup } from "./redux/actions";

jest.mock("./redux/actions", () => ({
  addGroup: jest.fn(),
}));

describe("AddGroup", () => {
  it("should render input", () => {
    const initialState = { meetupGroups: {} };
    const { getByText, getByPlaceholderText } = render(
      <Provider store={configureStore()(initialState)}>
        <AddGroup />
      </Provider>
    );
    expect(getByText("Add new group")).toBeTruthy();
    expect(
      getByText("For example: https://www.meetup.com/Sydney-CoreOS-User-Group/")
    ).toBeTruthy();
    expect(getByPlaceholderText("Enter url")).toBeTruthy();
  });

  it("should render button", () => {
    const initialState = { meetupGroups: {} };
    const { getByText } = render(
      <Provider store={configureStore()(initialState)}>
        <AddGroup />
      </Provider>
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("should show error", () => {
    const initialState = { meetupGroups: { addGroupsError: "error" } };
    const { getByText } = render(
      <Provider store={configureStore()(initialState)}>
        <AddGroup />
      </Provider>
    );
    expect(getByText("error")).toBeTruthy();
  });

  it("should show success message", () => {
    const initialState = { meetupGroups: { addGroupsSuccess: true } };
    const { getByText } = render(
      <Provider store={configureStore()(initialState)}>
        <AddGroup />
      </Provider>
    );
    expect(getByText("Successfully added group.")).toBeTruthy();
  });

  it("should dispatch add group action with entered value", async () => {
    addGroup.mockReturnValue({ type: "TEST_ACTION_TYPE" });
    const initialState = { meetupGroups: { groups: ["group 1"] } };
    const store = configureStore()(initialState);
    const { getByText, getByPlaceholderText, findByText } = render(
      <Provider store={store}>
        <AddGroup />
      </Provider>
    );

    fireEvent.change(getByPlaceholderText("Enter url"), {
      target: { value: "group 2" },
    });
    fireEvent.click(getByText("Submit"));

    expect(addGroup).toHaveBeenCalledWith("group 2", ["group 1"]);
    expect(store.getActions()).toEqual([{ type: "TEST_ACTION_TYPE" }]);
  });
});
