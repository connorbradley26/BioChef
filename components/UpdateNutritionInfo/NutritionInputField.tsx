import { Field } from "formik"

interface NutritionInputFieldProps {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    unit: string;
}

const NutritionInputField = ({ name, type, placeholder, label, unit } : NutritionInputFieldProps) => {

    return (
        <div className="form-control">
        <label className="label">
            <span className="label-text">
                {label}
            </span>
        </label>
        <label className="input-group">
            <Field
                type={type}
                placeholder={placeholder}
                className="input-bordered input"
                name={name}
            />
            <span>{unit}</span>
        </label>
    </div>
    )

}

export default NutritionInputField