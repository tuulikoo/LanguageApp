import { useState, useEffect } from "react";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import styles from "../styles/AdminPanel.module.scss";

function UserSearch() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/adminUsers");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    console.error("Failed to fetch users", await response.text());
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <Container maxWidth="lg" className={styles.container}>
            <TextField
                label="Search Users"
                variant="outlined"
                className={styles.mb4}
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TableContainer component={Paper} className={styles.shadowLg}>
                <Table className={`${styles.minWFull} ${styles.divideY}`}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={styles.tableHeader}>ID</TableCell>
                            <TableCell className={styles.tableHeader}>Name</TableCell>
                            <TableCell className={styles.tableHeader}>Username</TableCell>
                            <TableCell className={styles.tableHeader}>Email</TableCell>
                            <TableCell className={styles.tableHeader}>Points</TableCell>
                            <TableCell className={styles.tableHeader}>Time Spent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className={`${styles.px6} ${styles.py2}`}>
                                    {user.id}
                                </TableCell>
                                <TableCell className={`${styles.px6} ${styles.py2}`}>
                                    {user.firstName}
                                </TableCell>
                                <TableCell className={`${styles.px6} ${styles.py2}`}>
                                    {user.username}
                                </TableCell>
                                <TableCell className={`${styles.px6} ${styles.py2}`}>
                                    {user.email}
                                </TableCell>
                                <TableCell className={`${styles.px6} ${styles.py2}`}>
                                    {user.userPoints}
                                </TableCell>
                                <TableCell className={`${styles.px6} ${styles.py2}`}>
                                    {user.timeSpent}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default UserSearch;
