import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function PasswordConfirmation({
  password,
  value,
  onChange,
}: {
  password: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const passwordsMatch = password === value;

  return (
    <div className="grid gap-2 relative">
      <Label htmlFor="password_confirmation">Confirm Password</Label>
      <div className="relative">
        <Input
          id="password_confirmation"
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="new-password"
          placeholder="Confirm Password"
          className={`pr-10 ${
            value && !passwordsMatch ? "border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-2.5 text-muted-foreground"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {!passwordsMatch && value.length > 0 && (
        <span className="text-xs text-red-500">Passwords do not match</span>
      )}
    </div>
  );
}
