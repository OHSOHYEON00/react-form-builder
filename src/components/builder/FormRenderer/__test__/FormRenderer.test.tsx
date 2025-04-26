import { describe, expect, it, vi } from "vitest";
import FormRenderer from "../FormRenderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormField } from "@/types/form";
import ResizeObserver from "resize-observer-polyfill";
import { fireEvent } from "@testing-library/react";

global.ResizeObserver = ResizeObserver; // for shadcn/ui

const mockFields: FormField[] = [
  {
    id: "username",
    label: "id",
    formItem: "input",
    value: "",
    name: "username",
    meta: {
      required: true,
      placeholder: "Enter your username",
      maxLength: 20,
    } as FormField["meta"],
  },
  {
    id: "password",
    label: "Password",
    formItem: "input",
    value: "",
    name: "password",
    meta: {
      required: true,
      minLength: 6,
    } as FormField["meta"],
  },
  {
    id: "acceptTerms",
    label: "Accept Terms",
    formItem: "checkBox",
    value: undefined,
    name: "acceptTerms",
    meta: {
      required: true,
      defaultChecked: false,
    } as FormField["meta"],
  },
  {
    id: "age",
    label: "Age",
    formItem: "numberInput",
    value: "",
    name: "age",
    meta: {
      required: true,
      min: 18,
      max: 100,
    } as FormField["meta"],
  },
  {
    id: "description",
    label: "Description",
    formItem: "textArea",
    value: "",
    name: "description",
    meta: {
      maxLength: 200,
    } as FormField["meta"],
  },
];

const getByTestId = (item: FormField): string =>
  `${item.label}-${item.formItem}`;

describe("Rendering after getting field", () => {
  it("Rendering after getting field", () => {
    render(<FormRenderer items={mockFields} onSubmit={() => {}} />);

    // check if labels print correctly
    for (const item of mockFields) {
      expect(screen.getByTestId(getByTestId(item))).toBeInTheDocument();
    }
  });
});

describe("FormRenderer", () => {
  it("User can put values on the fields", async () => {
    render(<FormRenderer items={mockFields} onSubmit={() => {}} />);

    for (const item of mockFields) {
      const element = screen.getByTestId(getByTestId(item));

      if (item.formItem === "input" || item.formItem === "textArea") {
        await userEvent.type(
          element,
          item.label === "id" ? "tester123" : "password123"
        );

        expect(element).toHaveValue(
          item.label === "id" ? "tester123" : "password123"
        );
      } else if (item.formItem === "checkBox") {
        fireEvent.click(element);
        expect(element).toBeChecked();
      } else if (item.formItem === "numberInput") {
        await userEvent.type(element, "50");

        expect(element).toHaveValue(50);
      }
    }
  });

  it("When the form is submitted, onSubmit() should be called", async () => {
    const handleSubmit = vi.fn();
    render(<FormRenderer items={mockFields} onSubmit={handleSubmit} />);

    for (const item of mockFields) {
      const element = screen.getByTestId(getByTestId(item));

      if (item.formItem === "input" || item.formItem === "textArea") {
        await userEvent.type(
          element,
          item.label === "id" ? "tester123" : "password123"
        );
      } else if (item.formItem === "checkBox") {
        fireEvent.click(element);
      } else if (item.formItem === "numberInput") {
        await userEvent.type(element, "50");
      }
    }

    const submitButton = screen.getByRole("button", {
      name: /RendererSubmitButton/i,
    });
    expect(submitButton).not.toBeDisabled();
    await userEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
