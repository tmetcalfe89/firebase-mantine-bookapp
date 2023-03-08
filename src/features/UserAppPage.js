import { Image } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "api/firebase";
import ActionIcon from "components/ActionIcon";
import AppPage from "./AppPage";

export default function UserAppPage({ topNav, user, ...props }) {
  return <AppPage topNav={[topNav, <UserTopNav user={user} />]} {...props} />;
}

function UserTopNav({ user }) {
  return (
    <>
      {user.photoURL && <Image src={user.photoURL} radius="sm" width={30} />}
      <ActionIcon onClick={logout} icon={IconLogout} />
    </>
  );
}
