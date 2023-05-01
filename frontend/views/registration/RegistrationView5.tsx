import { Button } from "@hilla/react-components/Button.js";
import { EmailField } from "@hilla/react-components/EmailField.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { Select } from "@hilla/react-components/Select.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import ValidatedCheckbox from "Frontend/components/checkbox/ValidatedCheckbox.js";
import useHillaForm from "Frontend/components/form/HillaFormHook.js";
import RegistrationInfo from "Frontend/generated/com/example/application/endpoints/hookform/RegistrationEndpoint/RegistrationInfo.js";
import { RegistrationEndpoint } from "Frontend/generated/endpoints.js";
import { RegistrationInfoResolver } from "Frontend/tobegenerated/RegistrationInfoResolver.js";

export default function RegistrationView5() {
    const countries = [
        { value: "FI", label: "Finland" },
        { value: "DE", label: "Germany" },
        { value: "US", label: "United States" },
    ];

    const { field, handleSubmit, validate } = useHillaForm<RegistrationInfo>({
        mode: 'all',
        resolver: RegistrationInfoResolver,
    });

    const onSubmit = async (data: RegistrationInfo) => {
        try {
            const result = await validate(RegistrationEndpoint.handleRegistration(data));
            result && Notification.show(result, { theme: "success" });
        } catch (error: any) {
            Notification.show(error.message, { theme: "error" });
        }
    };

    return (
        <VerticalLayout className='p-m'>
            <p>
                This example wraps the endpoint call with the <code>validate</code> function to
                associate server-side validation errors with the corresponding fields. Try using the
                invalid values: "john.doe@example.com" as email and/or "0123456789" as phone number.
            </p>
            <TextField label="Name" required {...field("name")} />
            <EmailField label="Email" required {...field("email")} />
            <TextField label="Phone" {...field("phone")} />
            <Select label="Country" required items={countries} {...field("country")} />
            <ValidatedCheckbox label="I agree to the terms and conditions" {...field("terms")} />
            <Button theme="primary" onClick={handleSubmit(onSubmit)}>Register</Button>
        </VerticalLayout>
    );
}
