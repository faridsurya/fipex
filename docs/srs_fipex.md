# Software Requirements Specification

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to specify the requirements for the exhibition system, which will be used to manage accounts, exhibitions, product submissions, ratings and feedback, and provide a dashboard for leaderboard display.

### 1.2 Scope
The exhibition system will serve as a platform for organizing and managing exhibitions. It will facilitate the registration of admin, participants, and guests, provide features for managing exhibitions, product submissions, rating and feedback, and display a leaderboard on the dashboard.

### 1.3 Definitions, Acronyms, and Abbreviations
Define any technical terms, acronyms, or abbreviations used in the document.

### 1.4 References
List any references used for developing the requirements document.

### 1.5 Overview
Provide an overview of the entire SRS document.

## 2. Overall Description
### 2.1 Product Perspective
The exhibition system is a standalone web-based application designed to manage accounts, exhibitions, product submissions, ratings, and feedback. It operates independently without any direct integration with existing systems.

### 2.2 Product Features
The key features of the exhibition system include:

- Account Management: Admin, Participants, and Guests
- Exhibition Management
- Product Submission Management
- Rating and Feedback Management
- Dashboard and Leaderboard

### 2.3 User Classes and Characteristics
The user classes for the exhibition system include:
- Admin: A person who creates and manages the exhibition system.
- Participant: A person who submits a product for the exhibition.
- Guest: A person who joins as a guest in the exhibition.

### 2.4 Operating Environment
The exhibition system operates within a web-based environment. It is accessible through standard web browsers (e.g., Chrome, Firefox, Safari) on various devices such as desktop computers, laptops, tablets, and mobile devices.

### 2.5 Design and Implementation Constraints
There are no specific hardware or software components required for the exhibition system. It is designed to be platform-independent and compatible with standard web technologies.

### 2.6 User Documentation
User documentation will be provided to guide users on how to interact with the exhibition system effectively. It will include user manuals, guides, and any necessary instructions for system administration.

### 2.7 Assumptions and Dependencies
The exhibition system assumes that users have basic computer literacy and internet access.
It depends on the availability of Google authentication system for user registration and login. The system will integrate with the Google authentication API to facilitate seamless authentication using Google accounts.

## 3. System Features and Requirements

### 3.1 Account Management

The account management feature allows users to create, login, update, and delete their accounts. The system also provides integration with external authentication providers such as Google, Facebook, and GitHub.

#### 3.1.1 Create User Account
Description:
The system should allow users to create an account by providing the required information. It should validate the email address to ensure it is an active email and belongs to the user.

Inputs:
User username
User email
User password
(Optional) User profile information
(Optional) Authentication provider details (e.g., Google, Facebook, GitHub)
Outputs:
Success message or error notification

#### 3.1.2 Login to User Account
Description:
The system should allow users to log in to their accounts using their credentials or through external authentication providers.

Inputs:
User username or email
User password
(Optional) Authentication provider details (e.g., Google, Facebook, GitHub)
Outputs:
Success message or error notification

#### 3.1.3 Update User Account
Description:
The system should allow users to update their account information with restrictions on certain fields.

Inputs:
User username
User email
User password (with strong restrictions, if applicable)
(Optional) Updated user profile information
Outputs:
Success message or error notification

#### 3.1.4 Delete User Account
Description:
The system should allow users to delete their accounts, with restrictions to ensure data integrity.

Inputs:
User confirmation (e.g., password, verification)
Outputs:
Success message or error notification

3.1.5 Integration with External Authentication Providers
Description:
The system should provide integration with external authentication providers (e.g., Google, Facebook, GitHub) to allow users to authenticate and access the system using their accounts from these providers.

Inputs:
User authentication provider details
Outputs:
Success message or error notification

### 3.2 Exhibition Management
#### 3.2.1 Create Exhibition
##### Description:
The system should allow admins to create exhibitions.
##### Inputs:
- Exhibition details (e.g., name, date, location)
- Admin credentials
##### Outputs:
- Success message or error notification

<!-- Specify additional requirements related to managing exhibitions -->

### 3.3 Product Submission Management
<!-- Specify requirements related to managing product submissions -->

### 3.4 Rating and Feedback Management
<!-- Specify requirements related to managing ratings and feedback -->

### 3.5 Dashboard and Leaderboard
<!-- Specify requirements related to the dashboard and leaderboard -->

## 4. Non-functional Requirements
### 4.1 Performance
- The system should be able to handle a large number of concurrent users without significant performance degradation.
- Response time for critical operations, such as login and submission, should be within 2 seconds.
- The system should be able to handle a large database of products, ratings, and feedback efficiently.

### 4.2 Security
- User authentication and authorization should be implemented to ensure secure access to the system.
- User passwords should be securely stored using appropriate encryption techniques.
- The system should enforce appropriate access controls to prevent unauthorized actions by users.
- Personal user information should be stored securely and protected from unauthorized access or data breaches.

### 4.3 Usability
- The user interface should be intuitive, user-friendly, and responsive to enhance user experience.
- The system should support multiple languages to cater to a diverse user base.
- Accessibility standards should be followed to ensure the system is usable by individuals with disabilities.

### 4.4 Reliability
- The system should have a high level of availability, with minimal downtime for maintenance and upgrades.
- Regular data backups should be performed to prevent data loss in case of system failures.
- The system should have error-handling mechanisms in place to handle exceptions and recover gracefully.

### 4.5 Scalability
- The system should be designed to accommodate future growth in the number of users, exhibitions, and product submissions.
- It should be able to scale horizontally by adding more servers or nodes to handle increased load.

### 4.6 Maintainability
- The system should be modular and well-structured to facilitate easy maintenance and future enhancements.
- Code documentation and comments should be provided to aid in understanding and maintaining the system.
- The system should support easy deployment and version management to streamline updates and bug fixes.

### 4.7 Compatibility
- The system should be compatible with commonly used web browsers (e.g., Chrome, Firefox, Safari) and devices (e.g., desktops, tablets, mobile devices).
- It should be compatible with standard operating systems and web technologies.

## 5. Conclusion
Conclude the SRS document by summarizing the key requirements and their importance for the successful development of the exhibition system.

