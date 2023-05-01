import RegistrationInfo from "Frontend/generated/com/example/application/endpoints/hookform/RegistrationEndpoint/RegistrationInfo.js";
import { RegistrationEndpoint } from "Frontend/generated/endpoints.js";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegistrationView1() {
    const [outcome, setOutcome] = useState('');

    // Using `useForm<RegistrationInfo>` instead of just `useForm` makes the hook aware
    // of the type and thus there are no "magic" strings involved here.
    const { register, handleSubmit } = useForm<RegistrationInfo>({
        mode: 'all',
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
            <p>This example uses HTML input fields and React Hook Form.</p>
            <div>
                <input type="text" required placeholder="Name*" {...register("name")} />
            </div>
            <div>
                <input type="email" required placeholder="Email*" {...register("email")} />
            </div>
            <div>
                <input type="tel" placeholder="Phone" {...register("phone")} />
            </div>
            <div>
                <select required {...register("country")}>
                    <option value="">Country*</option>
                    <option value="FI">Finland</option>
                    <option value="DE">Germany</option>
                    <option value="US">United States</option>
                </select>
            </div>
            <div>
                <input id="terms" type="checkbox" required {...register("terms")} />
                <label htmlFor="terms">I agree to the terms and conditions*</label>
            </div>
            <div>
                <button onClick={handleSubmit(onSubmit)}>Register</button>
            </div>
            <div>
                <p>{outcome}</p>
            </div>
        </div>
    );
}
