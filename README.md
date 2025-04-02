# Barbershop Booking System
<!-- Not Finshed -->
## Overview

This is a web-based barbershop booking system built using React for the frontend and PostgreSQL for the database. The platform allows barbershop owners to create and manage their shops while enabling customers to book appointments easily.

## Features

- **User Authentication**: Login and Signup functionality.
<!-- - **Barbershop Management**: Barbershops can register, update details, and manage availability. -->
<!-- - **Appointment Booking**: Customers can browse shops and book appointments. -->
<!-- - **Database Integration**: Uses PostgreSQL for storing user and appointment data. -->

## Technologies Used

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Token)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- PostgreSQL

### Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/RamiAttallah2024/Barber-Shop-Repo.git
   cd barbershop-booking
   ```

2. **Install Dependencies**

   ```sh
   npm install
   ```

3. **Set Up Database**

   - Create a PostgreSQL database.
   - Run the provided SQL scripts (if available) to create necessary tables.
   - Configure database credentials in `.env`.

4. **Start Backend Server**

   ```sh
   cd backend
   npm start
   ```

5. **Start Frontend**

   ```sh
   cd frontend
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

<!-- ### Barbershop Management -->

- `POST /api/barbershop` - Create a new shop
- `GET /api/barbershops` - List all shops

<!-- ### Appointments -->

- `POST /api/appointments` - Book an appointment
- `GET /api/appointments` - Retrieve user appointments

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your ideas.

## License

This project is licensed under the MIT License.

## Contact

For inquiries, please contact [ramihattallah@gmail.com].

(Not Finshed)
