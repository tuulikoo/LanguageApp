import { useEffect, useState } from "react";
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
/**
 * UserSearch is a component that allows for searching and displaying a list of users in an admin panel.
 * It includes a search field to filter users by name and a paginated table to display user details such as ID, name, username, email, points, and time spent.
 * The component fetches user data from an API and calculates average ratios for points to time spent, coloring table cells based on this ratio.
 *
 * @component
 * @example
 * return (
 *   <UserSearch />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a user search interface for an admin panel.
 * It provides functionality to search users and displays them in a paginated, styled table. Table cells are color-coded based on user performance metrics.
 */
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
                    console.error(
                        "Failed to fetch users",
                        await response.text()
                    );
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const averageRatio =
        users.reduce(
            (total, user) => total + user.userPoints / user.timeSpent,
            0
        ) / users.length;

    const columnStyle = (ratio) => {
        if (ratio < averageRatio) {
            return styles.tableCellRed;
        } else if (ratio > averageRatio) {
            return styles.tableCellGreen;
        } else {
            return styles.tableCell;
        }
    };

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
                            <TableCell className={styles.tableHeader}>
                                ID
                            </TableCell>
                            <TableCell className={styles.tableHeader}>
                                Name
                            </TableCell>
                            <TableCell className={styles.tableHeader}>
                                Username
                            </TableCell>
                            <TableCell className={styles.tableHeader}>
                                Email
                            </TableCell>
                            <TableCell className={styles.tableHeader}>
                                Points
                            </TableCell>
                            <TableCell className={styles.tableHeader}>
                                Time Spent
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell
                                    className={`${styles.px6} ${styles.py2}`}
                                >
                                    {user.id}
                                </TableCell>
                                <TableCell
                                    className={`${styles.px6} ${styles.py2}`}
                                >
                                    {user.firstName}
                                </TableCell>
                                <TableCell
                                    className={`${styles.px6} ${styles.py2}`}
                                >
                                    {user.username}
                                </TableCell>
                                <TableCell
                                    className={`${styles.px6} ${styles.py2}`}
                                >
                                    {user.email}
                                </TableCell>
                                <TableCell
                                    className={`${styles.px6} ${styles.py2
                                        } ${columnStyle(
                                            user.userPoints / user.timeSpent
                                        )}`}
                                >
                                    {user.userPoints}
                                </TableCell>
                                <TableCell
                                    className={`${styles.px6} ${styles.py2
                                        } ${columnStyle(
                                            user.userPoints / user.timeSpent
                                        )}`}
                                >
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
