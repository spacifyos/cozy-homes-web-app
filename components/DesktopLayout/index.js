import DesktopHeader from "@/components/DesktopLayout/DesktopHeader";
import DesktopFooter from "@/components/DesktopLayout/DesktopFooter";
import DesktopNavigationBar from "@/components/DesktopLayout/DesktopNavigationBar";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const DesktopLayout = ({ children, page, hideNav = false }) => {
  return (
    <div className="flex flex-col primaryWhite-bg-color w-full h-full relative">
      <DesktopHeader />

      {hideNav ? (
        <div className="flex-1 h-full">{children}</div>
      ) : (
        <div className="flex-1 h-full flex flex-col container mx-auto">
          <CustomText textClassName="font-size-xxlarge font-bold pb-5">
            {isEmpty(page) ? "-" : page}
          </CustomText>

          <div className="grid grid-cols-4">
            <div className="col-span-1">
              <DesktopNavigationBar />
            </div>

            <div className="col-span-3"> {children}</div>
          </div>
        </div>
      )}

      <DesktopFooter />
    </div>
  );
};

export default DesktopLayout;
