import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./ui/combobox";

export type DropdownItemProps = {
  value: string;
  label: string;
};

export type DropdownProps = {
  items: DropdownItemProps[];
  placeholder?: string;
  onChange?: (value: DropdownItemProps | null) => void;
};

export const Dropdown = ({ items, placeholder, onChange }: DropdownProps) => {
  return (
    <Combobox
      items={items}
      itemToStringValue={(item: DropdownItemProps) => item.label}
      onValueChange={(value) => onChange && onChange(value)}
    >
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
