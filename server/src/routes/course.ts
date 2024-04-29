import express from 'express';
import { Course } from '../models/index';
import { User } from '../models/user';
import { courseValidation } from '../validation';

const router = express.Router();

//查詢課程
router.get('/:_id?', async (req, res) => {
    const _id = Object.keys(req.params).length > 0 ? req.params._id : null;
    try {
        const courseFound = await Course.find(_id ? { _id } : {})
            .populate('instructor', ['username', 'email'])
            .exec();
        res.send({ message: '查詢成功', courseFound });
    } catch (error) {
        res.status(500).send(JSON.stringify({ mssage: error }));
    }
});

//用導師ID搜尋課程
router.get('/instructor/:_instructor_id', async (req, res) => {
    const { _instructor_id } = req.params;
    try {
        const coursesFound = await Course.find({
            instructor: _instructor_id,
        })
            .populate('instructor', ['username', 'email'])
            .exec();
        res.send({ message: '查詢成功', coursesFound });
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
});

//用學生ID搜尋課程
router.get('/student/:_student_id', async (req, res) => {
    const { _student_id } = req.params;
    try {
        const coursesFound = await Course.find({
            students: _student_id,
        })
            .populate('instructor', ['username', 'email'])
            .exec();
        res.send({ message: '查詢成功', coursesFound });
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
});

//用關鍵字查詢課程
router.post('/', async (req, res) => {
    const { keyword } = req.body;
    try {
        const courseFound = await Course.find({
            title: { $regex: keyword, $options: 'i' },
        })
            .populate('instructor', ['username', 'email'])
            .exec();
        res.send({ message: '查詢成功', courseFound });
    } catch (error) {
        res.status(500).send(JSON.stringify({ mssage: error }));
    }
});

//導師開設課程
router.post('/create', async (req, res) => {
    const { error } = courseValidation(req.body);
    if (error)
        return res
            .status(400)
            .send(JSON.stringify({ message: error.details[0].message }));

    if ((req.user as User).isStudent())
        return res.status(400).send({ message: '請登入講師帳號後再註冊課程' });

    const { title, description, price } = req.body;
    try {
        const newCourse = new Course({
            title,
            description,
            price,
            instructor: (req.user as User)._id,
        });
        const savedCoure = await newCourse.save();
        res.send({
            message: '課程註冊成功',
            savedCoure,
        });
    } catch {
        res.status(500).send({ message: '課程註冊失敗' });
    }
});

//導師更新課程？
router.put('/:_id', async (req, res) => {
    const { error } = courseValidation(req.body);
    if (error)
        return res
            .status(400)
            .send(JSON.stringify({ message: error.details[0].message }));

    const { _id } = req.params;
    try {
        const courseFound = await Course.findOne({ _id });
        if (!courseFound)
            return res
                .status(400)
                .send({ message: '並未找到課程，請重新輸入' });

        if (courseFound.instructor!.equals((req.user as User)._id)) {
            const updatedCourse = await Course.findOneAndUpdate(
                { _id },
                req.body,
                { new: true, runValidators: true }
            );
            res.send({
                message: '課程更新成功',
                updatedCourse,
            });
        } else {
            res.status(403).send({
                message: '只有課程擁有者才能更新和修改課程',
            });
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
});

//學生註冊課程
router.get('/enroll/:_course_id', async (req, res) => {
    const { _course_id } = req.params;
    try {
        const course = await Course.findOne({ _id: _course_id });
        if (!course) return res.status(400).send({ message: '並未找到課程' });
        course?.students.push((req.user as User)._id.toString());
        await course?.save();
        res.send({ message: '註冊成功！' });
    } catch (error) {
        res.status(500).send({ message: '註冊失敗！' });
    }
});

//刪除課程
router.delete('/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        const courseFound = await Course.findOne({ _id });
        if (!courseFound)
            return res
                .status(400)
                .send({ message: '並未找到課程，請重新輸入' });

        if (courseFound.instructor!.equals((req.user as User)._id)) {
            await Course.deleteOne({ _id }).exec();
            res.send({ message: '課程刪除成功' });
        } else {
            res.status(403).send({ message: '只有課程擁有者才能刪除課程' });
        }
    } catch (error) {
        res.status(500).send(JSON.stringify({ message: error }));
    }
});

export default router;
