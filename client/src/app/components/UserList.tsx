import { UserInterface } from "../types/userInterface"
import { useQuery } from "@tanstack/react-query"
import UserApi from "../data/user.api"
import User from "./User"

function UserList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: UserApi.getUsers
    })

    const getUsers = () => data?.map((user: UserInterface) => <li key={user.id}><User user={user} /></li>)
    
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users</p>;
    
    return <>
    <h1>Users</h1>
    <ul>{getUsers()}</ul>
    </>
}
export default UserList