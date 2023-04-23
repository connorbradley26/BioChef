import { RouterInputs, api } from "@/lib/api";
import { NextPageWithLayout } from "@/pages/_app";
import RootLayout from "@/pages/layout";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
type FormValues = RouterInputs["meals"]["getMealsByComplexQuery"];


// TODO - refactor to remove duplicate code, moving input fields to component
const IndividualMeal: NextPageWithLayout = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const { type, day } = router.query as { type: "Breakfast" | "Lunch" | "Dinner"; day: string };

    // TODO - Sort this out
    const [values, setValues] = useState<FormValues>({
        query: undefined,
        cuisine: undefined,
        maxCalories: undefined,
        maxCarbs: undefined,
        maxFat: undefined,
        maxProtein: undefined,
        minCalories: undefined,
        minCarbs: undefined,
        minFat: undefined,
        minProtein: undefined,
        type: undefined,
    })

    const { data: meals } = api.meals.getMealsByComplexQuery.useQuery(values, { refetchOnWindowFocus: false, enabled: isSubmitting, onSuccess: (data) => {
        setIsSubmitting(false);
        console.log("complex meals fetched", data);
        localStorage.setItem("MealSuggestions", JSON.stringify(data));
        router.push("/add-new-meals/results?day=" + day + "&type=" + type);        
     },
     onError: (error) => {
            setIsSubmitting(false);
            console.log("error", error);
        }
    });

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
        <Formik
            initialValues={values}
            onSubmit={(values) => {          
                console.log(values);
                setValues(values);
                setIsSubmitting(true);
            }}>
            <Form className="grid grid-cols-1 rounded md:grid-cols-2 border-box bg-base-200">
                <div className="w-full col-span-2 p-4 form-control">
                    <label className="label">
                        <span className="label-text">What do you fancy?</span>
                    </label>
                    <Field
                        name="query"
                        type="text"
                        className="w-full input-bordered input"
                    />
                </div>
                <div className="w-full col-span-2 p-4 form-control">
                    <label className="label">
                        <span className="label-text">Cuisine</span>
                    </label>
                    <Field
                        name="cuisine"
                        as="select"
                        className="w-full select select-bordered"
                    >
                        {/* TODO - move to external enum */}
                        <option>I dont mind</option>
                        <option value="African">African</option>
                        <option value="American">American</option>
                        <option value="British">British</option>
                        <option value="Cajun">Cajun</option>
                        <option value="Caribbean">Caribbean</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Eastern European">Eastern European</option>
                        <option value="European">European</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                        <option value="Greek">Greek</option>
                        <option value="Indian">Indian</option>
                        <option value="Irish">Irish</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Jewish">Jewish</option>
                        <option value="Korean">Korean</option>
                        <option value="Latin American">Latin American</option>
                        <option value="Mediterranean">Mediterranean</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Middle Eastern">Middle Eastern</option>
                        <option value="Nordic">Nordic</option>
                        <option value="Southern">Southern</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Thai">Thai</option>
                        <option value="Vietnamese">Vietnamese</option>
                    </Field>

                </div>
                <div className="w-full max-w-xs p-4 form-control">
                    <label className="label">
                        <span className="label-text">Maximum Calories</span>
                    </label>
                    <Field
                        name="maxCalories"
                        type="number"
                        className="w-full max-w-xs input-bordered input"
                    />
                </div>
                <div className="w-full max-w-xs p-4 form-control">
                    <label className="label">
                        <span className="label-text">Minimum Calories</span>
                    </label>
                    <Field
                        name="minCalories"
                        type="number"
                        className="w-full max-w-xs input-bordered input"
                    />
                </div>
                <div className="w-full max-w-xs p-4 form-control">
                    <label className="label">
                        <span className="label-text">Maximum Protein</span>
                    </label>
                    <Field
                        name="maxProtein"
                        type="number"
                        className="w-full max-w-xs input-bordered input"
                    />
                </div>
                <div className="w-full max-w-xs p-4 form-control">
                    <label className="label">
                        <span className="label-text">Minimum Protein</span>
                    </label>
                    <Field
                        name="minProtein"
                        type="number"
                        className="w-full max-w-xs input-bordered input"
                    />
                </div>
                <div className="w-full max-w-xs p-4 form-control">
                    <label className="label">
                        <span className="label-text">Maximum Fat</span>
                    </label>
                    <Field
                        name="maxFat"
                        type="number"
                        className="w-full max-w-xs input-bordered input"
                    />
                </div>
                <div className="w-full max-w-xs p-4 form-control">
                    <label className="label">
                        <span className="label-text">Minimum Fat</span>
                    </label>
                    <Field
                        name="minFat"
                        type="number"
                        className="w-full max-w-xs input-bordered input"
                    />
                </div>
                <button type="submit" className="col-span-2 btn btn-primary">Submit</button>
            </Form>
        </Formik>
        </div>
    );
};

IndividualMeal.getLayout = (page) => {
    return <RootLayout>{page}</RootLayout>;
};

export default IndividualMeal;
