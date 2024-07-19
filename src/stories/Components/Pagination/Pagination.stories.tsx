import { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";
import { useState } from "react";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

type PaginationProps = {
  numberOfPages: number;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
};

const PaginationWithHooks = (args: PaginationProps) => {
  const [activePage, setActivePage] = useState(args.activePage);
  const onPageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };
  return (
    <Pagination
      activePage={activePage}
      onPageChange={onPageChange}
      numberOfPages={args.numberOfPages}
    />
  );
};

export const Default: Story = {
  name: "This one works, but the code should be `<Pagination>` instead of `<PaginationWithHooks>` *",
  args: {
    numberOfPages: 12,
    activePage: 1,
  },
  render: (args) => <PaginationWithHooks {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const previousPageButton = canvas.getByRole("button", { name: "Previous" });
    expect(previousPageButton).toBeDisabled();

    const nextPageButton = canvas.getByRole("button", { name: "Next" });
    expect(nextPageButton).toBeEnabled();

    await userEvent.click(nextPageButton);

    const page2Button = canvas.getByRole("button", { name: "2" });
    expect(page2Button).toHaveClass("border-detroitblue-500");

    const getPaginationButtons = canvas.getAllByRole("button", {
      name: /\d{1,}/,
    });

    await userEvent.click(getPaginationButtons.at(-1) as HTMLElement);
    expect(nextPageButton).toBeDisabled();
    expect(previousPageButton).toBeEnabled();
  },
};

export const Code: Story = {
  args: {
    numberOfPages: 7,
    activePage: 4,
  },
  render: (args) => <Pagination {...args} />,
};
