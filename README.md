# Boardbloom Trello SaaS

<div align="center">
  <img src="https://github.com/KevinSilvaa/boardbloom-trello-saas/assets/143517496/092a72ce-3f10-44ca-86a7-6427c9298fb5" alt="BoardBloom Home Page" width="49%" />
  <img src="https://github.com/KevinSilvaa/boardbloom-trello-saas/assets/143517496/df2bc883-470a-4382-8839-e6b8516fbefe" alt="BoardBloom Boards Page" width="49%" />
</div>

## Project Overview

Boardbloom Trello SaaS is a web application designed to enhance productivity by integrating Trello-like functionality in a SaaS model. It allows users to manage projects with boards, lists, and cards, offering features like task assignment, due dates, collaboration tools, activty log and much more.

## Key Features

- **Board Management**: Create and manage multiple boards for different projects.
- **Task Assignment**: Assign tasks to team members and set due dates.
- **Collaboration**: Real-time updates and notifications for team collaboration.
- **Activity logs**: See how everything is going and all changes in your board.
- **Custom Labels**: Organize tasks with custom labels for better tracking.

## Technologies Used

- **TypeScript**: For static typing to reduce potential errors.
- **Next.js**: For server-side rendering and better performance.
- **Prisma**: As the ORM for database interactions.
- **PostgreSQL**: For the database.
- **Clerk**: For authentication with Google and GitHub and organizations.
- **Tailwind CSS**: For styling the application.
- **React Hook Form**: For handling form data.
- **Zod**: For schema validation.
- **React Query**: For data fetching and state management.
- **Shadcn/ui**: As the UI Library for the components.
- **Stripe**: As the payment gateway used for upgrading to Pro plan.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Docker (optional, for database setup)

### Installation

1. **Clone the Repository**

    ```bash
    git clone git@github.com:KevinSilvaa/boardbloom-trello-saas.git
    cd boardbloom-trello-saas
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Rename `.env.example` to `.env` and update the variables as needed.

4. **Run Database Migrations**

    ```bash
    npx prisma migrate dev
    ```

5. **Start the Application**

    ```bash
    npm run dev
    ```

6. **Access the Application**

    Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Deployment

Instructions for deploying the application will vary based on your hosting environment. Common options include Vercel, Heroku, and DigitalOcean.

## Author

**Kevin Silva**

- [LinkedIn](https://www.linkedin.com/in/kevinsilvaa)
- [GitHub](https://github.com/KevinSilvaa)

For any questions or suggestions, please feel free to contact me.
