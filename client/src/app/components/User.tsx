import { UserInterface } from "../types/userInterface";

interface UserProps {
    user: UserInterface;
}

const User: React.FC<UserProps> = ({ user }) => {
    return (
        <div>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default User;