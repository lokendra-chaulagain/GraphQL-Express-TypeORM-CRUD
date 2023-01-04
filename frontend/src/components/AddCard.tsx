import React from "react";

export default function AddCard() {
  return (
    <div className="w-50">
      <div className="card rounded-0 p-3">
        <div className="mb-3">
          <label
            htmlFor="name"
            className="form-label mb-1 fw-semibold">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-0 shadow-none "
            id="name"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="email"
            className="form-label mb-1 fw-semibold">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-0 shadow-none "
            id="email"
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="age"
            className="form-label mb-1 fw-semibold">
            Age
          </label>
          <input
            type="number"
            className="form-control rounded-0 shadow-none "
            id="age"
          />
        </div>

        <div className="d-flex gap-3 justify-content-end">
          <button
            type="button"
            className="btn btn-warning fw-semibold rounded-0 px-3">
            Reset
          </button>
          <button
            type="button"
            className="btn btn-primary fw-semibold rounded-0 px-3">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
