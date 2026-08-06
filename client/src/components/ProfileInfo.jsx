import { useState } from "react";
import { updateBuyerProfile } from "../services/buyerService";
import { toast } from "react-toastify";

const ProfileInfo = ({ profile }) => {

    const [edit, setEdit] = useState(false);

    const [formData, setFormData] = useState({
        name: profile?.name || "",
        phone: profile?.phone || "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateBuyerProfile(formData);

            toast.success("Profile Updated Successfully");

            setEdit(false);

            window.location.reload();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    return (

        <div className="card shadow border-0">

            <div className="card-body">

                <div className="text-center">

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="profile"
                        className="rounded-circle mb-3"
                        width="120"
                    />

                    <h3 className="fw-bold">

                        {profile.name}

                    </h3>

                    <span className="badge bg-primary">

                        Buyer

                    </span>

                </div>

                <hr />

                {!edit ? (

                    <>

                        <p>

                            <strong>Email :</strong>

                            <br />

                            {profile.email}

                        </p>

                        <p>

                            <strong>Phone :</strong>

                            <br />

                            {profile.phone || "Not Added"}

                        </p>

                        <button
                            className="btn btn-warning w-100"
                            onClick={() => setEdit(true)}
                        >

                            Edit Profile

                        </button>

                    </>

                ) : (

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Phone</label>

                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                        </div>

                        <button className="btn btn-success w-100">

                            Save

                        </button>

                    </form>

                )}

            </div>

        </div>

    );

};

export default ProfileInfo;