import { Button } from "@hilla/react-components/Button.js";
import { Checkbox } from "@hilla/react-components/Checkbox.js";
import { EmailField } from "@hilla/react-components/EmailField.js";
import { Notification } from "@hilla/react-components/Notification.js";
import { Select } from "@hilla/react-components/Select.js";
import { TextField } from "@hilla/react-components/TextField.js";
import { VerticalLayout } from "@hilla/react-components/VerticalLayout.js";
import RegistrationInfo from "Frontend/generated/com/example/application/endpoints/hookform/RegistrationEndpoint/RegistrationInfo.js";
import { RegistrationEndpoint } from "Frontend/generated/endpoints.js";
import { RegistrationInfoResolver } from "Frontend/tobegenerated/RegistrationInfoResolver.js";
import { useForm } from "react-hook-form";

export default function RegistrationView3() {
    const countries = [
        { value: "FI", label: "Finland" },
        { value: "DE", label: "Germany" },
        { value: "US", label: "United States" },
    ];

    const { register, handleSubmit } = useForm<RegistrationInfo>({
        mode: 'all',
        resolver: RegistrationInfoResolver,
    });

    const onSubmit = async (data: RegistrationInfo) => {
        try {
            const result = await RegistrationEndpoint.handleRegistration(data);
            result && Notification.show(result, { theme: "success" });
        } catch (error: any) {
            Notification.show(error.message, { theme: "error" });
        }
    };

    return (
        <VerticalLayout className='p-m'>
            <p>
                This example uses Vaadin Components. Validation messages are not visible as the needed
                attributes are not set.
            </p>
            <TextField label="Name" required {...register("name")} />
            <EmailField label="Email" required {...register("email")} />
            <TextField label="Phone" {...register("phone")} />
            <Select label="Country" required items={countries} {...register("country")} />
            <Checkbox label="I agree to the terms and conditions" {...register("terms")} />
            <Button theme="primary" onClick={handleSubmit(onSubmit)}>Register</Button>
        </VerticalLayout>
    );
}
