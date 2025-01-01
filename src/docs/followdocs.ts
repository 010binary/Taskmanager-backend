/**
 * @openapi
 * /api/v1/follow/getcount:
 *   get:
 *     summary: Get follow counts
 *     description: Retrieves the count of users being followed and followers for the authenticated user.
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: [] # JWT authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *         description: Bearer token for authentication.
 *     responses:
 *       200:
 *         description: Follow count retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Follow data
 *                 data:
 *                   type: object
 *                   properties:
 *                     followedByCount:
 *                       type: integer
 *                       example: 12
 *                     followingCount:
 *                       type: integer
 *                       example: 8
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 * /api/v1/follow/getfollower:
 *   get:
 *     summary: Get follower list
 *     description: Retrieves a list of followers for the authenticated user.
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: [] # JWT authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *         description: Bearer token for authentication.
 *     responses:
 *       200:
 *         description: Follower list retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Follower List
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FollowUser'
 *                   example:
 *                     - id: "67318ba13dba48848eaab2b8"
 *                       fullname: "John Smith"
 *                       occupation: "Software Engineer"
 *                     - id: "67319fe1aa708873d59ddb2d"
 *                       fullname: "Sarah Johnson"
 *                       occupation: "Product Manager"
 *                     - id: "6731a66d65f5d312a0176ec0"
 *                       fullname: "Michael Chen"
 *                       occupation: "UX Designer"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 * /api/v1/follow/getfollowing:
 *   get:
 *     summary: Get following list
 *     description: Retrieves a list of users that the authenticated user is following.
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: [] # JWT authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *         description: Bearer token for authentication.
 *     responses:
 *       200:
 *         description: Following list retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Following List
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FollowUser'
 *                   example:
 *                     - id: "67318ba13dba48848eaab2b8"
 *                       fullname: "Alex Thompson"
 *                       occupation: "Data Scientist"
 *                     - id: "67319fe1aa708873d59ddb2d"
 *                       fullname: "Emily Parker"
 *                       occupation: "DevOps Engineer"
 *                     - id: "6731a66d65f5d312a0176ec0"
 *                       fullname: "James Wilson"
 *                       occupation: "Full Stack Developer"
 *                     - id: "6731a6a165f5d312a0176ec6"
 *                       fullname: "Lisa Brown"
 *                       occupation: "Product Designer"
 *                     - id: "6731a6eb65f5d312a0176ecd"
 *                       fullname: "David Kim"
 *                       occupation: "System Architect"
 *                     - id: "6731a71065f5d312a0176ed4"
 *                       fullname: "Rachel Martinez"
 *                       occupation: "Backend Engineer"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 * 
 * components:
 *   schemas:
 *     FollowUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 67318ba13dba48848eaab2b8
 *         fullname:
 *           type: string
 *           example: John Smith
 *         occupation:
 *           type: string
 *           example: Software Engineer
 *   
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized - Token is missing, invalid, or expired.
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Unauthorized
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: exp claim timestamp check failed
 *           examples:
 *             noToken:
 *               summary: Missing or invalid token
 *               value:
 *                 message: Unauthorized
 *             expiredToken:
 *               summary: Expired token
 *               value:
 *                 message: exp claim timestamp check failed
 * 
 * /api/v1/follow/followuser:
 *   post:
 *     summary: Follow a user
 *     description: Adds a user to the authenticated user's following list.
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: [] # JWT authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *         description: Bearer token for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 67319fdb2d
 *           required:
 *             - id
 *           description: The ID of the user to follow.
 *     responses:
 *       200:
 *         description: User successfully followed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Follower List
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: following added
 *       400:
 *         description: Validation error or user already followed.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: You are already following this user.
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: id is required.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: this user doesn't exist.
 *
 * /api/v1/follow/unfollowuser:
 *   post:
 *     summary: Unfollow a user
 *     description: Removes a user from the authenticated user's following list.
 *     tags:
 *       - Follow
 *     security:
 *       - bearerAuth: [] # JWT authentication
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *           example: Bearer eyJhbGciOiJIUzI1NiJ9...
 *         description: Bearer token for authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 67319fdb2d
 *           required:
 *             - id
 *           description: The ID of the user to unfollow.
 *     responses:
 *       200:
 *         description: User successfully unfollowed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Follower List
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: following remove
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: id is required.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: this user doesn't exist.
 * 

 *   schemas: 
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 67318ba13dba48848eaab2b8
 *         fullname:
 *           type: string
 *           example: John Smith
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         occupation:
 *           type: string
 *           example: Software Engineer
 *         social:
 *           type: string
 *           nullable: true
 *           example: null
 *         isVisible:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           nullable: true
 *           example: null
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-12-25T05:53:42.113Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-12-25T05:53:42.113Z
 * 
 *     Tokens:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiJ9...
 *         refreshToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiJ9...
 *         expiresIn:
 *           type: integer
 *           example: 600
 *         tokenType:
 *           type: string
 *           example: Bearer
 */
