import { Checkbox } from '@hilla/react-components/Checkbox.js';
import { ComponentProps, Ref, forwardRef } from 'react';

type CheckboxFieldProps = Omit<ComponentProps<typeof Checkbox>, 'onCheckedChanged'> & {
    onChange?: (e: CustomEvent<any>) => void;
    invalid?: boolean | undefined;
    errorMessage?: string | undefined;
};

const ValidatedCheckbox = forwardRef((
    { invalid, errorMessage, onChange, ...checkboxProps }: CheckboxFieldProps,
    //@ts-ignore
    ref: Ref<Checkbox> | undefined
) => (
    <div>
        <Checkbox {...checkboxProps} ref={ref} onCheckedChanged={onChange} />
        {invalid && <div>{errorMessage}</div>}
    </div>
));

export default ValidatedCheckbox;
