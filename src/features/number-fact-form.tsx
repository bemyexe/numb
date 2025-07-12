import {type FormEvent} from 'react';
import {useNavigate} from 'react-router';
import {
  Box,
  Button,
  CheckboxCard,
  createListCollection,
  Field,
  NumberInput,
  Portal,
  Select,
} from '@chakra-ui/react';

import {cn} from '@/shared';
import {type NumberInputState} from '@/shared/store';

interface Props {
  className?: string;
  navigatePath: string;
  type: string;
  number: string;
  isRandom: boolean;
  error?: {
    type?: string;
    number?: string;
  };
  updateType: (type: NumberInputState['type']) => void;
  updateNumber: (type: NumberInputState['number']) => void;
  updateIsRandom: (type: NumberInputState['isRandom']) => void;
  validate: () => boolean;
}

const OPTIONS = createListCollection({
  items: [
    {value: 'trivia', label: 'Trivia'},
    {value: 'math', label: 'Math'},
    {value: 'date', label: 'Date'},
    {value: 'year', label: 'Year'},
  ],
});

export const NumberFactForm = ({
  className,
  navigatePath,
  type,
  number,
  isRandom,
  updateType,
  updateIsRandom,
  updateNumber,
  validate,
  error,
}: Props) => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    navigate(navigatePath);
  };

  return (
    <Box
      className={cn('flex flex-col gap-4', className)}
      as={'form'}
      onSubmit={handleSubmit}>
      <Field.Root invalid={!!error?.type}>
        <Select.Root
          collection={OPTIONS}
          value={type ? [type] : []}
          onValueChange={(e) => updateType(e.value[0])}>
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select type" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
              <Select.ClearTrigger />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {OPTIONS.items.map((type) => (
                  <Select.Item item={type} key={type.value}>
                    {type.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
        <Field.ErrorText>{error?.type}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!error?.number}>
        <NumberInput.Root
          w="full"
          disabled={isRandom}
          value={number}
          onValueChange={(e) => updateNumber(e.value)}>
          <NumberInput.Control />
          <NumberInput.Input placeholder="Select number" />
        </NumberInput.Root>
        <Field.ErrorText>{error?.number}</Field.ErrorText>
      </Field.Root>

      <CheckboxCard.Root
        checked={isRandom}
        onCheckedChange={(e) => {
          updateIsRandom(!!e.checked);
        }}>
        <CheckboxCard.HiddenInput />
        <CheckboxCard.Control>
          <CheckboxCard.Label>Random</CheckboxCard.Label>
        </CheckboxCard.Control>
      </CheckboxCard.Root>

      <Button type="submit">Let's go!</Button>
    </Box>
  );
};
