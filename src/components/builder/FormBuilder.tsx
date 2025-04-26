import FormCreator from "./FormCreator/FormCreator";
import FormRendererContainer from "./FormRenderer/FormRendererContainer";

const FormBuilder = () => {
  return (
    <div className="min-w-3xs max-w-screen-mlg mx-auto py-16 px-12 md:px-18 md:py-28 ">
      <FormCreator />
      <FormRendererContainer />
    </div>
  );
};

export default FormBuilder;
