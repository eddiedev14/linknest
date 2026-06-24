import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";
import { FaCalendar, FaCity, FaSuitcase, FaUser } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { PROFESSIONAL_STATUS_OPTIONS } from "@/data/profile.data";
import { InputField, SelectField, TextareaField } from "@/shared/components/forms/fields";
import { useProfileForm } from "../hooks/useProfileForm";
import { Controller } from "react-hook-form";

export const ProfileForm = () => {
  const { countriesOptions, citiesOptions, errors, control, country, register, onSubmit, watch } =
    useProfileForm();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="display-name">Display Name</Label>
        <InputField
          Icon={FaUser}
          type="text"
          placeholder="e.g. Alex Rivera"
          hint="This is the name shown at the top of your public page."
          errorMsg={errors.displayName?.message}
          registration={register("displayName")}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <TextareaField
          placeholder="Tell your audience a little about yourself…"
          hint="A short description shown below your name on your public page."
          errorMsg={errors.bio?.message}
          registration={register("bio")}
        />
      </div>

      <div className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          {/* Professional Role */}
          <Label htmlFor="professionalRole">Professional Role</Label>
          <InputField
            Icon={FaSuitcase}
            type="text"
            placeholder="e.g. Front-end Developer"
            errorMsg={errors.professionalRole?.message}
            registration={register("professionalRole")}
          />
        </div>

        {/* Professional Status */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="professionalStatus">Professional Status</Label>
          <Controller
            name="professionalStatus"
            control={control}
            render={({ field }) => (
              <SelectField
                key={field.value}
                Icon={FaSuitcase}
                placeholder="Select your status"
                options={PROFESSIONAL_STATUS_OPTIONS}
                value={field.value ?? ""}
                onChange={(value) => field.onChange(value === "" ? undefined : value)}
                errorMsg={errors.professionalStatus?.message}
              />
            )}
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <SelectField
            Icon={BiWorld}
            options={countriesOptions}
            placeholder="Select your country"
            errorMsg={errors.country?.message}
            value=""
            onChange={() => {}}
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <SelectField
            Icon={FaCity}
            disabled={!country}
            options={citiesOptions}
            placeholder="Select your city"
            value=""
            onChange={() => {}}
            errorMsg={errors.city?.message}
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
            placeholder="e.g. 10"
            hint="Just enter the number of years"
            errorMsg={errors.experienceYears?.message}
            registration={register("experienceYears")}
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
