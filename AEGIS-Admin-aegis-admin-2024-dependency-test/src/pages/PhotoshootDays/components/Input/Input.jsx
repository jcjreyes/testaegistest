import { FormElement, FormLabel, FormInput, SpanHeight } from './styles';

const Input = ({label, required, name, value, errors, touched, type, placeholder, handleChange, handleBlur, className}) => (
    <FormElement>
        <FormLabel>
            {label} {required ? <span>*</span> : null}
        </FormLabel>
        <FormInput
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            // onFocus={inputHighlight}
            onChange={handleChange}
            // onBlur={e => {handleBlur(e); setInputFocused(false)}}
            onBlur={handleBlur}
            value={value}
            error={!!(errors && touched)}
            className={className}
        />
    </FormElement>
)

export default Input;