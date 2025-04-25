import FormCreator from "./FormCreator/FormCreator";
import FormRenderer from "./FormRenderer/FormRenderer";

const FormBuilder = () => {
  return (
    <div className="min-w-3xs max-w-screen-mlg mx-auto py-16 px-12 md:px-18 md:py-28 ">
      <FormCreator />
      <FormRenderer />
    </div>
  );
};

export default FormBuilder;
