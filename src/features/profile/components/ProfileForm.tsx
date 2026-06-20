import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";

import { FaCalendar, FaCity, FaFileLines, FaSuitcase, FaUser } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";

// components and more
import { FormField } from "@/shared/components/forms/FormField";
import { PROFESSIONAL_STATUS_OPTIONS } from "@/data/profile.data";
import { useProfileForm } from "../hooks/useProfileForm";

export const ProfileForm = () => {
  const { form, handleFieldChange, handleProfileFormSubmit } = useProfileForm();
  const { displayName, bio, professionalRole, professionalStatus, country, city, experienceYears } =
    form;

  return (
    <form onSubmit={handleProfileFormSubmit} className="flex flex-col gap-6" noValidate>
      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <FormField
          Icon={FaUser}
          id="displayName"
          type="text"
          value={displayName}
          placeholder="e.g. Alex Rivera"
          hint="This is the name shown at the top of your public page."
          onChange={handleFieldChange}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <FormField
          Icon={FaFileLines}
          id="bio"
          variant="textarea"
          value={bio}
          placeholder="Tell your audience a little about yourself…"
          hint="A short description shown below your name on your public page."
          onChange={handleFieldChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          {/* Professional Role */}
          <Label htmlFor="professionalRole">Professional Role</Label>
          <FormField
            Icon={FaSuitcase}
            id="professionalRole"
            type="text"
            value={professionalRole}
            placeholder="e.g. Front-end Developer"
            onChange={handleFieldChange}
          />
        </div>

        {/* Professional Status */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="professionalStatus">Professional Status</Label>
          <FormField
            Icon={FaSuitcase}
            variant="select"
            value={professionalStatus}
            id="professionalStatus"
            options={PROFESSIONAL_STATUS_OPTIONS}
            placeholder="Select your status"
            onChange={handleFieldChange}
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <FormField
            Icon={BiWorld}
            variant="select"
            value={country}
            id="country"
            placeholder="Select your country"
            onChange={handleFieldChange}
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <FormField
            Icon={FaCity}
            variant="select"
            value={city}
            id="city"
            placeholder="Select your city"
            onChange={handleFieldChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 mt-4 md:grid-cols-3">
        {/* Tech Stack */}
        <div className="flex flex-col gap-2">
          <Label>Tech Stack</Label>
          <Button>Select Stack</Button>
        </div>

        {/* Languages */}
        <div className="flex flex-col gap-2">
          <Label>Languages</Label>
          <Button>Set your Languages</Button>
        </div>

        {/* Years of Experience */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="experienceYears">Years of Experience</Label>
          <FormField
            Icon={FaCalendar}
            id="experienceYears"
            type="number"
            value={String(experienceYears)}
            placeholder="e.g. 10"
            hint="Just enter the number of years"
            onChange={handleFieldChange}
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
