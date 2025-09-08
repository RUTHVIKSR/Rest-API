import express from 'express';
import { register } from '../controllers/authentication';

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with username, email, and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad request - validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               validation_error:
 *                 summary: Missing required fields
 *                 value:
 *                   message: "All fields are required"
 *               user_exists:
 *                 summary: User already exists
 *                 value:
 *                   message: "User already exists"
 *               registration_failed:
 *                 summary: Registration failed
 *                 value:
 *                   message: "registration failed"
 */

export default (router : express.Router) => {
    router.post('/auth/register', register);
}