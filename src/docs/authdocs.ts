// endpoint: /api/v1/auth/register
/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - occupation
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: example@hotmail.com
 *               occupation:
 *                 type: string
 *                 example: Backend Engineer
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456789
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 676b9de60861d787ac5d3416
 *                     fullname:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: example@hotmail.com
 *                     occupation:
 *                       type: string
 *                       example: Backend Engineer
 *                     social:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     isVisible:
 *                       type: boolean
 *                       example: true
 *                     image:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-25T05:53:42.113Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-12-25T05:53:42.113Z
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiJ9...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiJ9...
 *                     expiresIn:
 *                       type: integer
 *                       example: 600
 *                     tokenType:
 *                       type: string
 *                       example: Bearer
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                   required:
 *                     - message
 *                   example:
 *                     message: Fullname is required
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [USER_EXISTS]
 *                     message:
 *                       type: string
 *                   required:
 *                     - message
 *                   example:
 *                     message: User already exists
 *             examples:
 *               validationError:
 *                 summary: Validation Error
 *                 value:
 *                   error: VALIDATION_ERROR
 *                   message: fullname is required
 *               userExists:
 *                 summary: User Already Exists
 *                 value:
 *                   error: USER_EXISTS
 *                   message: User already exists
 * 
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and get tokens
 *     description: Authenticates a user using email and password, returns user details and authentication tokens.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 67318ba13dba48848eaab2b8
 *                     fullname:
 *                       type: string
 *                       example: John Smith
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     occupation:
 *                       type: string
 *                       example: Software Engineer
 *                     social:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     isVisible:
 *                       type: boolean
 *                       example: true
 *                     image:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-11T04:44:17.738Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-11T04:44:17.738Z
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiJ9...
 *                     refreshToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiJ9...
 *                     expiresIn:
 *                       type: integer
 *                       example: 600
 *                     tokenType:
 *                       type: string
 *                       example: Bearer
 *       400:
 *         description: Bad Request - Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   enum: [VALIDATION_ERROR]
 *                 message:
 *                   type: string
 *                 field:
 *                   type: string
 *               required:
 *                 - error
 *                 - message
 *                 - field
 *               example:
 *                 error: VALIDATION_ERROR
 *                 message: Password is required
 *                 field: password
 *       401:
 *         description: Unauthorized - Authentication Failed
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [INVALID_CREDENTIALS]
 *                     message:
 *                       type: string
 *                   required:
 *                     - error
 *                     - message
 *                   example:
 *                     error: INVALID_CREDENTIALS
 *                     message: Invalid password
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [USER_NOT_FOUND]
 *                     message:
 *                       type: string
 *                   required:
 *                     - error
 *                     - message
 *                   example:
 *                     error: USER_NOT_FOUND
 *                     message: User not found
 *             examples:
 *               invalidPassword:
 *                 summary: Invalid Password
 *                 value:
 *                   error: INVALID_CREDENTIALS
 *                   message: Invalid password
 *               userNotFound:
 *                 summary: User Not Found
 *                 value:
 *                   error: USER_NOT_FOUND
 *                   message: User not found
 * 
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Generate new access token
 *     description: Generates a new access token using a valid refresh token and the last access token. Designed for mobile app token refresh flow.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Last access token with 'Bearer' prefix
 *         schema:
 *           type: string
 *           pattern: '^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$'
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *       - in: header
 *         name: x-refresh-token
 *         required: true
 *         description: Refresh token for generating new access token
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiJ9...
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New access token
 *                   example: eyJhbGciOiJIUzI1NiJ9...
 *       401:
 *         description: Unauthorized - Invalid or expired tokens
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [TOKEN_EXPIRED]
 *                     message:
 *                       type: string
 *                   required:
 *                     - error
 *                     - message
 *                   example:
 *                     error: TOKEN_EXPIRED
 *                     message: exp claim timestamp check failed
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [INVALID_TOKEN]
 *                     message:
 *                       type: string
 *                   required:
 *                     - error
 *                     - message
 *                   example:
 *                     error: INVALID_TOKEN
 *                     message: Invalid access token
 *             examples:
 *               tokenExpired:
 *                 summary: Token Expired
 *                 value:
 *                   message: exp claim timestamp check failed
 *               invalidToken:
 *                 summary: Invalid Access Token
 *                 value:
 *                   message: Invalid access token
 * 
 * /api/v1/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Invalidates both access and refresh tokens to log out the user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token with 'Bearer' prefix
 *         schema:
 *           type: string
 *           pattern: '^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$'
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *       - in: header
 *         name: x-refresh-token
 *         required: true
 *         description: Refresh token to invalidate
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiJ9...
 *     responses:
 *       204:
 *         description: Successfully logged out
 *       401:
 *         description: Unauthorized - Invalid tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   enum: [INVALID_TOKEN]
 *                 message:
 *                   type: string
 *               required:
 *                 - error
 *                 - message
 *               example:
 *                 error: INVALID_TOKEN
 *                 message: Invalid access token
 * 
 * /api/v1/auth/checkmail:
 *   post:
 *     summary: Check email for password recovery
 *     description: Verifies if the email exists in the system and returns user details with a temporary access token for password recovery.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Email found and user verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email found
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 67318ba13dba48848eaab2b8
 *                     fullname:
 *                       type: string
 *                       example: John Smith
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     occupation:
 *                       type: string
 *                       example: Software Engineer
 *                     social:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     isVisible:
 *                       type: boolean
 *                       example: true
 *                     image:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-11T04:44:17.738Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-11-11T04:44:17.738Z
 *                 token:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiJ9...
 *                     expiresIn:
 *                       type: integer
 *                       example: 600
 *                     tokenType:
 *                       type: string
 *                       example: Bearer
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [VALIDATION_ERROR]
 *                     message:
 *                       type: string
 *                     field:
 *                       type: string
 *                   required:
 *                     - error
 *                     - message
 *                     - field
 *                   example:
 *                     error: VALIDATION_ERROR
 *                     message: Email is required
 *                     field: email
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [USER_NOT_FOUND]
 *                     message:
 *                       type: string
 *                   required:
 *                     - error
 *                     - message
 *                   example:
 *                     error: USER_NOT_FOUND
 *                     message: User not found
 *             examples:
 *               validationError:
 *                 summary: Validation Error
 *                 value:
 *                   error: VALIDATION_ERROR
 *                   message: Email is required
 *                   field: email
 *               userNotFound:
 *                 summary: User Not Found
 *                 value:
 *                   error: USER_NOT_FOUND
 *                   message: User not found
 * 
 * /api/v1/auth/forgotpassword:
 *   post:
 *     summary: Reset forgotten password
 *     description: Changes user's password during password recovery flow. Requires temporary access token from checkmail endpoint.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Temporary access token with 'Bearer' prefix from checkmail endpoint
 *         schema:
 *           type: string
 *           pattern: '^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$'
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password Changed success
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   enum: [VALIDATION_ERROR]
 *                 message:
 *                   type: string
 *                 field:
 *                   type: string
 *               required:
 *                 - error
 *                 - message
 *                 - field
 *               example:
 *                 error: VALIDATION_ERROR
 *                 message: Password is required
 *                 field: password
 *       401:
 *         description: Unauthorized - Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   enum: [TOKEN_EXPIRED]
 *                 message:
 *                   type: string
 *               example:
 *                 error: TOKEN_EXPIRED
 *                 message: exp claim timestamp check failed
 * 
 * 
 * /api/v1/auth/changepassword:
 *   post:
 *     summary: Change password while logged in
 *     description: Allows authenticated users to change their password by providing their current password.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Access token with 'Bearer' prefix
 *         schema:
 *           type: string
 *           pattern: '^Bearer [A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.[A-Za-z0-9-_.+/=]*$'
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 example: currentPassword123
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Validation Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   enum: [VALIDATION_ERROR]
 *                 message:
 *                   type: string
 *                 field:
 *                   type: string
 *               required:
 *                 - error
 *                 - message
 *                 - field
 *               example:
 *                 error: VALIDATION_ERROR
 *                 message: Old password is required
 *                 field: oldPassword
 *       401:
 *         description: Unauthorized - Invalid token or password
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [TOKEN_EXPIRED]
 *                     message:
 *                       type: string
 *                   example:
 *                     error: TOKEN_EXPIRED
 *                     message: exp claim timestamp check failed
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       enum: [INVALID_CREDENTIALS]
 *                     message:
 *                       type: string
 *                   example:
 *                     error: INVALID_CREDENTIALS
 *                     message: Invalid old password
 */