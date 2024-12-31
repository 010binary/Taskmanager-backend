/**
 * @openapi
 * /api/v1/tasks/create:
 *   post:
 *     summary: Create a new task
 *     description: Create a task for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 example: sunday
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-11-21
 *               title:
 *                 type: string
 *                 example: Chief Quality Strategist
 *               note:
 *                 type: string
 *                 example: Intuitive static pricing structure
 *               status:
 *                 type: boolean
 *                 example: false
 *               time:
 *                 type: string
 *                 format: time
 *                 example: 06:30
 *               repeat:
 *                 type: string
 *                 example: weekly
 *               priority:
 *                 type: string
 *                 example: HIGH
 *               finishTime:
 *                 type: string
 *                 format: time
 *                 example: 06:50
 *     responses:
 *       201:
 *         description: Task created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error or authorization error.
 *       500:
 *         description: Internal server error.
 * 
 * /api/v1/tasks/update:
 *   put:
 *     summary: Update a task
 *     description: Update a task for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 67305abc21f7e49866cabc5e
 *               title:
 *                 type: string
 *                 example: Senior Infrastructure Developer
 *               note:
 *                 type: string
 *                 example: Updated note
 *               status:
 *                 type: boolean
 *                 example: true
 *               time:
 *                 type: string
 *                 format: time
 *                 example: 06:50
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task Updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       400:
 *         description: Validation error or authorization error.
 *       500:
 *         description: Internal server error.
 * 
 * /api/v1/tasks/getall:
 *   get:
 *     summary: Retrieve all tasks
 *     description: Retrieve all tasks for the authenticated user.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All Available User Tasks
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Authorization error.
 * 
 * /api/v1/tasks/get/{id}:
 *   get:
 *     summary: Retrieve a specific task
 *     description: Retrieve a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task.
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task found
 *                 data:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task with id :id not found.
 *       400:
 *         description: Authorization error.
 *
 * /api/v1/tasks/getquery:
 *   get:
 *     summary: Retrieve tasks within a date range
 *     description: Retrieve tasks for the authenticated user between the specified start and end dates.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startdate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-11-09
 *         description: The start date for filtering tasks.
 *       - in: query
 *         name: enddate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-11-15
 *         description: The end date for filtering tasks. If not provided, defaults to the current date.
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tasks found
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       400:
 *         description: Authorization error or invalid query parameters.
 *       500:
 *         description: Internal server error.

 * 
 * /api/v1/tasks/delete/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID.
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task.
 *     responses:
 *       200:
 *         description: Task deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task with the id 67305a4621f7e49866cabc52 deleted.
 *                 data:
 *                   type: null
 *       404:
 *         description: Task not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Not found.
 *       400:
 *         description: Authorization error.
 * 
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 67318c0b3dba48848eaab2bb
 *         day:
 *           type: string
 *           example: sunday
 *         date:
 *           type: string
 *           format: date
 *           example: 2024-11-21
 *         title:
 *           type: string
 *           example: Chief Quality Strategist
 *         note:
 *           type: string
 *           example: Intuitive static pricing structure
 *         status:
 *           type: boolean
 *           example: false
 *         time:
 *           type: string
 *           format: time
 *           example: 06:30
 *         repeat:
 *           type: string
 *           example: weekly
 *         priority:
 *           type: string
 *           example: HIGH
 *         finishTime:
 *           type: string
 *           format: time
 *           example: 06:50
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2024-11-11T04:46:02.726Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2024-11-11T04:46:02.726Z
 *         userId:
 *           type: string
 *           example: 67318ba13dba48848eaab2b8
 */

