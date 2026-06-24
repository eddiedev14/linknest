import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";
import { FaCalendar, FaCity, FaSuitcase, FaUser } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { PROFESSIONAL_STATUS_OPTIONS } from "@/data/profile.data";
import { InputField, SelectField, TextareaField } from "@/shared/components/forms/fields";
import { useProfileForm } from "../hooks/useProfileForm";

export const ProfileForm = () => {
  const { form, countriesOptions, citiesOptions, handleProfileFormSubmit } = useProfileForm();
  const { displayName, bio, professionalRole, professionalStatus, country, city, experienceYears } =
    form;

  return (
    <form onSubmit={handleProfileFormSubmit} className="flex flex-col gap-6" noValidate>
      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <InputField
          Icon={FaUser}
          type="text"
          value={displayName}
          placeholder="e.g. Alex Rivera"
          hint="This is the name shown at the top of your public page."
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <TextareaField
          value={bio}
          placeholder="Tell your audience a little about yourself…"
          hint="A short description shown below your name on your public page."
        />
      </div>

      <div className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          {/* Professional Role */}
          <Label htmlFor="professionalRole">Professional Role</Label>
          <InputField
            Icon={FaSuitcase}
            type="text"
            value={professionalRole}
            placeholder="e.g. Front-end Developer"
          />
        </div>

        {/* Professional Status */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="professionalStatus">Professional Status</Label>
          <SelectField
            Icon={FaSuitcase}
            value={professionalStatus}
            options={PROFESSIONAL_STATUS_OPTIONS}
            placeholder="Select your status"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <SelectField
            Icon={BiWorld}
            value={country}
            options={countriesOptions}
            placeholder="Select your country"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <SelectField
            Icon={FaCity}
            value={city}
            disabled={!country}
            options={citiesOptions}
            placeholder="Select your city"
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
          <InputField
            Icon={FaCalendar}
            type="number"
            value={String(experienceYears)}
            placeholder="e.g. 10"
            hint="Just enter the number of years"
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
