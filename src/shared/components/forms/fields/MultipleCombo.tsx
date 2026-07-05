import type { SelectOption } from "@/shared/components/forms/fields/SelectField";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/shared/components/shadcn/combobox";

const MAX_VISIBLE_CHIPS = 2;

interface Props {
  id: string;
  items: SelectOption[];
  value: string[];
  maxSelections?: number;
  hint?: string;
  onValueChange: (value: string[]) => void;
}

export function MultipleCombo({ id, items, value, maxSelections, hint, onValueChange }: Props) {
  const anchor = useComboboxAnchor();
  const isLimitReached = maxSelections !== undefined && value.length >= maxSelections;

  return (
    <>
      <Combobox
        multiple
        autoHighlight
        id={id}
        items={items}
        value={value}
        onValueChange={onValueChange}
      >
        <ComboboxChips ref={anchor} className="w-full max-w-xs">
          <ComboboxValue>
            {(values: string[]) => {
              const visible = values.slice(0, MAX_VISIBLE_CHIPS);
              const remaining = values.length - visible.length;

              return (
                <>
                  {visible.map((value) => {
                    const option = items.find((item) => item.value === value);
                    if (!option) return null;
                    return <ComboboxChip key={option.value}>{option.label}</ComboboxChip>;
                  })}

                  {remaining > 0 && <ComboboxChip showRemove={false}>+{remaining}</ComboboxChip>}
                  <ComboboxChipsInput />
                </>
              );
            }}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item: SelectOption) => {
              const isSelected = value.includes(item.value);

              return (
                <ComboboxItem
                  key={item.value}
                  value={item.value}
                  disabled={isLimitReached && !isSelected}
                >
                  {item.label}
                </ComboboxItem>
              );
            }}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </>
  );
}
