import { useRouter } from "next/router";

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
