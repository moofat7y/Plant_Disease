import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import LoadingBtn from "../../components/loading/LoadingBtn";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../../utils/helpers";
import api from "../../utils/api";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [submitData, setSubmitData] = useState({
    isLoading: false,
    isSuccess: false,
    isError: null,
  });
  const navigate = useNavigate();
  async function onSubmit(data) {
    setSubmitData((prev) => {
      return { ...prev, isLoading: true };
    });
    try {
      await api.post("/auth/forgot-password", data);
      setSubmitData((prev) => {
        return { ...prev, isLoading: false };
      });
      notifySuccess("Check your mail");
      reset();
      navigate("/auth/signin");
    } catch (error) {
      notifyError(error?.response?.data?.message);
      setSubmitData((prev) => {
        return {
          ...prev,
          isLoading: false,
          isError: error?.response?.data?.message,
        };
      });
    }
  }
  return (
    <div className="forgot-password col-xl-6 col-lg-8 ">
      <div className="py-5 text-center">
        <h2 className="fw-bold fs-1 mb-1">Forgot Password</h2>
        <span className="fs-6  text-secondary">
          <span className="">Main</span>
          <BsDot className="fs-5" />
          <span>Password</span>
        </span>
      </div>
      <div className="wrraper  bg-white w-100 ">
        <div className="text-center">
          <h3 className="semibold mb-1">Reset Password</h3>
          <Link to="/auth/signin" className="mb-3 d-inline-block">
            Back to login
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email",
                },
              })}
              type="text"
              className={`form-control px-3 py-2  ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Email"
            />
            {errors.email ? (
              <div className="invalid-feedback">{errors.email.message}</div>
            ) : null}
          </div>

          <LoadingBtn
            label="Reset"
            bgcolor="btn-primary"
            loading={submitData.isLoading}
            extraClass="py-3 w-100 text-white"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
