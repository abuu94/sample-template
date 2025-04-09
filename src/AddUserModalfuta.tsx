// import React, { useState } from "react";
// import { User } from "../types/tUser";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";

// type AddUserModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddUser: (user: User) => void;
// };

// const AddUserModal: React.FC<AddUserModalProps> = ({
//   isOpen,
//   onClose,
//   onAddUser,
// }) => {
//   const [newUser, setNewUser] = useState<User>({
//     id: 0,
//     firstName: "",
//     lastName: "",
//     age: 0,
//     visits: 0,
//     progress: 0,
//     status: "",
//   });
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       !newUser.firstName ||
//       !newUser.lastName ||
//       !newUser.age ||
//       !newUser.visits ||
//       !newUser.progress ||
//       !newUser.status
//     ) {
//       setErrorMessage("Please fill in all fields.");
//       return;
//     }
//     onAddUser(newUser);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Add New User</h2>
//         {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//         <form className="space-y-4">
//           {/* onSubmit={(e)=>{e.preventDefault();handleSubmit();}} */}
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={newUser.firstName}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={newUser.lastName}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={newUser.age}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="number"
//             name="visits"
//             placeholder="Visits"
//             value={newUser.visits}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="number"
//             name="progress"
//             placeholder="Progress"
//             value={newUser.progress}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           {/* <input
//             type="text"
//             name="status"
//             placeholder="Status"
//             value={newUser.status}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           /> */}
         
//           <select
//             name="status"
//             value={newUser.status}
//             // onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           >
//             <option value="" disabled>Select Status</option>
//             <option value="Maried">Maried</option>
//             <option value="Unmaried">Unmaried</option>
            
//           </select>
//         </form>
//         <div className="flex justify-end space-x-2 mt-4">
//           <button
//             onClick={onClose}
//             className="bg-gray-500 text-white rounded-md px-4 py-2"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white rounded-md px-4 py-2"
//           >
//             Add User
//           </button>
//           {/*  */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddUserModal;

import React, { useState } from 'react';
import { User } from '../types/tUser';

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: User) => void;
};

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    firstName: '',
    lastName: '',
    age: 0,
    visits: 0,
    progress: 0,
    status: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.age ||
      !newUser.visits ||
      !newUser.progress ||
      !newUser.status
    ) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    onAddUser(newUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newUser.age}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="number"
            name="visits"
            placeholder="Visits"
            value={newUser.visits}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="number"
            name="progress"
            placeholder="Progress"
            value={newUser.progress}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <select
            name="status"
            value={newUser.status}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          >
            <option value="" disabled>Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded-md px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;

// import React, { useState } from 'react';
// import { User } from '../types/tUser';

// type AddUserModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddUser: (user: User) => void;
// };

// const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
//   const initialUserState: User = {
//     id: 0,
//     firstName: '',
//     lastName: '',
//     age: 0,
//     visits: 0,
//     progress: 0,
//     status: ''
//   };

//   const [newUser, setNewUser] = useState<User>(initialUserState);
//   const [errorMessage, setErrorMessage] = useState<string>('');

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (
//       !newUser.firstName ||
//       !newUser.lastName ||
//       !newUser.age ||
//       !newUser.visits ||
//       !newUser.progress ||
//       !newUser.status
//     ) {
//       setErrorMessage('Please fill in all fields.');
//       return;
//     }
//     onAddUser(newUser);
//     setNewUser(initialUserState); // Reset the form fields
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-md shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Add New User</h2>
//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={newUser.firstName}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={newUser.lastName}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="number"
//             name="age"
//             placeholder="Age"
//             value={newUser.age}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="number"
//             name="visits"
//             placeholder="Visits"
//             value={newUser.visits}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <input
//             type="number"
//             name="progress"
//             placeholder="Progress"
//             value={newUser.progress}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           />
//           <select
//             name="status"
//             value={newUser.status}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded-md p-2 w-full"
//             required
//           >
//             <option value="" disabled>Select Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//             <option value="pending">Pending</option>
//           </select>
//           <div className="flex justify-end space-x-2 mt-4">
//             <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded-md px-4 py-2">
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">
//               Add User
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUserModal;