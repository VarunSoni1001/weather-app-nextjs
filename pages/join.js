import { useRouter } from "next/router";
import React from "react";

const join = () => {
  const medicauseMembershipJoinUrl = (c) => `medicause://join?code=${c}`;
  const router = useRouter();
  const { code } = router.query;

  if (code) {
    router.push(medicauseMembershipJoinUrl(code));
  }

  return null;
};

export default join;
