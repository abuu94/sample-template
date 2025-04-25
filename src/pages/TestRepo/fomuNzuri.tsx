<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div className="grid grid-cols-3 gap-4">
    {/* First Column */}
    <div className="space-y-2">
      <label
        htmlFor="fullname"
        className="block text-sm font-medium text-gray-700"
      >
        Name{" "}
      </label>
      <Controller
        name="fullname"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id="fullname"
            type="text"
            placeholder="Enter fullname"
            className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        )}
      />
      {errors.fullname && (
        <p className="text-red-500 text-sm">{errors.fullname.message}</p>
      )}
    </div>

    <div className="space-y-2">
      <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">
        Password{" "}
      </label>
      <Controller
        name="pwd"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id="pwd"
            type="text"
            placeholder="Enter pwd"
            className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        )}
      />
      {errors.pwd && (
        <p className="text-red-500 text-sm">{errors.pwd.message}</p>
      )}
    </div>

    <div className="space-y-2">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700"
      >
        Username{" "}
      </label>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id="username"
            type="text"
            placeholder="Enter username"
            className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        )}
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}
    </div>

    <div className="space-y-2">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email{" "}
      </label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id="email"
            type="text"
            placeholder="Enter email"
            className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        )}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
    </div>
  </div>
  <div className="space-y-2">
                                    <label
                                      htmlFor="picture"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Picture
                                    </label>
                                    <input
                                    name="picture"
                                      id="picture"
                                      type="file"
                                      accept="image/*"
                                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        onChange={(e) => handleFileChange(e)} // Handle file selection
                                    />

                                    {errors.picture && (
                                      <p className="text-red-500 text-sm">
                                        {errors.picture.message}
                                      </p>
                                    )}
                                  </div>

  <div className="flex justify-end space-x-4 mt-6">
    <button
      type="button"
      className="bg-gray-500 text-white rounded-md px-4 py-2"
      onClick={() => console.log("Cancel clicked")} // Replace with your cancel logic
    >
      Cancel
    </button>
    <button
      type="submit"
      className="bg-blue-500 text-white rounded-md px-4 py-2"
    >
      Save
    </button>
  </div>
</form>;



// fomu ina col 2 , field 2
<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-6"
>
<div className="flex justify-between space-x-4">
 
  <div className="flex-1 space-y-2">
    <label
      htmlFor="fullname"
      className="block text-sm font-medium text-gray-700"
    >
      Name{" "}
    </label>
    <Controller
      name="fullname"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          id="fullname"
          type="text"
          placeholder="Enter fullname"
          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      )}
    />
    {errors.fullname && (
      <p className="text-red-500 text-sm">
        {errors.fullname.message}
      </p>
    )}
  </div>

 
  <div className="flex-1 space-y-2">
    <label
      htmlFor="username"
      className="block text-sm font-medium text-gray-700"
    >
      Description{" "}
    </label>
    <Controller
      name="username"
      control={control}
      render={({ field }) => (
        <input
          {...field}
          id="username"
          type="text"
          placeholder="Enter username"
          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      )}
    />
    {errors.username && (
      <p className="text-red-500 text-sm">
        {errors.username.message}
      </p>
    )}
  </div>
</div>
</form> 


// hii ndio ninayotaka kuja kuitumia lakini inanichapa
 <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="w-full p-4">
                        <div className="overflow-x-auto">
                          <table
                            className="w-full table-auto border border-gray-300 shadow-md rounded-md"
                            aria-label="Item Information Table"
                          >
                            <thead>
                              <tr className="bg-blue-500 text-white">
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                  Basic Info
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                  Address Info
                                </th>
                                <th className="px-4 py-2 text-left text-sm font-medium">
                                  Other Info
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="fullname"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Full Name{" "}
                                    </label>
                                    <Controller
                                      name="fullname"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="fullname"
                                          type="text"
                                          placeholder="Enter Full Name"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.fullname && (
                                      <p className="text-red-500 text-sm">
                                        {errors.fullname.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="urole"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Role{" "}
                                    </label>
                                    <Controller
                                      name="urole"
                                      control={control}
                                      render={({ field }) => (
                                        <select
                                          {...field}
                                          id="urole"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                          <option value="">Select Role</option>
                                          <option value={UroleEnum.Admin}>
                                            Admin
                                          </option>
                                          <option value={UroleEnum.Supporter}>
                                            Supporter
                                          </option>
                                          <option value={UroleEnum.Guest}>
                                            Guest
                                          </option>
                                        </select>
                                      )}
                                    />
                                    {errors.urole && (
                                      <p className="text-red-500 text-sm">
                                        {errors.urole.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="region"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Region{" "}
                                    </label>
                                    <Controller
                                      name="region"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="region"
                                          type="text"
                                          placeholder="Enter Region"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.region && (
                                      <p className="text-red-500 text-sm">
                                        {errors.region.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="username"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      User Name{" "}
                                    </label>
                                    <Controller
                                      name="username"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="username"
                                          type="text"
                                          placeholder="Enter User Name"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.username && (
                                      <p className="text-red-500 text-sm">
                                        {errors.username.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="status"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Status{" "}
                                    </label>
                                    <Controller
                                      name="status"
                                      control={control}
                                      render={({ field }) => (
                                        <select
                                          {...field}
                                          id="status"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                          <option value="">Select Role</option>
                                          <option value={StatusEnum.Active}>
                                            Active
                                          </option>
                                          <option value={StatusEnum.Suspended}>
                                            Suspended
                                          </option>
                                          <option value={StatusEnum.Pending}>
                                            Pending
                                          </option>
                                          <option value={StatusEnum.Disabled}>
                                            Disabled
                                          </option>
                                        </select>
                                      )}
                                    />
                                    {errors.status && (
                                      <p className="text-red-500 text-sm">
                                        {errors.status.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="street"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Street{" "}
                                    </label>
                                    <Controller
                                      name="street"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="street"
                                          type="text"
                                          placeholder="Enter Street"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.street && (
                                      <p className="text-red-500 text-sm">
                                        {errors.street.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="pwd"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Password{" "}
                                    </label>
                                    <Controller
                                      name="pwd"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="pwd"
                                          type="text"
                                          placeholder="Enter Password"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.pwd && (
                                      <p className="text-red-500 text-sm">
                                        {errors.pwd.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="income"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Income{" "}
                                    </label>
                                    <Controller
                                      name="income"
                                      control={control}
                                      render={({ field }) => (
                                        <select
                                          {...field}
                                          id="income"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        >
                                          <option value="">
                                            Select Income
                                          </option>
                                          <option
                                            value={IncomeEnum.Below_1000_tsh}
                                          >
                                            Below 1000 TSH
                                          </option>
                                          <option
                                            value={IncomeEnum.Below_10000_tsh}
                                          >
                                            Below 10000 TSH
                                          </option>
                                          <option
                                            value={IncomeEnum.Below_30000_tsh}
                                          >
                                            Below 30000 TSH
                                          </option>
                                        </select>
                                      )}
                                    />
                                    {errors.income && (
                                      <p className="text-red-500 text-sm">
                                        {errors.income.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="picture"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Picture
                                    </label>
                                    <input
                                      id="picture"
                                      type="file"
                                      accept="image/*"
                                      className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                      //   onChange={(e) => handleFileChange(e)} // Handle file selection
                                    />

                                    {errors.picture && (
                                      <p className="text-red-500 text-sm">
                                        {errors.picture.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                              </tr>
                              <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
                                <td className="px-4 py-2">
                                  <div className="space-y-2">
                                    <label
                                      htmlFor="disability"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Disability{" "}
                                    </label>
                                    <Controller
                                      name="disability"
                                      control={control}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          id="disability"
                                          type="text"
                                          placeholder="Enter Disability"
                                          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                      )}
                                    />
                                    {errors.disability && (
                                      <p className="text-red-500 text-sm">
                                        {errors.disability.message}
                                      </p>
                                    )}
                                  </div>
                                </td>
                                <td
                                  colSpan={2}
                                  className="px-4 py-2 text-center"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setIsUserModalOpen(false)} // Replace with your cancel logic
                                    className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="bg-blue-500 text-white rounded-md px-4 py-2"
                                  >
                                    Add User
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        {/* <button
                          type="button"
                          onClick={() => setIsUserModalOpen(false)} 
                          // onClick={handleClose}
                          className="bg-gray-500 text-white rounded-md px-4 py-2"
                        >
                          Cancel
                        </button> */}
                        {/* <button
                          type="submit"
                          className="bg-blue-500 text-white rounded-md px-4 py-2"
                        >
                          Add User
                        </button> */}
                      </div>
                    </form>








// try
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function DataUploader({ onSubmit }) {
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file
  };

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    
    // Append form data
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append file
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    // Submit to the backend
    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Data uploaded successfully!");
      } else {
        console.error("Failed to upload data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {/* First Column */}
        <div className="space-y-2">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Name{" "}
          </label>
          <Controller
            name="fullname"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="fullname"
                type="text"
                placeholder="Enter fullname"
                className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm">{errors.fullname.message}</p>
          )}
        </div>

        {/* Second Column */}
        <div className="space-y-2">
          <label htmlFor="pwd" className="block text-sm font-medium text-gray-700">
            Password{" "}
          </label>
          <Controller
            name="pwd"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="pwd"
                type="password"
                placeholder="Enter password"
                className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          />
          {errors.pwd && (
            <p className="text-red-500 text-sm">{errors.pwd.message}</p>
          )}
        </div>

        {/* Third Column */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username{" "}
          </label>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="username"
                type="text"
                placeholder="Enter username"
                className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Additional Column */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email{" "}
          </label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="email"
                type="email"
                placeholder="Enter email"
                className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="space-y-2">
        <label
          htmlFor="picture"
          className="block text-sm font-medium text-gray-700"
        >
          Picture
        </label>
        <input
          name="picture"
          id="picture"
          type="file"
          accept="image/*"
          className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          onChange={handleFileChange} // Handle file selection
        />
        {errors.picture && (
          <p className="text-red-500 text-sm">{errors.picture.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          className="bg-gray-500 text-white rounded-md px-4 py-2"
          onClick={() => console.log("Cancel clicked")} // Replace with your cancel logic
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default DataUploader;



// nzuri chini
<form
onSubmit={handleSubmit(onSubmit)}
className="space-y-6"
>
<div className="w-full p-4">
  <div className="overflow-x-auto">
    <table
      className="w-full table-auto border border-gray-300 shadow-md rounded-md"
      aria-label="Item Information Table"
    >
      <thead>
        <tr className="bg-blue-500 text-white">
          <th className="px-4 py-2 text-left text-sm font-medium">
            Basic Info
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium">
            Address Info
          </th>
          <th className="px-4 py-2 text-left text-sm font-medium">
            Other Info
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name{" "}
              </label>
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="fullname"
                    type="text"
                    placeholder="Enter Full Name"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="urole"
                className="block text-sm font-medium text-gray-700"
              >
                Role{" "}
              </label>
              <Controller
                name="urole"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="urole"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Role</option>
                    <option value={UroleEnum.Admin}>
                      Admin
                    </option>
                    <option value={UroleEnum.Supporter}>
                      Supporter
                    </option>
                    <option value={UroleEnum.Guest}>
                      Guest
                    </option>
                  </select>
                )}
              />
              {errors.urole && (
                <p className="text-red-500 text-sm">
                  {errors.urole.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                Region{" "}
              </label>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="region"
                    type="text"
                    placeholder="Enter Region"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.region && (
                <p className="text-red-500 text-sm">
                  {errors.region.message}
                </p>
              )}
            </div>
          </td>
        </tr>
        <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Name{" "}
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="Enter User Name"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status{" "}
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="status"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Role</option>
                    <option value={StatusEnum.Active}>
                      Active
                    </option>
                    <option value={StatusEnum.Suspended}>
                      Suspended
                    </option>
                    <option value={StatusEnum.Pending}>
                      Pending
                    </option>
                    <option value={StatusEnum.Disabled}>
                      Disabled
                    </option>
                  </select>
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">
                  {errors.status.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street{" "}
              </label>
              <Controller
                name="street"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="street"
                    type="text"
                    placeholder="Enter Street"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.street && (
                <p className="text-red-500 text-sm">
                  {errors.street.message}
                </p>
              )}
            </div>
          </td>
        </tr>
        <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="pwd"
                className="block text-sm font-medium text-gray-700"
              >
                Password{" "}
              </label>
              <Controller
                name="pwd"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="pwd"
                    type="text"
                    placeholder="Enter Password"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.pwd && (
                <p className="text-red-500 text-sm">
                  {errors.pwd.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="income"
                className="block text-sm font-medium text-gray-700"
              >
                Income{" "}
              </label>
              <Controller
                name="income"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="income"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">
                      Select Income
                    </option>
                    <option
                      value={IncomeEnum.Below_1000_tsh}
                    >
                      Below 1000 TSH
                    </option>
                    <option
                      value={IncomeEnum.Below_10000_tsh}
                    >
                      Below 10000 TSH
                    </option>
                    <option
                      value={IncomeEnum.Below_30000_tsh}
                    >
                      Below 30000 TSH
                    </option>
                  </select>
                )}
              />
              {errors.income && (
                <p className="text-red-500 text-sm">
                  {errors.income.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="picture"
                className="block text-sm font-medium text-gray-700"
              >
                Picture
              </label>
              <input
              name="picture"
                id="picture"
                type="file"
                accept="image/*"
                className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) => handleFileChange(e)} // Handle file selection
              />

              {errors.picture && (
                <p className="text-red-500 text-sm">
                  {errors.picture.message}
                </p>
              )}
            </div>
          </td>
        </tr>
        <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-300">
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="disability"
                className="block text-sm font-medium text-gray-700"
              >
                Disability{" "}
              </label>
              <Controller
                name="disability"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="disability"
                    type="text"
                    placeholder="Enter Disability"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.disability && (
                <p className="text-red-500 text-sm">
                  {errors.disability.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                email{" "}
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    type="text"
                    placeholder="Enter Disability"
                    className="block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </td>
          <td className="px-4 py-2 text-center">
            <button
              type="button"
              onClick={() => setIsUserModalOpen(false)} // Replace with your cancel logic
              className="bg-gray-500 text-white rounded-md px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Add User
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div className="flex justify-end space-x-2 mt-4">
  {/* <button
    type="button"
    onClick={() => setIsUserModalOpen(false)} 
    // onClick={handleClose}
    className="bg-gray-500 text-white rounded-md px-4 py-2"
  >
    Cancel
  </button> */}
  {/* <button
    type="submit"
    className="bg-blue-500 text-white rounded-md px-4 py-2"
  >
    Add User
  </button> */}
</div>
</form>
