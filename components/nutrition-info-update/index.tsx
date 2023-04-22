import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NutritionInfoUpdate() {
    const save = () => {
        console.log("Save");
    };

    return (
        <>
            <div className="p-4 mx-4 my-10 shadow bg-base-200 rounded-box">
                {/* Basic stuff */}
                <h1 className="text-3xl font-bold">
                    Basic Information
                </h1>
                <div className="grid grid-cols-1 gap-6 md:m-10 md:grid-cols-2 lg:grid-cols-3">
                    {/* Weight */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Weight</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="200"
                                className="input input-bordered"
                            />
                            <span>Lbs</span>
                        </label>
                    </div>

                    {/* Height */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Height</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="182"
                                className="input input-bordered"
                            />
                            <span>CM</span>
                        </label>
                    </div>

                    {/* Age */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Age</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="30"
                                className="input input-bordered"
                            />
                            <span>Years</span>
                        </label>
                    </div>

                    {/* Resting Heart Rate */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Resting Heart Rate
                            </span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="70"
                                className="input input-bordered"
                            />
                            <span>BPM</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="p-4 mx-4 shadow bg-base-200 rounded-box">
                <h1 className="text-3xl font-bold">Detailed Information</h1>
                <div className="grid grid-cols-1 gap-6 m-10 md:grid-cols-2 lg:grid-cols-3">
                    {/* Cholesterol */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Cholesterol</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="70"
                                className="input input-bordered"
                            />
                            <span>mg/dL</span>
                        </label>
                    </div>

                    {/* Body Fat Percentage */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">
                                Body Fat Percentage
                            </span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>%</span>
                        </label>
                    </div>

                    {/* Vitamin D */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Vitamin D</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>mcg</span>
                        </label>
                    </div>

                    {/* Vitamin B12 */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Vitamin B12</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>mcg</span>
                        </label>
                    </div>

                    {/* Vitamin B6 */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Vitamin B6</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>mcg</span>
                        </label>
                    </div>

                    {/* Vitamin C */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Vitamin C</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>mcg</span>
                        </label>
                    </div>

                    {/* Testosterone */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Testosterone</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>mcg</span>
                        </label>
                    </div>

                    {/* HbA1c */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">HbA1c</span>
                        </label>
                        <label className="input-group">
                            <input
                                type="text"
                                placeholder="20"
                                className="input input-bordered"
                            />
                            <span>mcg</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="fixed rounded-full tooltip bottom-3 right-3 " data-tip="Save">
                <button className="shadow-2xl btn btn-primary" onClick={save}>
                    <FontAwesomeIcon icon={faFloppyDisk} className="text-3xl "/>
                </button>
            </div>
        </>
    );
}
