import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeAll, vi } from "vitest";
import FormCreator from "../FormCreator";
import { FormCreatorTestId, FormItemType } from "@/types/form";
import ResizeObserver from "resize-observer-polyfill";

global.ResizeObserver = ResizeObserver; // for shadcn/ui

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("FormCreator", () => {
  it("Ensure Component is rendered", () => {
    render(<FormCreator />);

    expect(screen.getByTestId(FormCreatorTestId.header)).toBeInTheDocument();
    expect(screen.getByTestId(FormCreatorTestId.comboBox)).toBeInTheDocument();
    expect(screen.getByTestId(FormCreatorTestId.label)).toBeInTheDocument();
    expect(screen.getByTestId(FormCreatorTestId.submit)).toBeInTheDocument();
  });

  describe("Verify that FormItemConfigurator updates and renders properly when a type is selected in NewItemTypeSelector", () => {
    it("formItem: input", async () => {
      render(<FormCreator />);

      const addButton = screen.getByTestId(FormCreatorTestId.comboBox);
      fireEvent.click(addButton);

      const textTypeButton = screen.getByTestId(FormItemType.input);
      fireEvent.click(textTypeButton);

      const metas = ["placeholder", "required", "maxLength", "minLength"];
      metas.forEach(async (meta) => {
        expect(await screen.findByLabelText(`/${meta}/i`)).toBeInTheDocument();
      });
    });

    it("formItem: numberInput", async () => {
      render(<FormCreator />);

      const addButton = screen.getByTestId(FormCreatorTestId.comboBox);
      fireEvent.click(addButton);

      const textTypeButton = screen.getByTestId(FormItemType.numberInput);
      fireEvent.click(textTypeButton);

      const metas = ["min", "required", "max"];
      metas.forEach(async (meta) => {
        expect(await screen.findByLabelText(`/${meta}/i`)).toBeInTheDocument();
      });
    });
    it("formItem: textArea", async () => {
      render(<FormCreator />);

      const addButton = screen.getByTestId(FormCreatorTestId.comboBox);
      fireEvent.click(addButton);

      const textTypeButton = screen.getByTestId(FormItemType.textArea);
      fireEvent.click(textTypeButton);

      const metas = ["placeholder", "required", "maxLength", "minLength"];
      metas.forEach(async (meta) => {
        expect(await screen.findByLabelText(`/${meta}/i`)).toBeInTheDocument();
      });
    });
    it("formItem: checkBox", async () => {
      render(<FormCreator />);

      const addButton = screen.getByTestId(FormCreatorTestId.comboBox);
      fireEvent.click(addButton);

      const textTypeButton = screen.getByTestId(FormItemType.checkBox);
      fireEvent.click(textTypeButton);

      const metas = ["defaultChecked", "required"];
      metas.forEach(async (meta) => {
        expect(await screen.findByLabelText(`/${meta}/i`)).toBeInTheDocument();
      });
    });
  });
});
