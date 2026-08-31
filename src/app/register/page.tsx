import { Button, Card, Input } from "@/components";

export default function Register() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans ">
      <Card className="flex flex-col gap-4 p-8 w-100">
        <div>Welcome, Register!</div>
        <Input type="email" placeholder="Email" />
        <Input placeholder="Name" />
        <Input placeholder="Surname" />
        <Input type="password" placeholder="Password" />
        <Input
          type="confirm-password"
          placeholder="Please confirm your password"
        />

        <Button>Register</Button>
      </Card>
    </div>
  );
}
