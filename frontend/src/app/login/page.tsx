"use client";

import { Button, Card, Input } from "@/components";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-provider";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      toast.success("Login successful!");

      router.push("/dashboard");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Invalid email or password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans">
      <Card className="flex flex-col gap-4 p-8 w-100">
        <div>Welcome</div>

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Button
          onClick={() => router.push("/register")}
          disabled={loading}
          variant="link"
        >
          Register
        </Button>
      </Card>
    </div>
  );
}
