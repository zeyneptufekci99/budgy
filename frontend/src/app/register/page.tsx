"use client";

import { Button, Card, Input } from "@/components";
import { register } from "@/api/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password,
      });

      toast.success("Registration successful!");

      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Card className="flex flex-col gap-4 p-8 w-100">
        <div>Welcome, Register!</div>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Please confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </Card>
    </div>
  );
}
