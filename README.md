# Dental Office Booking System

This is a comprehensive backend system for a dental office booking application. It provides APIs for user authentication, appointment management, dentist information, and office details. The system is built with Node.js, Express, and MongoDB, and includes features such as email notifications and file uploads.

## Table of Contents
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Project Structure](#project-structure)
6. [Running the Server](#running-the-server)
7. [API Routes](#api-routes)
8. [Database](#database)
9. [Email Notifications](#email-notifications)
10. [File Uploads](#file-uploads)
11. [Docker Deployment](#docker-deployment)
12. [AWS Deployment](#aws-deployment)
13. [Troubleshooting](#troubleshooting)
14. [Contributing](#contributing)
15. [License](#license)

## Features

- User authentication and authorization
- Appointment scheduling and management
- Dentist profile management
- Office information management
- Email notifications for appointments
- File uploads for user avatars or dental records
- Rate limiting for API security
- Dockerized for easy deployment
- Configurable for different environments (development, production)

## Prerequisites

- Node.js (v18 or later)
- npm (comes with Node.js)
- MongoDB Atlas account or local MongoDB installation
- SMTP server for email notifications (e.g., Mailtrap for development)
- (Optional) Docker for containerized deployment
- (Optional) AWS account for ECR deployment

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/dental-office-booking-system.git
   cd dental-office-booking-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory:
   ```
   cp .env.example .env
   ```

2. Open the `.env` file and fill in the values:

   ```
   # Server Configuration
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development

   # MongoDB URI
   # Replace <username>, <password>, <cluster-url> with your MongoDB Atlas credentials
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority

   # JWT Secret Key
   # Replace with a strong, unique secret key
   JWT_SECRET=your_jwt_secret_key_here

   # SMTP Configuration (Mailtrap)
   # Replace with your own SMTP settings
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_EMAIL=your_smtp_username
   SMTP_PASSWORD=your_smtp_password

   # Email Sender Information
   FROM_NAME=DentistBooking
   FROM_EMAIL=noreply@yourdomain.com

   # File Upload Configuration
   FILE_UPLOAD_PATH=./public/uploads
   MAX_FILE_UPLOAD=5000000

   # Docker Image URI for Deployment (ECR)
   # Replace with your own ECR URI if using AWS ECR
   DOCKER_IMAGE_URI=your.ecr.uri/repository-name
   ```

   Ensure all placeholders are replaced with your actual configuration values.

## Project Structure

```
dental-office-booking-system/
├── config/
│   └── db.js
├── middleware/
│   ├── errorMiddleware.js
│   └── rateLimiter.js
├── models/
├── routes/
│   ├── authRoutes.js
│   ├── appointmentRoutes.js
│   ├── dentistRoutes.js
│   └── officeInfoRoutes.js
├── jobs/
│   └── appointmentNotifications.js
├── public/
│   └── uploads/
├── .env
├── .env.example
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── server.js
```

## Running the Server

1. For development (with auto-restart on file changes):
   ```
   npm run dev
   ```

2. For production:
   ```
   npm start
   ```

The server will start on the port specified in your `.env` file (default: 5000).

## API Routes

- `/api/auth`: Authentication routes
  - POST `/register`: Register a new user
  - POST `/login`: User login
  - GET `/me`: Get current user info
- `/api/office-info`: Office information routes
  - GET `/`: Get office information
  - PUT `/`: Update office information
- `/api/dentists`: Dentist management routes
  - GET `/`: Get all dentists
  - POST `/`: Add a new dentist
  - GET `/:id`: Get a specific dentist
  - PUT `/:id`: Update a dentist
  - DELETE `/:id`: Delete a dentist
- `/api/appointments`: Appointment management routes
  - GET `/`: Get all appointments
  - POST `/`: Create a new appointment
  - GET `/:id`: Get a specific appointment
  - PUT `/:id`: Update an appointment
  - DELETE `/:id`: Cancel an appointment

All routes are prefixed with `/api` and protected by rate limiting middleware.

## Database

This project uses MongoDB as its database. The connection is established in `config/db.js`. Ensure your MongoDB URI is correctly set in the `.env` file.

## Email Notifications

Email notifications for appointments are handled by the `nodemailer` package. The configuration for the SMTP server should be set in the `.env` file. For development, you can use services like Mailtrap to test email functionality.

## File Uploads

File uploads are handled by the `express-fileupload` middleware. Uploaded files are stored in the directory specified by `FILE_UPLOAD_PATH` in the `.env` file. The maximum file size is set by `MAX_FILE_UPLOAD`.

## Docker Deployment

1. Build the Docker image:
   ```
   docker build -t dental-office-booking-system .
   ```

2. Run the container:
   ```
   docker run -p 5000:5000 --env-file .env dental-office-booking-system
   ```

## AWS Deployment

To deploy to AWS Elastic Container Registry (ECR):

1. Authenticate Docker to your ECR registry:
   ```
   aws ecr get-login-password --region your-region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.your-region.amazonaws.com
   ```

2. Build your Docker image:
   ```
   docker build -t dental-office-booking-system .
   ```

3. Tag your image:
   ```
   docker tag dental-office-booking-system:latest your-account-id.dkr.ecr.your-region.amazonaws.com/dental-office-booking-system:latest
   ```

4. Push the image to ECR:
   ```
   docker push your-account-id.dkr.ecr.your-region.amazonaws.com/dental-office-booking-system:latest
   ```

Replace `your-region` and `your-account-id` with your AWS details.

## Troubleshooting

- **Database Connection Issues**: 
  - Ensure your MongoDB URI is correct in the `.env` file.
  - Check if your IP address is whitelisted in MongoDB Atlas.
  - Verify that your MongoDB instance is running.

- **Email Sending Failures**: 
  - Double-check your SMTP configuration in the `.env` file.
  - Ensure your SMTP provider (e.g., Mailtrap) is operational.
  - Check the server logs for specific error messages.

- **File Upload Problems**: 
  - Ensure the `FILE_UPLOAD_PATH` directory exists and has write permissions.
  - Check if the file size exceeds `MAX_FILE_UPLOAD`.

- **Rate Limiting Issues**:
  - The API is protected by rate limiting. If you're receiving too many requests errors, wait and try again later.

- **JWT Authentication Problems**:
  - Ensure the `JWT_SECRET` in your `.env` file is set and consistent.
  - Check that your JWT token hasn't expired.

For more detailed troubleshooting, check the server logs or open an issue on the project's GitHub repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

---

For any additional questions or support, please contact the project maintainers.