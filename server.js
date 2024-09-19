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
        const accessToken = jwt.sign({studentId: user.studentId}, secretKey, {expiresIn: '5m'});
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

server.post('/boards/reservation/:roomId', (req, res) => {
    console.log('Request Headers:', req.headers);
    console.log('Authorization Header:', req.headers['authorization']);


    const rawToken = req.headers['authorization'];
    console.log("인증 토큰2" + rawToken);

    if (!rawToken) {
        return res.status(401).json({error: 'Access 아이씨ㅣㅣ이en is missing'});
    }

    try {
        const splitToken = rawToken.split(" ");
        const accessToken = splitToken[1];
        const decoded = jwt.verify(accessToken, secretKey);
        const {studentId} = decoded;

        const reserverId = studentId;
        const {roomId} = req.params;
        const {usageTime} = req.body;

        console.log("post 토큰:" + accessToken);
        console.log(usageTime);
        console.log(roomId);

        if (!usageTime) {
            return res.status(400).json({error: 'Usage time is required'})
        }

        const lastReservation = router.db.get('reservations').sortBy('reserveId').last();
        const newReservedId = lastReservation && lastReservation.reserveId ? lastReservation.reserveId + 1 : 1;
        // const newReservedId = lastReservation ? lastReservation.reserveId + 1 : 1;
        console.log(newReservedId);

        const newReservation = {
            reserveId: newReservedId,
            reserverId,
            roomId,
            usageTime
        }

        router.db.get('reservations').push(newReservation).write();
        console.log("이거야 이거" + newReservation.reserveId)
        res.json({reserveId: newReservation.reserveId});

    } catch (err) {
        return res.status(401).json({error: 'Invalid access token'});
    }
})


server.use(router);

server.listen(3003, () => {
    console.log('JSON Server is running on port 3003');
});