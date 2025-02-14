import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

app.post("/user", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.put("/user/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

app.delete("/user/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).send({ message: "User deleted successfully" });
});

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
