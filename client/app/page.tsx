import {SendOTP} from "@/app/components/otp/send";
import {VerifyOTP} from "@/app/components/otp/verify";

export default function Home() {
  return (
    <main>
      <div className={'flex gap-2.5 flex-wrap justify-center '}>
          <SendOTP/>
          <VerifyOTP/>
      </div>
    </main>
  );
}
