const pool =require("../../config/database")

const create= (data, callBack) => {
  pool.query(
    `insert into registration(firstName, lastName, gender, email, password, number) 
              values(?,?,?,?,?,?)`,
    [
      data.firstName,
      data.lastName,
      data.gender,
      data.email,
      data.password,
      data.number
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results);
    }
  );
}
const allUsers= (callBack) => {
  pool.query(
    `select id,firstName, lastName, gender, email, number from registration`,
    [],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}
const singleUserById= (id,callBack) => {
  pool.query(
    `select id,firstName, lastName, gender, email, number from registration where id=?`,
    [id],
    (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    }
  );
}

const updateUser= (data, callBack) => {
  pool.query(
    `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
    [
      data.firstName,
      data.lastName,
      data.gender,
      data.email,
      data.password,
      data.number,
      data.id
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
}

const loginWithEmail=(email, callBack) => {
  pool.query(
    `select * from registration where email = ?`,
    [email],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      return callBack(null, results[0]);
    }
  );
  }

module.exports={create,allUsers,updateUser,singleUserById,loginWithEmail}