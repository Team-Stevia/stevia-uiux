import jsonServer from 'json-server';

import jwt from 'jsonwebtoken';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const secretKey = 'i am best';

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users/signin', (req, res) => {
    const {studentId, password} = req.body;
    console.log(req.body);
    const user = router.db.get('users').find({studentId, password}).value();
    console.log(user);

    if (user) {
        // 로그인 성공 시 JWT 토큰 생성
        const accessToken = jwt.sign({studentId: user.studentId}, secretKey, {expiresIn: '1h'});
        const refreshToken = jwt.sign({
            studentId: user.studentId,
            type: "refresh"
        }, secretKey + 'refresh', {expiresIn: '7d'});

        res.json({accessToken, refreshToken});
    } else {
        res.status(401).json({error: 'Invalid credentials'});
    }
});

// 강의실 예약
server.post('/boards/reservation/:roomId', (req, res) => {
    const rawToken = req.headers['authorization']; // rawToken: Bearer amsdofjasodfqomajdofas

    if (!rawToken) {
        return res.status(401).json({error: 'Access token is missing'});
    }

    try {
        const splitToken = rawToken.split(" ");

        const accessToken = splitToken[1];

        const decoded = jwt.verify(accessToken, secretKey); // payload 값 반환

        const {studentId} = decoded

        const reserverId = studentId;

        const {roomId} = req.params;
        const {usageTime} = req.body;

        if (!usageTime) {
            return res.status(400).json({error: 'Usage time is required'});
        }

        const lastReservation = router.db.get('reservations').sortBy('id').last().value();
        const newReservedId = lastReservation ? lastReservation.id + 1 : 1;

        // 예약 데이터 생성
        const newReservation = {
            id: newReservedId,
            reserverId,
            roomId,
            usageTime,
        };

        router.db.get('reservations').push(newReservation).write();

        res.json({reservedId: newReservation.id});
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid access token' });
    }
})

server.use(router);

server.listen(3003, () => {
    console.log('JSON Server is running on port 3003');
});