# React-form-builder

# Project Overview
A **Form Builder** where users can dynamically create forms - add and remove fields, set validation rules, and reorder fields via drag-and-drop -.

> **Main Features**  
> - Add / Remove form fields  
> - Configure field validations (e.g., required, min, max)  
> - Reorder fields with **drag and drop** (using `dnd-kit`)  
> - Live preview of the generated form  
> - Test coverage for key components

# Getting Started
This project is built with **React**, **Vite**, and **TypeScript**.

### Installation

```bash
# Install dependencies
yarn install
```

### Running the Project
```bash
yarn dev
```

### Running Tests
```bash
yarn test
```

# 📚 Tech Stack

### Frontend
- **React**  
  Used for building a declarative, component-based UI structure.
- **Vite**  
  Chosen for its fast development server and efficient bundling performance.
- **TypeScript**  
  Adopted to ensure safer, more predictable code through static type checking.

### Styling
- **TailwindCSS**  
  Utilized for rapid, utility-first styling with a consistent design system.
- **shadcn/ui**  
  Used as a component library to speed up UI development.  
  Chosen because it matches the company's tech stack requirements and provides high-quality, accessible components built on top of Radix UI and TailwindCSS.

### Form Handling
`shadcn/ui` provides form UI components that integrate well with external validation libraries like react-hook-form and zod, which led to their selection.
- **React Hook Form**  
  Selected for lightweight, performant form state management with minimal re-renders.
- **Zod**  
  Used for runtime validation and schema-based form validation.

### Drag & Drop
- **dnd-kit**  
  Chosen for flexible, accessible, and customizable drag-and-drop interactions.

### State Management
- **Zustand**  
  Adopted for simple, scalable global state management without boilerplate.

### Testing
- **Vitest**  
  Used for fast, modern unit and integration testing with a Vite-native experience.
- **@testing-library/react**  
  Chosen for testing React components based on user interactions and accessibility.
- **@testing-library/jest-dom**  
  Provides custom matchers to improve the readability of tests.


# Key Focus During Development

## Goals
The project was built with **scalability** and **maintainability** in mind.  
Since the form builder should easily support *new types of form fields* in the future, the structure needed to minimize code changes when extending.

> **Goal**:  
> Add new fields by simply defining the type, component, and validation — without modifying the core logic.

- Developers can **add new features faster** 
- The system will be **resilient to changes**
- Confidence is maintained through **strong test coverage**

## Component Structure
[Untitled.pdf](https://github.com/user-attachments/files/19931779/Untitled.pdf)

## Principles
- **Single Responsibility Principle (SRP)**  
  Each component focuses on *one clear purpose* to keep the code clean and understandable.
- **Centralized State Management**  
  Form data is managed through a *global store* to maintain consistency and simplify data flow.


## Testing Strategy
To ensure the system remains stable and extensible, I wrote tests focusing on:
- Correct rendering of dynamic form components
- Validation behavior for both built-in and user-added form fields (required, min, mix, ....)


# Folder Structure
```
react-form-builder/
├── src/
│   ├── components/
│   │   ├── builder/
│   │   │   ├── FormBuilder.tsx                 
│   │   │   ├── FormRenderer/
│   │   │   │   ├── FormRenderer.tsx           # Renders a form based on schema/config.
│   │   │   │   ├── FormRendererContainer.tsx  # Container is used to manage the form rendering state.
│   │   │   │   └── __test__/
│   │   │   │       └── FormRenderer.test.tsx  # Tests for form rendering logic/UI.
│   │   │   ├── FormCreator/
│   │   │   │   ├── FormCreator.tsx            # UI and logic for creating new forms.
│   │   │   │   ├── CreateConfigs/
│   │   │   │   │   ├── NewItemLabelInput.tsx      # Input for new form item labels.
│   │   │   │   │   ├── FormItemConfigurator.tsx   # Configures properties of form items.
│   │   │   │   │   └── NewItemTypeSelector.tsx    # Selects type for new form items.
│   │   │   │   └── __test__/
│   │   │   │       └── FormCreator.test.tsx   # Tests for form creation logic/UI.
│   │   │   └── common/
│   │   │       ├── BaseFormItemUI.tsx         # Base UI for form items, shared logic.
│   │   │       ├── DndContainer.tsx           # Drag-and-drop container for reordering.
│   │   │       ├── SortableItemContainer.tsx  # Controls form field item could be sortable/grabbable.
│   │   │       └── ItemRenderer.tsx           # Renders individual form items.
│   │   ├── store/
│   │   │   ├── useFormBuilderStore.ts         # State management for form builder.
│   │   │   └── __test__/
│   │   │       └── usrFormBuilderStore.test.ts # Tests for form builder store logic.
│   │   └── ui/
│   │       └── [various UI components]        # Shared UI elements (button, input, dialog, etc).
│   ├── config/
│   │   ├── meta/
│   │   │   ├── meta.ts                        # Metadata configuration and validation schema for form items.
│   │   │   └── __test__/
│   │   │       └── meta.test.ts               # Tests for meta configuration logic.
│   │   └── form/
│   │       ├── creator/
│   │       │   ├── formCreator.ts             # Schema/config for form creator part.
│   │       │   └── __test__/
│   │       │       ├── FormCreatorSchema.test.ts   # Tests for form creator schema.
│   │       │       └── validationMap.test.ts       # Tests for validation mapping logic.
│   │       └── renderer/
│   │           ├── formRender.ts               # Schema/config for form renderer part.
│   │           └── __test__/
│   │               ├── generateDynamicSchema.test.ts   # Tests for dynamic schema generation.
│   │               └── normalizeFormData.test.ts       # Tests for form data normalization.
│   ├── lib/
│   │   └── utils.ts                            # Utility functions used across the app.
│   ├── types/
│   │   ├── form.ts                             # Type definitions for form structure.
│   │   └── meta.ts                             # Type definitions for metadata.
│   ├── setupTests.ts                           # Test setup file for the project.
│   ├── App.tsx                                 # Main React app entry point.
│   ├── main.tsx                                # ReactDOM render and app bootstrap.
│   └── index.css                               # Global styles.
```
