import { Button, Card, Input } from "@/components";

export default function Login() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
      <Card className="flex flex-col gap-4 p-8 w-100">
        <div>Welcome</div>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />

        <Button>Login</Button>
      </Card>
    </div>
  );
}
