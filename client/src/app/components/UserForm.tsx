import { useState } from "react";
import UserApi from "../data/user.api";

interface UserFormProps {
  buttonName?: string,
  onSubmit: () => void;
}

const UserForm: React.FC<UserFormProps> = ({buttonName = 'register', onSubmit}: UserFormProps) => {
   const [formData, setFormData] = useState({
       firstname: '',
       lastname: '',
       email: '',
       password: '',
     });
   
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value,
       });
     };
   
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       onSubmit()
       const response = await UserApi.createUser(formData)
        
       if (response.ok) {
         console.log('User registered successfully');
       } else {
         console.error('Registration failed');
       }
     };
   
     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           name="firstname"
           value={formData.firstname}
           onChange={handleChange}
           placeholder="First Name"
         />
         <input
           type="text"
           name="lastname"
           value={formData.lastname}
           onChange={handleChange}
           placeholder="Last Name"
         />
         <input
           type="email"
           name="email"
           value={formData.email}
           onChange={handleChange}
           placeholder="Email"
         />
         <input
           type="password"
           name="password"
           value={formData.password}
           onChange={handleChange}
           placeholder="Password"
         />
         <button type="submit">{buttonName}</button>
       </form>
     );
}
export default UserForm