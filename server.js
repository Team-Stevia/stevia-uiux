import jsonServer from 'json-server';

import jwt from 'jsonwebtoken';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const secretKey = 'i am best';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users', (req, res) => {
    const {studentId, password} = req.body;
    console.log(req.body);
    const user = router.db.get('users').find({studentId, password}).value();
    console.log(user);

    if (user) {
        // 로그인 성공 시 JWT 토큰 생성
        const accessToken = jwt.sign({studentId: user.studentId}, secretKey, {expiresIn: '1m'});
        const refreshToken = jwt.sign({
            studentId: user.studentId,
            type: "refresh"
        }, secretKey + 'refresh', {expiresIn: '7d'});

        res.json({accessToken, refreshToken});
    } else {
        res.status(401).json({error: 'Invalid credentials'});
    }
});

server.get('/boards', async (req, res) => {
    try {
        const boardsData = router.db.get('/boards').value();
        res.json(boardsData);
    } catch (error) {
        console.error('Failed to read db.json:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

server.use(router);

server.listen(3003, () => {
    console.log('JSON Server is running on port 3003');
});