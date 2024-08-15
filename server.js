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


server.get('/boards/:buildingLocation', (req, res) => {
    const {buildingLocation} = req.params;
    const rawToken = req.headers['authorization']; // rawToken: Bearer amsdofjasodfqomajdofas
    console.log("인증 토큰" + rawToken);

    if (!rawToken) {
        return res.status(401).json({error: 'Access token is missing'});
    }

    const boards = router.db.get('boards').value();

    const location = boards.find(board => board.buildingLocation === buildingLocation);

    if (location) {
        res.json(location.roomList);
        console.log(location.roomList);
    } else {
        console.error('Location not found');
    }
});


server.use(router);

server.listen(3003, () => {
    console.log('JSON Server is running on port 3003');
});