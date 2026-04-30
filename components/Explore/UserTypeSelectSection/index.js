import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import {
  TenantIllustration,
  OwnerIllustration,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/Icons";

const RoleOption = ({
  Illustration,
  subtitle,
  title,
  description,
  accent,
  onClick,
}) => {
  const isPrimary = accent === "primary";
  const ringClass = isPrimary
    ? "hover:border-primary"
    : "hover:border-secondary";
  const badgeClass = isPrimary
    ? "bg-primary-background"
    : "bg-secondary-background";
  const accentText = isPrimary ? "text-primary" : "text-secondary";
  const ctaBg = isPrimary ? "bg-primary" : "bg-secondary";

  return (
    <div
      onClick={onClick}
      className={`group flex items-center bg-white global-border-radius global-box-shadow border-2 border-transparent ${ringClass} transition-all p-4 cursor-pointer w-full`}
    >
      <div
        className={`flex items-center justify-center rounded-full mr-4 flex-shrink-0 ${badgeClass}`}
        style={{ width: 72, height: 72 }}
      >
        <Illustration size={48} className={accentText} />
      </div>

      <div className="flex-1 min-w-0">
        <CustomText
          textClassName={`text-xxs font-bold uppercase tracking-widest pb-0.5 ${accentText}`}
        >
          {subtitle}
        </CustomText>
        <CustomText textClassName="text-base font-bold text-black pb-1">
          {title}
        </CustomText>
        <CustomText textClassName="text-xs text-muted leading-snug">
          {description}
        </CustomText>
      </div>

      <div
        className={`flex items-center justify-center rounded-full ml-3 ${ctaBg} flex-shrink-0`}
        style={{ width: 32, height: 32 }}
      >
        <ChevronRightIcon size={14} className="text-white" />
      </div>
    </div>
  );
};

const UserTypeSelectSection = ({ setSelectedUserType }) => {
  return (
    <div className="p-6">
      <form method="dialog" className="flex justify-end">
        <button className="btn btn-sm btn-circle btn-ghost right-2">
          <CloseIcon size={20} className="text-black" />
        </button>
      </form>

      <div className="flex flex-col items-center bg-white text-center pb-4">
        <CustomImage
          src={Images.logoHorizontalColor}
          imageStyle={{ width: 140 }}
          className="mb-3"
        />
        <CustomText
          textClassName="font-bold text-black pb-1"
          styles={{ fontSize: 22 }}
        >
          Welcome
        </CustomText>
        <CustomText textClassName="text-xs text-muted">
          Tell us how you'd like to use CozyHomes
        </CustomText>
      </div>

      <div className="flex flex-col gap-3">
        <RoleOption
          Illustration={TenantIllustration}
          subtitle="For renters"
          title="I'm a Tenant"
          description="Find a home, pay rent, manage your tenancy"
          accent="primary"
          onClick={() => setSelectedUserType("Tenant")}
        />
        <RoleOption
          Illustration={OwnerIllustration}
          subtitle="For landlords"
          title="I'm an Owner"
          description="List properties and collect rent with ease"
          accent="secondary"
          onClick={() => setSelectedUserType("Owner")}
        />
      </div>
    </div>
  );
};

export default UserTypeSelectSection;
