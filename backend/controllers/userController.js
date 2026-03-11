// تحكم المستخدمين (User Controller)
export const createUser = (req, res) => {
  // منطق إنشاء مستخدم جديد
  res.send("create user");
};

export const getUsers = (req, res) => {
  // منطق جلب جميع المستخدمين
  res.send("get users");
};

export const loginUser = (req, res) => {
  // منطق تسجيل الدخول
  res.send("login user");
};
