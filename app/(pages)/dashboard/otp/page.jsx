import { Suspense } from "react";
import OtpClient from "./otp-client";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtpClient />
    </Suspense>
  );
}
