import { FaCity, FaSuitcase, FaUser } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { Controller } from "react-hook-form";
import { Button } from "@/shared/components/shadcn/button";
import { Label } from "@/shared/components/shadcn/label";
import { InputField, SelectField, TextareaField } from "@/shared/components/forms/fields";
import { MultipleCombo } from "@/shared/components/forms/fields/MultipleCombo";
import { useProfileForm } from "../hooks/useProfileForm";
import {
  LANGUAGES_OPTIONS,
  PROFESSIONAL_STATUS_OPTIONS,
  TECH_STACK_OPTIONS,
} from "@/data/profile.data";

export const ProfileForm = () => {
  const {
    errors,
    control,
    countriesOptions,
    citiesOptions,
    country,
    isMissingUsername,
    register,
    setValue,
    onSubmit,
  } = useProfileForm();

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6" noValidate>
      {/* Username */}
      {isMissingUsername && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <InputField
            Icon={FaUser}
            id="username"
            type="text"
            placeholder="Your Username"
            autoComplete="username"
            hint="This will be your public profile URL."
            registration={register("username")}
            errorMsg={errors.username?.message}
          />
        </div>
      )}

      {/* Display Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="displayName">Display Name</Label>
        <InputField
          Icon={FaUser}
          id="displayName"
          type="text"
          placeholder="e.g. Alex Rivera"
          autoComplete="name"
          hint="This is the name shown at the top of your public page."
          registration={register("displayName")}
        />
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Bio</Label>
        <TextareaField
          id="bio"
          placeholder="Tell your audience a little about yourself…"
          hint="A short description shown below your name on your public page."
          registration={register("bio")}
        />
      </div>

      <div className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          {/* Professional Role */}
          <Label htmlFor="professionalRole">Professional Role</Label>
          <InputField
            Icon={FaSuitcase}
            id="professionalRole"
            type="text"
            placeholder="e.g. Front-end Developer"
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
                Icon={FaSuitcase}
                id="professionalStatus"
                placeholder="Select your status"
                options={PROFESSIONAL_STATUS_OPTIONS}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="country">Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <SelectField
                Icon={BiWorld}
                id="country"
                placeholder="Select your country"
                options={countriesOptions}
                value={field.value}
                onChange={(country) => {
                  field.onChange(country);
                  setValue("city", "");
                }}
              />
            )}
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="city">City</Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <SelectField
                Icon={FaCity}
                id="city"
                placeholder="Select your city"
                options={citiesOptions}
                disabled={!country}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        {/* Tech Stack */}
        <div className="flex flex-col gap-2">
          <Label id="techStack">Tech Stack</Label>
          <Controller
            name="techStack"
            control={control}
            render={({ field }) => (
              <MultipleCombo
                id="techStack"
                items={TECH_STACK_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                maxSelections={5}
                hint="Select up to 5 technologies"
              />
            )}
          />
        </div>

        {/* Languages */}
        <div className="flex flex-col gap-2">
          <Label id="languages">Languages</Label>
          <Controller
            name="languages"
            control={control}
            render={({ field }) => (
              <MultipleCombo
                id="languages"
                items={LANGUAGES_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                maxSelections={3}
                hint="Select up to 3 of your main languages"
              />
            )}
          />
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end pt-1">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto h-11 px-8 rounded-xl font-semibold text-sm gap-2"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
