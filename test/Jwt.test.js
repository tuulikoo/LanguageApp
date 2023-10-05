import { generateToken, verifyToken } from '../src/utils/jwt';
import jwt from 'jsonwebtoken';
import { describe, it, expect } from 'vitest';

describe('JWT utility functions', () => {
    const mockSecret = 'my-test-secret';

    it('should generate a token and verify it', async () => {
        const payload = { userId: '12345', role: 'user' };

        const token = generateToken(payload, mockSecret);
        expect(token).toBeTruthy();

        const decodedPayload = verifyToken(token, mockSecret);
        expect(decodedPayload.userId).toBe(payload.userId);
        expect(decodedPayload.role).toBe(payload.role);
    });

    it('should return null when verifying invalid token', async () => {
        const invalidToken = jwt.sign({ foo: 'bar' }, 'wrong-secret', { expiresIn: '1h' });
        const result = verifyToken(invalidToken, mockSecret);
        expect(result).toBeNull();
    });

});
