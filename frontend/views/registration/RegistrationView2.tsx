import RegistrationInfo from "Frontend/generated/com/example/application/endpoints/hookform/RegistrationEndpoint/RegistrationInfo.js";
import { RegistrationEndpoint } from "Frontend/generated/endpoints.js";
import { RegistrationInfoResolver } from "Frontend/tobegenerated/RegistrationInfoResolver.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationView2() {
    const [outcome, setOutcome] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<RegistrationInfo>({
        mode: 'all',
        resolver: RegistrationInfoResolver,
    });

    const showMessage = (message: string, error: boolean) => {
        setOutcome((error ? '🔴 ' : '🟢 ') + message);
        setTimeout(() => setOutcome(''), 2000);
    }

    const onSubmit = async (data: RegistrationInfo) => {
        try {
            const result = await RegistrationEndpoint.handleRegistration(data);
            result && showMessage(result, false);
        } catch (error: any) {
            showMessage(error.message, true);
        }
    };

    return (
        <div className="m-l">
            <p>This example adds a generated resolver and shows error messages.</p>
            <div>
                <input type="text" required placeholder="Name*" {...register("name")} />
            </div>
            {errors.name && <div>{errors.name.message}</div>}
            <div>
                <input type="email" required placeholder="Email*" {...register("email")} />
            </div>
            {errors.email && <div>{errors.email.message}</div>}
            <div>
                <input type="tel" placeholder="Phone" {...register("phone")} />
            </div>
            {errors.phone && <div>{errors.phone.message}</div>}
            <div>
                <select required {...register("country")}>
                    <option value="">Country*</option>
                    <option value="FI">Finland</option>
                    <option value="DE">Germany</option>
                    <option value="US">United States</option>
                </select>
            </div>
            {errors.country && <div>{errors.country.message}</div>}
            <div>
                <input id="terms" type="checkbox" required {...register("terms")} />
                <label htmlFor="terms">I agree to the terms and conditions*</label>
            </div>
            {errors.terms && <div>{errors.terms.message}</div>}
            <div>
                <button onClick={handleSubmit(onSubmit)}>Register</button>
            </div>
            <div>
                <p>{outcome}</p>
            </div>
        </div>
    );
}
