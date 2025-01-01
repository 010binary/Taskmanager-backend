/**
 * @openapi
 * /api/v1/profile:
 *   get:
 *     summary: Retrieve user profile
 *     description: Fetches the profile of the authenticated user.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User data
 *                 result:
 *                   $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized error.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Unauthorized
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: exp claim timestamp check failed
 * 
 * /api/v1/profile/changestatus:
 *   patch:
 *     summary: Change profile visibility status
 *     description: Toggles the `isVisible` status of the authenticated user's profile.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Status changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Status changed successfully
 *                 value:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized error.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Unauthorized
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: exp claim timestamp check failed
 * 
 * /api/v1/profile/updateprofile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the profile of the authenticated user. All fields are optional.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Amanda Alpha
 *               email:
 *                 type: string
 *                 format: email
 *                 example: Amanda@gmail.com
 *               occupation:
 *                 type: string
 *                 example: Lead Flutter Developer
 *               social:
 *                 type: string
 *                 format: uri
 *                 example: https://portfolio-mu-gold-43.vercel.app/
 *               isVisible:
 *                 type: boolean
 *                 example: true
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Accepts only .jpg and .png files.
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 result:
 *                   $ref: '#/components/schemas/Profile'
 *       400:
 *         description: Validation error for file type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Only PNG and JPG files are allowed
 *       401:
 *         description: Unauthorized error.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Unauthorized
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: exp claim timestamp check failed
 * 
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 67318ba13dbdfwewrrtab2b8
 *         fullname:
 *           type: string
 *           example: User User
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         occupation:
 *           type: string
 *           example: Developer
 *         social:
 *           type: string
 *           format: uri
 *           example: https://portfolio-mu-gold-43.vercel.app/
 *         isVisible:
 *           type: boolean
 *           example: true
 *         image:
 *           type: string
 *           format: uri
 *           example: /uploads/1735714120034-524009219-1735714120034.png
 */
