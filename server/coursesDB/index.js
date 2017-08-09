const makeId = require('./makeId'),
    fakeDB = require('./initialDB');

const threeDays = 86400000 * 3;

const findCourseByName = (searchedName, data) => {
    return data.coursesList.filter(({name}) => name.toLowerCase().includes(searchedName.toLowerCase()))
};

const findCourseByDate = (searchedDate, data) => {
    return data.coursesList.filter(({date}) => {
        return (date - threeDays) < searchedDate && searchedDate < (date + threeDays)
    })
};


const findCourse = (search, res, data) => {
    if (Date.parse(search)) {
        res.send({
            coursesList: findCourseByDate(Date.parse(search), data)
        });
    } else {
        res.send({
            coursesList: findCourseByName(search, data)
        });
    }
};


class CoursesCollection {

    getCollection(req, res) {
      const { coursesList, linkedCourses } = fakeDB;

      const {cookies:{user}} = req;

      // IMPLEMENTATION of LINKED COURSES
      const subscribed = coursesList
        .map(item => {
          const course = Object.assign({},item);

          if(linkedCourses[user] && linkedCourses[user].includes(item.id)) {
            course.subscribed = true;
          }

          return course;
        });

      if (req.query.search) {

            const timeOutedQuery = () => {
                findCourse(req.query.search, res, { coursesList : subscribed });
            };

            setTimeout(timeOutedQuery, 3000);
            return;
        }

        res.send({ coursesList : subscribed });
    }

    getCreated(req, res) {
      const { coursesToBeApproved } = fakeDB;
      const {cookies:{user}} = req;

      // IMPLEMENTATION of LINKED COURSES
      const createdBy = coursesToBeApproved.filter(({creator}) => creator === user);
      if (req.query.search) {

        const timeOutedQuery = () => {
          findCourse(req.query.search, res, {coursesList: createdBy});
        };

        setTimeout(timeOutedQuery, 3000);
        return;
      }

      res.send({ coursesList: createdBy });
    }

    getToBeApproved(req, res) {
      const { coursesToBeApproved } = fakeDB;
      const {cookies:{user}} = req;

      // IMPLEMENTATION of LINKED COURSES

      if(user !== 'admin') {
        res.status(403);
        res.send();
        return;
      }

      if (req.query.search) {

        const timeOutedQuery = () => {
          findCourse(req.query.search, res, {coursesList: coursesToBeApproved});
        };

        setTimeout(timeOutedQuery, 3000);
        return;
      }

      res.send({ coursesList: coursesToBeApproved });
    }

    getSubscribed(req, res) {
      const { coursesList, linkedCourses } = fakeDB;
      const {cookies:{user}} = req;

      // IMPLEMENTATION of LINKED COURSES
      const subscribed = coursesList.filter(({id}) => linkedCourses[user] && linkedCourses[user].includes(id))
                                    .map(item => {
                                      const course = Object.assign({},item,{subscribed : true});
                                      return course;
                                    });

      if (req.query.search) {

        const timeOutedQuery = () => {
          findCourse(req.query.search, res, { coursesList : subscribed });
        };

        setTimeout(timeOutedQuery, 3000);
        return;
      }

      res.send({ coursesList: subscribed });
    }

    subscribtion(req, res) {
      const {linkedCourses} = fakeDB;
      const {cookies: {user}, body: {id, subscribed}} = req;

      if (subscribed) {
        linkedCourses[user] = linkedCourses[user] ?
          linkedCourses[user].concat([id]) : [id]
      } else {
        linkedCourses[user] = linkedCourses[user].filter(item => item !== id);
      }

      res.send({id, subscribed});
    }

    rejection(req, res) {
      const {coursesToBeApproved} = fakeDB;
      const {cookies: {user}, body: {id, reason}} = req;

      if(user === 'admin') {
        const resultedList = coursesToBeApproved.map((course) => {
          return course.id === id ? Object.assign({},course, {rejected : true, reason}): course
        });
        fakeDB.coursesToBeApproved = resultedList;

        res.send({ id });
      } else {
        res.status(303);
        res.send();
      }
    }

    approving(req, res) {
      const {coursesToBeApproved, coursesList } = fakeDB;
      const {cookies: {user}, body: {id}} = req;

      if(user === 'admin') {
        const [course] = coursesToBeApproved.filter((course) => course.id === id);
        delete course.creator;
        delete course.rejected;
        delete course.reason;

        fakeDB.coursesList.push(course);
        fakeDB.coursesToBeApproved = coursesToBeApproved.filter((course) => course.id !== id);

        res.send({id});
      } else {
        res.status(303);
        res.send();
      }
    }


    getById(req, res) {
      const {id} = req.params;
      const {cookies:{user}} = req;
      if(user !== 'admin') {
        const [course] = fakeDB.coursesList.filter(course => course.id === id);
        const [toBeApprovedCourse] = fakeDB.coursesToBeApproved
          .filter(({creator, id: courseId}) => creator === user && id === courseId)
          .map(course => {
          return Object.assign({}, course, {editable: true});
        });
        const response = course || toBeApprovedCourse;

        if(response) {
          res.send({course : response});
        } else {
          res.status(303);
          res.send();
        }
      } else {
        const [course] = fakeDB.coursesList.filter(course => course.id === id);
        const [toBeApprovedCourse] = fakeDB.coursesToBeApproved
          .filter(({creator, id: courseId}) => id === courseId)
          .map(course => {
            return  Object.assign({}, course, {approvable: true});;
          });

        const response = course || toBeApprovedCourse;

        res.send({course : response});
      }

    }

    create(req, res) {
        const newCourse = req.body;
        const {cookies:{user}} = req;
        Object.assign(newCourse, {id: makeId(), creator: user });

        fakeDB.coursesToBeApproved.push(newCourse);

      res.send({created: true, id: newCourse.id});
    }

    update(req, res) {
      fakeDB.coursesToBeApproved.forEach(item => {
            if (item.id == req.params.id) {
                Object.assign(item, req.body)
            }
        });

        res.send({updated: true, id: req.params.id})
    }

    remove(req, res) {
      const {id} = req.params;
      fakeDB.coursesToBeApproved = fakeDB.coursesToBeApproved.filter(course => course.id !== id);

      res.send({deleted: true, id})
    }

    getCount(req, res) {
      const {linkedCourses, coursesToBeApproved} = fakeDB;
      const {cookies: {user}, query: {type}} = req;
      const countTypes = {
        created: () => {
          return coursesToBeApproved.filter(({creator}) => creator === user).length
        },
        subscribed: () => {
          return linkedCourses[user] ? linkedCourses[user].length : 0
        },
        approve: () => {
          return coursesToBeApproved.length
        }
      };

      const count = countTypes[type]();

      res.send({count});
    }
}


module.exports = new CoursesCollection();
