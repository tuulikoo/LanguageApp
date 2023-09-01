import React from 'react';
import MainPage from './MainPage'
import Header from './Header'; // Import the Header component you created

const IndexPage = () => {
    return (
        <div>
            {/*<h1>Landingpage</h1>*/}
            {/*<Header />*/}
            <MainPage/>
            <h2>Placeholder</h2>
            <p>Prisma is a next-generation ORM for Node.js and TypeScript that provides an intuitive data model, automated migrations, type-safety, and auto-completion 1. It supports PostgreSQL, MySQL, SQL Server, SQLite, MongoDB, and CockroachDB 1. Prisma Client is a query builder that’s tailored to your schema. Its API is designed to be intuitive for both SQL veterans and developers new to databases. The auto-completion feature helps you figure out your query without the need for documentation 1. Prisma Migrate auto-generates SQL migrations from your Prisma schema. These migration files are fully customizable, giving you full control and ultimate flexibility — from local development to production environments 1. Prisma Studio is the easiest way to explore and manipulate data in your Prisma projects. You can browse across tables, filter, paginate, traverse relations and edit your data with safety 1.

                You can get started with Prisma by visiting their website 1.</p>
        </div>
    );
};

export default IndexPage;
