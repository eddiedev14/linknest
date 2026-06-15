import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";

import {
  FaCalendar,
  FaCity,
  FaFileLines,
  FaSuitcase,
  FaUser,
} from "react-icons/fa6";

// components and more
import { FormField } from "@/shared/components/forms/FormField";
import { PROFESSIONAL_STATUS_OPTIONS } from "@/features/auth/constants/profile.constant";
import { BiWorld } from "react-icons/bi";

export const ProfileForm = () => {
  return (
    <form className="flex flex-col gap-6" noValidate>
      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <FormField
          Icon={FaUser}
          id="display-name"
          type="text"
          placeholder="e.g. Alex Rivera"
          errorMsg=""
          hint="This is the name shown at the top of your public page."
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <FormField
          Icon={FaFileLines}
          id="bio"
          variant="textarea"
          placeholder="Tell your audience a little about yourself…"
          errorMsg=""
          hint="A short description shown below your name on your public page."
        />
      </div>

      <div className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="professionalRole">Professional Role</Label>
          <FormField
            Icon={FaSuitcase}
            id="professionalRole"
            type="text"
            placeholder="e.g. Front-end Developer"
            errorMsg=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="professionalStatus">Professional Status</Label>
          <FormField
            Icon={FaSuitcase}
            variant="select"
            id="professionalStatus"
            options={PROFESSIONAL_STATUS_OPTIONS}
            placeholder="Select your status"
            errorMsg=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <FormField
            Icon={BiWorld}
            variant="select"
            id="country"
            placeholder="Select your country"
            errorMsg=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <FormField
            Icon={FaCity}
            variant="select"
            id="city"
            placeholder="Select your city"
            errorMsg=""
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 mt-4 md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <Label>Tech Stack</Label>
          <Button>Select Stack</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Languages</Label>
          <Button>Set your Languages</Button>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="experienceYears">Years of Experience</Label>
          <FormField
            Icon={FaCalendar}
            id="experienceYears"
            type="number"
            placeholder="e.g. 10"
            hint="Just enter the number of years"
            errorMsg=""
          />
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          size="lg"
          className="h-11 px-8 rounded-xl font-semibold text-sm gap-2"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
