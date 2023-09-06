import { useUser } from '../utils/userContext';

function TuuliTesti() {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>kirjaudu sisaan nahdaksesi profiili</div>;
    }

    return (
        <div>
            <h1>Moro, {user.firstName}!</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default TuuliTesti;
