import PortalLayout from "@/portal/PortalLayout";
import { PortalAuthProvider } from "@/portal/PortalAuthContext";

const PortalShell = () => (
  <PortalAuthProvider>
    <PortalLayout />
  </PortalAuthProvider>
);

export default PortalShell;