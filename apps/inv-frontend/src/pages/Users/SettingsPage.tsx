import DashboardLayout from "@/components/DashboardLayout";
import MetaTags from "@/components/MetaTags";

const SettingsPage = () => {
  return (
    <>
      <MetaTags title={"Settings | pantryHub"} pageUrl={window.location.href} />
      <DashboardLayout>
        <div>SettingsPage</div>
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;
