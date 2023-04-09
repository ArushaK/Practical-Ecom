import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("pass123", 12),
    isAdmin: true,
    isConfirmed: true,
    avatar: "/images/icon_user.png",
  },
  {
    name: "Arusha",
    email: "arusha@gmail.com",
    password: bcrypt.hashSync("pass123", 12),
    isConfirmed: true,
    avatar: "/images/icon_user.png",
  },
];

module.exports = users;
