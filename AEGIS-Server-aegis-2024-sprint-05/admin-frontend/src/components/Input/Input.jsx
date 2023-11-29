import { FormElement, FormLabel, FormInput, SpanHeight } from './styles';
import { useField } from "formik";

const Input = ({label, required, error, forceUseMeta, ...props }) => {
    const [field, meta, helpers] = useField(props)
    return (
        <FormElement>
            <FormLabel>
                {label} {required ? <span>*</span> : null}
            </FormLabel>
            <FormInput {...props} {...field} />
            <SpanHeight>
                {meta.touched && meta.error && required ? (
                    <span className="error">
                        {forceUseMeta ? meta.error : error === undefined || error === null 
                            ? 'This is a required field'
                            : error}
                    </span>
                ): null}
            </SpanHeight>
        </FormElement>
    )
}

export default Input;