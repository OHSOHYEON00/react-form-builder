import FormItemCreator from "./FormItemCreator/FormItemCreator";
import FormRenderer from "./FormRenderer/FormRenderer";

const FormBuilder = () => {
  return (
    <div className="min-w-3xs max-w-screen-mlg mx-auto py-16 px-12 md:px-18 md:py-28 ">
      <FormItemCreator />
      <FormRenderer />
    </div>
  );
};

export default FormBuilder;
