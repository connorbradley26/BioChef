import { RouterInputs, api } from "@/lib/api";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import NutritionInputField from "./NutritionInputField";
import { useRouter } from "next/router";
type FormValues =
    RouterInputs["userNutritionalStats"]["saveUserNutritionalStats"];


export default function NutritionInfoUpdateForm() {
    const saveUserMutation =
        api.userNutritionalStats.saveUserNutritionalStats.useMutation();
    const session = useSession();
    const router = useRouter();

    if (session.data == null) {
        return <div>Not authenticated</div>;
    }

    const initialValues: FormValues = {
        userId: session.data.user.id,
    };

    const save = async (values: FormValues) => {
        await saveUserMutation.mutateAsync({
            ...values,
            userId: session.data.user.id,
        });
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validate={(values) => {
                    const errors = {};
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    await save(values);
                    setSubmitting(false);
                    
                    router.push("/nutritional-information");
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        {isSubmitting ? (
                            <div>Submitting...</div>
                        ) : (
                            <>
                                <div className="p-4 mx-4 my-10 shadow rounded-box bg-base-200">
                                    {/* Basic stuff */}
                                    <h1 className="text-3xl font-bold">
                                        Basic Information
                                    </h1>
                                    <div className="grid grid-cols-1 gap-6 md:m-10 md:grid-cols-2 lg:grid-cols-3">
                                        {/* Weight */}
                                        <NutritionInputField name="weight" type="number" placeholder="200" unit="lbs" label="Weight" />
                                        {/* Height */}
                                        <NutritionInputField name="height" type="number" placeholder="182" unit="cm" label="Height" />
                                        {/* Age */}
                                        <NutritionInputField name="age" type="number" placeholder="30" unit="Years" label="Age" />
                                        {/* Resting Heart Rate */}
                                        <NutritionInputField name="restingHeartRate" type="number" placeholder="70" unit="BPM" label="Resting Heart Rate" />
                                    </div>
                                </div>

                                <div className="p-4 mx-4 shadow rounded-box bg-base-200">
                                    <h1 className="text-3xl font-bold">
                                        Detailed Information
                                    </h1>
                                    <div className="grid grid-cols-1 gap-6 m-10 md:grid-cols-2 lg:grid-cols-3">
                                        {/* Cholesterol */}
                                        <NutritionInputField name="cholesterol" type="text" placeholder="120/58" unit="mg/dL" label="Cholesterol" />
                                        {/* Body Fat Percentage */}
                                        <NutritionInputField name="bodyFatPercentage" type="number" placeholder="20" unit="%" label="Body Fat Percentage" />
                                        {/* Vitamin D */}
                                        <NutritionInputField name="vitaminD" type="number" placeholder="20" unit="mcg" label="Vitamin D" />
                                        {/* Vitamin B12 */}
                                        <NutritionInputField name="vitaminB12" type="number" placeholder="20" unit="mcg" label="Vitamin B12" />
                                        {/* Vitamin B6 */}
                                        <NutritionInputField name="vitaminB6" type="number" placeholder="20" unit="mcg" label="Vitamin B6" />
                                        {/* Vitamin C */}
                                        <NutritionInputField name="vitaminC" type="number" placeholder="20" unit="mcg" label="Vitamin C" />
                                        {/* Testosterone */}
                                        <NutritionInputField name="testosterone" type="number" placeholder="20" unit="mcg" label="Testosterone" />
                                        {/* HbA1c */}
                                        <NutritionInputField name="hbA1c" type="number" placeholder="20" unit="%" label="HbA1c" />
                                    </div>
                                </div>
                                <div
                                    className="fixed rounded-full tooltip bottom-3 right-3 "
                                    data-tip="Save">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="shadow-2xl btn-primary btn">
                                        <FontAwesomeIcon
                                            icon={faFloppyDisk}
                                            className="text-3xl "
                                        />
                                    </button>
                                </div>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
}
