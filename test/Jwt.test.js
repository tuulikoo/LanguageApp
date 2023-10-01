import { verifyToken } from '../src/utils/jwt.js';

describe('JWT utilities', () => {

    beforeAll(() => {
        process.env.JWT_SECRET = 'testSecret';
    });


    it('should return null for an invalid token', () => {
        const decodedUser = verifyToken('invalidToken');
        expect(decodedUser).toBeNull();
    });
});

