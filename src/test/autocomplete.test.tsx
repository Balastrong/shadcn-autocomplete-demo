import { AutoComplete } from "@/components/autocomplete";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockItems = [
  { value: "1", label: "Item 1" },
  { value: "2", label: "Item 2" },
];

type Props = Parameters<typeof AutoComplete>[0];

const defaultProps = {
  selectedValue: "",
  onSelectedValueChange: vi.fn(),
  searchValue: "",
  onSearchValueChange: vi.fn(),
  items: mockItems,
  isLoading: false,
  emptyMessage: "No items.",
  placeholder: "Search...",
} as Props;

describe("AutoComplete Component", () => {
  it("should render the input field with the correct placeholder", () => {
    render(<AutoComplete {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should call onSearchValueChange when typing in the input", () => {
    const onSearchValueChange = vi.fn();
    render(
      <AutoComplete
        {...defaultProps}
        onSearchValueChange={onSearchValueChange}
      />
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Item" } });

    expect(onSearchValueChange).toHaveBeenCalledWith("Item");
  });

  it("should call onSelectedValueChange when an item is selected", () => {
    const onSelectedValueChange = vi.fn();
    render(
      <AutoComplete
        {...defaultProps}
        onSelectedValueChange={onSelectedValueChange}
      />
    );
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.focus(input);

    const item = screen.getByText("Item 1");
    fireEvent.mouseDown(item);
    fireEvent.click(item);

    expect(onSelectedValueChange).toHaveBeenCalledWith("1");
  });

  it("should clear the selected value when the selected item is clicked again", () => {
    const onSelectedValueChange = vi.fn();
    const onSearchValueChange = vi.fn();
    render(
      <AutoComplete
        {...defaultProps}
        selectedValue="1"
        onSearchValueChange={onSearchValueChange}
        onSelectedValueChange={onSelectedValueChange}
      />
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.focus(input);

    const item = screen.getByText("Item 1");
    fireEvent.click(item);

    expect(onSelectedValueChange).toHaveBeenCalledWith("");
    expect(onSearchValueChange).toHaveBeenCalledWith("");
  });

  it("should clear the selected value on blur if the search value is different from the selected item", () => {
    const onSelectedValueChange = vi.fn();
    const onSearchValueChange = vi.fn();
    const { rerender } = render(
      <AutoComplete
        {...defaultProps}
        selectedValue={"1"}
        searchValue={"Item 1"}
        onSelectedValueChange={onSelectedValueChange}
        onSearchValueChange={onSearchValueChange}
      />
    );

    const input = screen.getByPlaceholderText("Search...");
    expect(screen.queryByDisplayValue("Item 1")).toBeInTheDocument();

    rerender(
      <AutoComplete
        {...defaultProps}
        selectedValue={"1"}
        searchValue={"foo bar baz"}
        onSelectedValueChange={onSelectedValueChange}
        onSearchValueChange={onSearchValueChange}
      />
    );

    fireEvent.blur(input);

    expect(onSelectedValueChange).toHaveBeenCalledWith("");
    expect(onSearchValueChange).toHaveBeenCalledWith("");
  });

  it("should not clear the selected value on blur if the search value is the same as the selected item", () => {
    const onSelectedValueChange = vi.fn();
    const onSearchValueChange = vi.fn();
    render(
      <AutoComplete
        {...defaultProps}
        selectedValue={"1"}
        searchValue={"Item 1"}
        onSelectedValueChange={onSelectedValueChange}
        onSearchValueChange={onSearchValueChange}
      />
    );

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.blur(input);

    expect(onSelectedValueChange).not.toHaveBeenCalled();
    expect(onSearchValueChange).not.toHaveBeenCalled();
  });

  it("should display the skeleton when loading and open", () => {
    render(<AutoComplete {...defaultProps} isLoading />);

    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.focus(input);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("should display the empty message when there are no items and open", () => {
    render(<AutoComplete {...defaultProps} items={[]} />);
    expect(screen.queryByText("No items.")).not.toBeInTheDocument();

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.focus(input);

    expect(screen.getByText("No items.")).toBeInTheDocument();
  });
});
