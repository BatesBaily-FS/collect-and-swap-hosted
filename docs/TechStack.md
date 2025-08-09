# Tech Stack

## Application Design

What tool(s) will you use to create click-through designs of the application? List any UI kits you would like to utilize as well.

For creating click-through designs of my application, I will be using Figma. I have used Figma multiple times in the past and have enjoyed my experience. This tool makes it simple and easy to create designs, prototypes, and wireframe. Figma offer many libraries for finding specific design elements and templates for inspiration.

## Front End Framework

List your approach for front end development. For example, React is an often used front-end solution for projects in addition to using moduleCSS, PropTypes, and an ESLint style guide.

I will use React as my front-end framework. I am most familiar with React for building user interfaces; aspects like reusability and maintainability make it a great choice. I will also incorporate CSS Modules for scoped styling, PropTypes for type checking, and ESLint style guide to maintain quality and consistency of code.

## State Management

What is your proposed solution for managing data? This could mean utilizing a database, local-storage, and in general state management libraries for the application (e.g. Redux).

For state management, I plan to use MongoDB as my database, utilizing its flexibility for storing users and book data. I will also use local storage for persisting user sessions for a seamless experience when returning to app. Additionally, I plan to utilize multiple APIs, including AuthO for user authentication and potentially Google Places API for geolocation features.

## Node

Node is often used to serve both an API and to render a front-end. This includes using best practices, npm, and npx. What do you propose?

I will use Node.js to serve both the API and front-end. I am most familiar with npm for package-management, which helps streamline the installation and management of dependencies.

## Express

Express is a popular framework to power an API. Describe your idea for building similar functionality offered by express: e.g. middleware, routes, controllers, sending and receiving JSON data.

For building my API, I will use Express. I plan to implement middleware for logging and error handling. Routes will be organized based on app features including, user routes (for selected user), book description routes (for viewing book details), location routes (displaying results of geolocation searches), fan club routes (for viewing fan club pages), and transaction routes (for managing points or coins). I will create controllers for handling business logic. The API will be designed to send and receive JSON data.

## SQL/Postgres/Sequelize

A popular solution for relational database work is to utilize Sequelize as an ORM. Are you familiar with migrations, models, and seeding? What tools and solutions do you propose for your application? For example, utilizing an ORM to build out models with full validated CRUD.

Since I plan to use MongoDB as my database, I will not be using SQL or Sequelize. Instead I will be using MongoDB's schema capabilities to handle user and book data. I will be using Mongoose for implementing model structures, utilizing its schema validation capabilities.

# Change Order

**Summary of Project Scope**
The Collect and Swap: Book Sharing App is a web-based, mobile-first platform that enables users to trade and share books, join book clubs, and discover local book-related resources and events. Core features include user authentication, book listing/searching (via third-party API), a token-based trading system, book club/community features, and basic geolocation for local resources.

**List and describe any proposed changes to the original project scope**

**_Book Data API Integration_**

- Change: Add integration with Google Books or Open Library API.
- Reason: Essential for listing, searching, and displaying book details.
- Impact: Enables book search and metadata features.

**_Token System Clarification_**

- Change: Simplify token system tp use flat-rate values for books (ex: paperback = 1 token, hardcover = 2 tokens). Condition is state in description but it not accounted for in value (up to user discretion). How system works:

List and trade a paperback = Earn 1 token
List and trade a hardcover = Earn 2 tokens
Request a paperback = Spend 1 token
Request a hardcover = Spend 2 tokens
Trade a paperback for a hardcover = Pay 1 token difference
Possible addition of special edition = 3 tokens

- Reason: Reduces complexity and ensures fair, transparent trades.
- Impact: Simplifies back-end logic and user experience.

**_Book Club Navigation_**

- Change: Move Book Clubs to a main navigation tab.
- Reason: Increases visibility and engagement for this core feature.
- Impact: Minor UI update; improves usability.

**_Deferral of Advanced Features_**

- Change: Defer payment gateway integration, advanced book valuation, and complex event management.
- Reason: Focus on most valuable features ans core user needs.
- Impact: Reduces MVP scope and development time.
